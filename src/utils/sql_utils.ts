import { Buffer } from 'buffer';

export function size_of_attributes<T extends Record<string, unknown>>(
  attributes: T
): Record<string, number> {
  const size_of_attributes = Object.keys(attributes);

  let sizes: Record<string, number> = {};

  for (const key of size_of_attributes) {
    const value = attributes[key];

    if (typeof value === 'string') {
      const value_buffer = Buffer.from(value);

      sizes[key] = value_buffer.length;
    }

    if (typeof value === 'number') {
      sizes[key] = Int32Array.BYTES_PER_ELEMENT;
    }
  }

  return sizes;
}

export function serialize_row<T extends Record<string, unknown>>(row: T): string {
  return JSON.stringify(row);
}
