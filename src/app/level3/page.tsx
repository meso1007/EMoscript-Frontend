"use client";

import { useState, useRef, useEffect } from "react";
import CanvasRabbit2 from "@/components/CanvasRabbit2";
import { emoji3 } from "../../utils/level3Emoji";
import SideBar from "@/components/SideBar";
import Image from "next/image";
import LoadingScreen from "@/components/LoadingScreen";
import { motion } from "framer-motion";

export default function Level3Page() {
  const [code, setCode] = useState("🐰");
  const [commands, setCommands] = useState<string[]>([]);
  const [resetting, setResetting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (commands.length > 0) {
      console.log("Canvas received commands:", commands);
    }
  }, [commands]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  const emojiButtons = ["🐰", "➡️", "⬅️", "🕐"];

  const handleEmojiClick = (emoji: string) => {
    setCode((prev) => prev + emoji);
  };

  const handleDrop = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const emoji = e.dataTransfer.getData("text/plain");
    const cursorPos = textareaRef.current?.selectionStart || 0;
    const newCode = code.slice(0, cursorPos) + emoji + code.slice(cursorPos);
    setCode(newCode);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

  const handleRun = () => {
    const result = emoji3(code);
    console.log("emoji3 result:", result);
    setCommands(result);
    setResetting(false);
  };

  const handleRetry = () => {
    setCommands([]);
    setCode("🐰");
    setResetting(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full bigContainer mt-7"
    >
      <div className="pl-42 text-4xl header flex items-center">
        <Image alt="logo" src="/logo.png" width={70} height={70} />
        <h1 className="sideHeader">EMo Script</h1>
      </div>
      <SideBar />
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-center header mb-4">
          Level 3: うさぎのひとやすみ, ゴールをめざそう！
        </h1>
        <p className="text-xl">ヒント:🕐で1秒間ひとやすみ!</p>

        <div className="flex justify-center items-center h-screen mt-5 ml-20 gap-10">
          <div className="h-full">
            <div className="flex gap-4 mb-4">
              {emojiButtons.map((emoji) => (
                <div
                  key={emoji}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", emoji)
                  }
                  onClick={() => handleEmojiClick(emoji)}
                  className="cursor-pointer text-3xl p-2 rounded-md border border-[#f1e42d] hover:bg-[#f1e42d]"
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
              onDragOver={handleDragOver}
              className="w-full max-w-lg min-h-[350px] p-4 text-4xl rounded-md border-4 border-[#f1e42d] focus:outline-none focus:ring-2 focus:ring-pink-300 mb-6"
              placeholder="🐰➡️➡️➡️🕐➡️➡️"
            />

            <div className="flex items-center gap-3">
              <button
                onClick={handleRun}
                className="bg-blue-500 oriWhite py-2 px-6 rounded-lg text-xl hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition duration-300 mb-6 cursor-pointer"
              >
                スタート
              </button>
              <button
                onClick={handleRetry}
                className="bg-red-500 oriWhite py-2 px-6 rounded-lg text-xl hover:bg-red-600 focus:ring-4 focus:ring-red-300 transition duration-300 mb-6 cursor-pointer"
              >
                リセット
              </button>
            </div>
          </div>

          <div className="h-full">
            <CanvasRabbit2 commands={commands} resetting={resetting} />
          </div>
        </div>
      </main>
    </motion.div>
  );
}
