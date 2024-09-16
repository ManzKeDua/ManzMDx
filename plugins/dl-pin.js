const fetch = require("node-fetch");
const baileys = require("@adiwajshing/baileys");
const { proto, generateWAMessageFromContent } = baileys;


let handler = async(m, { conn, text, usedPrefix, command }) => {
    let input = "`Wrong Input..`\n> _Example: .pinslide _nezuko_";
    if (!text) return m.reply(input);
    
    m.reply('`Looking For Image`');

    const createImage = async (url) => {
        const { imageMessage } = await baileys.generateWAMessageContent({
            image: {
                url
            }
        }, {
            upload: conn.waUploadToServer
        });
        return imageMessage;
    };

    async function pinterest(query) {
        let res = await fetch(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
        let json = await res.json();
        let data = json.resource_response.data.results;
        if (!data.length) throw `Query "${query}" not found :/`;
        return data[~~(Math.random() * data.length)].images.orig.url;
    }

    const imageUrls = [];
    for (let i = 0; i < 4; i++) {
        const imageUrl = await pinterest(text);
        imageUrls.push(imageUrl);
    }

    const cards = await Promise.all(imageUrls.map(async (url, index) => ({
        header: proto.Message.InteractiveMessage.Header.fromObject({
            title: `Image ${index + 1} / 4`,
            hasMediaAttachment: true,
            imageMessage: await createImage(url)
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
            buttons: [] // Hapus semua tombol
        })
    })));

    const msg = baileys.generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                    body: proto.Message.InteractiveMessage.Body.fromObject({
                        text: `*Hasil Pencarian:* ${text}\n> © Copyright 2024 | All Right Reserved`
                    }),
                    carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                        cards
                    })
                })
            }
        }
    }, {});

    await conn.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    });
};

handler.help = ['pinterest', 'pin'];
handler.tags = ['downloader'];
handler.command = /^(pinterest|pin)$/i;
handler.limit = true;
handler.register = true;

module.exports = handler;