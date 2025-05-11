"use client";

import Link from "next/link";
import { useState } from "react";
import "./SideBar.css";
import { FaRegUser } from "react-icons/fa";
import {
  FiHome,
  FiSettings,
  FiUser,
  FiChevronsLeft,
  FiChevronsRight,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import { GrLogin, GrLogout } from "react-icons/gr";
import { IoTriangleOutline } from "react-icons/io5";
import { LuLockKeyhole } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [levelsOpen, setLevelsOpen] = useState(false);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    router.push("/login");
  };
  const login = () => {
    router.push("/login");
  };

  return (
    <motion.aside
      initial={{ width: "4rem" }}
      animate={{ width: isOpen ? "16rem" : "4rem" }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      className={`fixed sideBar top-0  h-screen left-0  z-50 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } oriWhite shadow-lg`}
    >
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col justify-center items-center"
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="justify-items-end p-4 w-full oriWhite text-3xl focus:outline-none hover:cursor-pointer duration-300"
          >
            {isOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
          </button>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex items-center"
          >
            <Image alt="logo" src="/logo.png" width={70} height={70} />
            <h1 className="sideHeader">EMo Script</h1>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex justify-between items-center p-4"
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="oriWhite text-3xl focus:outline-none hover:cursor-pointer  duration-300"
          >
            {isOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
          </button>
        </motion.div>
      )}

      {isOpen ? (
        <nav className="text-xl justify-between h-[80vh] py-10 flex flex-col gap-4 mt-4 space-y-4 px-6  duration-300">
          <div className="h-full flex flex-col gap-4 space-y-2">
            <Link href="/">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex items-center gap-2 hover:text-blue-400 pb-4 border-b-2 border-gray-400"
              >
                <FiHome /> ホーム
              </motion.span>
            </Link>

            {/* ここは有料オプション */}
            <Link href="/profile">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex items-center gap-2 hover:text-blue-400 pb-4 border-b-2 border-gray-400"
              >
                <FiUser /> プロフィール
                {user ? "" : <LuLockKeyhole />}
              </motion.span>
            </Link>
            <Link href="" onClick={() => setLevelsOpen(!levelsOpen)}>
              <motion.span
                key="levels-toggle"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex items-center justify-between gap-2 hover:text-blue-400 pb-4 border-b-2 border-gray-400 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <IoTriangleOutline /> レベル選択
                </span>
                {levelsOpen ? <FiArrowUp /> : <FiArrowDown />}
              </motion.span>
            </Link>

            {levelsOpen && (
              <div className="pl-6 space-y-2">
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <Link key={`level-${level}`} href={`/level${level}`}>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="flex items-center gap-2 hover:text-blue-400 border-b border-gray-300 pb-2"
                    >
                      <IoTriangleOutline /> Level.{level}
                    </motion.span>
                  </Link>
                ))}
                <Link href={"/levelSelect"}>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="flex items-center gap-2 hover:text-blue-400 border-b border-gray-300 py-2"
                  >
                    <IoTriangleOutline /> ステージ選択
                  </motion.span>
                </Link>
              </div>
            )}
          </div>

          <div>
            <Link href="/profile">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex items-center gap-2 hover:text-blue-400"
              >
                <FaRegUser />
                <p>{user?.username || "ゲスト"}</p>
              </motion.span>
            </Link>
          </div>

          {user ? (
            <div>
              <button onClick={logout}>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="flex items-center gap-2 hover:text-blue-400 cursor-pointer"
                >
                  <GrLogout /> ログアウト
                </motion.span>
              </button>
            </div>
          ) : (
            <div>
              <button onClick={login}>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="flex items-center gap-2 hover:text-blue-400 cursor-pointer"
                >
                  <GrLogin /> ログイン
                </motion.span>
              </button>
            </div>
          )}
          <div>
            <Link href="/settings">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex items-center gap-2 hover:text-blue-400"
              >
                <FiSettings /> 設定
                {user ? "" : <LuLockKeyhole />}
              </motion.span>
            </Link>
          </div>
        </nav>
      ) : (
        // 開く前
        <AnimatePresence>
          <nav className="text-3xl justify-between items-center h-[80vh] py-10 flex flex-col gap-4 mt-4 space-y-4 p-4">
            <div className="h-full flex flex-col gap-4 mt-4 space-y-4">
              <Link href="/">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="flex items-center gap-2 hover:text-blue-400"
                >
                  <FiHome />
                </motion.span>
              </Link>
              <Link href="/profile">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="flex items-center gap-2 hover:text-blue-400"
                >
                  <FiUser />
                </motion.span>
              </Link>
              <Link
                href="/levelSelect"
                onClick={() => setLevelsOpen(!levelsOpen)}
              >
                <motion.span
                  key="levels-toggle"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="flex items-center justify-between gap-2 hover:text-blue-400 pb-4 cursor-pointer"
                >
                  <IoTriangleOutline />
                </motion.span>
              </Link>
            </div>
            <div>
              <Link href="/profile">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="flex items-center gap-2 hover:text-blue-400"
                >
                  <FaRegUser />
                </motion.span>
              </Link>
            </div>
            {user ? (
              <div>
                <button onClick={logout}>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="flex items-center gap-2 hover:text-blue-400 cursor-pointer"
                  >
                    <GrLogout />
                  </motion.span>
                </button>
              </div>
            ) : (
              <div>
                <button onClick={login}>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="flex items-center gap-2 hover:text-blue-400 cursor-pointer"
                  >
                    <GrLogin />
                  </motion.span>
                </button>
              </div>
            )}
            <div>
              <Link href="/settings">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="flex items-center gap-2 hover:text-blue-400"
                >
                  <FiSettings />
                </motion.span>
              </Link>
            </div>
          </nav>
        </AnimatePresence>
      )}
    </motion.aside>
  );
}
