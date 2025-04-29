import {getProductsFromDb, getImagesFromDb} from "@/lib/db";
import { NextResponse } from 'next/server';
import fs from 'fs/promises';

export async function GET(){
    try{
        const productsNoImages =  await getProductsFromDb();
        const images = await getImagesFromDb();
        const products = await getProductsFromDb();
        const productsWithImages = productsNoImages.map((product) => {
        const productImages = images.filter((image) => image.product_id === product.id);
            return {
                ...product,
                images: productImages.map((image) => image.image_url),
            };
        });
        return NextResponse.json(productsWithImages);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}