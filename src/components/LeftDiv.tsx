"use client";
import { motion, AnimatePresence } from "framer-motion";
import { BellOff, AlarmClock, AlertTriangle, Archive } from "lucide-react";
import { useState, useEffect } from "react";
import AlertData from "./AlertData";

const boxData = [
  { id: "1", icon: <BellOff size={20} />, content: "Bell Off" },
  { id: "2", icon: <AlarmClock size={20} />, content: "Alarm Clock" },
  { id: "3", icon: <AlertTriangle size={20} />, content: "Alert Triangle" },
  { id: "4", icon: <Archive size={20} />, content: "Archive" },
];

interface LeftDivProps {
  onCycleComplete: () => void;
  hasCompletedCycle: boolean;
}

const LeftDiv = ({ onCycleComplete, hasCompletedCycle }: LeftDivProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const newIndex = (prev + 1) % boxData.length;
        
        // When we complete a full cycle (back to first item)
        if (newIndex === 0 && !hasTriggered) {
          // Defer the execution of onCycleComplete to avoid state update during render
          setTimeout(() => {
            onCycleComplete();
          }, 0);
          setHasTriggered(true);
        }
        return newIndex;
      });
    }, 3000); 

    return () => clearInterval(interval);
  }, [hasTriggered, onCycleComplete]);

  return (
    <div className="w-[100%] flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4"></h1>
      
      <div className="w-full max-w-xxl h-40 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <div key={boxData[currentIndex].id} className="absolute w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full bg-white/10 backdrop-blur-md border border-white/30 p-4 rounded-xl shadow-lg flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-xl">
                {boxData[currentIndex].icon}
              </div>
              <div className="font-medium">{boxData[currentIndex].content}</div>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
     
      <AlertData hasCompletedCycle={hasCompletedCycle}/>
    </div>
  );
};

export default LeftDiv;