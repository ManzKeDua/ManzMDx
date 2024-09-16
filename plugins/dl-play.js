let yts = require("yt-search") 
let handler = async (m, {conn, text, usedPrefix,command}) => {      
if (!text) throw `Example : ${usedPrefix + command} judul lagu`       
m.reply(wait) 

let search = await yts(text)
let anu = search.videos[Math.floor(Math.random() * search.videos.length)]
var aud = `https://api.cafirexos.com/api/v2/ytmp3?url=${anu.url}`    
let cap = `╭┄┄╸「 PLAY SEARCH 」
│❒ ᴛɪᴛʟᴇ : ${anu.title}
│❒ ᴠɪᴇᴡs : ${anu.views}
│❒ ʟɪɴᴋ : ${anu.url}
╰┈┈┈┈┈╸

sᴇᴅᴀɴɢ ᴅɪ ᴘʀᴏsᴇs... 
01:00 ━●─────── ${anu.timestamp}
⇆ㅤ ㅤ◁ㅤ ❚❚ ㅤ▷ ㅤㅤ↻﻿`
m.reply(cap) 
conn.sendMessage(m.chat, { audio: { url: aud }, mimetype: 'audio/mpeg' }, { quoted: m })    
            }
handler.help = ['play']
handler.tags = ['downloader']
handler.command = ['song','play']
handler.limit = true;

module.exports = handler