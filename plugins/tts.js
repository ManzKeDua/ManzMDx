// Kemii Cantik
// Rab, 5 Jun - 17.44

let handler = async (m, { conn, text, command }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* .${command} jedag jedug`, m)
  conn.sendMessage(m.chat, { react: { text: '🕐', key: m.key }})
  let kemii = await tiktoks(`${text}`)
  let { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@adiwajshing/baileys") 
  let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
  message: {
  "messageContextInfo": {
  "deviceListMetadata": {},
  "deviceListMetadataVersion": 2
  },
  interactiveMessage: proto.Message.InteractiveMessage.create({
  body: proto.Message.InteractiveMessage.Body.create({
  }),
  footer: proto.Message.InteractiveMessage.Footer.create({
  text: 'Copyright © 2024 | All Right Reserved',
  }),
  header: proto.Message.InteractiveMessage.Header.create({
  title: kemii.title,
  hasMediaAttachment: true,...(await prepareWAMessageMedia({ video: { url: kemii.no_watermark } }, { upload: conn.waUploadToServer }))
  }),
  nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
  buttons: [
  {
  "name": "quick_reply",
  "buttonParamsJson": `{"display_text":"Next Search","id": ".tiktoksearch ${text}"}`
  }
  ],
  })
  })
  }
  }
  }, { userJid: m.chat, quoted: m })
  conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
}
handler.help = ['tiktoksearch'].map(v => v + ' *<text>*')
handler.tags = ['downloader']

handler.command = /^tiktoksearch|ttsearch$/i
handler.premium = false

module.exports = handler

function tiktoks(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/feed/search',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': 'current_language=en',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        },
        data: {
          keywords: query,
          count: 50,
          cursor: 0,
          HD: 1
        }
      });
      const videos = response.data.data.videos;
      if (videos.length === 0) {
        reject("Tidak ada video ditemukan.");
      } else {
        const gywee = Math.floor(Math.random() * videos.length);
        const videorndm = videos[gywee]; 

        const result = {
          creator: 'dcodekemi',
          title: videorndm.title,
          cover: videorndm.cover,
          origin_cover: videorndm.origin_cover,
          no_watermark: videorndm.play,
          watermark: videorndm.wmplay,
          music: videorndm.music
        };
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  });
}