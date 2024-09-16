const fs = require("fs");
const items = {
    buy: {
        limit: { money: 15000 },
        chip: { money: 1000000 },
        exp: { money: 1000 },
        potion: { money: 1250 },
        trash: { money: 40 },
        kayu: { money: 700 },
        kardus: { money: 500 },
        botol: { money: 500 },
        kaleng: { money: 500 },
        coal: { money: 2000 },
        makananpet: { money: 5000 },
        batu: { money: 850 },
        string: { money: 35000 },
        iron: { money: 25000 },
        cabai: { money: 3000 },
        bawang: { money: 3000 },
        kunyit: { money: 2500 },
        kemiri: { money: 2500 },
        terasi: { money: 3000 },
        asam: { money: 3000 },
        kecap: { money: 3000 },
        gula: { money: 5000 },
        garam: { money: 5000 },
        jahe: { money: 3000 },
        diamond: { money: 500000 },
        emerald: { money: 100000 },
        emas: { money: 100000 },
        common: { money: 2000 },
        uncommon: { money: 20000 },
        mythic: { money: 75000 },
        legendary: { money: 200000 },
        petfood: { money: 3500 },
        pet: { money: 120000 },
        anggur: { money: 2000 },
        apel: { money: 2000 },
        jeruk: { money: 2000 },
        mangga: { money: 2000 },
        pisang: { money: 2000 },
        bibitanggur: { money: 2000 },
        bibitapel: { money: 2000 },
        bibitjeruk: { money: 2000 },
        bibitmangga: { money: 2000 },
        bibitpisang: { money: 2000 },
        umpan: { money: 5000 }
    },
    sell: {
        limit: { money: 1000 },
        exp: { money: 1 },
        chip: { money: 1000000 },
        potion: { money: 625 },
        trash: { money: 20 },
        kayu: { money: 350 },
        kardus: { money: 150 },
        botol: { money: 150 },
        kaleng: { money: 150 },
        coal: { money: 500 },
        makananpet: { money: 2000 },
        batu: { money: 425 },
        string: { money: 200 },
        iron: { money: 1500 },
        cabai: { money: 1500 },
        bawang: { money: 1500 },
        kunyit: { money: 1000 },
        kemiri: { money: 1000 },
        terasi: { money: 1500 },
        asam: { money: 1500 },
        kecap: { money: 1500 },
        gula: { money: 1500 },
        garam: { money: 3000 },
        jahe: { money: 1500 },
        diamond: { money: 25000 },
        emerald: { money: 15000 },
        emas: { money: 5000 },
        common: { money: 1000 },
        uncommon: { money: 10000 },
        mythic: { money: 15000 },
        legendary: { money: 25000 },
        petfood: { money: 1750 },
        pet: { money: 30000 },
        anggur: { money: 1000 },
        apel: { money: 1000 },
        jeruk: { money: 1000 },
        mangga: { money: 1000 },
        pisang: { money: 1000 },
        bibitanggur: { money: 1000 },
        bibitapel: { money: 1000 },
        bibitjeruk: { money: 1000 },
        bibitmangga: { money: 1000 },
        bibitpisang: { money: 1000 },
        umpan: { money: 2500 }
    }
};

const handler = async (m, { command, usedPrefix, args }) => {
    const item = (args[0] || '').toLowerCase();
    const isShopCommand = command.toLowerCase() === 'shop';

    if (!item.match('limit') && db.data.chats[m.chat].rpg == false && m.isGroup && !isShopCommand) return dfail('rpg', m, conn);
    let user = db.data.users[m.sender];
    const listItems = Object.fromEntries(Object.entries(items[command.toLowerCase() === 'shop' ? 'buy' : command.toLowerCase()]).filter(([v]) => v && v in user));
    
    let text = '';
    let footer = '';

    if (isShopCommand || !item || !args[1] || !isNumber(args[1])) {
        text = `乂 *S H O P*\n\n• Here is a list of *Items* that you can buy or sell:
${Object.keys(listItems).map((v) => {
            let paymentMethod = Object.keys(listItems[v]).find(v => v in user);
            return `• *1* ${emojis(v)} ${capitalize(v)} • *${listItems[v][paymentMethod]}* ${emojis(paymentMethod)} ${capitalize(paymentMethod)}`.trim();
        }).join('\n')}
–––––––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
➠ ᴛᴏ ʙᴜʏ ɪᴛᴇᴍs:
${usedPrefix}buy [item] [quantity]
• ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}buy potion 10
➠ ᴛᴏ sᴇʟʟ ɪᴛᴇᴍs:
${usedPrefix}sell [item] [quantity]
▧ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}sell potion 10`.trim();
        
        return conn.reply(m.chat, text, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'Rpg Shop',
                    thumbnailUrl: 'https://telegra.ph/file/cc002f0810f6bacae57fd.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        });
    }

    const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1);
    if (!listItems[item]) return m.reply(text, m, {
        contextInfo: {
            externalAdReply: {
                mediaType: 1,
                title: 'Rpg Shop',
                thumbnailUrl: 'https://telegra.ph/file/cc002f0810f6bacae57fd.jpg',
                renderLargerThumbnail: true,
                sourceUrl: ''
            }
        }
    });

    if (command.toLowerCase() == 'buy') {
        let paymentMethod = Object.keys(listItems[item]).find(v => v in user);
        if (user[paymentMethod] < listItems[item][paymentMethod] * total) return m.reply(`Kamu membutuhkan *${(listItems[item][paymentMethod] * total) - user[paymentMethod]}* ${capitalize(paymentMethod)} ${emojis(paymentMethod)} Lagi, Untuk Membeli *${total}* ${capitalize(item)} ${emojis(item)}. Kamu hanya memiliki *${user[paymentMethod]}* ${capitalize(paymentMethod)} ${emojis(paymentMethod)}.`);
        user[paymentMethod] -= listItems[item][paymentMethod] * total;
        user[item] = (user[item] || 0) + total;
        return conn.reply(m.chat, `Sukses Membeli *${total} ${capitalize(item)} ${emojis(item)}*, Seharga *${listItems[item][paymentMethod] * total} ${capitalize(paymentMethod)} ${emojis(paymentMethod)}*`, m);
    } else {
        let paymentMethod = Object.keys(listItems[item]).find(v => v in user);
        if (user[item] < total) return m.reply(`You don't have enough *${capitalize(item)} ${emojis(item)}* to sell, you only have ${user[item] || 0} items`);
        user[item] -= total;
        user[paymentMethod] = (user[paymentMethod] || 0) + listItems[item][paymentMethod] * total;
        return conn.reply(m.chat, `Sukses Menjual *${total} ${capitalize(item)} ${emojis(item)}*, Seharga *${listItems[item][paymentMethod] * total} ${capitalize(paymentMethod)} ${emojis(paymentMethod)}*`, m);
    }
};

handler.help = ['buy', 'sell', 'shop'].map(v => v + ' <item> <count>');
handler.tags = ['rpg'];
handler.command = /^(buy|sell|shop)$/i;
handler.register = true;
handler.group = true;
handler.disabled = false;

module.exports = handler;

function isNumber(number) {
    if (!number) return false;
    number = parseInt(number);
    return typeof number == 'number' && !isNaN(number);
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function emojis(item) {
    const emojiMap = {
        limit: '🎟️',
        exp: '⚗️',
        chip: '💾',
        money: '💵',
        potion: '🧪',
        trash: '🗑️',
        kayu: '🪵',
        kardus: '📦',
        botol: '🧋',
        kaleng: '🍶',
        coal: '🌑',
        makananpet: '🍗',
        batu: '🪨',
        string: '🧵',
        iron: '⛓️',
        cabai: '🌶️',
        bawang: '🧅',
        kunyit: '🌰',
        kemiri: '🌾',
        garam: '🧂',
        gula: '🍯',
        jahe: '🫚',
        asam: '🍋',
        terasi: '🧀',
        kecap: '🕳️',
        diamond: '💎',
        emerald: '🟩',
        emas: '🪙',
        common: '📦',
        uncommon: '🗳️',
        mythic: '🎁',
        legendary: '🗃️',
        petfood: '🍖',
        pet: '🐾',
        anggur: '🍇',
        apel: '🍎',
        jeruk: '🍊',
        mangga: '🥭',
        pisang: '🍌',
        bibitanggur: '🌱',
        bibitapel: '🌿',
        bibitjeruk: '☘️',
        bibitmangga: '🌴',
        bibitpisang: '🌳',
        umpan: '🪱'
    };

    return emojiMap[item] || '';
}