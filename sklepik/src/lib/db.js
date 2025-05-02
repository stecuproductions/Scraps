import {Pool} from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { error } from 'console';
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function getProductsFromDb(){
    const res = await pool.query('SELECT * FROM products');
    return res.rows;
}

export async function getImagesFromDb(){
    const res = await pool.query('SELECT * FROM products_images');
    return res.rows;
}

export  const addProductToDb = async (product) => {
   
    const { name, description, price, stock, longDescription, specifications } = product;

    const insertProduct = await pool.query(
        `INSERT INTO products (name, description, price, stock, long_description, specifications)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [name, description, price, stock, longDescription, JSON.stringify(specifications)]
      );
    return insertProduct.rows[0].id;

}

export async function addImagesToProductInDb(productId, imageUrls) {
    for(const imageUrl of imageUrls) {
        await pool.query(
            'INSERT INTO products_images (product_id, image_url) VALUES ($1, $2)',
            [productId, imageUrl]
        );
    }
}

export async function getProductImagesFromDb(productId){
    const result = await pool.query('SELECT  image_url FROM products_images WHERE product_id = $1', [productId]);
    return result.rows;
}

export async function deleteProductFromDb(productId){
    await pool.query('DELETE FROM products p WHERE p.id = $1 ', [productId]);
    await pool.query('DELETE FROM products_images p WHERE p.product_id=$1', [productId]);
}

export async function addNewsletterSubscriberToDB(email) {
    const result = await pool.query('SELECT COUNT(email) AS count FROM newsletter_subscribers WHERE email = $1', [email]);
  
    if (parseInt(result.rows[0].count) > 0) {
        return { error: "Email already exists"};
    }
  
    await pool.query('INSERT INTO newsletter_subscribers (email) VALUES ($1)', [email]);
    
    return { success: true, message: 'Email zapisany pomyślnie.' };
  }
  

export async function editProductInDb(product, id){
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    if (result.rows.length === 0) {
        return {error: 'Product not found'};
    }
    await pool.query(
        `UPDATE products SET name = $1, price = $2, description = $3, long_description = $4, specifications = $5, stock = $6 WHERE id = $7`,
        [product.name, product.price, product.description, product.longDescription, JSON.stringify(product.specifications), product.stock, id]
    );

    return {success: true};    
}

export async function getNewsletterSubscribersFromDB() {
    const result = await pool.query('SELECT * FROM newsletter_subscribers');
    return result.rows;
    
  }