let handler = async (m, { conn, args }) => {
    if (!args[0] || isNaN(args[0])) {
        return conn.reply(m.chat, '• *Contoh :* .buylimit 10', m);
    }

    // Menghilangkan simbol-simbol dari angka yang dimasukkan
    let count = parseInt(args[0].replace(/\D/g, ''));
    let price = count * 15000;
    let users = global.db.data.users;
    let user = users[m.sender];
    
    if (price > user.money) {
        return conn.reply(m.chat, `🚩 Maaf, uang kamu tidak cukup untuk membeli ${count} limit. Harga 1 limit adalah 15000 balance.`, m);
    }

    user.money -= price;
    user.limit += count;
    conn.reply(m.chat, `🚩 Berhasil membeli ${count} limit dengan harga ${price} balance.`, m);
}

handler.help = ['buylimit *<jumlah>*'];
handler.tags = ['rpg'];
handler.command = /^buylimit$/i;
handler.register = true;
handler.limit = false;

module.exports = handler;