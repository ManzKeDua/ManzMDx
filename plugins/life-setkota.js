let handler = async (m, { isPrems, conn, text, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]

  if (!/^[a-zA-Z\s]+$/.test(text)) {
    m.reply('• *Example :* .setkota Jakarta');
    return;
  }

  if (!text || text.length < 3 || text.length > 40) {
    m.reply('*Mohon masukkan nama kota yang kamu inginkan dengan benar! Maksimal 40 karakter*');
    return;
  }

  // Set kota pengguna
  user.city = text.trim()

  await conn.reply(m.chat, `Nama kota berhasil diubah menjadi *${text.trim()}*.`, m);
};

handler.help = ['setkota']
handler.tags = ['rpg'];
handler.limit = true
handler.command = /^setkota|setcity$/i;

module.exports = handler