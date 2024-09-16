// CREATOR : AGUNG
// NUMBER : 6283126390134 OR wa.me/6283126390134

// BUAT BOOST ATAU REFRESH BOT ENTE

let { performance } = require('perf_hooks');

let handler = async (m, { conn }) => {
    let start = `\`\`\`Waiting is being accelerated...\`\`\``;
    
    let boosts = [
        '[▒▒▒▒▒▒▒▒▒▒]',
        '[█▒▒▒▒▒▒▒▒▒]',
        '[██▒▒▒▒▒▒▒▒]',
        '[███▒▒▒▒▒▒▒▒]',
        '[████▒▒▒▒▒▒▒]',
        '[█████▒▒▒▒▒▒]',
        '[██████▒▒▒▒▒▒]',
        '[███████▒▒▒▒▒]',
        '[████████▒▒▒▒]',
        '[█████████▒▒▒]',
        '[██████████▒▒]',
        '[███████████▒]',
        '[████████████]',
        '[█████████████]',
        '[██████████████]',
        '[███████████████]',
        '[████████████████]',
        '[█████████████████]',
        '[██████████████████]',
        '[███████████████████]',
        '[████████████████████]'
    ];

    await m.reply(start);
    
    for (let i = 0; i < boosts.length; i++) {
        await m.reply(boosts[i]);
    }

    let old = performance.now();
    // Simulating some processing time
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    let neww = performance.now();
    
    let speed = ((neww - old) / 1000).toFixed(2); // Speed in seconds
    let finish = `\`\`\`Bot succeeded in Accelerate\n\nSpeed: ${speed} seconds.\`\`\``;

    conn.reply(m.chat, finish, m);
};

handler.help = ['refresh'];
handler.tags = ['owner'];
handler.command = /^boost|refresh/i;
handler.owner = true;
handler.fail = null;
module.exports = handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}