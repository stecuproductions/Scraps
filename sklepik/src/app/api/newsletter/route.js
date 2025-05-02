import validator from "validator";
import {addNewsletterSubscriberToDB, getNewsletterSubscribersFromDB} from "@/lib/db";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email');

    if (!email || typeof email !== "string" || !validator.isEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400 });
    }

    await addNewsletterSubscriberToDB(email);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
}

export async function GET(request) {
  try {
    const authHeader = request.headers.get('authorization');
    const expectedToken = `${process.env.ADMIN_TOKEN}`;

    if (!authHeader || authHeader !== expectedToken) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const subscribers = await getNewsletterSubscribersFromDB();
    
    return new Response(JSON.stringify({ subscribers }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
}
