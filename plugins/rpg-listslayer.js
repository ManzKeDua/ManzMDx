let handler = async (m, { conn, usedPrefix }) => {
    let demonUsers = Object.entries(global.db.data.users).filter(user => user[1].demon)
    let korpsUsers = Object.entries(global.db.data.users).filter(user => user[1].korps)

    conn.reply(m.chat, `
乂 • *K O R P S*\n
- Total : _${korpsUsers.length} User_
 ${korpsUsers ? '\n' + korpsUsers.map(([jid], i) => `
 ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
 https://wa.me/+${jid.split('@')[0]}
`.trim()).join('\n') : ''}

乂 • *D E M O N*\n
- Total : ${demonUsers.length} User
 ${demonUsers ? '\n' + demonUsers.map(([jid], i) => `
 ${i + 1}. ${conn.getName(jid) == undefined ? 'Unknown' : conn.getName(jid)}
 https://wa.me/+${jid.split('@')[0]}
`.trim()).join('\n') : ''}
`, m)
}
handler.help = ['listslayer']
handler.tags = ['rpg']
handler.command = /^listslayer?$/i
module.exports = handler