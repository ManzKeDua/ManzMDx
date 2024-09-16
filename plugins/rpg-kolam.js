let handler = async (m, { conn, usedPrefix }) => {
    let paus = global.db.data.users[m.sender].paus;
    let kepiting = global.db.data.users[m.sender].kepiting;
    let gurita = global.db.data.users[m.sender].gurita;
    let cumi = global.db.data.users[m.sender].cumi;
    let buntal = global.db.data.users[m.sender].buntal;
    let dory = global.db.data.users[m.sender].dory;
    let lumba = global.db.data.users[m.sender].lumba;
    let lobster = global.db.data.users[m.sender].lobster;
    let hiu = global.db.data.users[m.sender].hiu;
    let udang = global.db.data.users[m.sender].udang;
    let ikan = global.db.data.users[m.sender].ikan;
    let orca = global.db.data.users[m.sender].orca;
    let fishingrod = global.db.data.users[m.sender].fishingrod;
    let fishingroddurability = global.db.data.users[m.sender].fishingroddurability;

    let fishingRodNames = [
        'Tidak Punya',
        'Wood FishingRod',
        'Iron FishingRod',
        'Gold FishingRod',
        'Diamond FishingRod',
        'Netherite FishingRod',
        'Crystal FishingRod',
        'Obsidian FishingRod',
        'Netherite FishingRod',
        'Wither FishingRod',
        'Dragon FishingRod',
        'Hacker FishingRod',
        'GOD FishingRod'
    ];

    let dann = `
乂 *F I S H - P O N D*

*[ 🦈 ]* - *Hiu* : _${hiu}_
*[ 🐟 ]* - *Ikan* : _${ikan}_
*[ 🐠 ]* - *Dory* : _${dory}_
*[ 🐳 ]* - *Orca* : _${orca}_
*[ 🐋 ]* - *Paus* : _${paus}_
*[ 🦑 ]* - *Cumi* : _${cumi}_
*[ 🐙 ]* - *Gurita* : _${gurita}_
*[ 🐡 ]* - *Buntal* : _${buntal}_
*[ 🦐 ]* - *Udang* : _${udang}_
*[ 🐬 ]* - *Lumba* : _${lumba}_
*[ 🦞 ]* - *Lobster* : _${lobster}_
*[ 🦀 ]* - *Kepiting* : _${kepiting}_

乂 *L E V E L*
*[ 🎣 ]* • *FishingRod* : *${fishingRodNames[fishingrod] || 'Unknown'}*
- *Durability* : _${fishingroddurability}_
`.trim();

    await conn.reply(m.chat, dann, m, {
        contextInfo: {
            externalAdReply: {
                mediaType: 1,
                title: 'Your Kolam!!',
                thumbnailUrl: 'https://telegra.ph/file/97c4d80003553c86023d2.jpg',
                renderLargerThumbnail: true,
                sourceUrl: ''
            }
        }
    });
}

handler.help = ['kolam'];
handler.tags = ['rpg'];
handler.command = /^(kolam)$/i;
handler.limit = true;
handler.group = true;

module.exports = handler;