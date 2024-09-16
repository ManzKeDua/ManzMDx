const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*teka/i.test(m.quoted.text)) return !0
    this.tebakkata = this.tebakkata ? this.tebakkata : {}
    if (!(id in this.tebakkata)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tebakkata[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakkata[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].point += this.tebakkata[id][2]
            await this.sendImageAsSticker(m.chat, betul, m, { packname: `+${this.tebakkata[id][2]} Point`})
            clearTimeout(this.tebakkata[id][3])
            delete this.tebakkata[id]
        } else this.sendImageAsSticker(m.chat, salah, m, { packname: `© Takemii.js`})
    }
    return !0
}
handler.exp = 0

module.exports = handler