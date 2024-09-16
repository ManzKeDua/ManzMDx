let handler = async (m, { conn, usedPrefix, text, command }) => {
    let user = global.db.data.users[m.sender]

    // Pastikan pengguna adalah demon
    if (!user.demon) {
        return m.reply('Anda bukan seorang demon.')
    }

    let magic = {
        "kyogai drum": { difficulty: "easy", requiredHashira: 30 },
        "devil blood spell": { difficulty: "easy", requiredHashira: 30 },
        "dream manipulation": { difficulty: "medium", requiredHashira: 30 },
        "rui string": { difficulty: "medium", requiredHashira: 40 },
        "lightning breathing": { difficulty: "hard", requiredHashira: 50 },
        "crescent sword": { difficulty: "hard", requiredHashira: 70 },
        "gyokko vas": { difficulty: "expert", requiredHashira: 55 },
        "clonning": { difficulty: "medium", requiredHashira: 80 },
        "nakime biwa": { difficulty: "easy", requiredHashira: 70 },
        "teleport": { difficulty: "hard", requiredHashira: 80 },
        "martial arts": { difficulty: "hard", requiredHashira: 100 },
        "ice": { difficulty: "expert", requiredHashira: 100 },
        "lunar breathing": { difficulty: "expert", requiredHashira: 200 },
        "devil's tentacles": { difficulty: "expert", requiredHashira: 300 }
    }

    let chosenMagic = text.trim().toLowerCase() // filter text

    if (!Object.keys(magic).includes(chosenMagic)) {
        // Generate the list of magics with their difficulty and required hashira count
        let magicList = Object.keys(magic).map(m => {
            let { difficulty, requiredHashira } = magic[m]
            return `- *${m}*\n_Difficulty_ : ${difficulty}\n_Required Hashira_ : ${requiredHashira}\n\n`
        }).join('\n')

        // Context info for available magics with externalAdReply
        const availableMagicsMessage = `List *Kekuatan Demon* yang Tersedia:\n\n${magicList}\n\nCara Menggunakan: ${usedPrefix + command} *Magic*\n\nContoh: ${usedPrefix + command} *magic api*`.trim();
        await conn.reply(m.chat, availableMagicsMessage, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'AXELLDX',
                    thumbnailUrl: 'https://telegra.ph/file/878c7816dd1497270a497.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        });
        return;
    }

    let { difficulty, requiredHashira } = magic[chosenMagic]

    // Periksa apakah pengguna telah membunuh cukup hashira
    if (user.hashirakill < requiredHashira) {
        return m.reply(`Anda perlu membunuh ${requiredHashira} hashira untuk memilih magic ini. Anda telah membunuh ${user.hashirakill} hashira.`)
    }

    // Hapus sihir sebelumnya jika ada
    if (user.magic) {
        delete user.magic;
    }

    user.magic = chosenMagic // Update sihir saat ini
    m.reply(`Anda telah memilih magic ${chosenMagic} dengan tingkat kesulitan ${difficulty}.`)
}

handler.help = ['selectdemon <type>']
handler.tags = ['rpg']
handler.command = /^(selectdemon)$/i
handler.register = true
handler.group = true

module.exports = handler