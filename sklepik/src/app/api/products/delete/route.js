import { deleteProductFromDb,  getProductImagesFromDb } from '@/lib/db';
import path from 'path';
import fs from 'fs/promises';


export async function DELETE(req) {
  try {
    const authHeader = req.headers.get('authorization');
    const expectedToken = process.env.ADMIN_TOKEN;

    if (!authHeader || authHeader !== expectedToken) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const formData = await req.formData();
    const productId = formData.get("id");

    if (!productId) {
      return new Response(JSON.stringify({ error: "Product ID is required" }), { status: 400 });
    }
    
    const imagesResult = await getProductImagesFromDb(productId );
    const imageUrls = imagesResult.map((image)=>image.image_url);

    for(const imageUrl of imageUrls ){

        await fs.unlink(path.join(process.cwd(), "public", imageUrl));
    }

        await deleteProductFromDb(productId);

    return new Response(JSON.stringify({ status: 200, success: true }), { status: 200 }, {headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type",}},);
    
  } catch (error) {
    console.error('DELETE error:', error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 }, {headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type",}},);
  }
}
