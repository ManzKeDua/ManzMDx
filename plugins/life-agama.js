async function handler(m, { isPrems, conn, text, usedPrefix, command }) {
  const userData = global.db.data.users[m.sender];

  if (!userData) {
    throw 'Data pengguna tidak ditemukan';
    return;
  }

  if (userData.jail === true) {
    throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*';
    return;
  }
  if (userData.verified == true) {
    throw `*Kamu sudah terverifikasi, tidak bisa ganti agama*\nHubungi wa.me/${global.nomorown} untuk mengganti`;
    return;
  }

  if (userData.agama !== "-" && isPrems == false && userData.gamepass < 1) {
    throw '*Agama pengguna hanya bisa diatur satu kali saja.*\n💳 atau gunakan gamepass';
    return;
  }

  if (!text || !['islam', 'kristen', 'katolik', 'unknown', 'yahudi', 'hindu', 'buddha'].includes(text.toLowerCase())) {
    throw `
Silakan pilih agama yang kamu anut:
- *Islam*  🕌
- *Kristen*  ⛪️
- *Katolik*  📿
- *Yahudi*  🕍
- *Hindu*  🕉️
- *Buddha*  ☸️
- *Unknown* ❓
Contoh: *${usedPrefix}${command} islam*
`.trim();
    return;
  }

  // Set agama pengguna
  userData.agama = text.toLowerCase();

  let agama = `${text}`;
  let kapital = capitalizeFirstLetter(agama);
  conn.reply(m.chat, `Agama berhasil diatur sebagai *${kapital}*  ${text.toLowerCase() === 'islam' ? '🕌' : text.toLowerCase() === 'kristen' ? '⛪️' : text.toLowerCase() === 'katolik' ? '📿' : text.toLowerCase() === 'unknown' ? '❓' : text.toLowerCase() === 'yahudi' ? '🕍' : text.toLowerCase() === 'hindu' ? '🕉️' : '☸️'}.`, m);

  if (userData.gamepass >= 1 && isPrems == false && userData.agama != '-') {
    userData.gamepass -= 1;
    m.reply('*-1 💳 gamepass*');
  }
}
handler.help = ['setagama'];
handler.tags = ['life'];
handler.command = /^setagama$/i;

module.exports = handler;

function capitalizeFirstLetter(str) {
  // Memisahkan string menjadi array kata-kata
  let words = str.split(" ");

  // Loop melalui setiap kata
  for (let i = 0; i < words.length; i++) {
    // Ubah huruf pertama dalam setiap kata menjadi besar
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }

  // Gabungkan kembali kata-kata menjadi satu string
  return words.join(" ");
}