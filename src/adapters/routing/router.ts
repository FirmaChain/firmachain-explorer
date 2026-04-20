export {};

// import i18n from '@/i18n';
// import { useLocation, useNavigate, useParams } from 'react-router';

// type QueryPrimitive = string | number | boolean | null | undefined;
// type QueryValue = QueryPrimitive | QueryPrimitive[];

// type UrlObject = {
//     pathname?: string;
//     query?: Record<string, QueryValue>;
// };

// type NavigateOptions = {
//     replace?: boolean;
// };

// const isExternal = (url: string) => /^https?:\/\//.test(url);

// const appendSearchParams = (searchParams: URLSearchParams, key: string, value: QueryValue) => {
//     if (value === undefined || value === null) return;

//     if (Array.isArray(value)) {
//         value.forEach((item) => {
//             if (item !== undefined && item !== null) {
//                 searchParams.append(key, String(item));
//             }
//         });
//         return;
//     }

//     searchParams.append(key, String(value));
// };

// const buildPath = (pathname: string, query?: Record<string, QueryValue>) => {
//     if (!query) return pathname;

//     let path = pathname;
//     const remainingEntries = new Map(Object.entries(query));

//     Object.entries(query).forEach(([key, value]) => {
//         const token = `[${key}]`;

//         if (!path.includes(token)) return;
//         if (value === undefined || value === null || Array.isArray(value)) return;

//         path = path.replace(token, encodeURIComponent(String(value)));
//         remainingEntries.delete(key);
//     });

//     const searchParams = new URLSearchParams();

//     remainingEntries.forEach((value, key) => {
//         appendSearchParams(searchParams, key, value);
//     });

//     const search = searchParams.toString();
//     return search ? `${path}?${search}` : path;
// };

// const toHref = (url: string | UrlObject) => {
//     if (typeof url === 'string') return url;
//     return buildPath(url.pathname || '/', url.query);
// };

// const parseSearchParams = (search: string) => {
//     const params = new URLSearchParams(search);
//     const result: Record<string, string | string[]> = {};

//     params.forEach((value, key) => {
//         const current = result[key];

//         if (current === undefined) {
//             result[key] = value;
//             return;
//         }

//         if (Array.isArray(current)) {
//             result[key] = [...current, value];
//             return;
//         }

//         result[key] = [current, value];
//     });

//     return result;
// };

// export const useRouter = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const params = useParams<Record<string, string | undefined>>();
//     const searchParams = parseSearchParams(location.search);

//     const push = (url: string | UrlObject, _as?: string, _options?: NavigateOptions) => {
//         const href = toHref(url);

//         if (isExternal(href)) {
//             window.location.assign(href);
//             return;
//         }

//         navigate(href);
//     };

//     const replace = (url: string | UrlObject, _as?: string, _options?: NavigateOptions) => {
//         const href = toHref(url);

//         if (isExternal(href)) {
//             window.location.replace(href);
//             return;
//         }

//         navigate(href, { replace: true });
//     };

//     return {
//         push,
//         replace,

//         // Compatibility field for legacy Next-style usage
//         query: {
//             ...searchParams,
//             ...params
//         },

//         // Explicit fields for safer usage
//         params,
//         searchParams,

//         pathname: location.pathname,
//         asPath: `${location.pathname}${location.search}`
//     };
// };
