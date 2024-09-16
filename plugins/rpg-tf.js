const items = [
    'money', 'bank', 'potion', 'trash', 'wood',
    'rock', 'string', 'petFood', 'emerald',
    'diamond', 'gold', 'iron', 'common',
    'uncommon', 'mythic', 'legendary', 'pet', 'chip', 
    'anggur', 'apel', 'jeruk', 'mangga', 'pisang', 
    'bibitanggur', 'bibitapel', 'bibitjeruk', 'bibitmangga', 'bibitpisang',
    'dana', 'gopay', 'ovo' // tambahkan opsi transfer menggunakan dana/gopay/ovo
]

const handler = async (m, { conn, args, usedPrefix, command }) => {
    let user = global.db.data.users[m.sender]
    const item = items.filter(v => v in user && typeof user[v] == 'number')
    let lol = `乂 *T R A N S F E R*

${item.map(v => `*[ ${rpg.emoticon(v)} ]* • ${v}`.trim()).join('\n')}

Gunakan format ${usedPrefix}${command} [type] [value] [number]
contoh ${usedPrefix}${command} money 9999 @user
`.trim()
    const type = (args[0] || '').toLowerCase()
    if (!item.includes(type)) return conn.reply(m.chat, lol, m, {
                contextInfo: {
                    externalAdReply: {
                        mediaType: 1,
                        title: 'Transfer',
                        thumbnailUrl: 'https://telegra.ph/file/add78b513ef69d5239c93.jpg',
                        renderLargerThumbnail: true,
                        sourceUrl: ''
                    }
                }
            })
    const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
    let _user = global.db.data.users[who]
    if (!who) return m.reply('Tag salah satu, atau ketik Nomernya!!')
    if (!(who in global.db.data.users)) return m.reply(`User ${who} not in database`)
    if (user[type] * 1 < count) return m.reply(`Your *${rpg.emoticon(type)}${type}${special(type)}* is less *${count - user[type]}*`)
    
    // Calculate transfer fee (5%)
    const tax = Math.ceil(count * 0.05);
    
    // Deduct transfer fee from the transfer amount
    const transferAmount = count - tax;

    // Pastikan untuk memeriksa saldo e-wallet pengguna yang melakukan transfer
    const senderWallet = user[type]; // Baca saldo e-wallet pengguna yang melakukan transfer
    
    // Lakukan pengecekan saldo cukup atau tidak sebelum melakukan transfer
    if (senderWallet < count) return m.reply(`Your *${rpg.emoticon(type)}${type}${special(type)}* balance is not enough for this transfer.`);

    // Lakukan pengurangan saldo dari pengirim dan penambahan saldo ke penerima sesuai dengan jenis transfer
    user[type] -= transferAmount; // Pengurangan saldo dari pengirim
    _user[type] = _user[type] ? _user[type] + transferAmount : transferAmount; // Penambahan saldo ke penerima

    // Tambahkan pesan berhasil atau gagal sesuai dengan hasil transfer
    m.reply(`*––––––『 T R A N S F E R 』––––––*\n*📊 Status:* [ √ ] • Success\n*🗂️ Type:* ${type}${special(type)} ${rpg.emoticon(type)}\n*🧮 Count:* ${count}\n*💸 Tax (5%):* ${tax}\n*💰 Amount:* ${transferAmount}\n*📨 To:* @${(who || '').replace(/@s\.whatsapp\.net/g, '')}`, null, { mentions: [who] })

    // Track successful transfers for 'money' or 'bank'
    if (type === 'money' || type === 'bank') {
        user.transfercount = (user.transfercount || 0) + 1;
        if (user.transferCount >= 50 && !user.raretitle.includes('Manusia Dermawan')) {
            user.raretitle.push('Manusia Dermawan');
            m.reply(`*Congratulations!* 🎉\nYou have been awarded the title "Manusia Dermawan" for transferring ${type} 50 times!`);
        }
    }

    // Simpan perubahan pada database
    global.db.data.users[m.sender] = user; // Simpan perubahan saldo e-wallet pengirim
    global.db.data.users[who] = _user; // Simpan perubahan saldo e-wallet penerima
}

handler.help = ['transfer'].map(v => v + ' <type> <count> <@tag>')
handler.tags = ['rpg']
handler.command = /^(transfer|tf)$/i
handler.register = true
handler.group = true
handler.rpg = true

module.exports = handler

function special(type) {
    let b = type.toLowerCase()
    let special = (['common', 'uncommon', 'mythic', 'legendary', 'pet'].includes(b) ? ' Crate' : '')
    return special
}

function isNumber(x) {
    return !isNaN(x)
}

const rpg = {
    emoticon: function (type) {
        const emotes = {
            money: '💵',
            bank: '🏦',
            potion: '🧪',
            trash: '🗑️',
            wood: '🪵',
            rock: '🪨',
            string: '🧵',
            petFood: '🍖',
            emerald: '🟩',
            diamond: '💎',
            gold: '🪙',
            iron: '⛓️',
            common: '📦',
            uncommon: '🎒',
            mythic: '🗃️',
            legendary: '💌',
            pet: '🐾',
            chip: '💾',
            anggur: '🍇',
            apel: '🍎',
            jeruk: '🍊',
            mangga: '🥭',
            pisang: '🍌',
            bibitanggur: '🌱',
            bibitapel: '🌿',
            bibitjeruk: '☘️',
            bibitmangga: '🌳',
            bibitpisang: '🌲',
            dana: '💳', // tambahkan emoticon untuk dana
            gopay: '💳', // tambahkan emoticon untuk gopay
            ovo: '💳' // tambahkan emoticon untuk ovo
        }
        return emotes[type] || ''
    }
}