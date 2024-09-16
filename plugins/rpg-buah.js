let handler = async (m, { conn, usedPrefix }) => {
let user = global.db.data.users[m.sender]
let buah = `GUDANG BUAH

🍌 ${user.pisang} Pisang
🍇 ${user.anggur} Anggur 
🥭 ${user.mangga} Mangga
🍊 ${user.jeruk} Jeruk
🍎 ${user.apel} Apel

Gunakan Command ${usedPrefix}sell Untuk Menjual Buah !`
conn.reply(m.chat, buah, m, {
    contextInfo: {
        externalAdReply: {
            mediaType: 1,
            title: 'Fruit',
            thumbnailUrl: 'https://telegra.ph/file/322b04aef7e9765a9ed48.jpg',
            renderLargerThumbnail: true,
            sourceUrl: ''
        }
    }
})
}

handler.help = ['buah']
handler.tags = ['rpg']
handler.command = /^(buah|listbuah)$/i

module.exports = handler