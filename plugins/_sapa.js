let handler = m => m
handler.before = async function(m, { conn, participants, isPrems, isAdmin }) {

    let name = m.sender
    let fkonn= { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '0@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${await conn.getName(name)}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
  // Inisialisasi state jika belum ada
  if (!conn.danil_join) {
    conn.danil_join = {
      join: false,
      time: 0,
    };
  }

  const currentTime = Math.floor(Date.now() / 1000);

  // Cek apakah pesan berasal dari grup dan apakah sudah memenuhi cooldown
  if (!m.isGroup || conn.danil_join.time > currentTime) {
    console.log("Not a group message or still in cooldown");
    return;
  }

  // Cek apakah pengirim adalah user premium
  const isOwners = global.db.data.users[m.chat]?.owners;

  let messageText = "";
  let mentionedUsers = participants.map((u) => u.id).filter((v) => v !== conn.user.jid);

  // Logika sambutan berdasarkan nomor pengirim
  switch (m.sender) {
    case `${global.owner}@s.whatsapp.net`:
      messageText = global.status.sapa;
      break;
    case "6288989721627@s.whatsapp.net":
      messageText = "Hi Manz, *Are u ok ?*";
      break;
    default:
      if (isPrems) {
        messageText = "Selamat Datang, User *Premium Ku*!";
      }
      break;
  }

  // Kirim pesan jika ada teks sambutan yang harus dikirim
  if (messageText) {
    await conn.sendMessage(
      m.chat,
      {
        text: messageText,
      },
      {
        quoted: fkonn,
        mentions: mentionedUsers,
      }
    );

    // Atur ulang state danil_join untuk cooldown
    conn.danil_join = {
      join: true,
      time: currentTime + 600, // Cooldown 2 detik
    };
  } else {
    console.log("No message to send");
  }
}

module.exports = handler