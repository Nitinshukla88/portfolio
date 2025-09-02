import { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

interface MoleculeBackgroundProps {
  className?: string;
}

export function MoleculeBackground({ className = "" }: MoleculeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  
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
    
    // Molecule node properties
    const nodes: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      connections: number[];
      color: string;
    }[] = [];
    
    // Create nodes
    const createNodes = () => {
      nodes.length = 0;
      const nodeCount = Math.floor(canvas.width * canvas.height / 12000); // Increased density
      
      const isDark = resolvedTheme === "dark";
      const primaryColor = isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.2)"; // Blue primary color
      const secondaryColor = isDark ? "rgba(139, 92, 246, 0.3)" : "rgba(139, 92, 246, 0.2)"; // Purple secondary color
      
      for (let i = 0; i < nodeCount; i++) {
        // Randomly choose between primary and secondary color
        const color = Math.random() > 0.7 ? primaryColor : secondaryColor;
        
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1.5, // Slightly larger nodes
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          connections: [],
          color
        });
      }
    };
    
    createNodes();
    window.addEventListener("resize", createNodes);
    
    // Animation loop
    let animationFrameId: number;
    
    const render = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update node positions
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Reset connections
        node.connections = [];
      });
      
      // Find connections between nodes
      const connectionDistance = canvas.width * 0.08; // Increased connection distance
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            nodes[i].connections.push(j);
            nodes[j].connections.push(i);
          }
        }
      }
      
      // Set line style based on theme
      const isDark = resolvedTheme === "dark";
      
      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach(j => {
          if (i < j) { // Draw each connection only once
            const distance = Math.sqrt(
              Math.pow(node.x - nodes[j].x, 2) + 
              Math.pow(node.y - nodes[j].y, 2)
            );
            
            // Calculate opacity based on distance
            const maxDist = connectionDistance;
            const opacity = isDark ? 
              0.15 * (1 - distance / maxDist) : 
              0.1 * (1 - distance / maxDist);
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            // Use gradient for connections
            const gradient = ctx.createLinearGradient(
              node.x, node.y, nodes[j].x, nodes[j].y
            );
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, nodes[j].color);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = isDark ? 1 : 0.8;
            ctx.globalAlpha = opacity;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Add glow effect for dark theme
        if (isDark) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = node.color.replace("0.3", "0.05");
          ctx.fill();
        }
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("resize", createNodes);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, resolvedTheme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
