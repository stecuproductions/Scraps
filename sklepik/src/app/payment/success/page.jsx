'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function SuccessPage() {
  return (
    <motion.div
      className="min-h-screen bg-blue-950 text-white relative overflow-hidden flex items-center justify-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Diagonal pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
            backgroundSize: '10px 10px',
          }}
        />
      </div>

      <motion.div
        className="bg-blue-900/30 backdrop-blur-sm p-10 rounded-lg max-w-md mx-auto text-center border border-blue-800 shadow-2xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <CheckCircle2 className="mx-auto h-16 w-16 text-blue-400" />
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-header font-light tracking-wider mb-4"
        >
          Płatność zakończona sukcesem!
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="font-body text-blue-200 mb-6"
        >
          Dziękujemy za Twój zakup. Twoje zamówienie zostało zrealizowane pomyślnie. Sprawdź swoją skrzynkę e-mail, aby uzyskać więcej informacji na temat zamówienia.
        </motion.p>
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/"
            className="border-2 border-blue-400 text-blue-200 hover:bg-blue-400 hover:text-blue-950 font-body py-3 px-10 rounded-none transition-all duration-300 uppercase tracking-wider text-sm font-medium inline-block"
          >
            Powrót do sklepu
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}