import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import SideBar from "./SideBar";
import { useRouter } from "next/navigation";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

interface Props {
  commands: {
    rabbit: string[];
    turtle: string[];
  };
  resetting: boolean;
}

export default function CanvasTurtleRabbit({ commands, resetting }: Props) {
  const [rabbitPos, setRabbitPos] = useState(0);
  const [turtlePos, setTurtlePos] = useState(0);
  const [goalReached, setGoalReached] = useState(false);
  const [randomHint, setRandomHint] = useState("");
  const [winner, setWinner] = useState<"rabbit" | "turtle" | "draw" | null>(
    null
  );
  const [goalPosition] = useState(Math.floor(Math.random() * (13 - 8 + 1)) + 8);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const cellSize = 60;
  const rabbitIndexRef = useRef(0);
  const turtleIndexRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const missAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const moveNextLevel = () => {
    router.push("/shop");
  };
  useEffect(() => {
    const hints = [
      "ぴったりゴールを目指そう！ あと少しだ！",
      "焦らず進もう！もうすぐゴールだよ！",
      "おしい！あと一歩！",
    ];

    const randomIndex = Math.floor(Math.random() * hints.length);
    setRandomHint(hints[randomIndex]);
  }, []);
  useEffect(() => {
    if (resetting) {
      setRabbitPos(0);
      setTurtlePos(0);
      setGoalReached(false);
      setWinner(null);
      rabbitIndexRef.current = 0;
      turtleIndexRef.current = 0;
      return;
    }

    const interval = setInterval(() => {
      const rCmd = commands.rabbit[rabbitIndexRef.current];
      const tCmd = commands.turtle[turtleIndexRef.current];

      // ウサギの動き
      if (rCmd === "➡️") {
        setRabbitPos((pos) => {
          const newPos = pos + 2;
          if (newPos > goalPosition) {
            clearInterval(interval);
            setPopupMessage("🐰ウサギがゴールを超えちゃった！失敗！");
            setShowPopup(true);
            if (missAudioRef.current) {
              missAudioRef.current
                .play()
                .catch((e) => console.error("Audio error:", e));
            }
            return pos;
          }
          return newPos;
        });
        rabbitIndexRef.current++;
      } else if (rCmd === "⬅️") {
        setRabbitPos((pos) => Math.max(0, pos - 1));
        rabbitIndexRef.current++;
      } else if (rCmd === "🕐") {
        rabbitIndexRef.current++;
      }

      // カメの動き
      if (tCmd === "➡️") {
        setTurtlePos((pos) => {
          const newPos = pos + 1;
          if (newPos > goalPosition) {
            clearInterval(interval);
            setPopupMessage("🐢カメがゴールを超えちゃった！失敗！");
            setShowPopup(true);
            if (missAudioRef.current) {
              missAudioRef.current
                .play()
                .catch((e) => console.error("Audio error:", e));
            }
            return pos;
          }
          return newPos;
        });
        turtleIndexRef.current++;
      } else if (tCmd === "⬅️") {
        setTurtlePos((pos) => Math.max(0, pos - 1));
        turtleIndexRef.current++;
      } else if (tCmd === "🕐") {
        turtleIndexRef.current++;
      }

      // 勝者判定
      if (!goalReached) {
        if (rabbitPos >= goalPosition && turtlePos >= goalPosition) {
          setWinner("draw");
          setGoalReached(true);
          clearInterval(interval);
          if (audioRef.current) {
            audioRef.current
              .play()
              .catch((e) => console.error("Audio error:", e));
          }
        } else if (rabbitPos >= goalPosition && !showPopup) {
          setWinner("rabbit");
          setGoalReached(true);
          clearInterval(interval);
          if (audioRef.current) {
            audioRef.current
              .play()
              .catch((e) => console.error("Audio error:", e));
          }
        } else if (turtlePos >= goalPosition && !showPopup) {
          setWinner("turtle");
          setGoalReached(true);
          clearInterval(interval);
          if (audioRef.current) {
            audioRef.current
              .play()
              .catch((e) => console.error("Audio error:", e));
          }
        } else {
          setGoalReached(false);
        }
      }

      // 全コマンド実行後の停止
      if (
        rabbitIndexRef.current >= commands.rabbit.length &&
        turtleIndexRef.current >= commands.turtle.length
      ) {
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [commands, resetting, rabbitPos, turtlePos]);
  const totalWidth = (goalPosition + 1) * cellSize;

  return (
    <div
      className="mt-18 relative h-[350px] border-4 border-[#f1e42d] rounded-lg shadow-lg overflow-x-auto overflow-y-hidden mb-6"
      style={{ width: `${totalWidth}px` }}
    >
      <audio ref={audioRef} src="/music/goal.mp3" preload="auto" />
      <audio ref={missAudioRef} src="/music/miss.mp3" preload="auto" />
      {Array.from({ length: goalPosition + 1 }).map((_, i) => {
        const left = i * cellSize;
        const isRabbitCurrent = rabbitPos === i;
        const isTurtleCurrent = turtlePos === i;
        let borderClass = "border-l border-gray-300";

        if (isRabbitCurrent && isTurtleCurrent) {
          borderClass = "border-r-4 border-r-purple-500";
        } else if (isRabbitCurrent) {
          borderClass = "border-r-4 border-r-pink-400";
        } else if (isTurtleCurrent) {
          borderClass = "border-r-4 border-r-green-400";
        }

        return (
          <div
            key={i}
            className={`absolute top-0 bottom-0 ${borderClass}`}
            style={{ left: `${left}px` }}
          >
            <div className="text-xs text-gray-500 absolute bottom-0 left-1">
              {i}
            </div>
          </div>
        );
      })}

      {/* ウサギのアニメーション */}
      <div
        className="absolute bottom-[10px] left-[-20px]  transition-transform duration-100 ease-in-out"
        style={{ transform: `translateX(${rabbitPos * cellSize}px)` }}
      >
        {isClient && (
          <Player
            autoplay
            loop
            src="/anime/rabbit.json"
            style={{ height: "140px", width: "140px" }}
          />
        )}
      </div>

      {/* カメのアニメーション */}
      <div
        className="absolute top-[10px] transition-transform duration-100 ease-in-out"
        style={{ transform: `translateX(${turtlePos * cellSize}px)` }}
      >
        {isClient && (
          <Player
            autoplay
            loop
            src="/anime/turtle.json"
            style={{ height: "100px", width: "100px" }}
          />
        )}
      </div>

      {/* ゴールアニメーション */}
      {isClient && (
        <Player
          autoplay
          loop
          src="/anime/goal.json"
          style={{
            height: "100px",
            width: "100px",
            left: `${goalPosition * cellSize - 30}px`,
          }}
          className="absolute top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full"
        />
      )}

      {/* 勝者の表示 */}
      {winner && !showPopup && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-900/80">
          <SideBar />
          <div className="bgOriWhite p-6 rounded-lg shadow-lg text-center max-w-md w-full">
            {winner === "rabbit" && (
              <>
                <h2 className="text-2xl font-bold mb-2">
                  🐇 ウサギが先についたよ
                </h2>
                <p className="mb-4">
                  でも…カメを待ってあげよう。レースはまだ終わってない！
                </p>
                <div className="absolute top-1/2 right-2/3 transform -translate-y-1/2 transition-transform duration-100 ease-in-out">
                  <Player
                    autoplay
                    loop
                    src="/anime/normalStar.json"
                    style={{ height: "300px", width: "300px" }}
                  />
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-cyan-500 oriWhite px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
                    onClick={() => window.location.reload()}
                  >
                    もう一回
                  </button>
                </div>
              </>
            )}
            {winner === "turtle" && (
              <>
                <h2 className="text-2xl font-bold mb-2">
                  🐢 カメが先についたよ
                </h2>
                <p className="mb-4">
                  ウサギもがんばってるはず。もう少し待ってみよう！
                </p>
                <div className="absolute top-1/2 right-2/3 transform -translate-y-1/2 transition-transform duration-100 ease-in-out">
                  {isClient && (
                    <Player
                      autoplay
                      loop
                      src="/anime/normalStar.json"
                      style={{ height: "300px", width: "300px" }}
                    />
                  )}
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-cyan-500 oriWhite px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
                    onClick={() => window.location.reload()}
                  >
                    もう一回
                  </button>
                </div>
              </>
            )}
            {winner === "draw" && (
              <>
                <h2 className="text-2xl font-bold mb-2">
                  🤝 一緒にゴール！なかよし最強コンビ！
                </h2>
                <p className="mb-4">
                  ウサギとカメ、力を合わせて同時にゴール！すてきな友情だね！
                </p>
                <div className="absolute top-1/2 right-2/3 transform -translate-y-1/2 transition-transform duration-100 ease-in-out">
                  {isClient && (
                    <Player
                      autoplay
                      loop
                      src="/anime/star.json"
                      style={{ height: "300px", width: "300px" }}
                    />
                  )}
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-cyan-500 oriWhite px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
                    onClick={() => window.location.reload()}
                  >
                    再挑戦
                  </button>
                  <button
                    className="bg-green-500 oriWhite px-4 py-2 rounded hover:bg-green-700 transition cursor-pointer"
                    onClick={moveNextLevel}
                  >
                    次のレベルへ
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-900/80">
          <SideBar />
          <div className="bgOriWhite flex flex-col justify-center items-center p-6 rounded-lg shadow-lg text-center max-w-md w-full">
            <strong className="font-bold text-2xl">
              😭ゴールを超えちゃった...
            </strong>
            <br />
            <span className="block sm:inline ml-2">{popupMessage}</span>

            <div className="my-4 text-sm text-gray-700 flex">
              <h1 className="l">ヒント：</h1>
              <p>{randomHint}</p>
            </div>

            <div className="absolute top-1/2 right-2/3 transform -translate-y-1/2 transition-transform duration-100 ease-in-out">
              {isClient && (
                <Player
                  autoplay
                  loop
                  src="/anime/sadStar.json"
                  style={{ height: "300px", width: "300px" }}
                />
              )}
            </div>

            <div className="flex justify-center gap-4">
              <button
                className="bg-cyan-500 oriWhite px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
                onClick={() => window.location.reload()}
              >
                もう一回
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
