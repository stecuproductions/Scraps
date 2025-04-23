'use client';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [cureentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Handle add to cart with animation
  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation if inside a link
    setIsAddingToCart(true);

    // Call the passed onAddToCart function
    onAddToCart && onAddToCart(product);

    // Reset animation state after a short delay
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 600);
  };

  return (
    <motion.div
      className={`flex lg:flex-1 flex-col gap-4 justify-center rounded-lg mx-auto max-w-[500px] lg:min-w-[500px]  bg-gray-900/40 backdrop-blur-sm p-3 border border-gray-800 transition-all `}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden rounded-lg group    ">
        <AnimatePresence mode="wait">
          <motion.div
            key={cureentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={product.images[cureentImageIndex]}
              alt={product.name}
              layout="responsive" // <-- kluczowe!
              width={800}         // dowolna wartość (określa proporcje)
              height={600}
              quality={100}
              objectFit="contain" // <-- to zostaje
              className="rounded-lg shadow-lg"
              onClick={() =>
                setCurrentImageIndex(
                  (cureentImageIndex + 1) % product.images.length
                )
              }
            />
          </motion.div>
        </AnimatePresence>

        {/* Image navigation circles */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${index === cureentImageIndex
                    ? 'bg-white shadow-glow'
                    : 'bg-gray-500/70 hover:bg-gray-300'
                  }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Image counter */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full z-10">
          {cureentImageIndex + 1} / {product.images.length}
        </div>
      </div>

      <div className="flex gap-3 flex-col pl-2">
        <Link href={`/products/${product.id}`} className="text-white text-2xl border-b border-gray-700 hover:border-white pb-1 w-fit font-header transition-colors">
          {product.name}
        </Link>
        <p className="text-base text-gray-300 text-body">{product.description}</p>
        <div className="flex justify-between items-center mt-1">
          <p className="text-white text-3xl font-header">{product.price} zł</p>
          <div className="flex gap-2">

            <Link href={`/products/${product.id}`}>
              <motion.button
                className="border-2 border-blue-400 text-blue-200 hover:bg-blue-400 hover:text-blue-950 py-3 px-6 rounded-none transition-all duration-300 uppercase tracking-wider text-sm font-medium"
                whileTap={{ scale: 0.95 }}
              >
                Więcej
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

    </motion.div>
  );
}

export default ProductCard;