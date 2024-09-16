const { areJidsSameUser } = require('@adiwajshing/baileys');
const fetch = require('node-fetch');

const leaderboards = [
    'level',
    'exp',
    'limit',
    'money',
    'iron',
    'gold',
    'diamond',
    'emerald',
    'trash',
    'joinlimit',
    'potion',
    'petFood',
    'wood',
    'rock',
    'string',
    'common',
    'uncommon',
    'mythic',
    'legendary',
    'pet',
    'bank',
    'chip',
    'skata'
];

const emojis = {
    level: '🏆',
    exp: '✨',
    limit: '🔒',
    money: '💰',
    iron: '🔩',
    gold: '🥇',
    diamond: '💎',
    emerald: '📗',
    trash: '🗑️',
    joinlimit: '➕',
    potion: '🧪',
    petFood: '🍖',
    wood: '🪵',
    rock: '🪨',
    string: '🧵',
    common: '📦',
    uncommon: '🎁',
    mythic: '🛸',
    legendary: '🐉',
    pet: '🐾',
    bank: '🏦',
    chip: '🎫',
    skata: '🎲'
};

const rpg = {
    emoticon: (type) => emojis[type] || ''
};

const handler = async (m, { conn, args, participants, usedPrefix, command }) => {
    let users = Object.entries(global.db.data.users).map(([key, value]) => {
        return {
            ...value, jid: key
        }
    });
    let imgr = 'https://telegra.ph/file/afc430a65ca1b8e93ccae.jpg';
    let leaderboard = leaderboards.filter(v => v && users.filter(user => user && user[v]).length);
    let type = (args[0] || '').toLowerCase();
    const getPage = (item) => Math.ceil((users.filter(user => user && user[item]).length) / 5); // fixed division by zero
    let wrong = `🔖 ᴛʏᴩᴇ ʟɪsᴛ :
${leaderboard.map(v => `
⮕ ${rpg.emoticon(v)} - ${v}
`.trim()).join('\n')}
––––––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
⮕ ᴛᴏ ᴠɪᴇᴡ ᴅɪғғᴇʀᴇɴᴛ ʟᴇᴀᴅᴇʀʙᴏᴀʀᴅ:
${usedPrefix}${command} [type]
★ ᴇxᴀᴍᴩʟᴇ:
${usedPrefix}${command} legendary`.trim();
    
    if (!leaderboard.includes(type)) {
        return await conn.reply(m.chat, '*––––『 𝙻𝙴𝙰𝙳𝙴𝚁𝙱𝙾𝙰𝚁𝙳 』––––*\n' + wrong, m, {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 1,
                    title: 'List',
                    thumbnailUrl: 'https://telegra.ph/file/afc430a65ca1b8e93ccae.jpg',
                    renderLargerThumbnail: true,
                    mediaUrl: '',
                    sourceId: wm,
                    sourceUrl: ''
                }
            }
        });
    }

    let page = isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 0), getPage(type)) : 0;
    let sortedItem = users.map(toNumber(type)).sort(sort(type));
    let userItem = sortedItem.map(enumGetKey);
    let text = `
🏆 ʀᴀɴᴋ: ${userItem.indexOf(m.sender) + 1} ᴏᴜᴛ ᴏғ ${userItem.length}

                *• ${rpg.emoticon(type)} ${type} •*

${sortedItem.slice(page * 5, page * 5 + 5).map((user, i) => `${i + 1}.*﹙${user[type]}﹚*- ${participants.some(p => areJidsSameUser(user.jid, p.id)) ? `${user.registered ? user.name : conn.getName(user.jid)} \nwa.me/` : 'ғʀᴏᴍ ᴏᴛʜᴇʀ ɢʀᴏᴜᴩ\n @'}${user.jid.split`@`[0]}`).join`\n\n`}
`.trim();

    return await conn.reply(m.chat, text, m, {
        contextInfo: {
            mentionedJid: [...userItem.slice(page * 5, page * 5 + 5)].filter(v => !participants.some(p => areJidsSameUser(v, p.id))),
            externalAdReply: {
                showAdAttribution: true,
                mediaType: 1,
                title: 'Kumpulan Puncak!',
                thumbnailUrl: 'https://telegra.ph/file/afc430a65ca1b8e93ccae.jpg',
                renderLargerThumbnail: true,
                mediaUrl: '',
                sourceId: wm,
                sourceUrl: ''
            }
        }
    });
};

handler.help = ['leaderboard'].map(v => v + ' <item>');
handler.tags = ['xp'];
handler.command = /^(leaderboard|lb)$/i;
handler.register = true;
handler.group = true;

module.exports = handler;

function sort(property, ascending = true) {
    if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property];
    else return (...args) => args[ascending & 1] - args[!ascending & 1];
}

function toNumber(property, _default = 0) {
    if (property) return (a, i, b) => {
        return { ...b[i], [property]: a[property] === undefined ? _default : a[property] };
    }
    else return a => a === undefined ? _default : a;
}

function enumGetKey(a) {
    return a.jid;
}

/**
 * Detect Number
 * @param {Number} x 
 */
function isNumber(number) {
    if (!number) return number;
    number = parseInt(number);
    return typeof number == 'number' && !isNaN(number);
}