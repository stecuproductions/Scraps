import { getProductById } from '../../data/products'
import { notFound } from 'next/navigation'
import AnimatedProductDetails from '../../components/products/AnimatedProductDetails'

// Generowanie metadanych (dynamiczne title i description)
export async function generateMetadata({ params }) {
  const product = await getProductById(params.id)

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
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <main className="bg-black text-white">
      <AnimatedProductDetails product={product} />
    </main>
  )
}
