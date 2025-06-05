import { useEffect, useRef } from "react";
import styled from "styled-components";

const ConfettiCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
`;

export const ConfettiEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettis: any[] = [];
    const colors = ["#FF007A", "#7A00FF", "#00FF7A", "#FFD700", "#00D4FF"];

    function createConfetti() {
      return {
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height - canvas!.height,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 5 + 2,
        rotation: Math.random() * 360,
      };
    }

    for (let i = 0; i < 200; i++) {
      confettis.push(createConfetti());
    }

    let animationFrameId: number;

    function animateConfetti() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      confettis.forEach((confetti, index) => {
        confetti.x += confetti.speedX;
        confetti.y += confetti.speedY;
        confetti.rotation += confetti.speedX;

        ctx!.save();
        ctx!.translate(confetti.x, confetti.y);
        ctx!.rotate((confetti.rotation * Math.PI) / 180);
        ctx!.fillStyle = confetti.color;
        ctx!.fillRect(
          -confetti.size / 2,
          -confetti.size / 2,
          confetti.size,
          confetti.size
        );
        ctx!.restore();

        if (confetti.y > canvas!.height) {
          confettis.splice(index, 1);
        }
      });

      if (confettis.length > 0) {
        animationFrameId = requestAnimationFrame(animateConfetti);
      }
    }

    const start = setTimeout(() => {
      animateConfetti();
    }, 300);

    const stop = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 8000);

    return () => {
      clearTimeout(start);
      clearTimeout(stop);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <ConfettiCanvas ref={canvasRef} />;
};
