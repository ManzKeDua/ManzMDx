let handler = async (m, { conn, text, usedPrefix, command }) => {
  const user = global.db.data.users[m.sender]

  if (!user) {
    throw '*Kamu belum terdaftar di database!*'
  }

  if (!text || !['korps', 'demon'].includes(text.toLowerCase())) {
    throw `
Silakan pilih grup anda:
- *Korps*
- *Demon*
Contoh: *${usedPrefix}${command} korps*
`.trim()
  }

  // Pengecekan apakah pengguna sudah bergabung dengan salah satu grup sebelumnya
  if (user.korps) {
    if (text.toLowerCase() === 'demon') {
      if (user.demonblood >= 100) {
        user.korps = false
        user.demon = true
        conn.reply(m.chat, `Anda telah berhasil berubah menjadi *Iblis* setelah mengumpulkan 100 demonblood.`, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'AXELLDX',
                    thumbnailUrl: 'https://telegra.ph/file/5e4e60aa8cdd596bfabe1.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        })
      } else {
        conn.reply(m.chat, `Anda membutuhkan 100 demonblood untuk berubah menjadi *Iblis*. Kamu saat ini memiliki ${user.demonblood} demonblood.`, m)
      }
    } else {
      throw 'Kamu sudah bergabung dengan *Korps* dan tidak bisa mengganti ke grup lain.\n\n_Anda bisa bergabung dengan iblis dengan syarat mengumpulkan 100 demonblood_.'
    }
  } else if (user.demon) {
    throw '*Kamu sudah bergabung dengan satu grup!*\n_dan tidak mengganti lagi_.'
  } else {
    // Set grup pengguna
    if (text.toLowerCase() === 'korps') {
      user.korps = true
      conn.reply(m.chat, `Anda telah bergabung dengan *Korps Pembasmi Iblis*.`, m, {
              contextInfo: {
                  externalAdReply: {
                      mediaType: 1,
                      title: 'Manz',
                      thumbnailUrl: 'https://telegra.ph/file/45fa1695133c8a2a57856.jpg',
                      renderLargerThumbnail: true,
                      sourceUrl: ''
                  }
              }
          })
    } else {
      user.demon = true
      conn.reply(m.chat, `Anda telah bergabung dengan *Iblis*`, m, {
              contextInfo: {
                  externalAdReply: {
                      mediaType: 1,
                      title: 'Manz',
                      thumbnailUrl: 'https://telegra.ph/file/5e4e60aa8cdd596bfabe1.jpg',
                      renderLargerThumbnail: true,
                      sourceUrl: ''
                  }
              }
          })
    }
  }
}

handler.help = ['setslayer']
handler.tags = ['rpg']
handler.command = /^setslayer$/i

module.exports = handler