import { motion, AnimatePresence } from "framer-motion";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
}

const Notification = ({
  message,
  type,
  isVisible,
  onClose,
}: NotificationProps) => {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg
                     flex items-center space-x-3 z-50`}
        >
          <span>{message}</span>
          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-full p-1"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
