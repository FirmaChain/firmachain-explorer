export type ColorType = 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

export type HexString = `#${string}`;
export type RgbString = `rgb(${string})`;
export type RgbaString = `rgba(${string})`;
export type HslString = `hsl(${string})`;
export type HslaString = `hsla(${string})`;

export type ColorStringMap = {
    hex: HexString;
    hexa: HexString;
    rgb: RgbString;
    rgba: RgbaString;
    hsl: HslString;
    hsla: HslaString;
};

export type RgbaColor = Readonly<{
    r: number;
    g: number;
    b: number;
    a: number;
}>;

type HslColor = Readonly<{
    h: number;
    s: number;
    l: number;
    a: number;
}>;

const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const RGB_FUNC_RE = /^rgba?\((.*)\)$/i;
const HSL_FUNC_RE = /^hsla?\((.*)\)$/i;

type AlphaCapableTypeMap = {
    hex: 'hexa';
    hexa: 'hexa';
    rgb: 'rgba';
    rgba: 'rgba';
    hsl: 'hsla';
    hsla: 'hsla';
};

type AlphaDefaultOutput<T extends ColorType> = AlphaCapableTypeMap[T];

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function round(value: number, digits = 4): number {
    const factor = 10 ** digits;
    return Math.round(value * factor) / factor;
}

function normalizeByte(value: number): number {
    return clamp(Math.round(value), 0, 255);
}

function normalizeUnit(value: number): number {
    return round(clamp(value, 0, 1), 4);
}

function expandHex(hex: string): string {
    const raw = hex.trim().replace(/^#/, '');

    if (raw.length === 3 || raw.length === 4) {
        return raw
            .split('')
            .map((char) => char + char)
            .join('');
    }

    return raw;
}

function splitCssArgs(content: string): {
    channels: string[];
    alpha?: string;
} {
    const normalized = content.trim();

    if (normalized.includes('/')) {
        const [beforeSlash, afterSlash] = normalized.split('/').map((part) => part.trim());

        if (!beforeSlash || !afterSlash) {
            throw new Error(`Invalid CSS color function: ${content}`);
        }

        const channels = beforeSlash.includes(',')
            ? beforeSlash
                  .split(',')
                  .map((part) => part.trim())
                  .filter(Boolean)
            : beforeSlash
                  .split(/\s+/)
                  .map((part) => part.trim())
                  .filter(Boolean);

        return {
            channels,
            alpha: afterSlash
        };
    }

    const channels = normalized.includes(',')
        ? normalized
              .split(',')
              .map((part) => part.trim())
              .filter(Boolean)
        : normalized
              .split(/\s+/)
              .map((part) => part.trim())
              .filter(Boolean);

    return { channels };
}

function parseAlpha(value: string | undefined): number {
    if (value == null) return 1;

    const trimmed = value.trim();

    if (trimmed.endsWith('%')) {
        return normalizeUnit(parseFloat(trimmed) / 100);
    }

    return normalizeUnit(Number(trimmed));
}

function parseRgbChannel(value: string): number {
    const trimmed = value.trim();

    if (trimmed.endsWith('%')) {
        const percent = clamp(parseFloat(trimmed), 0, 100);
        return normalizeByte((percent / 100) * 255);
    }

    return normalizeByte(Number(trimmed));
}

function parseHue(value: string): number {
    const trimmed = value.trim().toLowerCase();

    if (trimmed.endsWith('deg')) {
        return Number.parseFloat(trimmed.slice(0, -3));
    }

    if (trimmed.endsWith('turn')) {
        return Number.parseFloat(trimmed.slice(0, -4)) * 360;
    }

    if (trimmed.endsWith('rad')) {
        return (Number.parseFloat(trimmed.slice(0, -3)) * 180) / Math.PI;
    }

    return Number.parseFloat(trimmed);
}

function parsePercentageUnit(value: string): number {
    const trimmed = value.trim();

    if (!trimmed.endsWith('%')) {
        throw new Error(`Expected percentage value, received: ${value}`);
    }

    return normalizeUnit(parseFloat(trimmed) / 100);
}

function hueToUnit(hue: number): number {
    const normalized = hue % 360;
    return normalized < 0 ? normalized + 360 : normalized;
}

function hslToRgb(h: number, s: number, l: number): Omit<RgbaColor, 'a'> {
    const hue = hueToUnit(h);
    const sat = clamp(s, 0, 1);
    const light = clamp(l, 0, 1);

    const c = (1 - Math.abs(2 * light - 1)) * sat;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = light - c / 2;

    let r1 = 0;
    let g1 = 0;
    let b1 = 0;

    if (hue < 60) [r1, g1, b1] = [c, x, 0];
    else if (hue < 120) [r1, g1, b1] = [x, c, 0];
    else if (hue < 180) [r1, g1, b1] = [0, c, x];
    else if (hue < 240) [r1, g1, b1] = [0, x, c];
    else if (hue < 300) [r1, g1, b1] = [x, 0, c];
    else [r1, g1, b1] = [c, 0, x];

    return {
        r: normalizeByte((r1 + m) * 255),
        g: normalizeByte((g1 + m) * 255),
        b: normalizeByte((b1 + m) * 255)
    };
}

function rgbToHsl(r: number, g: number, b: number): Omit<HslColor, 'a'> {
    const rn = normalizeByte(r) / 255;
    const gn = normalizeByte(g) / 255;
    const bn = normalizeByte(b) / 255;

    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const delta = max - min;

    let h = 0;

    if (delta !== 0) {
        if (max === rn) {
            h = ((gn - bn) / delta) % 6;
        } else if (max === gn) {
            h = (bn - rn) / delta + 2;
        } else {
            h = (rn - gn) / delta + 4;
        }
    }

    h = round(h * 60, 2);
    if (h < 0) h += 360;

    const l = (max + min) / 2;
    const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    return {
        h,
        s: round(s * 100, 2),
        l: round(l * 100, 2)
    };
}

export function detectColorType(input: string): ColorType {
    const value = input.trim();

    if (HEX_RE.test(value)) {
        const raw = value.replace(/^#/, '');
        if (raw.length === 3 || raw.length === 6) return 'hex';
        return 'hexa';
    }

    if (/^rgba\s*\(/i.test(value)) return 'rgba';
    if (/^rgb\s*\(/i.test(value)) return 'rgb';
    if (/^hsla\s*\(/i.test(value)) return 'hsla';
    if (/^hsl\s*\(/i.test(value)) return 'hsl';

    throw new Error(`Unsupported color format: ${input}`);
}

function parseHex(input: string): RgbaColor {
    const value = input.trim();

    if (!HEX_RE.test(value)) {
        throw new Error(`Invalid HEX color: ${input}`);
    }

    const hex = expandHex(value);

    if (hex.length !== 6 && hex.length !== 8) {
        throw new Error(`Invalid HEX color length: ${input}`);
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;

    return {
        r,
        g,
        b,
        a: normalizeUnit(a)
    };
}

function parseRgbLike(input: string): RgbaColor {
    const match = input.trim().match(RGB_FUNC_RE);

    if (!match) {
        throw new Error(`Invalid RGB(A) color: ${input}`);
    }

    const { channels, alpha } = splitCssArgs(match[1]);

    if (channels.length !== 3) {
        throw new Error(`RGB color requires exactly 3 channels: ${input}`);
    }

    const [r, g, b] = channels.map(parseRgbChannel);

    return {
        r,
        g,
        b,
        a: parseAlpha(alpha)
    };
}

function parseHslLike(input: string): RgbaColor {
    const match = input.trim().match(HSL_FUNC_RE);

    if (!match) {
        throw new Error(`Invalid HSL(A) color: ${input}`);
    }

    const { channels, alpha } = splitCssArgs(match[1]);

    if (channels.length !== 3) {
        throw new Error(`HSL color requires exactly 3 channels: ${input}`);
    }

    const h = parseHue(channels[0]);
    const s = parsePercentageUnit(channels[1]);
    const l = parsePercentageUnit(channels[2]);

    const rgb = hslToRgb(h, s, l);

    return {
        ...rgb,
        a: parseAlpha(alpha)
    };
}

export function parseColor(input: string): RgbaColor {
    const type = detectColorType(input);

    switch (type) {
        case 'hex':
        case 'hexa':
            return parseHex(input);
        case 'rgb':
        case 'rgba':
            return parseRgbLike(input);
        case 'hsl':
        case 'hsla':
            return parseHslLike(input);
        default: {
            const exhaustive: never = type;
            throw new Error(`Unsupported color format: ${exhaustive}`);
        }
    }
}

function toHex({ r, g, b, a }: RgbaColor, withAlpha: boolean): HexString {
    const base = [r, g, b].map((value) => normalizeByte(value).toString(16).padStart(2, '0')).join('');

    if (!withAlpha) {
        return `#${base}` as HexString;
    }

    const alphaHex = normalizeByte(normalizeUnit(a) * 255)
        .toString(16)
        .padStart(2, '0');

    return `#${base}${alphaHex}` as HexString;
}

function toRgbString({ r, g, b, a }: RgbaColor, withAlpha: boolean): RgbString | RgbaString {
    const rr = normalizeByte(r);
    const gg = normalizeByte(g);
    const bb = normalizeByte(b);
    const aa = normalizeUnit(a);

    if (!withAlpha) {
        return `rgb(${rr}, ${gg}, ${bb})` as RgbString;
    }

    return `rgba(${rr}, ${gg}, ${bb}, ${aa})` as RgbaString;
}

function toHslString({ r, g, b, a }: RgbaColor, withAlpha: boolean): HslString | HslaString {
    const { h, s, l } = rgbToHsl(r, g, b);
    const aa = normalizeUnit(a);

    if (!withAlpha) {
        return `hsl(${h}, ${s}%, ${l}%)` as HslString;
    }

    return `hsla(${h}, ${s}%, ${l}%, ${aa})` as HslaString;
}

export function formatColor<T extends ColorType>(color: RgbaColor, targetType: T): ColorStringMap[T] {
    const normalized: RgbaColor = {
        r: normalizeByte(color.r),
        g: normalizeByte(color.g),
        b: normalizeByte(color.b),
        a: normalizeUnit(color.a)
    };

    switch (targetType) {
        case 'hex':
            return toHex(normalized, false) as ColorStringMap[T];
        case 'hexa':
            return toHex(normalized, true) as ColorStringMap[T];
        case 'rgb':
            return toRgbString(normalized, false) as ColorStringMap[T];
        case 'rgba':
            return toRgbString(normalized, true) as ColorStringMap[T];
        case 'hsl':
            return toHslString(normalized, false) as ColorStringMap[T];
        case 'hsla':
            return toHslString(normalized, true) as ColorStringMap[T];
        default: {
            const exhaustive: never = targetType;
            throw new Error(`Unsupported output type: ${exhaustive}`);
        }
    }
}

export function convertColor<T extends ColorType>(input: string, targetType: T): ColorStringMap[T] {
    const rgba = parseColor(input);
    return formatColor(rgba, targetType);
}

function getAlphaCapableType<T extends ColorType>(type: T): AlphaDefaultOutput<T> {
    switch (type) {
        case 'hex':
            return 'hexa' as AlphaDefaultOutput<T>;
        case 'hexa':
            return 'hexa' as AlphaDefaultOutput<T>;
        case 'rgb':
            return 'rgba' as AlphaDefaultOutput<T>;
        case 'rgba':
            return 'rgba' as AlphaDefaultOutput<T>;
        case 'hsl':
            return 'hsla' as AlphaDefaultOutput<T>;
        case 'hsla':
            return 'hsla' as AlphaDefaultOutput<T>;
        default: {
            const exhaustive: never = type;
            throw new Error(`Unsupported source type: ${exhaustive}`);
        }
    }
}

export function setAlpha<T extends ColorType, U extends ColorType>(input: string, alpha: number, targetType: U): ColorStringMap[U];

export function setAlpha<T extends ColorType>(input: string, alpha: number): ColorStringMap[AlphaDefaultOutput<T>];

export function setAlpha(input: string, alpha: number, targetType?: ColorType): string {
    const sourceType = detectColorType(input);
    const rgba = parseColor(input);

    const next: RgbaColor = {
        ...rgba,
        a: normalizeUnit(alpha)
    };

    if (targetType) {
        return formatColor(next, targetType);
    }

    return formatColor(next, getAlphaCapableType(sourceType));
}

export function lighten<T extends ColorType, U extends ColorType>(input: string, amount: number, targetType: U): ColorStringMap[U];

export function lighten<T extends ColorType>(input: string, amount: number): ColorStringMap[T];

export function lighten(input: string, amount: number, targetType?: ColorType): string {
    const sourceType = detectColorType(input);
    const rgba = parseColor(input);

    // Convert RGB → HSL
    const { h, s, l } = rgbToHsl(rgba.r, rgba.g, rgba.b);

    // Clamp amount between 0 and 1
    const t = clamp(amount, 0, 1);

    // Increase lightness toward white (100%)
    // L = L + (100 - L) * t
    const nextL = l + (100 - l) * t;

    // Convert back HSL → RGB
    const rgb = hslToRgb(h, s / 100, nextL / 100);

    const next: RgbaColor = {
        ...rgb,
        a: rgba.a // Preserve original alpha
    };

    // If targetType is provided, convert to that format
    if (targetType) {
        return formatColor(next, targetType);
    }

    // Otherwise, preserve original color format
    return formatColor(next, sourceType);
}
