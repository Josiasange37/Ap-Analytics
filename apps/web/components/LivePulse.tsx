"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";

export default function LivePulse() {
  const [count, setCount] = useState(124);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 5) - 2);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-[#34c38f] bg-[#e8f5ef] px-3 py-1.5 rounded-full">
      <div className="relative flex h-2 w-2">
        <motion.span
          animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inline-flex h-full w-full rounded-full bg-[#34c38f]"
        />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34c38f]" />
      </div>
      <span className="text-sm font-medium">{count} live</span>
      <Radio size={14} />
    </div>
  );
}
