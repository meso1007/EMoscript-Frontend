"use client";

import Link from "next/link";
import Image from "next/image";
import SideBar from "@/components/SideBar";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { motion } from "framer-motion";
import { LuLockKeyhole } from "react-icons/lu";

export default function LevelSelect() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <motion.div className="w-full min-h-screen flex justify-center ml-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full bigContainer mt-7 mx-40"
      >
        <div className="w-1/2 flex justify-between items-center mb-10">
          <div className="text-4xl header flex items-center pr-20">
            <Image alt="logo" src="/logo.png" width={70} height={70} />
            <h1 className="sideHeader ">EMo Script</h1>
          </div>
          <div className="text-center ">
            <p className="text-4xl font-bold text-gray-900 companyName">Stage Select</p>
          </div>
        </div>

        <SideBar />
        <main className="flex flex-col items-center justify-center px-6">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="text-center">
                  <th className="py-2 px-4 border-b">レベル</th>
                  <th className="py-2 px-4 border-b">説明</th>
                  <th className="py-2 px-4 border-b"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center cursor-pointer hover:bg-blue-100">
                  <td className="py-2 px-4 border-b text-center">🟢 Level 1</td>
                  <td className="py-2 px-4 border-b text-center">
                    かめをゴールまで走らせよう！
                  </td>
                  <td className="w-full py-2 px-4 border-b flex justify-center">
                    <Link
                      href="/level1"
                      className="w-[200px] h-full bg-[#d0f0c0] rounded-2xl shadow-lg flex items-center justify-center hover:bg-[#b5e6a6] transition py-2 px-4"
                    >
                      スタート
                    </Link>
                  </td>
                </tr>
                <tr className="text-center cursor-pointer hover:bg-blue-100">
                  <td className="py-2 px-4 border-b text-center">🟢 Level 2</td>
                  <td className="py-2 px-4 border-b text-center">
                    うさぎをゴールまで走らせよう！
                  </td>
                  <td className="w-full py-2 px-4 border-b flex justify-center">
                    <Link
                      href="/level2"
                      className="w-[200px] h-full bg-[#d0f0c0] rounded-2xl shadow-lg flex items-center justify-center hover:bg-[#b5e6a6] transition py-2 px-4"
                    >
                      スタート
                    </Link>
                  </td>
                </tr>
                <tr className="text-center cursor-pointer hover:bg-blue-100">
                  <td className="py-2 px-4 border-b text-center">🔵 Level 3</td>
                  <td className="py-2 px-4 border-b text-center">
                  かめでゴールぴったり走ろう！                  </td>
                  <td className="w-full py-2 px-4 border-b flex justify-center">
                    <Link
                      href="/level3"
                      className="w-[200px] h-full bg-[#c0cef0] rounded-2xl shadow-lg flex items-center justify-center hover:bg-[#9eb4ea] transition py-2 px-4"
                    >
                      スタート
                    </Link>
                  </td>
                </tr>
                <tr className="text-center cursor-pointer hover:bg-blue-100">
                  <td className="py-2 px-4 border-b text-center">🔵 Level 4</td>
                  <td className="py-2 px-4 border-b text-center">
                  うさぎでゴールぴったり走ろう！
                  </td>
                  <td className="w-full py-2 px-4 border-b flex justify-center">
                    <Link
                      href="/level4"
                      className="w-[200px] h-full bg-[#c0cef0] rounded-2xl shadow-lg flex items-center justify-center hover:bg-[#9eb4ea] transition py-2 px-4"
                    >
                      スタート
                    </Link>
                  </td>
                </tr>
                <tr className="text-center cursor-pointer hover:bg-blue-100">
                  <td className="py-2 px-4 border-b text-center">🔵 Level 5</td>
                  <td className="py-2 px-4 border-b text-center">
                    うさぎのひとやすみ, ゴールをめざそう!
                  </td>
                  <td className="w-full py-2 px-4 border-b flex justify-center">
                    <Link
                      href="/level5"
                      className="w-[200px] h-full bg-[#c0cef0] rounded-2xl shadow-lg flex items-center justify-center hover:bg-[#9eb4ea] transition py-2 px-4"
                    >
                      スタート
                    </Link>
                  </td>
                </tr>
                <tr className="text-center cursor-pointer hover:bg-blue-100">
                  <td className="py-2 px-4 border-b text-center">🔴 Level 6</td>
                  <td className="py-2 px-4 border-b text-center">
                    うさぎとカメを同時にゴールさせよう！
                  </td>
                  <td className="w-full py-2 px-4 border-b flex justify-center">
                    <Link
                      href="/level6"
                      className="w-[200px] h-full bg-[#f9c0c0] rounded-2xl shadow-lg flex items-center justify-center hover:bg-[#f6a9a9] transition py-2 px-4"
                    >
                      スタート
                    </Link>
                  </td>
                </tr>
                {/* レベル5以降は有料プラン */}
                <tr className="text-center cursor-pointer hover:bg-blue-100">
                  <td className="py-2 px-4 border-b text-center">🟡 Level 7</td>
                  <td className="py-2 px-4 border-b text-center">
                    有料プランで開放されます。
                  </td>
                  <td className="w-full py-2 px-4 border-b flex justify-center">
                    <Link
                      href="/shop"
                      className="w-[200px] h-full bg-[#f8e97d] rounded-2xl shadow-lg flex items-center justify-center hover:bg-[#e8db7e] transition py-2 px-4"
                    >
                      <LuLockKeyhole />
                      プラン選択へ
                    </Link>
                  </td>
                </tr>
                <tr className="text-center cursor-pointer hover:bg-blue-100">
                  <td className="py-2 px-4 border-b text-center">🟡 Level 8</td>
                  <td className="py-2 px-4 border-b text-center">
                    有料プランで開放されます。
                  </td>
                  <td className="w-full py-2 px-4 border-b flex justify-center">
                    <Link
                      href="/shop"
                      className="w-[200px] h-full bg-[#f8e97d] rounded-2xl shadow-lg flex items-center justify-center hover:bg-[#e8db7e] transition py-2 px-4"
                    >
                      <LuLockKeyhole />
                      プラン選択へ
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </motion.div>
    </motion.div>
  );
}
