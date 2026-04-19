"use client";

import { motion, useAnimation } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Clock, Zap, Building2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Network Visualization Component
const NetworkVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    const nodes: Node[] = [];
    const nodeCount = 40;
    const colors = ["#7B2FBE", "#4DD9E8", "#9B4FDE", "#9B4FDE"];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(14, 14, 14, 0.1)";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 3,
        );
        gradient.addColorStop(0, node.color + "40");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      nodes.forEach((node, i) => {
        nodes.slice(i + 1).forEach((otherNode) => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(123, 47, 190, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

// Cycling Headlines Component
const CyclingHeadline = () => {
  const headlines = [
    "Grow your business",
    "Scale your revenue",
    "Automate your growth",
    "Transform your reach",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      controls
        .start({
          opacity: [1, 0],
          y: [0, -20],
          transition: { duration: 0.3 },
        })
        .then(() => {
          setCurrentIndex((prev) => (prev + 1) % headlines.length);
          controls.start({
            opacity: [0, 1],
            y: [20, 0],
            transition: { duration: 0.3 },
          });
        });
    }, 3000);

    return () => clearInterval(interval);
  }, [controls, headlines.length]);

  return (
    <motion.span
      animate={controls}
      className="inline-block bg-gradient-to-r from-[#7B2FBE] via-[#9B4FDE] to-[#4DD9E8] bg-clip-text text-transparent"
    >
      {headlines[currentIndex]}
    </motion.span>
  );
};

// Main Hero Component
const AIGrowthHero = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0E0E0E]">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(123,47,190,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(123,47,190,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#7B2FBE] opacity-10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#4DD9E8] opacity-10 blur-[120px] rounded-full" />

      <div className="relative z-10 container mx-auto px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge className="bg-[#7B2FBE]/10 text-[#7B2FBE] border-[#7B2FBE]/20 hover:bg-[#7B2FBE]/20 px-4 py-2 text-sm font-semibold">
                <Zap className="w-4 h-4 mr-2 inline" />
                AI Growth Partner for Small Businesses
              </Badge>
            </motion.div>

            {/* Animated Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold font-display leading-tight">
                <CyclingHeadline />
                <br />
                <span className="text-white">with AI Agents</span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl"
            >
              You didn&apos;t start a business to write emails and chase
              reviews. I build AI systems that handle the growth side so you can
              stay on the work side.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-[#7B2FBE] hover:bg-[#9B4FDE] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-[#7B2FBE]/25 transition-all duration-300 hover:scale-105"
              >
                Book a free growth audit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#4DD9E8]/30 bg-[#4DD9E8]/5 hover:bg-[#4DD9E8]/10 text-[#4DD9E8] rounded-full px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                See what we build
              </Button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-800"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#4DD9E8]" />
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    $4,200/mo
                  </span>
                </div>
                <p className="text-sm text-zinc-500">avg revenue recovered</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#7B2FBE]" />
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    60 sec
                  </span>
                </div>
                <p className="text-sm text-zinc-500">lead response time</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#4DD9E8]" />
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    5+
                  </span>
                </div>
                <p className="text-sm text-zinc-500">industries served</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Network Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7B2FBE]/10 via-transparent to-[#4DD9E8]/10 rounded-3xl backdrop-blur-sm border border-[#7B2FBE]/20">
              <NetworkVisualization />
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute top-8 right-8 bg-[#0E0E0E]/80 backdrop-blur-xl border border-[#7B2FBE]/30 rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7B2FBE] to-[#9B4FDE] flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Lead responded
                  </p>
                  <p className="text-xs text-zinc-400">Under 60 seconds</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute bottom-8 left-8 bg-[#0E0E0E]/80 backdrop-blur-xl border border-[#4DD9E8]/30 rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4DD9E8] to-[#9B4FDE] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    $4,200/mo recovered
                  </p>
                  <p className="text-xs text-zinc-400">Avg per client</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default function Component() {
  return <AIGrowthHero />;
}
