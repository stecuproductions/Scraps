import ProductCard from '../../UI/ProductCard'
import { products } from '@/app/data/products';
const S2 = () => {

  return (
    <section id="oferta" className="bg-black">
        <div className='flex flex-col gap-8 px-4 md:px-8 lg:px-16 justify-center py-16   mx-auto'>
            <div className='flex flex-col items-center gap-4 w-fit self-center'>
                <h1 className='text-white text-3xl md:text-4xl lg:text-5xl font-light font-header text-center'>Nasza kolekcja</h1>
                <div className='h-0.5 w-full bg-blue-600'></div>
            </div>
            <div className='flex flex-row flex-wrap gap-8 lg:gap-12 mt-8'>
                {products.map((product, index) => (
                    <ProductCard key={index} product={product}  />
                ))}
            </div>
        </div>
    </section>
  );
};

export default S2;