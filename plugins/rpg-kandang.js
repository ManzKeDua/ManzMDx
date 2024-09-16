let handler = async (m, { conn, usedPrefix }) => {
    let user = global.db.data.users[m.sender];
    let cap = `乂 *B A R N*
    
乂 *A N I M A L*
*🐂 = [ ${user.banteng} ] banteng*
*🐅 = [ ${user.harimau} ] harimau*
*🐘 = [ ${user.gajah} ] gajah*
*🐐 = [ ${user.kambing} ] kambing*
*🐼 = [ ${user.panda} ] panda*
*🐊 = [ ${user.buaya} ] buaya*
*🐃 = [ ${user.kerbau} ] kerbau*
*🐮 = [ ${user.sapi} ] sapi*
*🐒 = [ ${user.monyet} ] monyet*
*🐗 = [ ${user.babihutan} ] babihutan*
*🐖 = [ ${user.babi} ] babi*
*🐓 = [ ${user.ayam} ] ayam*

乂 *C O O K*
.cook _ayamgoreng_

乂 *S E L L*
.jual _ayam_`;

    // Mempersiapkan mentions
    let mentions = [m.sender];

    conn.reply(m.chat, cap, m, {
        mentions: mentions,
        contextInfo: {
            externalAdReply: {
                mediaType: 1,
                title: 'HewanMu?',
                thumbnailUrl: 'https://telegra.ph/file/dd7b21716bbdc2d43dfc9.jpg',
                renderLargerThumbnail: true,
                sourceUrl: ''
            }
        }
    });
}

handler.help = ['kandang', 'barn'];
handler.tags = ['rpg'];
handler.command = /^(kandang|barn)$/i;

module.exports = handler;