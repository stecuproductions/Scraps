import {editProductInDb} from "@/lib/db";
import fs from 'fs/promises';
import path from 'path';
export async function PUT(request){
    try{
        const authHeader = request.headers.get("authorization");
        const expectedToken = `${process.env.ADMIN_TOKEN}`;
        if (!authHeader || authHeader!=expectedToken){
            return new Response(JSON.stringify({error: 'Unauthorized'}), {status:401});
        }
        const formData = await request.formData();
        const id = formData.get('id');
        const name = formData.get('name');
        const price = formData.get('price');
        const description = formData.get('description');
        const longDescription = formData.get('longDescription');
        const specifications = JSON.parse(formData.get('specifications'));
        const stock = formData.get('stock');
        const product = {
            id: id,
            name:name,
            price: price,
            description: description,
            longDescription: longDescription,
            specifications: specifications,
            stock: stock
        }
        const result = await editProductInDb(product, id);
        if (result.error == "Product not found"){
            return new Response(JSON.stringify({error: 'Product not found'}), {status: 404});
        }
        return Response.json({success: true, message: 'Product updated successfully'});

    }
    catch(error){
        console.error('Error updating product:', error);
        return new Response(JSON.stringify({error: 'Internal server error'}), {status: 500});
    }
}