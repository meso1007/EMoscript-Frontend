import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
};

const Modal = ({ isOpen, message, onClose }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // モーダルが開いたときにスクロールを無効化
    } else {
      document.body.style.overflow = "auto"; // モーダルが閉じたらスクロールを戻す
    }

    return () => {
      document.body.style.overflow = "auto"; // コンポーネントがアンマウントされるときにもスクロールを戻す
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
        <p className="text-xl font-semibold text-gray-800 mb-4">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition transform cursor-pointer"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
