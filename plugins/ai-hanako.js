const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const name = conn.getName(m.sender);
  if (!text) {
    throw `Hai *${name}*, apakah kamu ingin bicara? tanggapi dengan *${usedPrefix + command}* (pesan dalam bahasa inggris)\n\n⌕ Contoh: *${usedPrefix + command}* Hi`;
  }

  const uid = encodeURIComponent(m.sender);
  const msg = encodeURIComponent(text);

  const res = await fetch(`http://api.brainshop.ai/get?bid=176023&key=LDSYmkI28NH1qFuN&uid=${uid}&msg=${msg}`);
  const json = await res.json();

  if (json.cnt) {
    const reply = json.cnt;
    const caption = "*- H A N A K O -*\n\n" + reply; // Menambahkan judul di bawah gambar
    conn.sendFile(m.chat, 'https://telegra.ph/file/d93b2d5c4b743041394b1.jpg', 'gambar.jpg', caption, m);
  } else {
    throw json;
  }
};

handler.help = ['hanako'];
handler.tags = ['ai'];
handler.command = ['hanako'];
handler.limit = true;

module.exports = handler;