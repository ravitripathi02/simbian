"use client";
import { AlertTriangle, Clock, ZapOff } from "lucide-react";
import { motion } from "framer-motion";

interface AlertMessagesProps {
  hasCompletedCycle: boolean;
}

const AlertMessages = ({ hasCompletedCycle }: AlertMessagesProps) => {
  const alerts = hasCompletedCycle?[ 
    {
      id: 1,
      completed: true,
      icon: (
        <AlertTriangle className={hasCompletedCycle ? "text-green-500" : "text-red-500"} size={24} />
      ),
      title: "Triaged & Reported",
      description: " SOC Agent handled investigation and reporting"
    },
    {
      id: 2,
      completed: false,
      icon: (
        <Clock className={hasCompletedCycle ? "text-green-500" : "text-red-500"} size={24} />
      ),
      title: "Automated Response",
      description: "Incident automatically contained"
    },
    {
      id: 3,
      completed: false,
      icon: (
        <ZapOff className={hasCompletedCycle ? "text-green-500" : "text-red-500"} size={24} />
      ),
      title: "Comprehensive Analysis",
      description: "AI recognized patterns"
    },
    {
      id: 4,
      completed: false,
      icon: (
        <ZapOff className={hasCompletedCycle ? "text-green-500" : "text-red-500"} size={24} />
      ),
      title: "Accurate Detection",
      description: "Zero false positives"
    },
    {
      id: 5,
      completed: false,
      icon: (
        <ZapOff className={hasCompletedCycle ? "text-green-500" : "text-red-500"} size={24} />
      ),
      title: "24/7 Coverage",
      description: "No analyst fatigue"
    }
  ]:[ 
    {
      id: 1,
      completed: true,
      icon: (
        <AlertTriangle className={hasCompletedCycle ? "text-green-500" : "text-red-500"} size={24} />
      ),
      title: "False Positives",
      description: "Wasting valuable analyst time on false positives"
    },
    {
      id: 2,
      completed: false,
      icon: (
        <Clock className={hasCompletedCycle ? "text-green-500" : "text-red-500"} size={24} />
      ),
      title: "Inefficient Processing",
      description: "Processing one alert at a time, missing the big picture"
    },
    {
      id: 3,
      completed: false,
      icon: (
        <ZapOff className={hasCompletedCycle ? "text-green-500" : "text-red-500"} size={24} />
      ),
      title: "Automation Issues",
      description: "More time fixing SOAR automation, less time on real threats"
    }
  ];

  return (
    <div className="space-y-6 max-w-2xl mx-auto w-full">
      {alerts.map((alert) => (
        <div key={alert.id}>
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: alert.id * 0.1 }}
              className="w-[80%] flex backdrop-blur-md border p-4 rounded-xl shadow-lg transition-colors bg-white/10 border-white/30 hover:bg-white/15 gap-2"
            >
              <div className="flex-shrink-0 mt-1">
                {alert.icon}
              </div>
              <div className="text-white">
                <h3 className="font-semibold text-lg">{alert.title}</h3>
                <p className="text-gray-300">{alert.description}</p>
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertMessages;