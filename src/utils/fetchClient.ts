type Primitive = string | number | boolean;
type SearchParamsValue = Primitive | null | undefined | Primitive[] | ReadonlyArray<Primitive>;
type SearchParams = Record<string, SearchParamsValue>;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';

type RetryOption =
    | number
    | {
          limit?: number;
          statusCodes?: number[];
          methods?: HttpMethod[];
          delay?: number | ((retryCount: number, error: HttpError) => number);
      };

type BeforeRequestHook = (request: Request, options: NormalizedRequestOptions) => Promise<Request | void> | Request | void;

type AfterResponseHook = (
    request: Request,
    options: NormalizedRequestOptions,
    response: Response
) => Promise<Response | void> | Response | void;

type BeforeErrorHook = (error: HttpError) => Promise<HttpError | void> | HttpError | void;

type Hooks = {
    beforeRequest?: BeforeRequestHook[];
    afterResponse?: AfterResponseHook[];
    beforeError?: BeforeErrorHook[];
};

type RequestOptions = Omit<RequestInit, 'body' | 'method'> & {
    method?: HttpMethod;
    prefixUrl?: string;
    searchParams?: SearchParams | URLSearchParams | string;
    json?: unknown;
    body?: BodyInit | null;
    timeout?: number;
    retry?: RetryOption;
    hooks?: Hooks;
    throwHttpErrors?: boolean;
};

type CreateHttpClientDefaults = RequestOptions;

type NormalizedRetry = {
    limit: number;
    statusCodes: number[];
    methods: HttpMethod[];
    delay: number | ((retryCount: number, error: HttpError) => number);
};

type NormalizedRequestOptions = Omit<RequestOptions, 'retry' | 'hooks'> & {
    method: HttpMethod;
    retry: NormalizedRetry;
    hooks: Required<Hooks>;
    throwHttpErrors: boolean;
};

type HttpResponse<T = unknown> = {
    data: T;
    status: number;
    statusText: string;
    headers: Headers;
    request: Request;
    response: Response;
};

const DEFAULT_RETRY: NormalizedRetry = {
    limit: 2,
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
    methods: ['GET', 'HEAD'],
    delay: (retryCount) => retryCount * 300
};

const TIMEOUT_ERROR_NAME = 'TimeoutError';

function isFormData(value: unknown): value is FormData {
    return typeof FormData !== 'undefined' && value instanceof FormData;
}

function isAbsoluteUrl(value: string): boolean {
    return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(value);
}

function isAbortError(value: unknown): value is DOMException {
    return value instanceof DOMException && value.name === 'AbortError';
}

function normalizeRetry(retry?: RetryOption): NormalizedRetry {
    if (typeof retry === 'number') {
        return {
            ...DEFAULT_RETRY,
            limit: retry
        };
    }

    if (!retry) {
        return {
            ...DEFAULT_RETRY,
            statusCodes: [...DEFAULT_RETRY.statusCodes],
            methods: [...DEFAULT_RETRY.methods]
        };
    }

    return {
        limit: retry.limit ?? DEFAULT_RETRY.limit,
        statusCodes: retry.statusCodes ?? [...DEFAULT_RETRY.statusCodes],
        methods: retry.methods ?? [...DEFAULT_RETRY.methods],
        delay: retry.delay ?? DEFAULT_RETRY.delay
    };
}

function mergeHooks(base?: Hooks, override?: Hooks): Required<Hooks> {
    return {
        beforeRequest: [...(base?.beforeRequest ?? []), ...(override?.beforeRequest ?? [])],
        afterResponse: [...(base?.afterResponse ?? []), ...(override?.afterResponse ?? [])],
        beforeError: [...(base?.beforeError ?? []), ...(override?.beforeError ?? [])]
    };
}

function mergeHeaders(base?: HeadersInit, override?: HeadersInit): Headers {
    const headers = new Headers(base);
    const overrideHeaders = new Headers(override);

    overrideHeaders.forEach((value, key) => {
        headers.set(key, value);
    });

    return headers;
}

function mergeOptions(defaults: CreateHttpClientDefaults, input: RequestOptions): NormalizedRequestOptions {
    const headers = mergeHeaders(defaults.headers, input.headers);

    return {
        ...defaults,
        ...input,
        headers,
        method: (input.method ?? defaults.method ?? 'GET') as HttpMethod,
        retry: normalizeRetry(input.retry ?? defaults.retry),
        hooks: mergeHooks(defaults.hooks, input.hooks),
        throwHttpErrors: input.throwHttpErrors ?? defaults.throwHttpErrors ?? true
    };
}

function appendSearchParams(url: URL, searchParams?: RequestOptions['searchParams']) {
    if (!searchParams) return;

    if (typeof searchParams === 'string') {
        const params = new URLSearchParams(searchParams);

        params.forEach((value, key) => {
            url.searchParams.append(key, value);
        });

        return;
    }

    if (searchParams instanceof URLSearchParams) {
        searchParams.forEach((value, key) => {
            url.searchParams.append(key, value);
        });

        return;
    }

    Object.entries(searchParams).forEach(([key, value]) => {
        if (value == null) return;

        if (Array.isArray(value)) {
            value.forEach((item) => {
                url.searchParams.append(key, String(item));
            });
            return;
        }

        url.searchParams.append(key, String(value));
    });
}

function buildUrl(input: string, options: NormalizedRequestOptions): string {
    const prefixUrl = options.prefixUrl ?? '';

    if (prefixUrl) {
        const base = new URL(prefixUrl.endsWith('/') ? prefixUrl : `${prefixUrl}/`);
        const url = new URL(input.replace(/^\/+/, ''), base);
        appendSearchParams(url, options.searchParams);
        return url.toString();
    }

    if (isAbsoluteUrl(input)) {
        const url = new URL(input);
        appendSearchParams(url, options.searchParams);
        return url.toString();
    }

    if (typeof window !== 'undefined' && window.location?.origin) {
        const url = new URL(input, window.location.origin);
        appendSearchParams(url, options.searchParams);
        return url.toString();
    }

    const pathname = input.startsWith('/') ? input : `/${input}`;
    const url = new URL(`http://localhost${pathname}`);
    appendSearchParams(url, options.searchParams);
    return url.toString();
}

async function delay(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

function isJsonLikeContentType(contentType: string): boolean {
    return contentType.includes('application/json') || contentType.includes('+json');
}

async function parseResponseAuto(response: Response, method: HttpMethod): Promise<unknown> {
    if (method === 'HEAD' || response.status === 204 || response.status === 205) {
        return null;
    }

    const contentLength = response.headers.get('content-length');
    if (contentLength === '0') {
        return null;
    }

    const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';

    if (isJsonLikeContentType(contentType)) {
        return await response.json();
    }

    if (contentType.includes('text/') || contentType.includes('application/xml') || contentType.includes('application/xhtml+xml')) {
        return await response.text();
    }

    return await response.blob();
}

function isMethodRetryable(method: HttpMethod, options: NormalizedRequestOptions): boolean {
    return options.retry.methods.includes(method);
}

function isStatusRetryable(status: number, options: NormalizedRequestOptions): boolean {
    return options.retry.statusCodes.includes(status);
}

function shouldRetry(error: HttpError, options: NormalizedRequestOptions, retryCount: number): boolean {
    if (retryCount >= options.retry.limit) return false;
    if (!isMethodRetryable(options.method, options)) return false;

    if (error.kind === 'abort') {
        return false;
    }

    if (error.kind === 'timeout') {
        return true;
    }

    if (error.kind === 'network') {
        return true;
    }

    if (error.kind === 'http') {
        const status = error.response?.status;
        return typeof status === 'number' && isStatusRetryable(status, options);
    }

    return false;
}

function parseRetryAfterMs(value: string | null): number | null {
    if (!value) return null;

    const seconds = Number(value);
    if (Number.isFinite(seconds) && seconds >= 0) {
        return seconds * 1000;
    }

    const timestamp = Date.parse(value);
    if (Number.isNaN(timestamp)) {
        return null;
    }

    const diff = timestamp - Date.now();
    return diff > 0 ? diff : 0;
}

function getRetryDelay(error: HttpError, options: NormalizedRequestOptions, retryCount: number): number {
    if (error.kind === 'http') {
        const retryAfterMs = parseRetryAfterMs(error.response?.headers.get('retry-after') ?? null);
        if (retryAfterMs != null) {
            return retryAfterMs;
        }
    }

    const { delay } = options.retry;
    return typeof delay === 'function' ? delay(retryCount, error) : delay;
}

async function runBeforeErrorHooks(error: HttpError): Promise<HttpError> {
    let currentError = error;

    for (const hook of error.options.hooks.beforeError) {
        const result = await hook(currentError);
        if (result instanceof HttpError) {
            currentError = result;
        }
    }

    return currentError;
}

export type HttpErrorKind = 'http' | 'network' | 'timeout' | 'abort';

export class HttpError<T = unknown> extends Error {
    override readonly name = 'HttpError';
    readonly kind: HttpErrorKind;
    readonly request: Request;
    readonly options: NormalizedRequestOptions;
    readonly response?: HttpResponse<T>;
    override readonly cause?: unknown;

    constructor(params: {
        kind: HttpErrorKind;
        message: string;
        request: Request;
        options: NormalizedRequestOptions;
        response?: HttpResponse<T>;
        cause?: unknown;
    }) {
        super(params.message, { cause: params.cause });
        this.kind = params.kind;
        this.request = params.request;
        this.options = params.options;
        this.response = params.response;
        this.cause = params.cause;
    }
}

class ResponsePromise<T = unknown> implements PromiseLike<HttpResponse<T>> {
    private readonly inner: Promise<HttpResponse<T>>;

    constructor(inner: Promise<HttpResponse<T>>) {
        this.inner = inner;
    }

    then<TResult1 = HttpResponse<T>, TResult2 = never>(
        onfulfilled?: ((value: HttpResponse<T>) => TResult1 | PromiseLike<TResult1>) | null,
        onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
    ): Promise<TResult1 | TResult2> {
        return this.inner.then(onfulfilled, onrejected);
    }

    catch<TResult = never>(onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null): Promise<HttpResponse<T> | TResult> {
        return this.inner.catch(onrejected);
    }

    finally(onfinally?: (() => void) | null): Promise<HttpResponse<T>> {
        return this.inner.finally(onfinally ?? undefined);
    }

    async json<R = T>(): Promise<R> {
        const result = await this.inner;
        return result.data as unknown as R;
    }

    async text(): Promise<string> {
        const result = await this.inner;
        if (typeof result.data === 'string') return result.data;
        return await result.response.clone().text();
    }

    async blob(): Promise<Blob> {
        const result = await this.inner;
        if (result.data instanceof Blob) return result.data;
        return await result.response.clone().blob();
    }

    async arrayBuffer(): Promise<ArrayBuffer> {
        const result = await this.inner;
        return await result.response.clone().arrayBuffer();
    }

    async formData(): Promise<FormData> {
        const result = await this.inner;
        return await result.response.clone().formData();
    }

    async raw(): Promise<Response> {
        const result = await this.inner;
        return result.response;
    }
}

async function runBeforeRequestHooks(request: Request, options: NormalizedRequestOptions): Promise<Request> {
    let currentRequest = request;

    for (const hook of options.hooks.beforeRequest) {
        const result = await hook(currentRequest, options);
        if (result instanceof Request) {
            currentRequest = result;
        }
    }

    return currentRequest;
}

async function runAfterResponseHooks(request: Request, options: NormalizedRequestOptions, response: Response): Promise<Response> {
    let currentResponse = response;

    for (const hook of options.hooks.afterResponse) {
        const result = await hook(request, options, currentResponse);
        if (result instanceof Response) {
            currentResponse = result;
        }
    }

    return currentResponse;
}

function prepareBody(options: NormalizedRequestOptions, headers: Headers): BodyInit | null | undefined {
    if (options.json !== undefined && options.body != null) {
        throw new TypeError('The `json` and `body` options are mutually exclusive');
    }

    if (options.json !== undefined) {
        if (!headers.has('content-type')) {
            headers.set('content-type', 'application/json');
        }
        return JSON.stringify(options.json);
    }

    if (options.body != null && isFormData(options.body)) {
        headers.delete('content-type');
    }

    return options.body;
}

function createTimeoutError(): DOMException | Error {
    if (typeof DOMException !== 'undefined') {
        return new DOMException('The operation timed out', TIMEOUT_ERROR_NAME);
    }

    const error = new Error('The operation timed out');
    error.name = TIMEOUT_ERROR_NAME;
    return error;
}

function isTimeoutReason(reason: unknown): boolean {
    if (reason instanceof DOMException) {
        return reason.name === TIMEOUT_ERROR_NAME;
    }

    if (reason instanceof Error) {
        return reason.name === TIMEOUT_ERROR_NAME;
    }

    return false;
}

function createAbortSignal(options: NormalizedRequestOptions): { signal?: AbortSignal; cleanup: () => void } {
    if (!options.timeout) {
        return {
            signal: options.signal as AbortSignal | undefined,
            cleanup: () => {}
        };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort(createTimeoutError());
    }, options.timeout);

    if (!options.signal) {
        return {
            signal: controller.signal,
            cleanup: () => clearTimeout(timeoutId)
        };
    }

    if (options.signal.aborted) {
        const reason = (options.signal as AbortSignal & { reason?: unknown }).reason;
        controller.abort(reason);
    }

    const abortHandler = () => {
        const reason = (options.signal as AbortSignal & { reason?: unknown }).reason;
        controller.abort(reason);
    };

    options.signal.addEventListener('abort', abortHandler, { once: true });

    return {
        signal: controller.signal,
        cleanup: () => {
            clearTimeout(timeoutId);
            options.signal?.removeEventListener('abort', abortHandler);
        }
    };
}

function toRequestInit(
    options: NormalizedRequestOptions,
    headers: Headers,
    body: BodyInit | null | undefined,
    signal?: AbortSignal
): RequestInit {
    const requestInit: RequestInit = {
        ...options,
        method: options.method,
        headers,
        body,
        signal
    };

    delete (requestInit as RequestOptions).json;
    delete (requestInit as RequestOptions).prefixUrl;
    delete (requestInit as RequestOptions).searchParams;
    delete (requestInit as RequestOptions).timeout;
    delete (requestInit as RequestOptions).retry;
    delete (requestInit as RequestOptions).hooks;
    delete (requestInit as RequestOptions).throwHttpErrors;

    return requestInit;
}

function createNetworkError(params: { request: Request; options: NormalizedRequestOptions; cause?: unknown }): HttpError {
    const cause = params.cause;

    if (isAbortError(cause)) {
        const reason = (cause as DOMException | Error | undefined) ?? cause;

        if (isTimeoutReason(reason)) {
            return new HttpError({
                kind: 'timeout',
                message: 'Request timed out',
                request: params.request,
                options: params.options,
                cause
            });
        }

        return new HttpError({
            kind: 'abort',
            message: 'Request was aborted',
            request: params.request,
            options: params.options,
            cause
        });
    }

    return new HttpError({
        kind: 'network',
        message: cause instanceof Error ? cause.message : 'Network request failed',
        request: params.request,
        options: params.options,
        cause
    });
}

async function makeRequest<T>(input: string, options: NormalizedRequestOptions): Promise<HttpResponse<T>> {
    const url = buildUrl(input, options);
    const headers = new Headers(options.headers);
    const body = prepareBody(options, headers);

    let baseRequest = new Request(url, toRequestInit(options, headers, body, undefined));
    baseRequest = await runBeforeRequestHooks(baseRequest, options);

    let retryCount = 0;

    while (true) {
        const { signal, cleanup } = createAbortSignal(options);

        try {
            const request = new Request(baseRequest, { signal });

            let response = await fetch(request);
            response = await runAfterResponseHooks(request, options, response);

            const parsed = await parseResponseAuto(response.clone(), options.method).catch(() => null);

            const result: HttpResponse<T> = {
                data: parsed as T,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                request,
                response
            };

            if (!response.ok) {
                const error = new HttpError<T>({
                    kind: 'http',
                    message: `Request failed with status ${response.status}`,
                    request,
                    options,
                    response: result
                });

                if (shouldRetry(error, options, retryCount)) {
                    retryCount += 1;
                    cleanup();
                    await delay(getRetryDelay(error, options, retryCount));
                    continue;
                }

                if (options.throwHttpErrors) {
                    throw await runBeforeErrorHooks(error);
                }
            }

            cleanup();
            return result;
        } catch (caught) {
            cleanup();

            if (caught instanceof HttpError) {
                throw caught;
            }

            const error = createNetworkError({
                request: baseRequest,
                options,
                cause: caught
            });

            if (shouldRetry(error, options, retryCount)) {
                retryCount += 1;
                await delay(getRetryDelay(error, options, retryCount));
                continue;
            }

            throw await runBeforeErrorHooks(error);
        }
    }
}

type HttpClient = {
    <T = unknown>(input: string, options?: RequestOptions): ResponsePromise<T>;
    get<T = unknown>(input: string, options?: Omit<RequestOptions, 'method'>): ResponsePromise<T>;
    post<T = unknown>(input: string, options?: Omit<RequestOptions, 'method'>): ResponsePromise<T>;
    put<T = unknown>(input: string, options?: Omit<RequestOptions, 'method'>): ResponsePromise<T>;
    patch<T = unknown>(input: string, options?: Omit<RequestOptions, 'method'>): ResponsePromise<T>;
    delete<T = unknown>(input: string, options?: Omit<RequestOptions, 'method'>): ResponsePromise<T>;
    head<T = unknown>(input: string, options?: Omit<RequestOptions, 'method'>): ResponsePromise<T>;
    create: (defaults?: CreateHttpClientDefaults) => HttpClient;
};

export function createHttpClient(defaults: CreateHttpClientDefaults = {}): HttpClient {
    const client = (<T = unknown>(input: string, options: RequestOptions = {}) => {
        const normalized = mergeOptions(defaults, options);
        return new ResponsePromise<T>(makeRequest<T>(input, normalized));
    }) as HttpClient;

    client.get = <T = unknown>(input: string, options: Omit<RequestOptions, 'method'> = {}) =>
        client<T>(input, { ...options, method: 'GET' });

    client.post = <T = unknown>(input: string, options: Omit<RequestOptions, 'method'> = {}) =>
        client<T>(input, { ...options, method: 'POST' });

    client.put = <T = unknown>(input: string, options: Omit<RequestOptions, 'method'> = {}) =>
        client<T>(input, { ...options, method: 'PUT' });

    client.patch = <T = unknown>(input: string, options: Omit<RequestOptions, 'method'> = {}) =>
        client<T>(input, { ...options, method: 'PATCH' });

    client.delete = <T = unknown>(input: string, options: Omit<RequestOptions, 'method'> = {}) =>
        client<T>(input, { ...options, method: 'DELETE' });

    client.head = <T = unknown>(input: string, options: Omit<RequestOptions, 'method'> = {}) =>
        client<T>(input, { ...options, method: 'HEAD' });

    client.create = (nextDefaults: CreateHttpClientDefaults = {}) =>
        createHttpClient({
            ...defaults,
            ...nextDefaults,
            headers: mergeHeaders(defaults.headers, nextDefaults.headers),
            hooks: mergeHooks(defaults.hooks, nextDefaults.hooks)
        });

    return client;
}
