const free = 5000
const prem = 10000
const moneyfree = 5000
const moneyprem = 10000
const dailyTimeout = 86400000 // 24 hours

let handler = async (m, { conn, isPrems, command }) => {
    let user = global.db.data.users[m.sender]
    let now = new Date() * 1
    
    if (command === 'daily') {
        let time = user.lastclaimDaily + dailyTimeout
        if (now - user.lastclaimDaily < dailyTimeout) {
            return conn.reply(m.chat, `Anda sudah mengklaim, klaim harian hari ini\nTunggu selama ${msToTime(time - now)} lagi`, m)
        }
        user.exp += isPrems ? prem : free
        user.money += isPrems ? moneyprem : moneyfree
        user.lastclaimDaily = now
        
        conn.reply(m.chat, `Selamat kamu mendapatkan:\n\n+${isPrems ? prem : free} Exp\n+${isPrems ? moneyprem : moneyfree} Money`, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'Sukses!',
                    thumbnailUrl: 'https://telegra.ph/file/9f53895abe96d3ff973e3.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        })
    }

    setTimeout(() => {
        conn.reply(m.chat, `Daily sudah bisa di dapatkan kembali`, m)
    }, dailyTimeout)
}

handler.help = ['daily']
handler.tags = ['rpg']
handler.command = /^(daily)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
handler.money = 0
handler.exp = 0
handler.limit = true

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