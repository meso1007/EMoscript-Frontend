"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SideBar from "@/components/SideBar";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import Modal from "@/components/Modal";
import { motion } from "framer-motion";
import { FaPersonShelter } from "react-icons/fa6";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";  // ローカル用のデフォルト値
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
const response = await fetch(`${apiUrl}api/accounts/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      if (!response.ok) {
        // 403（ロック）専用の処理
        if (response.status === 403) {
          const errorData = await response.json();
          setModalMessage(errorData.message || "このユーザーはロックされています");
          setIsModalOpen(true);
          return;
        }
  
        // その他のエラー
        throw new Error("ログインに失敗しました");
      }
  
      const data = await response.json();
      console.log("ログイン成功:", data);
  
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
  
      const user = { username: data.username };
      localStorage.setItem("user", JSON.stringify(user));
  
      if (data.is_staff === true) {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    } catch (error) {
      console.error("ログインエラー:", error);
      setModalMessage("ログインに失敗しました。メールアドレスかパスワードを確認してください。");
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
      className="relative"
    >
      <SideBar />
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="min-h-screen flex">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 border-3 rounded-lg border-cyan-500 shadow-lg w-full max-w-md"
          >
            <h3 className="flex justify-center items-center mb-4 text-4xl bg-cyan-100 rounded-full w-16 h-16 mx-auto">
              <FaPersonShelter className="text-cyan-800" />
            </h3>
            <h2 className="text-3xl font-bold mb-8 text-center">ログイン</h2>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-semibold">
                ユーザーネーム
              </label>
              <input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block mb-2 text-sm font-semibold">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 rounded-md text-white py-3 font-semibold hover:bg-cyan-600 duration-150 transition cursor-pointer"
            >
              ログイン
            </button>

            <p className="text-center text-sm mt-6">
              アカウントを持っていない方は
              <Link
                href="/register"
                className="text-cyan-500 mx-1 font-semibold hover:underline"
              >
                サインイン
              </Link>
            </p>
            <p className="text-center text-sm mt-4">
              パスワードをお忘れですか？
              <Link
                href="/forgot-password"
                className="text-cyan-500 mx-1 font-semibold hover:underline"
              >
                再設定はこちら
              </Link>
            </p>
          </form>
        </div>

        <div className="relative hidden md:block md:w-1/2 h-screen">
          <Image
            src="/login.jpg"
            alt="Login Illustration"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}
