import { v4 as UUIDV4 } from "uuid";

/**
 * Realiza a criação de um UUID aleatório.
 */
export function uuid(): string {
  return UUIDV4();
}
