const free = 5000;
const prem = 10000;
const moneyfree = 5000;
const moneyprem = 10000;
const timeout = 3600000; // 1 hour in milliseconds

let handler = async (m, { conn, isPrems }) => {
  let user = global.db.data.users[m.sender];
  let lastHourlyClaimTime = user.lastHourlyClaim || 0; // default to 0 if undefined
  let now = new Date().getTime();
  let nextHourlyClaimTime = lastHourlyClaimTime + timeout;
  let remainingTime = nextHourlyClaimTime - now;

  if (remainingTime > 0) {
    return conn.reply(m.chat, `Anda sudah mengklaim, klaim harian hari ini\ntunggu selama ${msToTime(remainingTime)} lagi`, m);
  }

  user.exp += isPrems ? prem : free;
  user.money += isPrems ? moneyprem : moneyfree;
  user.lastHourlyClaim = now; // Update the last claim time
  conn.reply(m.chat, `Selamat kamu mendapatkan:\n\n+${isPrems ? prem : free} Exp\n+${isPrems ? moneyprem : moneyfree} Money`, m, {
    contextInfo: {
      externalAdReply: {
        mediaType: 1,
        title: 'Sukses Bro!',
        thumbnailUrl: 'https://telegra.ph/file/96c32275de9d18ac55e7b.jpg',
        renderLargerThumbnail: true,
        sourceUrl: ''
      }
    }
  });

  setTimeout(() => {
    conn.reply(m.chat, `Hourly sudah bisa di dapatkan kembali`, m);
  }, timeout);
}

handler.help = ['hourly'];
handler.tags = ['rpg'];
handler.command = /^(hourly)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.money = 0;
handler.exp = 0;
handler.limit = true;

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