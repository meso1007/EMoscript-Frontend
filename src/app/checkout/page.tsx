"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import SideBar from "@/components/SideBar";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
      if (typeof window !== "undefined") { // クライアントサイドでのみ実行
        const storedToken = localStorage.getItem("access_token");
        if (storedToken) {
          setToken(storedToken);
        }
      }
    }, []);
  return (
    <div className="h-screen rounded-lg shadow-2xl grid grid-cols-1 md:grid-cols-[3fr_4fr]">
      <SideBar />
      <div className="flex h-screen w-full flex-col justify-evenly p-8 bg-gradient-to-r from-blue-300 to-teal-400  px-10">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center w-12 opacity-65 bg-gray-400 text-white px-4 py-2 rounded-xl shadow-lg cursor-pointer hover:bg-gray-600 transition mb-6"
        >
          <IoArrowBackOutline />
        </button>

        <div className="">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            プレミアム会員になって、新ステージやストーリーゲームを始めよう！
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            最新アップデートにより、新しいステージが追加され、さらに魅力的なキャラクターが登場しました！ゲームプレイが一層楽しくなり、あなたの冒険が広がります。
          </p>

          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">新機能:</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li>新しいステージの実装</li>
              <li>新キャラクターの登場</li>
              <li>完全な広告ブロック機能</li>
            </ul>
          </div>

          <p className="text-lg text-gray-700">
            このアップデートは、お子様の安全も考慮しており、トラブルを未然に防ぐための強化された機能が含まれています。さらに、広告は完全にブロックされ、ゲームプレイの邪魔になることはありません。
          </p>

          <p className="text-lg text-gray-700 mt-4 font-semibold">
            料金はたった <span className="text-red-500 text-2xl">500円</span>
            で、生涯使い放題！追加料金なしで、今後のアップデートもすべてご利用いただけます。
          </p>
        </div>
      </div>

      {/* 右側のチェックアウトフォーム */}
      <div className="flex flex-col justify-center p-8 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          プレミアム機能の購入
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          プレミアム機能を500円で購入して、新しいステージやキャラクターをアンロック！安全でスムーズな決済を行い、より充実したゲーム体験をお楽しみください。
        </p>

        <div className="p-8 bg-white rounded-lg shadow-lg">
          <Elements stripe={stripePromise}>
            <CheckoutForm token={token} />
          </Elements>
        </div>
      </div>
    </div>
  );
}
