let fetch = require('node-fetch')
let handler = async (m, {
    conn,
    command,
    isOwner
}) => {
let sections = [{
title: 'List Pekerjaan ( List )', 
highlight_label: 'Work List',
rows: [{
title: '🛵 • Ojek',
description: 'Bekerja Sebagai Tukang Ojek',
id: '.skerja ojek'
}, {
title: '🛒 • Pedagang',
description: 'Bekerja Sebagai Pedagang', 
id: '.skerja pedagang'
}, {
title: '💉 • Dokter',
description: 'Bekerja Sebagai Dokter', 
id: '.skerja dokter'
}, {
title: '🌾 • Petani',
description: 'Bekerja Sebagai Petani',
id: '.skerja petani'
}, {
title: '💻 • YouTubers',
description: 'Bekerja Sebagai Youtubers',
id: '.skerja youtuber'
}, {
title: '🧰 • Montir',
description: 'Bekerja Sebagai Montir',
id: '.skerja montir'
}, {
title: '⚒️ • Kuli',
description: 'Bekerja Sebagai Kuli', 
id: '.skerja kuli'
}, {
title: '🧑‍💻 • Gamer',
description: `Bekerja Sebagai Gamer`, 
id: '.skerja gamer'
}, {
title: '👩‍🏫 • Guru',
description: 'Bekerja Sebagai Guru',
id: '.skerja teacher'
}, {
title: '🎨 • Graphic Desaigner',
description: 'Bekerja Sebagai Graphic Desaigner',
id: '.skerja designer'
}]
}]

let listMessage = {
    title: 'Work List', 
    sections
};

const { generateWAMessageFromContent, proto } = require("@adiwajshing/baileys") 
let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
        contextInfo: {
        	mentionedJid: [m.sender], 
        	isForwarded: true, 
	        forwardedNewsletterMessageInfo: {
			newsletterJid: '120363144038483540@newsletter',
			newsletterName: 'Powered By : axelldragneel', 
			serverMessageId: -1
		},
	businessMessageForwardInfo: { businessOwnerJid: conn.decodeJid(conn.user.id) },
	forwardingScore: 256,
            externalAdReply: {  
                title: 'ManzKenz', 
                thumbnailUrl: 'https://telegra.ph/file/a6f3ef42e42efcf542950.jpg', 
                sourceUrl: 'https://youtube.com/shorts/eHM3CMiAQ9Y?si=sqJQ1gyRAnptIK0m',
                mediaType: 2,
                renderLargerThumbnail: false
            }
          }, 
          body: proto.Message.InteractiveMessage.Body.create({
            text: `*Hello, @${m.sender.replace(/@.+/g, '')}!*\n_Click Button List Bellow_`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Powered By _WhatsApp_'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            subtitle: "Manz",
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "single_select",
                "buttonParamsJson": JSON.stringify(listMessage) 
              }
           ],
          })
        })
    }
  }
}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
})
}
handler.help = ['kerja', 'work']
handler.tags = ['rpg']
handler.command = /^(kerja|pekerjaan|work)$/i
handler.private = false

module.exports = handler