import { PaymentRequest } from "@stripe/stripe-js"; // PaymentRequestを個別にインポート
import {
  CardElement,
  PaymentRequestButtonElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CARD_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1a202c",
      "::placeholder": {
        color: "#a0aec0",
      },
    },
    invalid: {
      color: "#e53e3e",
    },
  },
};

interface Token {
  token: string | null;
}

const CheckoutForm: React.FC<Token> = ({ token }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/"; // ローカル用のデフォルト値
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
    null
  ); // 型を直接指定
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setModalMessage("");
    setIsModalOpen(true);

    if (!token) {
      setModalMessage(
        "ログインしていません。アクセストークンが見つかりません。"
      );
      setProcessing(false);
      setIsModalOpen(true);
      return;
    }

    const res = await fetch(`${apiUrl}api/accounts/payment-intent/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const data = await res.json();

    if (!data.clientSecret) {
      setModalMessage("clientSecret が見つかりませんでした。");
      setProcessing(false);
      setIsModalOpen(true);
      return;
    }

    const { clientSecret } = data;
    // Stripeにカード情報を送信して支払い処理を完了
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      setModalMessage(result.error.message || "支払いに失敗しました");
      setIsModalOpen(true);
    } else {
      if (result.paymentIntent?.status === "succeeded") {
        setModalMessage("✅ 支払い成功！ありがとうございます 🎉");
        setIsModalOpen(true);

        // 支払い成功後にプレミアム会員を登録
        const premiumRes = await fetch(
          `${apiUrl}api/accounts/activate-premium/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const premiumData = await premiumRes.json();
        console.log("プレミアム会員登録レスポンス:", premiumData);

        if (premiumRes.ok) {
          setModalMessage("プレミアム会員として登録されました！");
          setIsModalOpen(true);
          router.push("/profile");
        } else {
          setModalMessage("プレミアム会員登録に失敗しました。");
          setIsModalOpen(true);
        }
      }
    }
    if (!stripe || !elements) {
      console.error("Stripe Elements is not initialized.");
      return;
    }

    setProcessing(false);
  };

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: "JP",
      currency: "jpy",
      total: {
        label: "購入するアイテム",
        amount: 50000,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then((result) => {
      console.log(result);
      if (result) {
        setPaymentRequest(pr);
      }
    });
  }, [stripe]);

  // useEffect(() => {
  //   console.log("paymentRequest:", paymentRequest);
  //   if (!paymentRequest || !elements) return;

  //   const prButton = elements.getElement(PaymentRequestButtonElement);
  //   console.log("prButton:", prButton); // prButton が null でないことを確認

  //   if (prButton) {
  //     prButton.update({
  //       paymentRequest,
  //     });
  //   }
  // }, [paymentRequest, elements]);

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl">
      <Modal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        クレジットカードで支払う
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border border-gray-300 rounded-md p-3">
          <CardElement options={CARD_OPTIONS} />
        </div>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          {isProcessing ? "処理中..." : "今すぐ支払う"}
        </button>
      </form>
      {paymentRequest ? (
        <div className="mt-4">
          <PaymentRequestButtonElement
            options={{
              paymentRequest,
              style: {
                paymentRequestButton: {
                  type: "buy",
                  theme: "light",
                  height: "48px",
                },
              },
            }}
          />
        </div>
      ) : (
        <div className="mt-4 w-full flex justify-between">
          {/* <button
            disabled
            className="w-full bg-gray-300 text-gray-600 py-3 rounded-md cursor-not-allowed"
          >
            Apple Pay / Google Pay はこの環境でご利用いただけません
          </button> */}
          <button className="px-3 py-3 bg-white border rounded-md shadow-md flex items-center space-x-2 cursor-pointer hover:bg-gray-200">
            {/* Google Payの画像 */}
            <Image
              alt="Google Pay"
              src="/payment/applepay.svg"
              className="w-24 h-14"
              width={1000}
              height={1000}
            />
          </button>
          <button className="px-3 py-3 bg-white border rounded-md shadow-md flex items-center space-x-2 cursor-pointer hover:bg-gray-200">
            {/* Google Payの画像 */}
            <Image
              alt="Google Pay"
              src="/payment/googlepay.svg"
              className="w-24 h-14"
              width={1000}
              height={1000}
            />
          </button>
          <button className="px-3 py-3 bg-white border rounded-md shadow-md flex items-center space-x-2 cursor-pointer hover:bg-gray-200">
            {/* Google Payの画像 */}
            <Image
              alt="Google Pay"
              src="/payment/paypal.svg"
              className="w-24 h-10"
              width={1000}
              height={1000}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
