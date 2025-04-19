"use client";

import { useState, useRef, useEffect } from "react";
import CanvasTurtle from "../../components/level1";
import { emoji1 } from "@/utils/level1Emoji";
import SideBar from "@/components/SideBar";
import Image from "next/image";
import LoadingScreen from "@/components/LoadingScreen";

export default function Level1Page() {
  const [code, setCode] = useState("🐢");
  const [moves, setMoves] = useState<number>(0);
  const [resetting, setResetting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(true);
  const emojiButtons = ["🐢", "➡️"];

  
  // ローディング処理
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <LoadingScreen />;

    // 絵文字ボタンをクリックしたときの処理
  const handleEmojiClick = (emoji: string) => {
    setCode((prev) => prev + emoji);
  };

  // テキストエリアに絵文字をドロップしたときの処理
  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const emoji = e.dataTransfer.getData("text/plain");
    const cursorPos = textareaRef.current?.selectionStart || 0;
    const newCode = code.slice(0, cursorPos) + emoji + code.slice(cursorPos);
    setCode(newCode);
  };

    // ドラッグオーバーイベントの処理
  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

    // 実行ボタンの処理
  const handleRun = () => {
    const result = emoji1(code);  //emoji1で絵文字を読む
    setMoves(result);
    setResetting(false);
  };
  
  // リセットボタンの処理
  const handleRetry = () => {
    setMoves(0);
    setCode("🐢");
    setResetting(true);
  };

  return (
    <>
      <div className="w-full min-h-screen bigContainer mt-7">
        <div className="pl-42 text-4xl header flex items-center">
          <Image alt="logo" src="/logo.png" width={70} height={70} />
          <h1 className="sideHeader">EMo Script</h1>
        </div>
        <SideBar />
        <main className="flex flex-col items-center justify-center ">
          <h1 className="flex justify-start items-center text-5xl font-bold text-center header mb-4">
            Level 1: かめでゴールまで走りぬけよう！
          </h1>
          <p className="text-xl">ヒント：かめは➡️で１マスすすむよ！</p>

          <div className="flex items-center h-screen mt-5 ml-20 gap-10">
            <div className="h-full">
              <div className="flex gap-4 mb-4">
                {emojiButtons.map((emoji) => (
                  <div
                    key={emoji}
                    draggable
                    onDragStart={(e) =>
                      e.dataTransfer.setData("text/plain", emoji) // ドラッグ開始時に絵文字データを設定
                    }
                    onClick={() => handleEmojiClick(emoji)}
                    className="cursor-pointer text-3xl p-2 rounded-md border border-blue-300 hover:bg-blue-200"
                  >
                    {emoji}
                  </div>
                ))}
              </div>

              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={3}
                onDrop={handleDrop}
                onDragOver={handleDragOver} //default処理を無効化
                className="w-full max-w-lg min-h-[350px] p-4 text-4xl rounded-md border-4 border-[#5F8B4C] focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
                placeholder="🐢➡️➡️"
              />

              <div className="flex items-center gap-3">
                <button
                  onClick={handleRun}
                  className="cursor-pointer bg-blue-500 oriWhite py-2 px-6 rounded-lg text-xl hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 mb-6"
                >
                  スタート
                </button>
                <button
                  onClick={handleRetry}
                  className="cursor-pointer bg-red-500 oriWhite py-2 px-6 rounded-lg text-xl hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 mb-6"
                >
                  リセット
                </button>
              </div>
            </div>

            <div className="h-full">
              <CanvasTurtle moves={moves} resetting={resetting} />  {/* キャンバス表示 */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
