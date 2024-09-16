/** !! THIS CODE GENERATE BY RODOTZ X ZHUBOT !! **/

const PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, participants }) => {
  if (participants.length === 0) {
    return conn.reply(m.chat, 'Tidak ada anggota di grup.', m);
  }
  const member = participants.map(u => u.id).filter(v => v !== conn.user.jid);
  if (member.length === 0) {
    return conn.reply(m.chat, 'Tidak ada anggota non-bot di grup.', m);
  }
  const phoneNumber = member[Math.floor(Math.random() * member.length)];
  const waLink = `https://wa.me/${phoneNumber.split("@")[0]}`;
  await delay(1000);
  conn.reply(m.chat, 'Sedang mencari...', m);
  await delay(4000);
  conn.reply(m.chat, 'Berhasil mendapatkan satu orang', m);
  await delay(3000);
  conn.sendMessage(m.chat, { text: `Nih Kak ${phoneNumber.split("@")[0]}\n\n${waLink}` }, m);
};
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
handler.help = ['caritemangc', 'carikawangc'];
handler.tags = ['group'];
handler.command = /^(caritemangc|carikawangc)$/i;
handler.owner = false
handler.group = true
module.exports = handler