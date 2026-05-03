"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 240;
// Note: We use the exact filenames ezgif-frame-001.jpg etc.
const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/sequence/ezgif-frame-${paddedIndex}.jpg`;
};

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll();
  
  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        // If it's the very first image, draw it immediately
        if (i === 1 && canvasRef.current) {
          renderFrame(1, [img]); // Temporary array just to draw the first frame
        }
        
        if (loadedCount === FRAME_COUNT) {
           setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const renderFrame = (index: number, imgArray: HTMLImageElement[] = images) => {
    if (!canvasRef.current || imgArray.length === 0) return;
    
    // index is 1-based, array is 0-based
    const img = imgArray[index - 1];
    if (!img || !img.complete) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match window (or you can use fixed high-res dims)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate aspect ratio to cover the screen
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    // Optional: Add a dark overlay/tint to match the aesthetic
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    // Add gradient overlay to blend with the dark theme
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(5, 5, 5, 0.4)");
    gradient.addColorStop(0.5, "rgba(5, 5, 5, 0.2)");
    gradient.addColorStop(1, "rgba(5, 5, 5, 0.8)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Map scroll progress (0 to 1) to frame index (1 to 240)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    // Math.round ensures we get integer frame indices
    if (images.length > 0) {
      renderFrame(Math.round(latest));
    }
  });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (images.length > 0) {
        renderFrame(Math.round(frameIndex.get()));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 bg-[#050505] pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-80 mix-blend-screen"
      />
      {/* Fallback ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[#0050FF]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </div>
  );
}
