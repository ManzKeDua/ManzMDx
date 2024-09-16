const fetch = require("node-fetch")

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('*PERMINTAAN ERROR!! CONTOH :*\n> *.ytmp4 <link youtube>*')
  let proces = await (await fetch(`https://api.shannmoderz.xyz/downloader/ytdl?url=${text}`)).json()
  let video = proces.result;
  m.reply(`*VIDEO PROSES SENDING...*`)
  conn.sendMessage(m.chat,{video:{url: video.video['480'].url}, caption: proces.result.title},{quoted: m})
}
handler.command = handler.help = ["ytmp4"]
handler.tags = ["downloader"]
module.exports = handler