/**
 * Verifica se um determinado valor é uma string real.
 */
export const isString = (value: unknown): value is string => value instanceof String || typeof value === 'string';
