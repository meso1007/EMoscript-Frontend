import Lottie from "lottie-react";

export default function Turtle({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ width: 150, height: 150, ...style }}>
      <Lottie animationData="/anime/turtle.json" loop={true} />
    </div>
  );
}
