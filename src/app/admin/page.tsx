"use client";

import Modal from "@/components/Modal";
import SideBar from "@/components/SideBar";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  age: number;
  is_locked: boolean;
  is_premium: boolean;
  is_staff: boolean;
  is_active: boolean;
}

const AdminUserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<"all" | "staff" | "user">("all");
  const [premiumFilter, setPremiumFilter] = useState<
    "all" | "premium" | "non-premium"
  >("all");
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"; // ローカル用のデフォルト値

  const handleDeleteConfirm = (user: User) => {
    setUserToDelete(user);
    setShowConfirmModal(true);
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);
  const isTokenExpired = (token: string) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expirationTime = payload.exp * 1000;
    return expirationTime < Date.now();
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((user) => {
      if (roleFilter === "staff") return user.is_staff;
      if (roleFilter === "user") return !user.is_staff;
      return true;
    })
    .filter((user) => {
      if (premiumFilter === "premium") return user.is_premium;
      if (premiumFilter === "non-premium") return !user.is_premium;
      return true;
    });

  const fetchUsers = async () => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("access_token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
    if (!token) return;
    const res = await fetch(`${apiUrl}api/accounts/admin/users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const data: User[] = await res.json();
      console.log(data); // ここでデータを確認

      setUsers(data);
    }
  };

  const handleDelete = async () => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("access_token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
    if (!userToDelete) return;

    const res = await fetch(
      `${apiUrl}api/accounts/admin/users/${userToDelete.id}/delete/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirm: true }),
      }
    );

    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      setShowConfirmModal(false);
      setUserToDelete(null);
      setModalMessage("削除完了");
      setIsModalOpen(true);
    } else {
      console.error("削除失敗");
    }
  };

  const toggleLock = async (userId: number) => {
    const res = await fetch(
      `${apiUrl}api/accounts/admin/users/${userId}/toggle-lock/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      console.log(data);

      // ステートを更新して再レンダー
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, is_locked: data.is_locked } : user
        )
      );
    } else {
      console.error("ロックの切り替えに失敗しました");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
      <SideBar />
      {showConfirmModal && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-100 rounded-lg p-6 max-w-md w-full shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">確認</h3>
            <p className="mb-6">
              「{userToDelete.username}
              」を本当に削除しますか？この操作は元に戻せません。
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 cursor-pointer"
              >
                キャンセル
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 text-gray-800">ユーザー管理</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="ユーザー名またはメールで検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
        />
      </div>
      <div className="mb-4 flex items-center space-x-4">
        <label className="font-medium text-gray-700">表示:</label>
        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(e.target.value as "all" | "staff" | "user")
          }
          className="border border-gray-300 rounded px-3 py-1"
        >
          <option value="all">すべて</option>
          <option value="staff">スタッフのみ</option>
          <option value="user">ユーザーのみ</option>
        </select>
        <label className="font-medium text-gray-700">プレミアム:</label>
        <select
          value={premiumFilter}
          onChange={(e) =>
            setPremiumFilter(
              e.target.value as "all" | "premium" | "non-premium"
            )
          }
          className="border border-gray-300 rounded px-3 py-1"
        >
          <option value="all">すべて</option>
          <option value="premium">プレミアムプラン</option>
          <option value="non-premium">通常プラン</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 border border-gray-300 shadow rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2 text-left border-b">ID</th>
              <th className="px-4 py-2 text-left border-b">プラン</th>
              <th className="px-4 py-2 text-left border-b">ユーザー名</th>
              <th className="px-4 py-2 text-left border-b">メール</th>
              <th className="px-4 py-2 text-left border-b">年齢</th>
              <th className="px-4 py-2 text-left border-b">権限</th>
              <th className="px-4 py-2 text-left border-b">ステータス</th>
              <th className="px-4 py-2 text-left border-b">操作</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{user.id}</td>
                <td className="px-4 py-2 border-b">
                  {user.is_premium ? (
                    <span className="text-[#f9d505] font-semibold">
                      プレミアムプラン
                    </span>
                  ) : (
                    <span className="text-gray-600">通常プラン</span>
                  )}
                </td>
                <td className="px-4 py-2 border-b">{user.username}</td>
                <td className="px-4 py-2 border-b">{user.email}</td>
                <td className="px-7 py-2 border-b">{user.age}</td>
                <td className="px-4 py-2 border-b">
                  {user.is_staff ? (
                    <span className="text-blue-600 font-semibold">
                      スタッフ
                    </span>
                  ) : (
                    <span className="text-gray-600">一般ユーザー</span>
                  )}
                </td>
                <td className="px-4 py-2 border-b">
                  {user.is_locked ? (
                    <span className="text-red-600 font-semibold">ロック中</span>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      アクティブ
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => toggleLock(user.id)}
                    className={`px-3 py-1 rounded text-white text-sm font-medium cursor-pointer ${
                      user.is_locked
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {user.is_locked ? "アンロック" : "ロック"}
                  </button>
                  <button
                    onClick={() => handleDeleteConfirm(user)}
                    className="ml-2 px-3 py-1 rounded bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium cursor-pointer"
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUserList;
