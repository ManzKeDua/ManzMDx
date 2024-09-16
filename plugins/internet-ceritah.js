const cheerio = require('cheerio');
const axios = require('axios');

// Defining the loading message
const status = {
  wait: "Please wait while I fetch the stories..."
};

let handler = async (m, { conn }) => {
  // Reply with the loading message
  await m.reply(status.wait);

  // Fetch the stories
  let res = await ceritahantu();

  // Format the fetched data
  let hasil = res.map(v => {
    return `• Title: ${v.title}
• Snippet: ${v.snippet}
• Image: ${v.image}
• URL: ${v.url}
    `;
  });

  // Reply with the formatted data
  conn.reply(m.chat, hasil.join('\n'));
};

handler.command = handler.help = ["ceritahantu", "ceritahoror"];
handler.tags = ["internet"];
handler.limit = true;

module.exports = handler;

/**
 * DannTeam
 * Danz & Yanz
 * ig: @dannalwaysalone
*/

// Function to fetch horror stories
async function ceritahantu() {
  const response = await axios.get("https://cerita-hantu-nyata.blogspot.com/search?q=Kentang&m=1");
  const $ = cheerio.load(response.data);

  const popularPosts = [];

  $('.item-content').each((index, element) => {
    const post = {};
    post.title = $(element).find('.item-title a').text();
    post.snippet = $(element).find('.item-snippet').text().trim();
    post.image = $(element).find('.item-thumbnail img').attr('src');
    post.url = $(element).find('.item-title a').attr('href');
    popularPosts.push(post);
  });

  return popularPosts;
}