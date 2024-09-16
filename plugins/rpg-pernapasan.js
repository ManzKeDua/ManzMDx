let handler = async (m, { conn, usedPrefix, text, command }) => {
    let user = global.db.data.users[m.sender]

    // Ensure user is part of the Demon Slayer Corps
    if (!user.korps) {
        return m.reply('Anda bukan anggota Korps Pembasmi Iblis.')
    }

    let breath = {
        "breath cinta": { difficulty: "medium", emoji: "💖", requiredDemons: 50 },
        "breath air": { difficulty: "easy", emoji: "💧", requiredDemons: 60 },
        "breath ular": { difficulty: "hard", emoji: "🐍", requiredDemons: 70 },
        "breath serangga": { difficulty: "medium", emoji: "🐜", requiredDemons: 50 },
        "breath hewan": { difficulty: "expert", emoji: "🐾", requiredDemons: 30 },
        "breath bunga": { difficulty: "hard", emoji: "🌸", requiredDemons: 50 },
        "breath petir": { difficulty: "expert", emoji: "⚡", requiredDemons: 30 },
        "breath kabut": { difficulty: "medium", emoji: "🌫️", requiredDemons: 80 },
        "breath suara": { difficulty: "easy", emoji: "🔊", requiredDemons: 70 },
        "breath angin": { difficulty: "medium", emoji: "💨", requiredDemons: 50 },
        "breath api": { difficulty: "hard", emoji: "🔥", requiredDemons: 60 },
        "breath batu": { difficulty: "expert", emoji: "🪨", requiredDemons: 80 },
        "breath bulan": { difficulty: "hard", emoji: "🌕", requiredDemons: 90 },
        "breath matahari": { difficulty: "expert", emoji: "☀️", requiredDemons: 100 }
    }

    let chosenBreath = text.trim().toLowerCase() // filter text

    if (!Object.keys(breath).includes(chosenBreath)) {
        // Generate the list of breaths with their difficulty, emoji, and required demon count
        let breathList = Object.keys(breath).map(b => {
            let { difficulty, emoji, requiredDemons } = breath[b]
            return `- *${b}* ${emoji}\n_Difficulty_ : ${difficulty}\n_Kills Demon_ : ${requiredDemons}\n\n`
        }).join('\n')

        // Context info for available breaths with externalAdReply
        const availableBreathsMessage = `List Ilmu *Breath* yang Tersedia:\n\n${breathList}\n\nCara Menggunakan: ${usedPrefix + command} *Breath*\n\nContoh: ${usedPrefix + command} *breath api*`.trim();
        await conn.reply(m.chat, availableBreathsMessage, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'Pilih Skil!',
                    thumbnailUrl: 'https://telegra.ph/file/bf40f52974d195c1c33f8.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        });
        return;
    }

    let { difficulty, emoji, requiredDemons } = breath[chosenBreath]

    // Check if user has defeated enough demons
    if (user.demonkill < requiredDemons) {
        return m.reply(`Anda perlu membunuh ${requiredDemons} iblis untuk memilih ilmu pernapasan ini. Anda telah membunuh ${user.demonkill} iblis.`)
    }

    // Initialize user breaths if not present
    if (!user.breaths) {
        user.breaths = []
    }

    // Remove previous breath
    if (user.breath) {
        let index = user.breaths.findIndex(b => b.name === user.breath)
        user.breaths.splice(index, 1)
    }

    let newBreath = {
        name: chosenBreath,
        difficulty: difficulty,
        emoji: emoji
    }

    user.breaths.push(newBreath)
    user.breath = chosenBreath // Update current breath
    m.reply(`Anda telah memilih ilmu pernapasan ${chosenBreath} dengan tingkat kesulitan ${difficulty} dan ${emoji}.`)
}

handler.help = ['selectbreath <type>']
handler.tags = ['rpg']
handler.command = /^(selectbreath)$/i
handler.register = true
handler.group = true
handler.rpg = true

module.exports = handler