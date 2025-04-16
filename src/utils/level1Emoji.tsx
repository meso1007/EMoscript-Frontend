export function emoji1(code: string): number {
  const rightMoves = (code.match(/➡️/g) || []).length;
  const leftMoves = (code.match(/⬅️/g) || []).length;
  return rightMoves - leftMoves;
}