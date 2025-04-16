export function emoji3(code: string): string[] {
  const commands: string[] = [];

  let i = 0;
  while (i < code.length) {
    const currentChar = code[i];
    if (currentChar === "🐰") {
      commands.push("🐰");
      i++;
    }
    else if (code.slice(i, i + 2) === "➡️") {
      commands.push("➡️");
      i += 2;
    }
    else if (code.slice(i, i + 2) === "⬅️") {
      commands.push("⬅️");
      i += 2;
    }
    else if (code.slice(i, i + 2) === "🕐") {
      commands.push("🕐");
      i += 2;
    }
    else {
      i++;
    }
  }

  return commands;
}
