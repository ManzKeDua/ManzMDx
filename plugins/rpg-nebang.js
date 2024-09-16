const timeout = 3600000

let handler = async (m, { conn, usedPrefix, text }) => {
  let user = global.db.data.users[m.sender]
  let time = user.lastnebang + 3600000

  if (new Date - user.lastnebang < 3600000) throw `Anda sudah menebang\nMohon tunggu hasil tebangan mu\nTunggu selama ${msToTime(time - new Date())} lagi`
  if (user.stamina < 10) throw `Stamina anda tidak cukup untuk menebang. Silakan istirahat atau konsumsi item tertentu untuk mengembalikan stamina.`
  if (!user.axe || user.axedurability <= 0) throw `Kamu tidak memiliki Axe 🪓 yang layak, tolong .craft axe untuk menebang.`

  let kayus = `${Math.floor(Math.random() * 1000)}`.trim()
  
  user.kayu += kayus * 1
  user.tiketcoin += 1
  user.stamina -= 10
  user.lastnebang = new Date * 1
  user.axedurability -= 1 // Decrease the axe durability by 1 after using it
  
  conn.reply(m.chat, `Selamat kamu mendapatkan :\n+${kayus} 🪵 Kayu\n+1 🎟️ Tiketcoin\n\nStamina anda berkurang 10\nDurability Axe kamu: ${user.axedurability}`, m, {
    contextInfo: {
        externalAdReply: {
            mediaType: 1,
            title: 'Berhasil Menebang Pohon!',
            thumbnailUrl: 'https://telegra.ph/file/8c1565e8e387efabfe907.jpg',
            renderLargerThumbnail: true,
            sourceUrl: ''
        }
    }
  })
  
  setTimeout(() => {
    conn.reply(m.chat, `Waktunya nebang pohon lagi kak`, m)
  }, timeout)
}

handler.help = ['nebang']
handler.tags = ['rpg']
handler.command = /^(nebang)/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true
handler.exp = 0
handler.money = 0

module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " jam " + minutes + " menit " + seconds + " detik"
}