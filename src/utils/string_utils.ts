export function sscanf(sql: string, regex: RegExp) {
  const match = sql.match(regex);

  if (!match) {
    return null;
  }

  return match;
}
