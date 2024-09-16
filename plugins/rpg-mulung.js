const timeout = 1800000;

let handler = async (m, { conn, usedPrefix, text }) => {
  let user = global.db.data.users[m.sender];
  let time = user.lastmulung + 1800000;
  if (new Date - user.lastmulung < 1800000) throw `Anda sudah lelah untuk mulung\nTunggu selama ${msToTime(time - new Date())} lagi`;
  if (user.stamina < 10) throw `Stamina anda tidak cukup untuk mulung. Silakan istirahat atau konsumsi item tertentu untuk mengembalikan stamina.`;

  let botolnye = Math.floor(Math.random() * 1000);
  let kalengnye = Math.floor(Math.random() * 1000);
  let kardusnye = Math.floor(Math.random() * 1000);

  let totalEarned = (botolnye + kalengnye + kardusnye) * 50;

  user.money += totalEarned;
  user.stamina -= 10;
  user.lastmulung = new Date * 1;

  conn.reply(m.chat, `Selamat kamu mendapatkan :\n+${botolnye} 🍼 Botol\n+${kardusnye} 📦 Kardus\n+${kalengnye} 🥫 Kaleng\n\n_Stamina anda berkurang_ 10\n\n> Semua hasil mulung anda telah terjual otomatis.\n\n- Uang yang di dapatkan : ${totalEarned}`, m, {
    contextInfo: {
        externalAdReply: {
            mediaType: 1,
            title: 'Berhasil Mulung!',
            thumbnailUrl: 'https://telegra.ph/file/ffd5d9cbab2957f760141.jpg',
            renderLargerThumbnail: true,
            sourceUrl: ''
        }
    }
  });

  setTimeout(() => {
    conn.reply(m.chat, `Yuk waktunya mulung lagi 😅`, m);
  }, timeout);
};

handler.help = ['mulung'];
handler.tags = ['rpg'];
handler.command = /^(mulung)/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = true;
handler.private = false;

handler.admin = false;
handler.botAdmin = false;

handler.fail = null;
handler.limit = true;
handler.exp = 0;
handler.money = 0;

module.exports = handler;

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + " jam " + minutes + " menit " + seconds + " detik";
}