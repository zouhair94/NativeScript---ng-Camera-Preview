import { root } from '../util/root';

/** Symbol.observable addition */
/* Note: This will add Symbol.observable globally for all TypeScript users,
  however, we are no longer polyfilling Symbol.observable */
declare global {
  interface SymbolConstructor {
    observable: symbol;
  }
}

/** Symbol.observable or a string "@@observable". Used for interop */
export const observable = typeof Symbol === 'function' && Symbol.observable || '@@observable';
