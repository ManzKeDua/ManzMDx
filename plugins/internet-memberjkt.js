const fetch = require('node-fetch');
let { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@adiwajshing/baileys");

const userStates = {};

let handler = async function(m, { conn, args, usedPrefix, command }) {
    const userId = m.sender;
    const state = userStates[userId] || { currentIndex: 0, previousIndex: null };

    if (args[0] === 'next') {
        state.previousIndex = state.currentIndex;
        state.currentIndex++;
    } else if (args[0] === 'return') {
        if (state.previousIndex === null) {
            await conn.sendMessage(m.chat, { text: 'No previous member data available.' });
            return;
        }
        state.currentIndex = state.previousIndex;
        state.previousIndex = null;
    } else if (args.length === 0) {
        state.previousIndex = null;
        state.currentIndex = 0;
    } else {
        await conn.sendMessage(m.chat, { text: 'Invalid command. Use `jkt48member` to see the first member, `jkt48member next` to see the next member, or `jkt48member return` to go back to the previous member.' });
        return;
    }

    userStates[userId] = state;

    const sendMemberData = async (index) => {
        try {
            const response = await fetch('https://sorum-valz-store.vercel.app/api/rooms');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (!data || !Array.isArray(data) || data.length === 0) {
                throw new Error('Invalid data format or no members found');
            }

            if (index < 0 || index >= data.length) {
                await conn.sendMessage(m.chat, { text: 'No more members available.' });
                return;
            }

            const member = data[index];
            let messageContent = '👤 *JKT48 Member Info*\n\n';
            messageContent += `*Name*: ${member.name}\n`;
            messageContent += `*Room ID*: ${member.id}\n`;
            messageContent += `*Follower Count*: ${member.follower_num}\n`;
            messageContent += `*Description*: ${member.description}\n\n`;
            messageContent += `*URL*: https://www.showroom-live.com/${member.url_key}\n`;

            const thumbnailUrl = member.image_url || 'https://telegra.ph/file/c6ec9739b1a4ee238b325.jpg';

            let msg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: {
                        "messageContextInfo": {
                            "deviceListMetadata": {},
                            "deviceListMetadataVersion": 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: messageContent
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: '© 2019 - 2024 | ManzKuy'
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                hasMediaAttachment: true,
                                ...(await prepareWAMessageMedia({ image: { url: thumbnailUrl }}, { upload: conn.waUploadToServer }))
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                buttons: [
                                    {
                                        "name": "quick_reply",
                                        "buttonParamsJson": `{"display_text":"Next Search","id": ".${command} next"}`
                                    },
                                    {
                                        "name": "quick_reply",
                                        "buttonParamsJson": `{"display_text":"Previous Search","id": ".${command} return"}`
                                    }
                                ],
                            })
                        })
                    }
                }
            }, { userJid: m.chat, quoted: m });
            await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
        } catch (error) {
            console.error(error);
            await conn.sendMessage(m.chat, { text: `Terjadi kesalahan saat mengambil data member: ${error.message}` });
        }
    };

    sendMemberData(state.currentIndex);
};

handler.help = ['memberinfo [next|return]'];
handler.tags = ['internet'];
handler.command = /^(memberinfo|jkt48member)$/i;

module.exports = handler;