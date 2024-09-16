const timeout = 3600000; // 1 hour in milliseconds
const banDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
const fineAmount = 2000000; // Fine amount in case of failure

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let dapat = Math.floor(Math.random() * 100000);
    let nomors = m.sender;
    let who;
    
    if (m.isGroup) who = m.mentionedJid[0];
    else who = m.chat;
    
    if (!who) return conn.reply(m.chat, 'Tag salah satu lah', m);
    if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base';
    
    let users = global.db.data.users;
    let now = new Date().getTime();
    let lastrob = users[m.sender].lastrob || 0;
    let __timers = now - lastrob;
    let _timers = timeout - __timers;
    let timers = clockString(_timers);
    
    // Check if user is currently banned
    if (users[m.sender].banned) {
        return conn.reply(m.chat, `Anda sedang dilarang merampok selama ${msToTime(banDuration)}`, m);
    }
    
    if (__timers > timeout) {
        if (users[who].money < 10000) throw 'Target Gaada Uang bodoh, Kismin dia';
        
        // Determine if the robbery fails
        let failChance = Math.random();
        if (failChance < 0.3) { // 30% chance of failure
            // Apply penalties
            users[m.sender].money -= fineAmount;
            users[m.sender].banned = true;
            setTimeout(() => {
                users[m.sender].banned = false;
            }, banDuration);
            
            conn.reply(m.chat, `Merampok gagal! Kamu didenda 💵 ${fineAmount} dan dilarang merampok selama ${msToTime(banDuration)}.`, m, {
                contextInfo: {
                    externalAdReply: {
                        mediaType: 1,
                        title: 'Yah Gagal:(',
                        thumbnailUrl: 'https://telegra.ph/file/040a9f37bdd4052ecc5a3.jpg',
                        renderLargerThumbnail: true,
                        sourceUrl: ''
                    }
                }
            });
        } else {
            users[who].money -= dapat;
            users[m.sender].money += dapat;
            users[m.sender].lastrob = now;
            
            conn.reply(m.chat, `Berhasil Merampok Money Target Sebesar ${dapat}`, m, {
                contextInfo: {
                    externalAdReply: {
                        mediaType: 1,
                        title: 'Berhasil!',
                        thumbnailUrl: 'https://telegra.ph/file/80c70ea8c39cfea6873ff.jpg',
                        renderLargerThumbnail: true,
                        sourceUrl: ''
                    }
                }
            });
        }
    } else {
        conn.reply(m.chat, `Anda sudah merampok dan berhasil sembunyi, tunggu ${timers} untuk merampok lagi`, m);
    }
};

handler.help = ['merampok *@user*'];
handler.tags = ['rpg'];
handler.command = /^merampok$/;
handler.limit = true;
handler.group = true;

module.exports = handler;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + " jam " + minutes + " menit " + seconds + " detik";
}