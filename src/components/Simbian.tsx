"use client";
import { motion } from "framer-motion";

interface SimbianProps {
  hasCompletedCycle: boolean;
}

export default function Simbian({ hasCompletedCycle }: SimbianProps) {
  return (
    <section>
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}         
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`max-w-3xl mx-auto text-center flex flex-col ${
            hasCompletedCycle ? "items-start" : "items-end"
          } justify-center`}
        >
          <h2 className={`text-3xl md:text-4xl font-bold ${
            hasCompletedCycle ? "text-white" : "text-blue-900"
          } mb-6`}>
            {hasCompletedCycle ? "With Simbian" : "Without Simbian"}
          </h2>
          <p className={`text-xl mb-8 ${
            hasCompletedCycle ? "text-white" : "text-blue-900"
          }`}>
            {hasCompletedCycle
              ? "Relax. Our AI Agents will take it from here."
              : "If this sounds all too familiar, you might want to..."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}