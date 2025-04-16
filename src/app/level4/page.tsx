"use client";

import { useState, useRef, useEffect } from "react";
import { emoji4 } from "../../utils/level4Emoji";
import SideBar from "@/components/SideBar";
import Image from "next/image";
import LoadingScreen from "@/components/LoadingScreen";
import { motion } from "framer-motion";
import CanvasTurtleRabbit from "@/components/CanvasTurtleRabbit";

export default function Level4Page() {
  const [code, setCode] = useState("🐰\n🐢");
  const [commands, setCommands] = useState<{ rabbit: string[]; turtle: string[] }>({ rabbit: [], turtle: [] });
  const [resetting, setResetting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (commands.rabbit.length > 0 || commands.turtle.length > 0) {
      console.log("Canvas received commands:", commands);
    }
  }, [commands]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  const emojiButtons = ["🐰", "🐢", "➡️", "⬅️", "🕐"];

  const handleEmojiClick = (emoji: string) => {
    if (!textareaRef.current) return;
  
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
  
    const newCode = code.slice(0, start) + emoji + code.slice(end);
    setCode(newCode);
  
    // カーソルを絵文字の後に持ってくる
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    }, 0);
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
    const result = emoji4(code);
    setCommands(result);
    setResetting(false);
  };

  const handleRetry = () => {
    setCommands({ rabbit: [], turtle: [] });
    setCode("🐰\n🐢");
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
          Level 4: うさぎとカメを<strong className="text-green-600 ml-2">同時にゴールさせよう！</strong>
        </h1>
        <p className="text-xl text-center">
          🐰は２マス、🐢は１マス進むよ。ぴったりゴールをしよう！<br />
          <span className="text-yellow-600 font-bold">🕐でうさぎを休ませる</span>のがポイント！
        </p>

        <div className="flex items-center h-screen mt-5 ml-20 gap-10">
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
              rows={4}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="w-full max-w-lg min-h-[350px] p-4 text-4xl rounded-md border-4 border-[#f1e42d] focus:outline-none focus:ring-2 focus:ring-pink-300 mb-6"
              placeholder={`🐰\n🐢`}
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
            <CanvasTurtleRabbit commands={commands} resetting={resetting} />
          </div>
        </div>
      </main>
    </motion.div>
  );
}
