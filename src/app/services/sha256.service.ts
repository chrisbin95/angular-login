// src/app/services/sha256.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Sha256Service {

  constructor() { }

  /**
   * Hashes the input string using SHA-256 via the Web Crypto API.
   * @param input The string to hash (e.g., a plaintext password).
   * @returns A promise that resolves to the hexadecimal SHA-256 hash.
   */
  async hashString(input: string): Promise<string> {
    const textEncoder = new TextEncoder();
    const data = textEncoder.encode(input);
    // Use window.crypto.subtle for better compatibility context if needed
    const hashBuffer = await crypto.subtle.digest('SHA-256', data); 
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // Converts the byte array to a hexadecimal string
    const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hexHash;
  }
}