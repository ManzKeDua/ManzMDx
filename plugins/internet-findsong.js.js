/** !! THIS CODE GENERATE BY ZHUBOT !! **/

const axios = require("axios")
const cheerio = require("cheerio")

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example:* ${usedPrefix + command} *Starboy*`;
  m.reply('_Mohon Tunggu Sebentar_');
  try {
    let lirik = await findSongs(text);
    let caption = `*[ ${command === "lirik" ? command + " SEARCH" : command.toUpperCase().split("").join(" ")} ]*
• Title:* ${lirik.title}
• Album:* ${lirik.album}

\`\`\`${lirik.lyrics}\`\`\``;
    conn.sendFile(m.chat, lirik.thumb, null, caption, m)
  } catch (e) {
    throw "Request Error";
  }
}
handler.help = ["songfind","findsong"].map(a => a + " *<Name song>*");
handler.tags = ["internet"];
handler.command = ["songfind","findsong"];

module.exports = handler;


async function findSongs(text) {
  try {
    const { data } = await axios.get(
      "https://songsear.ch/q/" + encodeURIComponent(text),
    );
    const $ = cheerio.load(data);
    const result = {
      title:
        $("div.results > div:nth-child(1) > .head > h3 > b").text() +
        " - " +
        $("div.results > div:nth-child(1) > .head > h2 > a").text(),
      album: $("div.results > div:nth-child(1) > .head > p").text(),
      number: $("div.results > div:nth-child(1) > .head > a")
        .attr("href")
        .split("/")[4],
      thumb: $("div.results > div:nth-child(1) > .head > a > img").attr("src"),
    };

    const { data: lyricData } = await axios.get(
      `https://songsear.ch/api/song/${result.number}?text_only=true`,
    );
    const lyrics = lyricData.song.text_html
      .replace(/<br\/>/g, "\n")
      .replace(/&#x27;/g, "'");

    return {
      status: true,
      title: result.title,
      album: result.album,
      thumb: result.thumb,
      lyrics: lyrics,
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      error: "Unknown error occurred",
    };
  }
}