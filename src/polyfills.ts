/**
 * Browser Polyfills for Tezos dApp
 * 
 * This file provides necessary polyfills for Node.js modules that are used by Taquito
 * but not available in the browser environment. These polyfills are required for
 * cryptographic operations and buffer handling.
 * 
 * The Buffer polyfill is especially important for Tezos operations like signing
 * transactions and handling binary data.
 */

import { Buffer } from 'buffer';

// Make Buffer available globally for Taquito and other crypto libraries
(globalThis as Record<string, unknown>).Buffer = Buffer;
