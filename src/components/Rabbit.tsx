import Lottie from "lottie-react";

export default function Turtle({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ width: 500, height: 500, ...style }}>
      <Lottie animationData="/anime/rabbit.json" loop={true} />
    </div>
  );
}
