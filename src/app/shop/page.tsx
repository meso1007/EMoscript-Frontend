"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function ShopPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // useRouterをフックとして使う

  // ローディング処理
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const Player = dynamic(
    () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
    { ssr: false }
  );

  if (loading) return <LoadingScreen />;

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="absolute top-10 left-10 transition-transform duration-100 ease-in-out">
          <Player
            autoplay
            loop
            src="/anime/coming.json"
            style={{ height: "300px", width: "300px" }}
          />
        </div>
        <h1 className="text-4xl inline-block font-bold text-gray-800 mb-4">
          近日公開
        </h1>
        <p className="text-xl text-gray-600">
          現在、このページは準備中です。もう少しお待ちください。
        </p>
        <p className="mt-4 text-lg text-gray-500">
          ご利用いただけるようになった際に、すぐにお知らせいたします。
        </p>

        <div className="my-10">
          <h2 className="text-3xl font-bold text-gray-800">今後の予定</h2>
          <p className="mt-4 text-xl text-gray-600">
            新しい有料プランとステージが追加される予定です。以下のような機能を予定しています：
          </p>
          <ul className="mt-4 space-y-2 pl-6 text-lg text-gray-800 font-bold list-none">
            <li className="bg-yellow-200 rounded-2xl">
              有料プラン：追加の特典やカスタマイズ可能なオプション
            </li>
            <li className="bg-yellow-200 rounded-2xl">
              新しいステージ：さらに挑戦的なステージでプレイを楽しめます
            </li>
            <li className="bg-yellow-200 rounded-2xl">
              プラチナ会員専用コンテンツ：特別なチャレンジや報酬
            </li>
          </ul>
          <p className="mt-6 text-lg text-gray-500">
            今後のアップデートについては、製作者の個人Blogでお知らせします。ご期待ください!
          </p>
          <p className="mt-6 text-lg text-gray-500">
            ご質問やご不明点は下記のメールまでお問い合わせください。
          </p>
        </div>

        <div className="flex justify-center items-center">
          <div className="inline-block px-3">
            <Link
              href="https://next-notion-blog-web-app.vercel.app/"
              className="w-full px-5 py-3 rounded-2xl bg-[#c3f1f8] text-2xl flex items-center justify-center"
            >
              <p>Blogはこちらから</p>
              <FaArrowRight />
            </Link>
          </div>
          <div className="">
            <Link
              href="mailto:diegoshoya2017@gmail.com"
              className="w-full px-5 py-3 rounded-2xl bg-[#f8d6c3] text-2xl flex items-center justify-center"
            >
              <p>Mailはこちらから</p>
              <FaArrowRight />
            </Link>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className="mt-6">
          <button
            onClick={handleBackClick}
            className="cursor-pointer bg-[#28b8fb] text-white py-2 px-6 rounded-lg text-xl hover:bg-[#1898d3] focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  );
}
