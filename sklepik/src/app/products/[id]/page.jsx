import { getProductById } from '../../data/products'
import { notFound } from 'next/navigation'
import AnimatedProductDetails from '../../components/products/AnimatedProductDetails'

// Generowanie metadanych (dynamiczne title i description)
export async function generateMetadata({ params }) {
  // Ensure params is fully resolved before accessing its properties
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: `${product.name} | SCRAPS`,
    description: product.description,
  }
}

// Strona produktu
export default async function ProductPage({ params }) {
  // Ensure params is fully resolved before accessing its properties
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id)

  if (!product) {
    notFound()
  }

  return (
    <main className="bg-black text-white">
      <AnimatedProductDetails product={product} />
    </main>
  )
}