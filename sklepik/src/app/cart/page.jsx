'use client';

import { useCart } from '../data/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Plus, Minus, ShoppingBag, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Animation variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CartPage() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [checkoutClicked, setCheckoutClicked] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setCheckoutClicked(true);
    router.push('/payment');
  };

  return (
    <motion.div 
      className="min-h-screen bg-blue-950 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Subtle diagonal pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
            backgroundSize: '10px 10px',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mb-12"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-header font-light tracking-wider text-center mb-6"
            variants={itemVariants}
          >
            TWÓJ KOSZYK
          </motion.h1>
          
          <motion.div
            className="flex justify-center"
            variants={itemVariants}
          >
            <Link 
              href="/" 
              className="flex items-center text-sm font-body text-blue-200 hover:text-white transition-colors"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Kontynuuj zakupy
            </Link>
          </motion.div>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-16 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants}>
              <ShoppingBag className="h-16 w-16 mb-6 text-blue-300" />
            </motion.div>
            <motion.h2 
              className="text-2xl font-header mb-2"
              variants={itemVariants}
            >
              Twój koszyk jest pusty
            </motion.h2>
            <motion.p 
              className="font-body text-blue-200 mb-8 max-w-md"
              variants={itemVariants}
            >
              Wygląda na to, że nie dodałeś jeszcze żadnych produktów do koszyka
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link 
                href="/" 
                className="border-2 border-blue-400 text-blue-200 hover:bg-blue-400 hover:text-blue-950 font-body py-3 px-10 rounded-none transition-all duration-300 uppercase tracking-wider text-sm font-medium inline-block"
              >
                Wróć do sklepu
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Cart Items - Takes up 8 columns on larger screens */}
            <motion.div 
              className="lg:col-span-8"
              variants={itemVariants}
            >
              <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800 shadow-lg">
                {/* Cart Header */}
                <div className="px-6 py-4 border-b border-gray-800 flex justify-between">
                  <h3 className="font-header text-xl">
                    Produkty ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                  </h3>
                  <button 
                    onClick={clearCart}
                    className="text-blue-200 hover:text-white transition-colors font-body text-sm"
                  >
                    Wyczyść koszyk
                  </button>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-gray-800">
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id} 
                        className="p-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex flex-col sm:flex-row gap-6">
                          {/* Product Image */}
                          <div className="relative max-w-64   lg:w-36 lg:min-w-none rounded-lg overflow-hidden ">
                            {item.images && item.images[0] ? (
                              <Image
                                src={item.images[0]}
                                alt={item.name}
                                layout='responsive'
                                width={800}
                                height={600}
                                quality={100}
                                className="rounded-lg"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                <X className="h-6 w-6 text-gray-500" />
                              </div>
                            )}
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                              <div>
                                <h3 className="font-header text-xl border-b border-gray-700 hover:border-white pb-1 w-fit transition-colors">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-blue-200 font-body mt-2 max-w-md">
                                  {item.description ? item.description.substring(0, 100) + (item.description.length > 100 ? '...' : '') : ''}
                                </p>
                              </div>
                              
                              <div className="font-header text-2xl whitespace-nowrap">
                                {item.price.toFixed(2)} zł
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-end mt-4">
                              <div className="flex items-center gap-4 bg-blue-950/80 rounded-lg p-2 border border-gray-800">
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-900/50 transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="font-body w-6 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => addToCart(item)}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-900/50 transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <div className="font-header text-2xl text-blue-200">
                                {(item.price * item.quantity).toFixed(2)} zł
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Order Summary - Takes up 4 columns on larger screens */}
            <motion.div 
              className="lg:col-span-4"
              variants={itemVariants}
            >
              <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-800 shadow-lg sticky top-24">
                <div className="p-6">
                  <h3 className="font-header text-2xl border-b border-gray-800 pb-4 mb-6">
                    Podsumowanie
                  </h3>

                  {/* Summary Details */}
                  <div className="space-y-3 font-body">
                    <div className="flex justify-between text-blue-200">
                      <span>Ilość produktów:</span>
                      <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                    </div>

                    {cart.map((item) => (
                      <div key={`summary-${item.id}`} className="flex justify-between text-sm">
                        <span>{item.name} (x{item.quantity}):</span>
                        <span>{(item.price * item.quantity).toFixed(2)} zł</span>
                      </div>
                    ))}

                    <div className="pt-6 mt-6 border-t border-gray-800 flex justify-between">
                      <span className="font-header text-xl">Łącznie:</span>
                      <span className="font-header text-2xl">{totalPrice.toFixed(2)} zł</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    onClick={handleCheckout}
                    className="w-full mt-8 border-2 border-blue-400 text-blue-200 hover:bg-blue-400 hover:text-blue-950 font-body py-3 px-6 rounded-none transition-all duration-300 uppercase tracking-wider text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    KUP TERAZ
                  </motion.button>

                  <div className="mt-4 text-center text-xs text-blue-200/70">
                    <p>Bezpieczna płatność i szybka dostawa</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}