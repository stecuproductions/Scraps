import cloudinary from '@/lib/cloudinary';
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
    const specifications = JSON.parse(formData.get('specifications') );

    const product = {
      name,
      price,
      description,
      stock,
      longDescription,
      specifications
    };

    const newId = await addProductToDb(product);

    const images = formData.getAll('images');
    const uploadedUrls = [];

    let index = 1;

    for (const image of images) {
      if (typeof image === 'object' && 'arrayBuffer' in image) {
        const buffer = Buffer.from(await image.arrayBuffer());

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: 'products',
              public_id: `p${newId}_${index++}`,
              overwrite: true,
              resource_type: 'image'
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(buffer);
        });

        const { secure_url } = uploadResult;
        uploadedUrls.push(secure_url);
        console.log('Uploaded image URL:', secure_url);
      }
    }

    await addImagesToProductInDb(newId, uploadedUrls);

    return new Response(JSON.stringify({ id: newId, images: uploadedUrls }), {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (err) {
    console.error('Error during upload:', err);
    return new Response(JSON.stringify({ error: 'Upload failed' }), {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }
}
