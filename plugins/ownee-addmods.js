let { MessageType } = require('@adiwajshing/baileys');

let handler = async (m, { conn, text }) => {
    if (conn.user.jid !== global.conn.user.jid) return;
    if (!text) return conn.reply(m.chat, '• *Example :* .addmods 628816609112', m);
    
    let who;
    if (m.isGroup) {
        who = m.mentionedJid && m.mentionedJid[0];
        if (!who) return conn.reply(m.chat, 'Please mention a user to add as a moderator.', m);
    } else {
        who = m.chat;
    }

    if (global.mods.includes(who.split('@')[0])) {
        return conn.reply(m.chat, `🚨 @${who.split('@')[0]} is already a Moderator!`, m);
    }
    
    global.mods.push(`${who.split('@')[0]}`);
    conn.reply(m.chat, `🚨 Hai, @${who.split('@')[0]}. You are now a Moderator. Please don't misuse your power!`, m, {
        contextInfo: {
            mentionedJid: [who]
        }
    });
}

handler.help = ['addmods *<@user>*'];
handler.tags = ['owner'];
handler.command = /^(add|tambah|\+)mods$/i;
handler.rowner = true;

module.exports = handler;