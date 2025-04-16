"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SideBar from "./SideBar";
import { useRouter } from "next/navigation";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

type Props = {
  moves: number;
  resetting: boolean;
};

export default function CanvasRabbit({ moves, resetting }: Props) {
  const cellSize = 50;
  const stepSize = cellSize * 2;
  const [position, setPosition] = useState(0);
  const [goalReached, setGoalReached] = useState(false);
  const goalPosition = 550;
  const router = useRouter();
  const moveNextLevel = () => {
    router.push("/level3");
  };

  useEffect(() => {
    if (resetting) {
      setPosition(0);
      setGoalReached(false);
      return;
    }
    if (typeof moves !== "number" || moves < 0) return;
    const targetPos = moves * stepSize;
    let currentPos = position;

    const moveRabbit = () => {
      if (currentPos < targetPos) {
        currentPos += 4;
        if (currentPos > targetPos) currentPos = targetPos;
        setPosition(currentPos);
      } else if (currentPos > targetPos) {
        currentPos -= 4;
        if (currentPos < targetPos) currentPos = targetPos;
        setPosition(currentPos);
      }

      if (
        currentPos === targetPos &&
        currentPos >= goalPosition &&
        !goalReached
      ) {
        setGoalReached(true);
      }
    };
    const interval = setInterval(moveRabbit, 10);
    return () => clearInterval(interval);
  }, [moves, goalReached, resetting]);

  return (
    <div className="mt-18 relative w-[600px] h-[350px] border-4 border-[#f1e42d] rounded-lg shadow-lg overflow-hidden mb-6">
      {Array.from({ length: goalPosition / cellSize + 1 }).map((_, i) => {
        const left = i * cellSize;
        const isCurrent = Math.round(position / cellSize) === i;

        return (
          <div
            key={i}
            className={`absolute top-0 bottom-0 ${
              isCurrent
                ? "border-r-4 border-r-pink-400"
                : "border-l border-gray-300"
            }`}
            style={{ left: `${left}px` }}
          >
            <div className="text-xs text-gray-500 absolute bottom-0 left-1">
              {i}
            </div>
          </div>
        );
      })}
      <div
        className="absolute top-1/2 left-[-50px] transform -translate-y-1/2 transition-transform duration-100 ease-in-out"
        style={{ transform: `translateX(${position}px)` }}
      >
        <Player
          autoplay
          loop
          src="/anime/rabbit.json"
          style={{ height: "200px", width: "200px" }}
        />
      </div>
      <Player
        autoplay
        loop
        src="/anime/goal.json"
        style={{
          height: "100px",
          width: "100px",
          left: `${goalPosition - 30}px`,
        }}
        className="absolute top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full"
      />

      {/* ゴール時の処理 */}
      {goalReached && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-900/80">
          <SideBar />
          <div className="bgOriWhite p-6 rounded-lg shadow-lg text-center max-w-md w-full">
            <h2 className="text-2xl font-bold mb-2">
              🎊 ゴール！ウサギが走りきった！ 🎊
            </h2>
            <p className="mb-4">やったね！ ウサギもゴールに到達しました。</p>
            <div
              className="absolute top-1/2 left-2/3 transform -translate-y-1/2 transition-transform duration-100 ease-in-out"
              style={{ transform: `translateX(${position}px)` }}
            >
              <Player
                autoplay
                loop
                src="/anime/star.json"
                style={{ height: "300px", width: "300px" }}
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="bg-cyan-500 oriWhite px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
                onClick={() => window.location.reload()}
              >
                再挑戦
              </button>
              <button
                className="bg-green-500 oriWhite px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
                onClick={moveNextLevel}
              >
                次のレベルへ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
