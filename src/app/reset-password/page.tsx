"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TbLockPassword } from "react-icons/tb";
import { FaChevronLeft } from "react-icons/fa";
import LoadingScreen from "@/components/LoadingScreen";
import { motion } from "framer-motion";
import Modal from "@/components/Modal";

import { Suspense } from "react"; // Suspenseをインポート

// 他のインポートはそのままで

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}

const ResetPasswordContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/"; // ローカル用のデフォルト値


  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setModalMessage("トークンが無効です。")
      setIsModalOpen(true);
      return;
    }
    if (newPassword.length < 6) {
      setModalMessage("パスワードは6文字以上にしてください")
      setIsModalOpen(true);
      return;
    }

    setSubmitting(true);
    setModalMessage("");

    try {
      const res = await fetch(`${apiUrl}api/accounts/password_reset/confirm/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, new_password: newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setModalMessage("パスワードが変更されました。ログイン画面に戻ります。")
        setIsModalOpen(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push("/login");
      } else {
        setModalMessage(data.message || "エラーが発生しました")
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error(err);
      setModalMessage(
        "通信エラーが発生しました.しばらくしてから再度お試しください。"
      );
      setIsModalOpen(true);
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

      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
      <form
        onSubmit={handleReset}
        className="relative z-10 bg-gray-100 border-3 border-yellow-500 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <button
          onClick={() => {
            router.back();
          }}
          type="button"
          className="absolute top-3 left-3 flex items-center hover:text-yellow-500 cursor-pointer duration-150"
        >
          <FaChevronLeft />
          <p className="ml-1">戻る</p>
        </button>

        <h3 className="flex justify-center items-center mb-6 text-4xl bg-yellow-100 rounded-full w-16 h-16 mx-auto">
          <TbLockPassword className="text-yellow-800" />
        </h3>

        <h2 className="text-2xl font-bold mb-6 text-center">
          新しいパスワードを設定
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          新しいパスワードを入力してください。
        </p>

        <label className="block mb-2 font-semibold text-sm">
          新しいパスワード
        </label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full px-4 py-3 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="w-full cursor-pointer bg-yellow-500 text-white py-3 rounded-md font-semibold hover:bg-yellow-600 transition"
          disabled={submitting}
        >
          {submitting ? "送信中..." : "パスワードを変更する"}
        </button>
      </form>
    </motion.div>
  );
};
