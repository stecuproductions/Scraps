"use client";

import { products } from "../data/products";
import ProductCard from "../UI/ProductCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const headerVariants = {
    hidden: { y: -30, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.1
      }
    }
  };
  
  return (
    <main className="bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <motion.div 
          className="mb-12"
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          variants={headerVariants}
        >
          <h1 className="text-4xl md:text-5xl font-light text-white font-header text-center">
            Our Products
          </h1>
          <motion.div 
            className="h-0.5 bg-blue-600 mx-auto mt-4"
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ delay: 0.5, duration: 0.6 }}
          ></motion.div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}