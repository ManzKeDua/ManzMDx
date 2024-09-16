// CREATOR : AGUNG
// NUMBER : 6283125390134 OR wa.me/6283126390134

// MENGGUNAKAN RANDOM PROMPT UNTUK RECOMMENDED

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const recommendations = [
    "Portrait of a cute, funny and adorable cat sitting, realistic texture, detailed and natural",
    "Portrait of a woman wearing a very beautiful and cute white dress cosplaying into a realistic anime, natural texture and detail",
    "A handsome boy, realistic and detailed natural and real realistic textures",
    "Portrait of a very handsome, detailed, realistic KING with natural, soft skin texture.",
    "Portrait of a 5 year old child who is very beautiful, cool, realistic, detailed and has a natural, soft texture",
    "A highly detailed portrait of a woman with natural lighting, realistic skin texture, and soft background.",
    "A very beautiful, detailed, realistic portrait of a QUEEN and KING with a natural, soft skin texture",
    "A very beautiful, detailed, realistic portrait of a QUEEN with a natural, soft skin texture",
    "Portrait of a very beautiful, detailed, realistic young woman with natural, soft skin texture",
    "Girls to Cat anime cosplayer",
    "Girls to Tyger anime cosplayer",
    "Bikini"
];

let handler = async (m, { conn, text }) => {
    // Mengecek apakah prompt disediakan oleh pengguna
    if (!text) return m.reply('Please provide a prompt');

    // Model dan sampler yang digunakan
    const model = '3Guofeng3_v34.safetensors [50f420de]';
    const sampler = 'DPM++ SDE Karras';
    const negativePrompt = 'low quality, blurry, distorted, unnatural, overexposed, underexposed, cartoonish, unrealistic textures, incorrect anatomy, bad lighting, low resolution, grainy, oversaturated, overprocessed, flat colors, poor perspective, bad proportions, artificial, noisy, fake reflections, bad symmetry, pixelated, rough edges, overly stylized, exaggerated features, abstract, disproportionate, low detail, inaccurate, warped, poorly blended, artifacts, rough outlines, over-sharpened, unnatural shadows, glowing edges, low fidelity, misshapen, skewed, synthetic, artificial, surreal, exaggerated lighting, unrealistic shadows'; // Negative prompt default
    const yourPrompt = `${text}`;

    try {
        let { key } = await m.reply(status.wait);
        
        // Menyimpan waktu mulai proses generate
        const startTime = Date.now();

        // Mengirim permintaan ke API
        let response = await axios.get('https://itzpire.com/ai/prodia', {
            params: {
                model: model,
                sampler: sampler,
                prompt: text,
                negative_prompt: negativePrompt
            },
            headers: {
                'accept': 'application/json'
            }
        });

        // Logging respons dari API
        console.log('API Response:', response.data);

        // Mengecek apakah permintaan berhasil
        if (response.data.status === 'success') {
            let imgData = response.data.data; // Ambil data dari respons
            let imageUrl = imgData.img; // URL gambar
            
            // Menyimpan waktu akhir proses generate dan menghitung durasi
            const endTime = Date.now();
            const generationTime = ((endTime - startTime) / 1000).toFixed(2); // Dalam detik

            // Mengambil rekomendasi prompt secara acak
            const randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];

            // Mengirim informasi gambar terlebih dahulu
            let infoMessage = `` +
                              `*Model:* ${model}\n` + 
                              `*Prompt:* ${yourPrompt}\n` + 
                              `*Sampler:* ${sampler}\n` + 
                              `*Negative Prompt:* ${negativePrompt}\n` + 
                              `*Generation Time:* ${generationTime} seconds\n\n` +
                              `_Now generating the image..._`;                                 
            await conn.sendMessage(m.chat, {
              text: infoMessage,
              edit: key,
            });

            // Mendownload gambar dari URL yang diberikan
            let imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            
            // Menyimpan gambar ke file
            let imagePath = path.join(__dirname, 'generated_image.jpeg');
            fs.writeFileSync(imagePath, imageResponse.data);

            // Mengirim gambar ke pengguna
            await conn.sendFile(m.chat, imagePath, 'generated_image.jpeg', `*Recommendation prompt:* _${randomRecommendation}_`, m);

            // Menghapus file gambar setelah dikirim
            fs.unlinkSync(imagePath);
        } else {
            m.reply(`Failed to generate image. API response: ${JSON.stringify(response.data)}`);
        }
    } catch (error) {
        console.error('Error occurred:', error);
        m.reply('An error occurred while processing your request. Please check logs for details.');
    }
};

handler.help = handler.command = ['imgprodia'];
handler.tags = ['internet'];
handler.register = true;
handler.limit = 5;
module.exports = handler;

// UBAH NEGATIVE PROMPT SESUAI KEINGINAN DIRIMU