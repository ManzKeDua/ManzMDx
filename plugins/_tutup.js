/*
*SUMBER: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
*GRUP DISKUSI: https://chat.whatsapp.com/ETZ8r7CLypfAPH93q0gC0y
ini tanda air kang, jangan dihapus
*/

const moment = require('moment-timezone');
const schedule = require('node-schedule');

const timeZone = 'Asia/Jakarta';

// Konfigurasi waktu tutup dan buka grup
const closeTime = '21.00';
const openTime = '05.30';

// Daftar ID grup yang ingin dikelola
const groupChats = [
    '120363314831472076@g.us', // Ganti dengan ID grup yang sesuai
    '0987654321-0987654321@g.us'  // Tambahkan ID grup lain di sini
];

// Variabel status grup
let groupStatus = {};

// Fungsi untuk memeriksa waktu dan mengubah status grup
const checkGroupsStatus = async (conn) => {
    const currentTime = moment().tz(timeZone).format('HH:mm');

    for (const chatId of groupChats) {
        // Tutup grup jika waktunya tepat dan grup belum ditutup
        if (currentTime === closeTime && groupStatus[chatId] !== 'closed') {
            await conn.groupSettingUpdate(chatId, 'announcement');
            await conn.sendMessage(chatId, { text: 'Grup telah ditutup sesuai jadwal.' });
            groupStatus[chatId] = 'closed';
        }

        // Buka grup jika waktunya tepat dan grup belum dibuka
        if (currentTime === openTime && groupStatus[chatId] !== 'opened') {
            await conn.groupSettingUpdate(chatId, 'not_announcement');
            await conn.sendMessage(chatId, { text: 'Grup telah dibuka kembali sesuai jadwal.' });
            groupStatus[chatId] = 'opened';
        }
    }
};

// Jadwalkan pemeriksaan status grup setiap menit
schedule.scheduleJob('* * * * *', () => {
    checkGroupsStatus(conn);
});
/*
auto tutup dan buka grup
*/