"use client";

import { useEffect, useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // 追加
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // ローカル用のデフォルト値


  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); // ローディング開始

    try {
      const response = await fetch(
        `${apiUrl}api/accounts/password_reset/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) throw new Error("送信に失敗しました");

      setMessage("再設定用リンクをメールに送信しました。ご確認ください。");
    } catch (error) {
      console.log(error);
      setMessage("エラーが発生しました。メールアドレスを確認してください。");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <LoadingScreen />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/forgot.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-gray-100 border-3 border-yellow-500 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <button
          onClick={() => {
            router.back();
          }}
          className="absolute top-3 left-3 flex items-center hover:text-yellow-500 cursor-pointer duration-150"
        >
          <FaChevronLeft />
          <p>戻る</p>
        </button>
        <h3 className="flex justify-center items-center mb-6 text-4xl bg-yellow-100 rounded-full w-16 h-16 mx-auto">
          <TbLockPassword className="text-yellow-800" />
        </h3>

        <h2 className="text-2xl font-bold mb-6 text-center">
          パスワードをお忘れですか？
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          パスワード再設定用の案内をメールでお送りします。
        </p>

        <label className="block mb-2 font-semibold text-sm">
          メールアドレス
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="w-full cursor-pointer bg-yellow-500 text-white py-3 rounded-md font-semibold hover:bg-yellow-600 transition"
        >
          送信
        </button>
        {submitting && (
          <p className="text-center text-sm mt-4 text-yellow-600 animate-pulse">
            送信中です。しばらくお待ちください…
          </p>
        )}

        {message && (
          <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
        )}
      </form>
    </motion.div>
  );
}
