let handler = async (m, { conn, text, usedPrefix, command }) => {
  let dapat = Math.floor(Math.random() * 100000);
  let healtu = Math.floor(Math.random() * 100);
  let nomors = m.sender;
  let who;

  if (m.isGroup) who = m.mentionedJid[0];
  else who = m.chat;

  if (!who) return conn.reply(m.chat, 'Tag salah satu lah', m);

  if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam database';

  let __timers = new Date - global.db.data.users[m.sender].lastbunuhi;
  let _timers = 3600000 - __timers; 
  let timers = clockString(_timers);
  let users = global.db.data.users;

  if (!users[m.sender].pisau || users[m.sender].pisau < 1) {
    return conn.reply(m.chat, 'Anda tidak memiliki pisau untuk membunuh seseorang, buatlah pisau terlebih dahulu dengan cara *.craft pisau*', m);
  }

  if (new Date() - global.db.data.users[m.sender].lastbunuhi > 3600000) {
    if (users[who].health < 10) throw 'Target sudah tidak memiliki health';
    if (users[who].money < 100) throw 'Target tidak memiliki apapun :(';

    // Probabilitas kegagalan
    let successRate = 0.5; // 50% berhasil, 50% gagal
    if (Math.random() > successRate) {
      // Gagal dan tertangkap polisi
      users[m.sender].money = Math.max(users[m.sender].money - 1000000, 0); // Denda polisi
      conn.reply(m.chat, `Anda gagal membunuh target dan tertangkap polisi! Uang kamu dikurangi sebesar 1000000 money.`, m, {
        contextInfo: {
          externalAdReply: {
            mediaType: 1,
            title: 'ManzKenz',
            thumbnailUrl: 'https://telegra.ph/file/f50aee000a3c54df54e7e.jpg',
            renderLargerThumbnail: true,
            sourceUrl: ''
          }
        }
      });
    } else {
      // Berhasil membunuh
      users[who].health -= healtu * users[m.sender].pisau;
      users[who].money -= dapat;
      users[m.sender].money += dapat;
      global.db.data.users[m.sender].lastbunuhi = new Date();

      conn.reply(m.chat, `Target berhasil dibunuh dan kamu mengambil money target sebesar\n${dapat} Money\nDarah target berkurang -${healtu * users[m.sender].pisau} Health`, m, {
        contextInfo: {
          externalAdReply: {
            mediaType: 1,
            title: 'ManzKenz',
            thumbnailUrl: 'https://telegra.ph/file/8995bb9a2c28c99c57d50.jpg',
            renderLargerThumbnail: true,
            sourceUrl: ''
          }
        }
      });
    }
  } else {
    conn.reply(m.chat, `Anda sudah membunuh orang dan berhasil sembunyi, tunggu ${timers} untuk membunuhnya lagi`, m);
  }
}

handler.help = ['membunuh *@user*'];
handler.tags = ['rpg'];
handler.command = /^membunuh$/;
handler.limit = true;
handler.group = true;

module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}