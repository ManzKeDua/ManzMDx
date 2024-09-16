let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let now = new Date()
    let __timers = now - user.lastberburu
    let _timers = (3600000 - __timers)
    let timers = clockString(_timers)
    
    if (__timers > 3600000 || isNaN(__timers)) {
        if (!user.bow) {
            m.reply("Maaf, Anda tidak memiliki bow untuk berburu. Tolong .craft bow untuk berburu.")
            return
        }

        if (user.stamina < 10) {
            m.reply("Stamina anda tidak cukup untuk berburu. Silakan istirahat atau konsumsi item tertentu untuk mengembalikan stamina.")
            return
        }

        let berburuSuccess = Math.random() < 0.5; // 50% kemungkinan sukses
        let message = '';

        if (berburuSuccess) {
            let hewan = ['banteng', 'harimau', 'gajah', 'kambing', 'panda', 'buaya', 'kerbau', 'sapi', 'monyet', 'babihutan', 'babi', 'ayam'];
            let hasil = {};
            let total = 0;

            for (let binatang of hewan) {
                let hasilBinatang = Math.floor(Math.random() * 10);
                hasil[binatang] = hasilBinatang;
                total += hasilBinatang;

                user[binatang] += hasilBinatang;
            }

            message += `
• *Hasil Berburu*

 *🐂 = [ ${hasil['banteng']} ]*         *🐃 = [ ${hasil['harimau']} ]*
 *🐅 = [ ${hasil['gajah']} ]*         *🐮 = [ ${hasil['kambing']} ]*
 *🐘 = [ ${hasil['panda']} ]*         *🐒 = [ ${hasil['buaya']} ]*
 *🐐 = [ ${hasil['kerbau']} ]*         *🐗 = [ ${hasil['sapi']} ]*
 *🐼 = [ ${hasil['monyet']} ]*         *🐖 = [ ${hasil['babihutan']} ]*
 *🐊 = [ ${hasil['babi']} ]*         *🐓 = [ ${hasil['ayam']} ]*
`;
            user.stamina -= 10;
            user.bowdurability -= 1;

            setTimeout(() => {
                conn.reply(m.chat, message, m, {
                    contextInfo: {
                        externalAdReply: {
                            mediaType: 1,
                            title: 'AXELLDX',
                            thumbnailUrl: 'https://telegra.ph/file/906f76432754b83b3a68b.jpg',
                            renderLargerThumbnail: true,
                            sourceUrl: ''
                        }
                    }
                })
            }, 11000)

            setTimeout(() => {
                m.reply('Mendapatkan sasaran!')
            }, 10000)

            setTimeout(() => {
                m.reply('Sedang mencari mangsa...')
            }, 0)

            user.lastberburu = now * 1
        } else {
            let hewan = ['banteng', 'harimau', 'gajah', 'kambing', 'panda', 'buaya', 'kerbau', 'sapi', 'monyet', 'babihutan', 'babi', 'ayam'];
            let alasan = ['tertusuk tanduk', 'diserang kawanan', 'digerogoti', 'dikejar hingga kelelahan', 'dikelilingi', 'ditindih', 'digerogoti', 'diseruduk'];
            let binatang = hewan[Math.floor(Math.random() * hewan.length)];
            let reason = alasan[Math.floor(Math.random() * alasan.length)];

            let healthDecrease = Math.floor(Math.random() * 10) + 1; // Pengurangan health acak antara 1 hingga 10
            user.health -= healthDecrease;
            if (user.health < 0) user.health = 0; // Pastikan health tidak kurang dari 0

            user.bowdurability -= 1;
            if (user.bowdurability < 0) user.bowdurability = 0; // Pastikan durability bow tidak kurang dari 0

            conn.reply(m.chat, `Anda hampir berhasil, tetapi kamu ${reason} ${binatang} sehingga Anda kehilangan beberapa kesehatan.\n❤️ Sisa Health: ${user.health || 0}\n🏹 Durabilitas Bow: ${user.bowdurability || 0}`, m, {
                contextInfo: {
                    externalAdReply: {
                        mediaType: 1,
                        title: 'Yah Gagal!',
                        thumbnailUrl: 'https://telegra.ph/file/3d6eb634d564d8b9c3d18.jpg',
                        renderLargerThumbnail: true,
                        sourceUrl: ''
                    }
                }
            })
        }
    } else {
        conn.reply(m.chat, `\nAnda sudah berburu dalam 1 jam terakhir. Silakan tunggu sekitar *${timers}* untuk bisa melanjutkan berburu.`, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'Done',
                    thumbnailUrl: 'https://telegra.ph/file/4cf3f4dcceed0bfb11726.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        })
    }
}

handler.help = ['berburu']
handler.tags = ['rpg']
handler.command = /^(berburu|hunt)$/i

module.exports = handler

function clockString(ms) {
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}