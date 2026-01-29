import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useCardGameState } from "../../context/cardGame/CardGameContext";

export default function useProgressCircleTexture(size = 512) {
  const { timeLeft, maxTime } = useCardGameState();

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    return new THREE.CanvasTexture(canvas);
  }, [size]);

  useEffect(() => {
    const canvas = texture.image as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    const strokeWidth = size * 0.08;

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = timeLeft / maxTime;

    ctx.clearRect(0, 0, size, size);

    // background circle
    ctx.beginPath();
    ctx.strokeStyle = "#222";
    ctx.lineWidth = strokeWidth;
    ctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
    ctx.stroke();

    // progress color
    const color =
      timeLeft > maxTime * 0.5
        ? "#06f762"
        : timeLeft > maxTime * 0.25
        ? "#ffb703"
        : "#ff3b3b";

    // progress arc
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.arc(
      size / 2,
      size / 2,
      radius,
      -Math.PI / 2,
      -Math.PI / 2 + Math.PI * 2 * progress
    );
    ctx.stroke();

    // text
    ctx.fillStyle = "#fceb05";
    ctx.font = `bold ${size / 5}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${timeLeft}s`, size / 2, size / 2);

    texture.needsUpdate = true;
  }, [timeLeft, maxTime, texture, size]);

  return texture;
}
