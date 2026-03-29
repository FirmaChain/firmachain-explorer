import { bech32 } from 'bech32';

/**
 * Util that converts a hex in to bech32
 * @param address address
 * @param prefix chain address prefix
 * @returns bech32
 */
export const hexToBech32 = (address: string, prefix: string) => {
    const normalized = address.startsWith('0x') ? address.slice(2) : address;
    const padded = normalized.length % 2 === 0 ? normalized : `0${normalized}`;
    const bytes = Uint8Array.from((padded.match(/.{1,2}/g) ?? []).map((byte) => parseInt(byte, 16)));
    return bech32.encode(prefix, bech32.toWords(bytes));
};
