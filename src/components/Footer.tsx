import React from 'react';
import { Instagram, Send, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterProps {
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome }) => {
  return (
    <footer className="fixed bottom-0 left-0 z-40 w-full glass-dark bg-black/50 backdrop-blur-md">
      <div className="flex flex-col items-center justify-between px-6 py-4 mx-auto space-y-4 max-w-7xl sm:flex-row sm:space-y-0">
        
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-3 cursor-pointer"
          onClick={onNavigateHome}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 pulse-glow"
            whileHover={{ rotate: 10 }}
          >
            <span className="text-lg font-bold text-white">م</span>
          </motion.div>
          <motion.span 
            className="text-lg font-bold text-white"
            whileHover={{ x: 3 }}
          >
            AlMumin
          </motion.span>
        </motion.div>

        {/* Social links */}
        <div className="flex items-center space-x-6">
          <motion.a
            href="https://instagram.com/secretly_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
            whileHover={{ scale: 1.2 }}
          >
            <Instagram className="w-5 h-5" />
          </motion.a>

          <motion.a
            href="https://t.me/abubakr_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
            whileHover={{ scale: 1.2 }}
          >
            <Send className="w-5 h-5" />
          </motion.a>

          <motion.a
            href="https://t.me/nur_al_mumin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
            whileHover={{ scale: 1.2 }}
          >
            <MessageCircle className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};
