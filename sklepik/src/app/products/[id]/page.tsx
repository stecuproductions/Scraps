import { getProductById } from "../../data/products";
import { notFound } from "next/navigation";
import AnimatedProductDetails from "../../components/products/AnimatedProductDetails";
import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

export  function generateMetadata({ params }: Props): Promise<Metadata> {
  const product =  getProductById(params.id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | SCRAPS`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-black text-white">
      <AnimatedProductDetails product={product} />
    </main>
  );
}
