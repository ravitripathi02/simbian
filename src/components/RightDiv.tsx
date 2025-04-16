"use client";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";
import { useState, useRef, forwardRef, useEffect } from "react";
import { BellOff, AlarmClock, AlertTriangle, Archive } from "lucide-react";
import Simbian from "./Simbian";

type LocationType = "left" | "right" | "bottom";

type IconItem = {
  id: string;
  icon: React.ReactNode;
  location: LocationType;
};

const iconData: IconItem[] = [
  { id: "1", icon: <BellOff size={20} />, location: "left" },
  { id: "2", icon: <AlarmClock size={20} />, location: "left" },
  { id: "3", icon: <AlertTriangle size={20} />, location: "right" },
  { id: "4", icon: <Archive size={20} />, location: "bottom" },
  { id: "5", icon: <BellOff size={20} />, location: "right" },
  { id: "6", icon: <BellOff size={20} />, location: "left" },
  { id: "7", icon: <AlarmClock size={20} />, location: "left" },
];

const RightDiv = ({hasCompletedCycle }: { hasCompletedCycle: boolean }) => {
  const [icons, setIcons] = useState<IconItem[]>(iconData);
  const [recentlyDropped, setRecentlyDropped] = useState<string | null>(null);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(icons.length);
  const dropZoneRefs = {
    left: useRef<HTMLDivElement>(null),
    right: useRef<HTMLDivElement>(null),
    bottom: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (hasCompletedCycle && countdownValue > 0) {
      const timer = setInterval(() => {
        setCountdownValue(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsCountingDown(false);
            // onCycleComplete(); // Notify parent that cycle is complete
            return 0;
          }
          return prev - 1;
        });

        // Remove one icon each second
        setIcons(prev => {
          if (prev.length === 0) return prev;
          return prev.slice(0, -1); // Remove last icon
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isCountingDown, hasCompletedCycle]);

  const handleDrop = (iconId: string, newLocation: LocationType) => {
    setIcons((prev) =>
      prev.map((item) =>
        item.id === iconId ? { ...item, location: newLocation } : item
      )
    );
    setRecentlyDropped(iconId);
    setTimeout(() => setRecentlyDropped(null), 1000);
  };

  const startCountdown = () => {
    setCountdownValue(icons.length);
    setIsCountingDown(true);
  };

  return (
    <div 
      className="h-full p-4 w-full"
      onClick={startCountdown} // Start countdown when container is clicked
    >
      <Simbian hasCompletedCycle={hasCompletedCycle}/>

      <div className="flex flex-col gap-4 w-full">
        {(["left", "right", "bottom"] as LocationType[]).map((zone) => (
          <DropContainer
            key={zone}
            ref={dropZoneRefs[zone]}
            title={
              zone === "left"
                ? "Ignored Alerts"
                : zone === "right"
                ? "Delayed Alerts"
                : "Archived Alerts"
            }
            location={zone}
            icons={icons.filter((i) => i.location === zone)}
            onDrop={handleDrop}
            recentlyDropped={recentlyDropped}
            isCountingDown={isCountingDown}
            countdownValue={countdownValue}
          />
        ))}
      </div>
    </div>
  );
};

const DropContainer = forwardRef<
  HTMLDivElement,
  {
    title: string;
    location: LocationType;
    icons: IconItem[];
    onDrop: (id: string, location: LocationType) => void;
    recentlyDropped: string | null;
    isCountingDown: boolean;
    countdownValue: number;
  }
>(({ title, location, icons, onDrop, recentlyDropped, isCountingDown }, ref) => {
  return (
    <div
      ref={ref}
      data-drop-zone={location}
      className={`w-full flex flex-col backdrop-blur-md border rounded-xl shadow-lg transition-colors ${
        location === "bottom"
          ? "bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/15"
          : "bg-white/10 border-white/30 hover:bg-white/15"
      } ${
        recentlyDropped && icons.some(i => i.id === recentlyDropped) 
          ? "animate-pulse" 
          : ""
      } ${
        isCountingDown ? "ring-2 ring-yellow-400" : ""
      }`}
    >
      {/* Header with consistent padding */}
      <div className="p-4">
        <div className="flex justify-between gap-4">
          <div className="flex items-center gap-2">
            {location === "left" ? (
              <BellOff size={20} />
            ) : location === "right" ? (
              <AlarmClock size={20} />
            ) : (
              <Archive size={20} />
            )}
            <div className="font-medium">{title}</div>
          </div>
          <div className="text-4xl font-bold text-blue-400">
            {icons.length}
          </div>
        </div>
      </div>

      {/* Icons area with full-width background */}
      <div className={`w-full border-t ${
        location === "bottom" 
          ? "border-purple-500/30" 
          : "border-white/30"
      }`}>
        <div className={`p-4 min-h-[80px] ${
          icons.length === 0 ? "bg-white/5 flex items-center justify-center" : ""
        }`}>
          <AnimatePresence>
            {icons.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {icons.map((item) => (
                  <DraggableIcon
                    key={item.id}
                    icon={item.icon}
                    id={item.id}
                    onDrop={onDrop}
                    currentLocation={location}
                    isRecentlyDropped={recentlyDropped === item.id}
                    isCountingDown={isCountingDown}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="text-white/50 text-sm"
              >
                No alerts here
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
});

DropContainer.displayName = "DropContainer";

function DraggableIcon({
  icon,
  id,
  onDrop,
  currentLocation,
  isRecentlyDropped,
  isCountingDown,
}: {
  icon: React.ReactNode;
  id: string;
  onDrop: (id: string, location: LocationType) => void;
  currentLocation: LocationType;
  isRecentlyDropped: boolean;
  isCountingDown: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isOverArchive, setIsOverArchive] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      style={{ x, y }}
      onDragStart={() => setIsOverArchive(false)}
      onDrag={(_, info) => {
        const archiveZone = document.querySelector('[data-drop-zone="bottom"]');
        if (archiveZone) {
          const rect = archiveZone.getBoundingClientRect();
          setIsOverArchive(
            info.point.x >= rect.left &&
              info.point.x <= rect.right &&
              info.point.y >= rect.top &&
              info.point.y <= rect.bottom
          );
        }
      }}
      onDragEnd={(_, info) => {
        const archiveZone = document.querySelector('[data-drop-zone="bottom"]');
        
        if (archiveZone) {
          const rect = archiveZone.getBoundingClientRect();
          
          if (
            info.point.x >= rect.left &&
            info.point.x <= rect.right &&
            info.point.y >= rect.top &&
            info.point.y <= rect.bottom &&
            currentLocation !== "bottom"
          ) {
            onDrop(id, "bottom");
          }
        }
        
        x.set(0);
        y.set(0);
        setIsOverArchive(false);
      }}
      whileDrag={{ 
        scale: 1.1,
        zIndex: 10,
        boxShadow: isOverArchive 
          ? "0 0 15px 3px rgba(168, 85, 247, 0.7)" 
          : "0 0 8px 1px rgba(99, 102, 241, 0.5)"
      }}
      initial={false}
      animate={{
        scale: isRecentlyDropped ? [1, 1.1, 1] : isCountingDown ? 0.9 : 1,
        x: isRecentlyDropped ? [0, 10, -10, 5, -5, 0] : 0,
        y: isRecentlyDropped ? [0, -20, 0] : 0,
        opacity: isCountingDown ? 0.7 : 1,
        boxShadow: isRecentlyDropped
          ? [
              "0 0 0px rgba(168, 85, 247, 0)",
              "0 0 10px rgba(168, 85, 247, 0.8)",
              "0 0 20px rgba(168, 85, 247, 0.6)",
              "0 0 10px rgba(168, 85, 247, 0.4)",
              "0 0 0px rgba(168, 85, 247, 0)",
            ]
          : "0 0 0px rgba(168, 85, 247, 0)",
      }}
      exit={{ 
        scale: 0,
        opacity: 0,
        transition: { duration: 0.3 }
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        times: isRecentlyDropped ? [0, 0.2, 0.4, 0.6, 0.8, 1] : undefined,
      }}
      className={`w-10 h-10 ${
        currentLocation === "bottom" ? "bg-purple-600" : "bg-indigo-600"
      } text-white flex items-center justify-center rounded-xl shadow-md cursor-grab active:cursor-grabbing transition-colors ${
        isCountingDown ? "animate-pulse" : ""
      }`}
    >
      {icon}
    </motion.div>
  );
}

export default RightDiv;