import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
      <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg max-w-xl mx-auto text-center border border-gray-700">
        <h1 className="text-4xl text-white font-header mb-4">Product Not Found</h1>
        <p className="text-gray-300 mb-8">
          Sorry, the product you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors">
          Browse All Products
        </Link>
      </div>
    </div>
  );
}