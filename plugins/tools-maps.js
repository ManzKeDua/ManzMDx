const fetch = require('node-fetch');

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const fetchLocationData = async (text, retries = 3, delayMs = 1000) => {
  const randomAppName = `AppName${generateRandomString(5)}`;
  const randomEmail = `user${generateRandomString(5)}@example.com`;

  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json&limit=1`;
  const options = {
    headers: {
      'User-Agent': `${randomAppName}/1.0 (${randomEmail})`
    }
  };

  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options);
    if (res.status === 200) {
      const data = await res.json();
      if (data.length === 0) throw new Error(`City ${text} not found!`);
      return data[0];
    } else if (res.status === 403) {
      if (i < retries - 1) {
        await delay(delayMs); // Delay before retrying
        continue;
      } else {
        throw new Error('Error fetching data: Forbidden');
      }
    } else {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }
  }
};

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} Jakarta`;

  try {
    await m.reply('Please wait...');

    const location = await fetchLocationData(text);
    const city = location.display_name;
    const latitude = location.lat;
    const longitude = location.lon;

    const locationInfo = `City: ${city}\nLatitude: ${latitude}\nLongitude: ${longitude}`;

    await conn.sendMessage(m.chat, { location: { degreesLatitude: parseFloat(latitude), degreesLongitude: parseFloat(longitude) } }, { ephemeralExpiration: 604800 });

    await delay(2000);
    await conn.reply(m.chat, locationInfo, m);

  } catch (e) {
    await conn.reply(m.chat, `Error: ${e.message || e}`, m);
  }
};

handler.command = handler.help = ['map', 'maps'];
handler.tags = ['tools'];
handler.premium = false;
module.exports = handler;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}