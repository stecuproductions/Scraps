import validator from "validator";
import {addNewsletterSubscriberToDB} from "@/lib/db";
export async function POST(request) {
    try {
        const formData = await request.formData();
        const email = formData.get('email');
        if (!validator.isEmail(email)) return new Response(JSON.stringify({error:"Invalid email error"}),{status:400});
        addNewsletterSubscriberToDB(email);
        return new Response({ status: 200 });
    } catch(error){
        return new Response(JSON.stringify({error:"Internal server error"}), {status:500});
    }
}