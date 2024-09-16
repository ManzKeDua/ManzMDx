const fetch = require("node-fetch")

let handler = async (m, { conn }) => {
    try {
        const response = await fetch('https://cylic.vercel.app/data.json')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        let data = await response.text()

        data = data.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')

        data = JSON.parse(data)

        const texts = data.texts
        if (texts.length > 0) {
            const randomText = texts[Math.floor(Math.random() * texts.length)]
            await conn.reply(m.chat, `"${randomText}"`, m)
        } else {
            await conn.reply(m.chat, 'No texts found', m)
        }
    } catch (error) {
        await conn.reply(m.chat, `Error: ${error.message}`, m)
    }
}
/**
By: FuadXyro
*/
handler.help = ["longtext"]
handler.tags = ["fun"]
handler.command = /^(longtext)$/i

module.exports = handler