'use client';
import { motion } from 'framer-motion';
import ProductCard from '../../UI/ProductCard';
import { products } from '@/app/data/products';

const S2 = () => {
  return (
    <motion.section
      id="oferta"
      className="bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col gap-8 px-4 md:px-8 lg:px-16 justify-center py-16 mx-auto">
        <motion.div
          className="flex flex-col items-center gap-4 w-fit self-center"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light font-header text-center">
            Nasza kolekcja
          </h1>
          <div className="h-0.5 w-full bg-blue-600"></div>
        </motion.div>

        <motion.div
          className="flex flex-row flex-wrap gap-8  justify-center lg:gap-12 mt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default S2;
