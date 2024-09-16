let handler = async (m, { isPrems, args, conn, text, command, usedPrefix }) => {
    let user = global.db.data.users[m.sender];

    const jobRequirements = {
        'gojek': { min: 10 },
        'kurir': { min: 10 },
        'sopir': { min: 10 },
        'karyawan indomaret': { min: 20 },
        'kantoran': { min: 30 },
        'dokter': { min: 50 },
        'frontend developer': { min: 40 },
        'web developer': { min: 40 },
        'backend developer': { min: 40 },
        'fullstack developer': { min: 50 },
        'game developer': { min: 40 },
        'pemain sepak bola': { min: 30 },
        'trader': { min: 40 },
        'hunter': { min: 20 },
        'polisi': { min: 30 }
    };

    function capitalizeFirstLetter(str) {
        let words = str.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
        }
        return words.join(" ");
    }

    const COOLDOWN_PERIOD = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

    // Memeriksa apakah pengguna dalam periode cooldown
    if (user.lastjobchange) {
        let lastjobchange = new Date(user.lastjobchange);
        let now = new Date();
        if (now - lastjobchange < COOLDOWN_PERIOD) {
            let timeLeft = COOLDOWN_PERIOD - (now - lastjobchange);
            let daysLeft = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
            let hoursLeft = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            let minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
            throw `Anda telah mengganti pekerjaan baru-baru ini. Silakan tunggu ${daysLeft} hari, ${hoursLeft} jam, dan ${minutesLeft} menit lagi sebelum mengganti pekerjaan lagi.`;
        }
    }

    // Memeriksa apakah teks yang dimasukkan pengguna adalah pekerjaan yang valid
    if (!text || !Object.keys(jobRequirements).includes(text.toLowerCase())) {
        let kerjaan = `乂 *L I S T - J O B*

• Gojek 
• Kurir
• Sopir
• Karyawan Indomaret
• Kantoran
• Dokter
• Frontend Developer
• Web Developer
• Backend Developer
• Fullstack Developer
• Game Developer
• Pemain Sepak Bola
• Trader
• Hunter
• Polisi

• _Example_ : ${usedPrefix}${command} gojek`.trim();
        conn.reply(m.chat, kerjaan, m);
        return;
    }

    let job = text.toLowerCase();
    let kapital = capitalizeFirstLetter(job);
    let jobLevelRange = jobRequirements[job];

    // Memeriksa apakah level pengguna berada dalam rentang level yang dibutuhkan untuk pekerjaan yang dipilih
    if (user.level < jobLevelRange.min) {
        throw `Maaf, level Anda tidak mencukupi untuk menjadi ${kapital}. Level yang dibutuhkan minimal adalah ${jobLevelRange.min}. Level Anda saat ini adalah ${user.level}.`;
    }

    // Memberikan pesan bahwa pengguna telah memilih pekerjaan dan menunggu persetujuan
    setTimeout(() => {
        let lamarkerja1 = `Kamu telah memilih *${kapital}* sebagai pekerjaanmu

⤷ Tunggulah persetujuan dari pihak perusahaan dalam 1 menit agar diterima untuk bekerja.`.trim();
        conn.reply(m.chat, lamarkerja1, m);
    }, 0);

    // Memberikan pesan bahwa lamaran pekerjaan telah diterima dan menandai pengguna sebagai bekerja
    setTimeout(() => {
        let lamarkerja2 = `🎉 Selamat, lamaran kerja kamu telah diterima oleh pihak perusahaan dan sekarang kamu dapat memulai untuk bekerja hari ini.

⤷ Ketik *.job* untuk melihat detail pekerjaan.`.trim();
        conn.reply(m.chat, lamarkerja2, m);

        // Menyimpan pekerjaan pengguna, menandai mereka sebagai bekerja, dan mencatat waktu pergantian pekerjaan terakhir
        user.job = job;
        user.lastJobChange = new Date().toISOString();
        global.db.data.pekerjaan[m.sender] = {
            job: job,
            level: user.level,
            timestamp: new Date().toISOString()
        };
    }, 30000);
};

handler.help = ['lamarkerja'];
handler.tags = ['life'];
handler.command = /^lamarkerja$/i;

module.exports = handler;

function capitalizeFirstLetter(str) {
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join(" ");
}