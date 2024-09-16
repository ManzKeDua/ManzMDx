let handler = async (m, { args, isPrems, conn, text, usedPrefix, command }) => {
    let who = (m.mentionedJid && m.mentionedJid[0]) ? m.mentionedJid[0] : args[0] ? ((args.join('').replace(/[@ .+-]/g, '')).replace(/^\+/, '').replace(/-/g, '') + '@s.whatsapp.net') : '';
    if (!who) {
        who = m.sender;
    }
    
    // Ensure the user is in the database and initialize if not
    global.db.users = global.db.users || {};
    let user = global.db.users[m.sender] = global.db.users[m.sender] || {};

    if (user.jail === true) {
        throw '*Kamu tidak bisa melakukan aktivitas karena masih dalam penjara!*';
    }

    let tmg = 'https://telegra.ph/file/0a67d95341bff0c6cbb7b.jpg';
    let txt = `
乂 *S E T T I N G S*

[ ! ] Please set your *Profile* first to start your life:
- *.setnama*
- *.setgender*
- *.setumur*
- *.setagama*

_Example_ : .setgender _male_
`.trim();

    conn.sendMessage(m.chat, {
        text: txt,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: 'Set You Profile!',
                body: '',
                mediaType: 1,
                sourceUrl: '', // Customize this as needed
                thumbnailUrl: tmg,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
};

handler.help = ['setprofile', 'set'];
handler.tags = ['life'];
handler.command = /^(set|setprofile)$/i;

module.exports = handler;