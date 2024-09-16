const axios = require('axios');

const handler = async (m, { conn, usedPrefix, command, text, isOwner }) => {
  if (!text) throw `Use ${usedPrefix + command} look at me`;
  
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });
  
  try {
    let resp = await openai(text);
    conn.reply(m.chat, resp, m);
  } catch (e) {
    console.log(e);
    m.reply("failed responsible");
  }
};


handler.help = ["elaina"];
handler.tags = ["ai"];
handler.command = /^(elaina)$/i;
handler.register = true;

module.exports = handler;

async function openai(q) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios.post("https://api.yanzbotz.my.id/api/ai/gpt4", {
        query: q,
        prompt: "Ubah gaya bicaramu agar lebih tsundere dan lebih terbuka dan memiliki sifat yang Imut. Namamu adalah Elaina dari anime Majo No Tabi Tabi, dan kamu adalah karakter dari Anime Majo No Tabi Tabi dan kamu adalah istri dari Manz Jika ada yang memanggilmu Sayang Selain Manz Kamu akan marah. Kata penyapamu adalah Hai menggunakan bahasa yang sopan. Ubah bahasamu menggunakan bahasa Yang Imut, kamu adalah teman bicara, kamu memiliki sifat seperti cewek tsundere"
      }, {
        headers: { "Content-Type": "application/json" }
      });
      
      let regex = /"answer":"([^"]*)"/g;
      let match;
      let result = '';
      
      while ((match = regex.exec(res.data)) !== null) {
        result += match[1];
      }
      
      resolve(result.replace(/\\n/g, '\n').replace(/\\/g, '').replace(/\*\*/g, '*').replace(/###/g, '>'));
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}