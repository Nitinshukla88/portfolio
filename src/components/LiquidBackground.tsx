import { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

interface LiquidBackgroundProps {
  className?: string;
}

export function LiquidBackground({ className = "" }: LiquidBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Liquid blob properties
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
    
    // Create blobs
    const createBlobs = () => {
      blobs.length = 0;
      const blobCount = Math.min(8, Math.max(3, Math.floor(canvas.width / 300)));
      
      const isDark = resolvedTheme === "dark";
      
      // Color palette based on theme
      const colors = isDark 
        ? [
            "rgba(59, 130, 246, 0.15)",  // blue
            "rgba(139, 92, 246, 0.15)",  // purple
            "rgba(236, 72, 153, 0.15)",  // pink
            "rgba(16, 185, 129, 0.15)",  // green
          ]
        : [
            "rgba(59, 130, 246, 0.08)",  // blue
            "rgba(139, 92, 246, 0.08)",  // purple
            "rgba(236, 72, 153, 0.08)",  // pink
            "rgba(16, 185, 129, 0.08)",  // green
          ];
      
      for (let i = 0; i < blobCount; i++) {
        const radius = Math.random() * (canvas.width / 3) + (canvas.width / 6);
        blobs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: radius,
          xSpeed: (Math.random() - 0.5) * 0.3,
          ySpeed: (Math.random() - 0.5) * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          phase: Math.random() * Math.PI * 2,
          amplitude: 0.2 + Math.random() * 0.3,
          frequency: 0.1 + Math.random() * 0.2
        });
      }
    };
    
    createBlobs();
    window.addEventListener("resize", createBlobs);
    
    // Animation loop
    let animationFrameId: number;
    let time = 0;
    
    const render = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      
      // Update and draw blobs
      blobs.forEach(blob => {
        // Update position
        blob.x += blob.xSpeed;
        blob.y += blob.ySpeed;
        
        // Bounce off edges with some padding
        const padding = blob.radius * 0.5;
        if (blob.x < -padding) blob.xSpeed = Math.abs(blob.xSpeed);
        if (blob.x > canvas.width + padding) blob.xSpeed = -Math.abs(blob.xSpeed);
        if (blob.y < -padding) blob.ySpeed = Math.abs(blob.ySpeed);
        if (blob.y > canvas.height + padding) blob.ySpeed = -Math.abs(blob.ySpeed);
        
        // Draw blob with oscillating radius
        ctx.save();
        ctx.translate(blob.x, blob.y);
        
        // Create gradient
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, blob.radius);
        
        // Extract the color components and create new rgba strings
        const colorMatch = blob.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (colorMatch) {
          const [_, r, g, b, a] = colorMatch;
          const innerColor = `rgba(${r}, ${g}, ${b}, ${parseFloat(a) * 2})`;  // More opaque at center
          const outerColor = `rgba(${r}, ${g}, ${b}, 0)`; // Transparent at edges
          
          gradient.addColorStop(0, innerColor);
          gradient.addColorStop(1, outerColor);
        } else {
          // Fallback if regex fails
          gradient.addColorStop(0, blob.color);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        
        // Draw liquid blob with oscillating edges
        ctx.beginPath();
        const points = 12; // Number of points to create the blob
        
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
        ctx.globalCompositeOperation = "screen";
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
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
