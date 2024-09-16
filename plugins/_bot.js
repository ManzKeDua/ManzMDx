let fetch = require('node-fetch')
let handler = async (m, {
    conn,
    command,
    isOwner
}) => {
let sections = [{
rows: [{
title: 'Chat Bot',
description: `Automatic Chat Bot ( Chat Ai )`, 
id: '.listcai'
}, {
title: 'Menu',
description: 'List of available bot menus',
id: '.menu'
}, {
title: 'Owner',
description: 'Owner of the bot',
id: '.owner'
}]
}]

let listMessage = {
    title: 'Menu Bot', 
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
                title: 'Manz', 
                thumbnailUrl: 'https://telegra.ph/file/a6f3ef42e42efcf542950.jpg', 
                sourceUrl: 'https://youtube.com/shorts/eHM3CMiAQ9Y?si=sqJQ1gyRAnptIK0m',
                mediaType: 2,
                renderLargerThumbnail: false
            }
          }, 
          body: proto.Message.InteractiveMessage.Body.create({
            text: `*Hello, @${m.sender.replace(/@.+/g, '')}!*`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Powered By _WhatsApp_'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            subtitle: "Mans",
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
handler.customPrefix = /^(bot|bot?|bott)$/i
handler.command = new RegExp

module.exports = handler