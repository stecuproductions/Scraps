import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loadProducts() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!API_URL) throw new Error('Brakuje NEXT_PUBLIC_API_URL');

  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // zwróć pustą tablicę na błędzie
  }
}
 export const  products = await loadProducts();


export function getProductById(id) {
  return products.find((product) => product.id === parseInt(id));
}


