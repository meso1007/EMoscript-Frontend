export function emoji4(code: string): { rabbit: string[]; turtle: string[] } {
    const result = {
      rabbit: [] as string[],
      turtle: [] as string[],
    };
  
    let i = 0;
    while (i < code.length) {
      // なぜか🐰と🐢は２文字扱いなので、現在の2文字を取得
      const currentChar = code.slice(i, i + 2);

      // 🐰が現れたら
      if (currentChar === "🐰") {
        i += 2;  // 🐰は2文字なので2文字進める
        console.log("code.slice(i, i + 2):", code.slice(i, i + 2));

            while (i < code.length && (code.slice(i, i + 2) === "➡️" || code.slice(i, i + 2) === "⬅️" || code.slice(i, i + 2) === "🕐")) {
          const emoji = code.slice(i, i + 2);
          if (emoji === "➡️" || emoji === "⬅️" || emoji === "🕐") {
            result.rabbit.push(emoji);
            i += 2; // 2文字分進める
          }
        }
      }
      // 🐢が現れたら
      else if (currentChar === "🐢") {
        i += 2;  // 🐢は2文字なので2文字進める
        console.log("code.slice(i, i + 2):", code.slice(i, i + 2));
    
        while (i < code.length && (code.slice(i, i + 2) === "➡️" || code.slice(i, i + 2) === "⬅️" || code.slice(i, i + 2) === "🕐")) {
          const emoji = code.slice(i, i + 2);
          if (emoji === "➡️" || emoji === "⬅️" || emoji === "🕐") {
            result.turtle.push(emoji);
            i += 2;
          }
        }
      }
      // 他の絵文字や文字は無視
      else {
        console.log("Skipping:", currentChar);
        i++;
      }
    }
  
    return result;
  }
  