"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import SideBar from "@/components/SideBar";
import LoadingScreen from "@/components/LoadingScreen";
import { motion } from "framer-motion";
import { FaPenFancy } from "react-icons/fa";

export default function RegisterPage() {
  const [username, setUsername] = useState(""); // ユーザーネームを分離
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // ローカル用のデフォルト値


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setModalMessage("パスワードが一致しません");
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl}api/accounts/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        setModalMessage("登録に成功しました。");
        setIsModalOpen(true);
        router.push("/login");
      } else {
        const data = await response.json();
        console.error(data);
        setModalMessage("登録に失敗しました。");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(error);
      setModalMessage("エラーが発生しました。");
      setIsModalOpen(true);
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
    >
      <SideBar />
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="min-h-screen flex bg-gray-800">
        {/* 左側：画像 */}
        <div className="relative hidden md:block md:w-1/2 h-screen">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/register.jpg"
              alt="Register Illustration"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 右側：フォーム */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-200 p-10 border-3 rounded-md border-purple-600 shadow-lg w-full max-w-md"
          >
            <h3 className="flex justify-center items-center mb-4 text-4xl bg-purple-100 rounded-full w-16 h-16 mx-auto">
              <FaPenFancy className="text-purple-800" />
            </h3>
            <h2 className="text-3xl font-bold mb-8 text-center">
              サインアップ
            </h2>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold">
                ユーザーネーム
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-purple-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block mb-2 text-sm font-semibold">
                パスワード確認
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-purple-600 focus:outline-none rounded-md focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-600 transition cursor-pointer"
            >
              登録する
            </button>

            <p className="text-center text-sm mt-6">
              すでにアカウントをお持ちの方は{" "}
              <Link
                href="/login"
                className="text-purple-600 font-semibold hover:underline"
              >
                ログイン
              </Link>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
