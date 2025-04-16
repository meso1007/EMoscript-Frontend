"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.main
      className="min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/emoji.jpg')" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>

      <motion.div
        className="text-center max-w-3xl mt-20 z-10 relative px-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
      >
        <Image
          alt="logo"
          src="/logo.png"
          width={100}
          height={100}
          className="mx-auto mb-6"
        />
        <motion.h1
          className="text-5xl font-bold mb-4 oriWhite"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to EMo Script
        </motion.h1>
        <motion.p
          className="text-lg text-gray-200 mb-8 leading-loose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <strong>EMo Script</strong> は、
          <span className="text-[#28b8fb] font-semibold">絵文字だけ</span>
          でプログラミングを学べる、革新的なゲーム体験です。
          <br />
          シンプルなルールで、直感的にプログラミングの楽しさを感じられます！
          <br />
          子供から大人まで、楽しみながら論理的思考を育むことができるので、どんな人でも気軽に挑戦できます。
        </motion.p>
        <motion.p
          className="text-lg text-gray-200 mb-8 leading-loose"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          🐢 カメが進む道を、➡️ や ⬅️
          などの絵文字で指示して、ゴールに導いてあげよう！
          <br />
          ゲームを進めるごとに、難易度が少しずつ上がるので、思考力を鍛えながら楽しむことができます。
          <br />
          あなたも新しいプログラミングの世界を体験してみませんか？
        </motion.p>

        <div className="mt-8">
          <Link
            href="/level1"
            className="inline-block bg-[#28b8fb] oriWhite py-3 px-8 rounded-xl text-lg hover:bg-[#1898d3] transition"
          >
            今すぐはじめる(Level 1)
          </Link>
        </div>
      </motion.div>

      <motion.footer
        className="mt-20 text-sm text-gray-400 z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        © 2025 EMo Script | Created by <span className="cursor-pointer hover:text-blue-400"><Link href="http://99.79.63.2/">Shoya Horiuchi</Link></span>
      </motion.footer>
    </motion.main>
  );
}
