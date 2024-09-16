let handler = async (m, { conn, text, usedPrefix, command }) => {
    
    m.reply(`Mengirim 🛩️...`)
    conn.sendFile(m.sender, 'https://telegra.ph/file/5753b06a866bed1ec3e28.jpg', 'https://telegra.ph/file/5753b06a866bed1ec3e28.jpg', `
👥 Join Group Official ManzMD Bot: 
https://chat.whatsapp.com/J4FSaZcI6taLCMAWPz3JlL
`.trim(), m)
}

handler.help = ['komunitas']
handler.tags = ['main']

handler.command = /^komunitas|community/i

module.exports = handler