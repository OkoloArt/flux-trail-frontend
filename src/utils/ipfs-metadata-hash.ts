/**
 * Includes functions to convert between IPFS CID version 0 (Base58), and a 32 bytes hex string
 * TypeScript module.
 */

import bs58 from 'bs58';

function uint8ArrayToHex(uint8Array: Uint8Array) {
  return Array.from(uint8Array)
    .map((byte) => byte.toString(16).padStart(2, '0')) // Convert each byte to hex and pad if needed
    .join(''); // Join all hex values into a single string
}

/**
 * Converts IPFS CID version 0 (Base58) to a 32 bytes hex string and adds initial 0x.
 * @param cid - The 46 character long IPFS CID V0 string (starts with Qm).
 * @returns string
 */
export function convertIpfsCidV0ToByte32(cid: string) {
  return `0x${uint8ArrayToHex(bs58.decode(cid).slice(2))}`;
}

/**
 * Converts 32 byte hex string (initial 0x is removed) to Base58 IPFS content identifier version 0 address string (starts with Qm)
 * @param str - The 32 byte long hex string to encode to IPFS CID V0 (without initial 0x).
 * @returns string
 */
export function convertByte32ToIpfsCidV0(str: string) {
  if (str.indexOf('0x') === 0) {
    str = str.slice(2);
  }
  return bs58.encode(Buffer.from(`1220${str}`, 'hex'));
}
