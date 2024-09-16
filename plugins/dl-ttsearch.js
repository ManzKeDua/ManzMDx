// Thanks to SSA Team
const fetch =require('node-fetch');

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
if (!text) throw `Searching?`
m.reply('Waitt')
try {
let anu = await fetch(`https://ssa-api.vercel.app/api/tiktoksearch?query=${text}`)
let result = await anu.json()
await conn.sendFile(m.chat, result.data.response.media.nowm, 'anu.mp4', `*Description:* ${result.data.response.title}`, m)
conn.sendFile(m.chat, result.data.response.audio, 'anu.mp3', null, m)
} catch (e) {
conn.sendFile(m.chat, eror, "anu.mp3", null, m, true, {
		type: "audioMessage",
		ptt: true,
	})
}
}
handler.help = ['ttsearch']
handler.tags = ['downloader']
handler.command = /^(ttsearch)$/i
handler.limit = true

module.exports = handler