"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeftDiv from "@/components/LeftDiv";
import RightDiv from "@/components/RightDiv";

export default function SmoothSwap() {
  const [swapped, setSwapped] = useState(false);
  const [hasCompletedCycle, setHasCompletedCycle] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-10">
      {/* <button
        onClick={() => setSwapped((prev) => !prev)}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
      >
        Swap
      </button> */}

      <div className="flex justify-center gap-10 w-full">
        <AnimatePresence mode="popLayout">
          {swapped ? (
            <>
              <MotionBox key="right">
                <RightDiv hasCompletedCycle={hasCompletedCycle} />
              </MotionBox>
              <MotionBox key="left">
                <LeftDiv 
                  onCycleComplete={() => {
                    if (!hasCompletedCycle) {
                      setSwapped(true);
                      setHasCompletedCycle(true);
                    }
                  }}
                  hasCompletedCycle={hasCompletedCycle} 
                />
              </MotionBox>
            </>
          ) : (
            <>
              <MotionBox key="left">
                <LeftDiv 
                  onCycleComplete={() => {
                    if (!hasCompletedCycle) {
                      setSwapped(true);
                      setHasCompletedCycle(true);
                    }
                  }}
                  hasCompletedCycle={hasCompletedCycle} 
                />
              </MotionBox>
              <MotionBox key="right">
                <RightDiv hasCompletedCycle={hasCompletedCycle}/>
              </MotionBox>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MotionBox({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{
        layout: { duration: 0.4, ease: "easeInOut" },
        default: { duration: 0.4 },
      }}
      className="w-[40%] h-[100%] rounded-xl flex items-center justify-center shadow-xl"
    >
      {children}
    </motion.div>
  );
}