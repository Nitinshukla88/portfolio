import { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

export function ContinuousBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2; 
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    const blobs: {
      x: number;
      y: number;
      radius: number;
      xSpeed: number;
      ySpeed: number;
      color: string;
      phase: number;
      amplitude: number;
      frequency: number;
    }[] = [];
    
    const createBlobs = () => {
      blobs.length = 0;
      const blobCount = Math.min(12, Math.max(5, Math.floor(canvas.width / 250)));
      
      const isDark = resolvedTheme === "dark";
      
      const colors = isDark 
        ? [
            "rgba(56, 189, 248, 0.35)",  
            "rgba(99, 102, 241, 0.35)",  
            "rgba(217, 70, 239, 0.35)",  
            "rgba(236, 72, 153, 0.35)",  
            "rgba(16, 185, 129, 0.35)", 
            "rgba(245, 158, 11, 0.35)", 
            "rgba(37, 99, 235, 0.35)",   
          ]
        : [
            "rgba(56, 189, 248, 0.12)",  
            "rgba(99, 102, 241, 0.12)", 
            "rgba(217, 70, 239, 0.12)", 
            "rgba(236, 72, 153, 0.12)", 
            "rgba(16, 185, 129, 0.12)", 
            "rgba(245, 158, 11, 0.12)", 
            "rgba(37, 99, 235, 0.12)",   
          ];
      
      for (let i = 0; i < blobCount; i++) {
        const radius = Math.random() * (canvas.width / 4) + (canvas.width / 8);
        const yPosition = (i / blobCount) * canvas.height * 1.2; 
        
        blobs.push({
          x: Math.random() * canvas.width,
          y: yPosition,
          radius: radius,
          xSpeed: (Math.random() - 0.5) * 0.2,
          ySpeed: (Math.random() - 0.5) * 0.05, 
          color: colors[Math.floor(Math.random() * colors.length)],
          phase: Math.random() * Math.PI * 2,
          amplitude: 0.2 + Math.random() * 0.3,
          frequency: 0.1 + Math.random() * 0.2
        });
      }
    };
    
    createBlobs();
    window.addEventListener("resize", createBlobs);
    
    let animationFrameId: number;
    let time = 0;
    
    const render = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      
      blobs.forEach(blob => {
        blob.x += blob.xSpeed;
        blob.y += blob.ySpeed;
        
        if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius;
        if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius;
        
        if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius;
        if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius;
        
        ctx.save();
        ctx.translate(blob.x, blob.y);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, blob.radius);
        
        const colorMatch = blob.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (colorMatch) {
          const [_, r, g, b, a] = colorMatch;
          const opacityMultiplier = resolvedTheme === "dark" ? 3 : 2;
          const innerColor = `rgba(${r}, ${g}, ${b}, ${Math.min(1, parseFloat(a) * opacityMultiplier)})`;  
          const outerColor = `rgba(${r}, ${g}, ${b}, 0)`; 
          
          gradient.addColorStop(0, innerColor);
          gradient.addColorStop(1, outerColor);
        } else {
          gradient.addColorStop(0, blob.color);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        
        ctx.beginPath();
        const points = 12; 
        
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const oscillation = Math.sin(angle * 3 + time + blob.phase) * blob.amplitude + 1;
          const x = Math.cos(angle) * blob.radius * oscillation;
          const y = Math.sin(angle) * blob.radius * oscillation;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.globalCompositeOperation = resolvedTheme === "dark" ? "screen" : "screen";
        ctx.fill();
        ctx.restore();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("resize", createBlobs);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1
      }}
    />
  );
}
