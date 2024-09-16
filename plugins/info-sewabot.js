const Button = require('../lib/button')
let handler = async (m, { conn, usedPrefix }) => {
return new Button()
.setBody( `「 *LIST HARGA SEWA BOT* 」

*PAKET S1*
- Rp15.000 / Group
- Perpanjang Rp10.000
- Masa aktif 15 Hari

*PAKET S2*
- Rp25.000 / Group
- Perpanjang Rp20.000 (hemat 25%)
- Masa aktif 1 Bulan

*PAKET S3*
- Rp40.000 / Group
- Perpanjang Rp35.000 (hemat 15%)
- Masa aktif 2 Bulan
- Anda hemat Rp5.000

*PAKET S4*
- Rp50.000 / Group
- Perpanjang Rp45.000 (hemat 10%)
- Masa aktif 3 Bulan
- Anda hemat Rp10.000

*KEUNTUNGAN*
- Fast respon
- Bot on 24 jam
- Antilink (auto kick yg kirim link)
- Antivirtex (auto kick yg kirim virtex)
- Welcome (menyambut member baru)
- Games
- Menfess
- Downloader
- Ai (artificial intelligence)
- Dan masih banyak lagi

*PAYMENT*
• Dana 
• Ovo 
• Gopay

*INFORMATION*
> 1. Melakukan pembelian artinya anda setuju dengan segala kebijakan kami.
> 2. Semua pembelian bergaransi.
> 3. Tidak puas dengan layanan kami? Kami kembalikan uang Anda 100% dalam jangka waktu 1 jam setelah pembelian.
> 4. Jika bot mengalami kendala atau perbaikan hingga 24 jam atau lebih, kami berikan kompensasi berupa penambahan waktu sewa.
> 5. Perpanjangan hanya berlaku jika masa aktif tersisa kurang dari 3 hari.

Berminat? Hubungi:`)
.setFooter('ʟɪɢʜᴛᴡᴇɪɢʜᴛ ᴡᴀʙᴏᴛ ᴍᴀᴅᴇ ʙʏ manz ッ')
.setImage('https://tmpfiles.org/dl/12393205/1725808040168.jpg')
.addUrl('Costumer Support','https://wa.me/6288989721627','https://wa.me/6288989721627')
.run(m.chat, conn, m)
}
handler.help = ['sewabot']
handler.tags = ['info','main']
handler.command = /^(sewabot|sewa)$/i
handler.register = false

module.exports = handler