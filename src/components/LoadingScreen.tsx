"use client";
import dynamic from "next/dynamic";

// この形じゃないとエラーが出る。SSR無効で読み込み！
const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then(mod => mod.Player),
  { ssr: false }
);

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white opacity-80">
      <LottiePlayer
        autoplay
        loop
        src="/anime/loading3.json"
        style={{ height: "600px", width: "600px" }}
      />
    </div>
  );
}
