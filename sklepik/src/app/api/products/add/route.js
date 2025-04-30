import fs from 'fs/promises';
import path from 'path';
import { addProductToDb, addImagesToProductInDb } from '@/lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const expectedToken = `${process.env.ADMIN_TOKEN}`;

    if (!authHeader || authHeader !== expectedToken) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    const formData = await request.formData();

    const name = formData.get('name');
    const price = formData.get('price');
    const description = formData.get('description');
    const longDescription = formData.get('longDescription');
    const stock = formData.get('stock');
    const specifications = JSON.parse(formData.get('specifications'));

    const product = {
      name,
      price,
      description,
      stock,
      longDescription,
      specifications
    };

    const newId = await addProductToDb(product);

    const uploadDir = path.join(process.cwd(), 'public/images/products');
    await fs.mkdir(uploadDir, { recursive: true });

    const images = formData.getAll('images');
    const insertedUrls = [];

    let index = 1;

    for (const image of images) {
      if (typeof image === 'object' && 'arrayBuffer' in image) {
        const buffer = Buffer.from(await image.arrayBuffer());
        const ext = path.extname(image.name) || '.webp';
        const filename = `p${newId}_${index++}${ext}`;
        const filepath = path.join(uploadDir, filename);

        await fs.writeFile(filepath, buffer);
        insertedUrls.push(`/images/products/${filename}`);
      }
    }

    await addImagesToProductInDb(newId, insertedUrls);

    return Response.json({ id: newId, images: insertedUrls });

  } catch (err) {
    console.error('Error during upload:', err);
    return new Response(JSON.stringify({ error: 'Upload failed' }), { status: 500 },     {headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type",}},);
  }
}
