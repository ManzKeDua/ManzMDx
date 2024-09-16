let fetch = require('node-fetch');
let fs = require('fs');

let timeout = 15 * 60 * 1000; // 15 menit dalam milidetik

// Variabel global untuk melacak status airdrop
let isAirdropAvailable = true;
// Variabel untuk melacak apakah airdrop telah diambil
let isAirdropTaken = false;

let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
    // Cek apakah airdrop sudah dijatuhkan
    if (!isAirdropAvailable) {
        return conn.reply(m.chat, 'Maaf, airdrop belum dijatuhkan. Tunggu sebentar lagi!', m);
    }

    // Cek apakah airdrop telah diambil sebelumnya
    if (isAirdropTaken) {
        return conn.reply(m.chat, 'Maaf, airdrop sudah diambil lebih dulu oleh orang lain. Anda bisa mencoba lagi nanti.', m);
    }
    
    // Tandai bahwa airdrop telah diambil
    isAirdropTaken = true;

    // Ambil data pengguna dari database
    let u = global.db.data.users[m.sender];
    
    // Fungsi untuk mengirim pesan airdrop dengan thumbnail
    const sendAirdropMessage = () => {
        let Aku = `${Math.floor(Math.random() * 101)}`.trim();
        let Kamu = `${Math.floor(Math.random() * 81)}`.trim(); 
        let A = (Aku * 1);
        let K = (Kamu * 1);

        if (A > K) {
            let _sampah = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50']
            let sampah = _sampah[Math.floor(Math.random() * _sampah.length)]
            let kayu = _sampah[Math.floor(Math.random() * _sampah.length)]
            let batu = _sampah[Math.floor(Math.random() * _sampah.length)]
            conn.sendFile(m.chat, 'https://telegra.ph/file/60437ce6d807b605adf5e.jpg', 'zonk.jpg', `*Airdrop Ampas!* Ternyata isinya tidak sesuai ekspektasi\n\n*Rewards*\n• *Sampah:* ${sampah}\n• *Kayu:* ${kayu}\n• *Batu:* ${batu}`, m)
            u.sampah += sampah
            u.kayu += kayu
            u.batu += batu
            u.lastclaim = new Date * 1;
        } else if (A < K) {
            let _limit = ['10','20','30','50','100']
            let limit = _limit[Math.floor(Math.random() * _limit.length)]
            let _money = ['10000','100000','500000']
            let money = _money[Math.floor(Math.random() * _money.length)]
            let _point = ['10000','100000','500000']
            let point = _point[Math.floor(Math.random() * _point.length)]
            conn.sendFile(m.chat, 'https://telegra.ph/file/d3bc1d7a97c62d3baaf73.jpg', 'rare.jpg', `*Airdrop Rare!*, Kamu mendapatkan Kotak Airdrop *Rare*\n\nSelamat kamu mendapatkan *Rewards*\n• *Limit:* ${limit}\n• *Money:* ${money}\n• *Point:* ${point}`, m)
            u.limit += limit
            u.money += money
            u.poin += point 
            u.lastclaim = new Date * 1;
        } else {
            conn.sendFile(m.chat, 'https://telegra.ph/file/5d71027ecbcf771b299fb.jpg', 'zonk.jpg',`*Airdrop Zonks!*, Kamu mendapatkan Kotak Airdrop *Zonk (Kosong)*\n\nSelamat kamu mendapatkan *Rewards*\n• *Money:* -1.000.000\n• *Isi:* Angin`, m);
            u.money -= 1000000
            u.lastclaim = new Date * 1;
        }

        // Setelah mengirim airdrop, kembalikan status airdrop menjadi tersedia
        isAirdropAvailable = true;
    };

    // Panggil fungsi untuk mengirim pesan airdrop
    sendAirdropMessage();
};

// Fungsi dan variabel lainnya tetap sama

// Export handler
module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return ['\n*' + d + '* _Hari_ ☀️\n ', '*' + h + '* _Jam_ 🕐\n ', '*' + m + '* _Menit_ ⏰\n ', '*' + s + '* _Detik_ ⏱️ '].map(v => v.toString().padStart(2, 0)).join('');
}