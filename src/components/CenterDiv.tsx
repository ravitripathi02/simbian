import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
const CenterDiv = () => {
  return (

    <motion.div
    className="flex items-center gap-1 absolute"
    animate={{ x: [0, 10, 0] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    {/* Line */}
    <div className="w-[140px] h-[2px] bg-white/70 shadow-[0_0_10px_white]" />

    {/* Glowing Dot */}
    <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
  </motion.div>

  );
}
export default CenterDiv;