import { createClient } from "@supabase/supabase-js";
import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const supabaseUrl = "https://rzjngptlkwxpyisqrwtr.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

async function createPost(content, images, user) {
    let message = await supabase.from("posts").insert({
        content: content,
        images: images,
        user: user
    });
    console.log(message.error || "POST SUCCESSFULLY CREATED");
    return message;
}

app.post("/post", async function (req, res) {
    res.json(await createPost(req.body.content, req.body.images, req.body.user));
});

app.use(express.static(path.join(__dirname, 'public')));
app.createServer(app).listen(8000);