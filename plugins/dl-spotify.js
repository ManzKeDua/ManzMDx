const axios = require("axios");
const fs = require('fs');
const canvafy = require('canvafy');

const handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) throw `[❗] *Penggunaan:* ${usedPrefix}spotify <search>`;   
    conn.sendMessage(m.chat, { react: { text: '🎧', key: m.key }})
    const result = await searchSpotify(text);
    const title = result.name
    let responseText = '[❗] Balas pesan ini dengan nomor untuk mendapatkan lagunya.\n\n';
    result.forEach((track, index) => {
        responseText += `*${index + 1}.* ${track.name} - ${track.artists}\n`;
    });
    responseText += `\nPowered by RhmttDev`   
    const { key } = await conn.reply(m.chat, responseText, m);   
    conn.spotifPlay[m.sender] = { result, key, title };
};

handler.before = async (m, { conn }) => {
    conn.spotifPlay = conn.spotifPlay ? conn.spotifPlay : {};
    if (m.isBaileys || !(m.sender in conn.spotifPlay)) return;
    const { result, key, title } = conn.spotifPlay[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    const inputNumber = Number(choice);
    if (inputNumber >= 1 && inputNumber <= result.length) {
        conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key }})
        const selectedTrack = result[inputNumber - 1];
        try {
            const start = new Date();
            let res = await spotifydl(selectedTrack.link)
            let audioLink = res.download
            const timeTaken = ((new Date() - start) / 1000).toFixed(2) + ' seconds';

            const durationInSeconds = Math.floor(selectedTrack.duration_ms / 1000);
            const minutes = Math.floor(durationInSeconds / 60);
            const seconds = durationInSeconds % 60;
            const durationText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            const thumbnail = selectedTrack.image;                       
            await conn.sendMessage(m.chat, {
            audio: {
            url: `${audioLink}`
            },
            mimetype: 'audio/mp4', 
            fileName: `${title}.mp3`,
            contextInfo: {
            externalAdReply: {
            showAdAttribution: false,
            mediaType: 1,
            title: 'C I Y O B O T - V 1',
            body: 'Version: 1.0.0',
            thumbnailUrl: 'https://telegra.ph/file/ab0adc695a83b0bf7ed54.jpg',
            renderLargerThumbnail: true
            }}},{ quoted: m})
            // Delete number list
           await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
            conn.sendMessage(m.chat, { delete: key });
            delete conn.spotifPlay[m.sender];
        } catch (error) {
            console.error('Error downloading and sending audio:', error);
            await conn.reply(m.chat, 'An error occurred while downloading and sending audio.', m);
            conn.sendMessage(m.chat, { react: { text: '🚫', key: m.key }})
        }
    } else {
        await conn.reply(m.chat, "[❗] Nomor urut tidak valid. Silakan pilih nomor yang sesuai dengan daftar di atas.", m);
        conn.sendMessage(m.chat, { react: { text: '🚫', key: m.key }})
    }
};

handler.help = ['spotify'];
handler.tags = ['downloader'];
handler.command = /^spotify$/i;
handler.limit = true;
module.exports = handler;

async function spotifydl(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const kemii = await axios.get(
        `https://api.fabdl.com/spotify/get?url=${encodeURIComponent(url)}`,
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            Referer: "https://spotifydownload.org/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
        }
      );
      const kemi = await axios.get(
        `https://api.fabdl.com/spotify/mp3-convert-task/${kemii.data.result.gid}/${kemii.data.result.id}`,
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"24\", \"Chromium\";v=\"116\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            Referer: "https://spotifydownload.org/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
        }
      );
      const result = {};
      result.title = kemii.data.result.name;
      result.type = kemii.data.result.type;
      result.artis = kemii.data.result.artists;
      result.durasi = kemii.data.result.duration_ms;
      result.image = kemii.data.result.image;
      result.download = "https://api.fabdl.com" + kemi.data.result.download_url;
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

async function searchSpotify(query) {
    try {
        const access_token = await getAccessToken();
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const data = response.data;
        const tracks = data.tracks.items.map(item => ({
            name: item.name,
            artists: item.artists.map(artist => artist.name).join(', '),
            popularity: item.popularity,
            link: item.external_urls.spotify,
            image: item.album.images[0].url,
            duration_ms: item.duration_ms,
        }));
        return tracks;
    } catch (error) {
        console.error('Error searching Spotify:', error);
        throw 'An error occurred while searching for songs on Spotify.';
    }
}

async function getAccessToken() {
    try {
        const client_id = 'acc6302297e040aeb6e4ac1fbdfd62c3';
        const client_secret = '0e8439a1280a43aba9a5bc0a16f3f009';
        const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
        const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const data = response.data;
        return data.access_token;
    } catch (error) {
        console.error('Error getting Spotify access token:', error);
        throw 'An error occurred while obtaining Spotify access token.';
    }
}