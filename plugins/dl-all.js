const axios = require('axios')

let handler = async (m, { conn, text, args, command, usedPrefix }) => {  
/**
 * Jangan Di Hapus!!
 * Buatan @FuadXyro
 * Sumber: https://whatsapp.com/channel/0029Vai9MMj5vKABWrYzIJ2Z
 */
    let url = args[0]
    if (!url) {
        await conn.sendMessage(m.chat, { text: `[!] *wrong input*\n> Ex: ${usedPrefix + command} url\n\nSupport: YT, TT, IG, FB` }, { quoted: m })
        return
    }
    let type

    if (url.includes('youtube.com')) {
        type = 'YT'
    } else if (url.includes('vt.tiktok.com')) {
        type = 'TT'
    } else if (url.includes('instagram.com')) {
        type = 'IG'
    } else if (url.includes('facebook.com')) {
        type = 'FB'
    } else {       
        return
    }

    try {
        let response = await axios.get(`https://vkrdownloader.vercel.app/server?vkr=${url}`)
        let data = response.data.data

        let message = `Title: ${data.title}\nSource: ${data.source}`
        await conn.sendMessage(m.chat, { text: `Please wait...\nType ${type}` }, { quoted: m })
        let downloads = data.downloads.map(d => d.url)
        for (let downloadUrl of downloads) {
            await conn.sendMessage(m.chat, { video: { url: downloadUrl }, caption: data.title }, { quoted: m })
        }
    } catch (e) {                
        console.error(e)        
    }
}

handler.help = ['download <url>']
handler.tags = ['downloader']
handler.command = /^(download)$/i

handler.register = true
handler.limit = true

module.exports = handler