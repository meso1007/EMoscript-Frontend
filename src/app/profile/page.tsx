"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUserEdit, FaSave } from "react-icons/fa";
import LoadingScreen from "@/components/LoadingScreen";
import SideBar from "@/components/SideBar";
import Modal from "@/components/Modal";
import { motion } from "framer-motion";
import { fetchWithAuth } from "../lib/fetchWithAuth";
import { PiCrownFill } from "react-icons/pi";
import { GiMoebiusTriangle } from "react-icons/gi";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // 編集モードを管理する
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // user の型を修正
  const [user, setUser] = useState<{
    username: string;
    email: string;
    age: number | null;
    bio: string;
    image: string | File;
    is_premium: boolean;
    is_staff: boolean;
  }>({
    username: "サリー",
    email: "sally@example.com",
    age: null,
    bio: "海の近くでコーヒーを楽しむのが好きなWebエンジニアです。",
    image: "/profile.jpeg",
    is_premium: true,
    is_staff: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setModalMessage("ログインが必要です。");
      setIsModalOpen(true);
      router.push("/login");
      return; // これで下の処理はスキップ
    }
    const fetchProfile = async () => {
      try {
        const res: Response | null = await fetchWithAuth(
          "http://localhost:8000/api/accounts/profile/"
        );

        if (!res) {
          throw new Error("レスポンスが null です");
        }

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setUser(data);
          console.log(data.is_staff);
        } else {
          throw new Error("レスポンスが不正");
        }
      } catch (error) {
        console.error("プロフィール取得エラー:", error);
        setModalMessage("ログインが必要です。");
        setIsModalOpen(true);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const toggleEditMode = async () => {
    if (editMode) {
      // 保存モードだったら、サーバーに更新リクエスト
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("トークンがありません");

        // 画像ファイルを送るために FormData を使用
        const formData = new FormData();
        formData.append("username", user.username);
        formData.append("email", user.email);
        formData.append("age", user.age?.toString() ?? "");
        formData.append("bio", user.bio);
        if (user.image instanceof File) {
          formData.append("image", user.image);
        }

        const response = await fetch(
          "http://localhost:8000/api/accounts/profile/",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("プロフィール更新失敗");
        }

        setModalMessage("プロフィールを更新しました！");
        setIsModalOpen(true);
      } catch (error) {
        console.error("プロフィール更新エラー:", error);
        setModalMessage("更新に失敗しました");
        setIsModalOpen(true);
      }
    }
    setEditMode(!editMode);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUser((prevUser) => ({ ...prevUser, image: file }));
    }
  };

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-pink-100 p-6">
        <div
          className={`bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-12 px-20 w-full max-w-6xl flex flex-col md:flex-row items-center md:items-start transition-all  ${
            user.is_premium ? "animated-border" : "border border-white"
          }`}
        >
          {/* 左側：プロフィール画像と基本情報 */}
          <div className="flex flex-col items-center md:items-start md:w-1/3 mb-6 md:mb-0">
            <div className="relative w-36 h-36 mb-6">
              {user.image && user.image !== "" && (
                <Image
                  src={
                    user.image instanceof File
                      ? URL.createObjectURL(user.image)
                      : `http://localhost:8000${user.image}`
                  }
                  alt="Profile Picture"
                  fill
                  className={`rounded-full object-cover ring-4 shadow-lg ${
                    user.is_staff ? "ring-[#FFD700]" : "ring-white"
                  }`}
                />
              )}
            </div>

            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-gray-500"
              />
            )}
            {editMode ? (
              <>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  className="text-2xl font-bold text-center md:text-left text-gray-800 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="number"
                  name="age"
                  value={user.age ?? ""}
                  onChange={handleChange}
                  className="text-lg font-bold text-center md:text-left text-gray-800 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="text-gray-500 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 mt-2"
                />
              </>
            ) : (
              <>
                <div className="w-full flex gap-4 items-end">
                  <div className="">
                    {user.is_premium && (
                      <div className="flex items-center text-xl text-[#FFD700]">
                        <PiCrownFill />
                        <h4>プレミアムプラン</h4>
                      </div>
                    )}
                    {user.is_staff && (
                      <div className="flex items-center text-xl text-[#3A59D1]">
                        <GiMoebiusTriangle />
                        <h4>スタッフ</h4>
                      </div>
                    )}
                    <h2 className="text-3xl font-extrabold text-gray-800">
                      {user.username}
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600">{user.age}才</p>
                </div>
                <p className="text-gray-500">{user.email}</p>
              </>
            )}
          </div>

          {/* 右側：自己紹介と編集ボタン */}
          <div className="md:w-2/3 md:pl-12 h-full">
            <div className="border-t-2 border-gray-300 mb-6"></div>

            {editMode ? (
              <textarea
                name="bio"
                value={user.bio || ""} // user.bio が null なら空文字列にする
                onChange={handleChange}
                className="w-full text-gray-700 h-full text-lg leading-relaxed bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-8"
                rows={4}
              />
            ) : (
              <>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                  {user.bio}
                </p>
                <div className="border-b-2 border-gray-300 mb-30"></div>
              </>
            )}

            <button
              onClick={toggleEditMode}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition transform cursor-pointer"
            >
              {editMode ? <FaSave /> : <FaUserEdit />}
              {editMode ? "保存する" : "プロフィールを編集"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
