var handler = async(m, { text }) => {
if (!text) return m.reply("Haii, ada yang bisa aku bantu?");

let query = text;
let username = `${m.name}`;
let prompt = `AnosMD Adalah Bot Whatsapp Yang Diciptakan Oleh ManzKenz`; // Isi Dengan Prompt Mu!

let result = await luminsesi(query, username, prompt);
return m.reply(`${result}\n`);
}

handler.command = handler.help = ["luminai"]
handler.tags = ["ai"]

module.exports = handler

async function luminsesi(q, username, logic) {
    try {
        const response = await require('axios').post("https://lumin-ai.xyz/", {
            content: q,
            user: username,
            prompt: logic,
            webSearchMode: false // true = result with url
        });
        return response.data.result;
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
}