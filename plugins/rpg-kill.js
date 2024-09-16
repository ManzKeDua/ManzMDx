const timeout = 604800000;

let handler = async (m, { conn, usedPrefix, text }) => {
    let user = global.db.data.users[m.sender];
    let time = user.lastkill + timeout;

    if (new Date - user.lastkill < timeout) {
        return conn.reply(m.chat, `Anda sudah menggunakan kill\nTunggu selama ${msToTime(time - new Date())} lagi`, m);
    }

    if (user.pisau < 1) {
        return conn.reply(m.chat, `Anda tidak memiliki pisau untuk melakukan kill.`, m);
    }

    // Simulate a success/failure condition
    let success = Math.random() > 0.3; // 70% success rate

    if (success) {
        user.limit += 20;
        user.money += 1000000;
        let money = `${Math.floor(Math.random() * 30000)}`.trim();
        let exp = `${Math.floor(Math.random() * 999)}`.trim();
        let kardus = `${Math.floor(Math.random() * 1000)}`.trim();
        user.money += money * 1;
        user.exp += exp * 1;
        user.kardus += kardus * 1;
        user.lastkill = new Date * 1;
        user.pisau -= 1;

        conn.reply(m.chat, `Selamat kamu mendapatkan : \n+${money} Money\n+${kardus} Kardus\n+${exp} Exp\n+20 Limit\n+1000000 money`, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'AXELLDX',
                    thumbnailUrl: 'https://telegra.ph/file/3d677280ba75c9d4bd463.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        });

        setTimeout(() => {
            conn.reply(m.chat, `Yuk waktunya kill lagi 👋…`, m);
        }, timeout);

    } else {
        user.health -= 30;
        user.money -= 1000000;
        user.limit -= 10;
        user.lastkill = new Date * 1;
        user.pisau -= 1;

        conn.reply(m.chat, `Gagal melakukan kill! Kamu dikenakan denda: \n-30 Health\n-1000000 Money\n-10 Limit`, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'Manz',
                    thumbnailUrl: 'https://telegra.ph/file/040a9f37bdd4052ecc5a3.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        });

        setTimeout(() => {
            conn.reply(m.chat, `Yuk coba lagi untuk kill 👋…`, m);
        }, timeout);
    }
};

handler.help = ['kill'];
handler.tags = ['rpg'];
handler.command = /^(kill)/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;

handler.admin = false;
handler.botAdmin = false;

handler.fail = null;
handler.limit = false;
handler.exp = 0;
handler.money = 0;

module.exports = handler;

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + " jam " + minutes + " menit " + seconds + " detik";
}