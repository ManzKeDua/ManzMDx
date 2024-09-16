const axios = require('axios');

const handler = async (m, { conn }) => {
  let audio = {
    audio: { url: 'https://pomf2.lain.la/f/xe3qczl.mp3' },
    mimetype: 'audio/mp4',
    ptt: true,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true,
        mediaType: 1,
        mediaUrl: '',
        title: 'Assalamualikum', // Assuming wm and botdate are predefined variables
        body: 'ManzKenz', // Assuming wm and botdate are predefined variables
        sourceUrl: '',
        thumbnail: (await axios.get('https://telegra.ph/file/d6f44478fd2ece636755e.jpg', { responseType: 'arraybuffer' })).data,
        renderLargerThumbnail: true
      }
    }
  };

  conn.sendMessage(m.chat, audio, { quoted: m });
};

handler.customPrefix = /^(assalam|aslam(ualaikum)?)/i;
handler.command = new RegExp();
module.exports = handler;