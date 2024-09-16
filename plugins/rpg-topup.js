let handler = async (m, { args, conn }) => {
  // Daftar e-wallet yang bisa digunakan
  let ewallets = ['dana', 'gopay', 'ovo'];

  if (args.length !== 2 || !ewallets.includes(args[0].toLowerCase())) {
    // Pesan untuk input yang salah
    return conn.reply(m.chat, `Please provide valid input. Here are the *E-wallets* you can top up: \n- Dana\n- Gopay\n- Ovo\n\n_Example_ : .topup dana 100000`, m, {
      contextInfo: {
          externalAdReply: {
              mediaType: 1,
              title: 'Topup E-Wallet',
              thumbnailUrl: 'https://telegra.ph/file/290dbe7b26f356ceaadb2.jpg',
              renderLargerThumbnail: true,
              sourceUrl: ''
          }
      }
    });
  }

  let ewallet = args[0].toLowerCase(); // Menyimpan nama e-wallet
  let amount = parseInt(args[1]); // Menyimpan jumlah uang top up
  if (isNaN(amount) || amount <= 0) {
    throw 'Please enter a valid positive number for the amount!';
  }

  // Mendapatkan data pengguna dari database
  let user = global.db.data.users[m.sender];
  if (!user) {
    user = {};
    global.db.data.users[m.sender] = user;
  }

  // Mengecek apakah saldo pengguna cukup untuk melakukan top up
  if (user.money < amount) {
    return conn.reply(m.chat, `Sorry, your balance is not sufficient to top up *${amount.toLocaleString()}*`, m);
  }

  // Menghitung biaya transaksi dan saldo akhir
  let fee = Math.floor(amount * 0.05); // Misalnya fee 5%
  let balance = amount - fee;

  // Pesan yang akan ditampilkan kepada pengguna
  let message = `*––––––『  T O P U P 』––––––*\n`;
  message += `🪪 *Name:* ${conn.getName(m.sender)}\n`;
  message += `📊 *Status:* [ √ ] • Success\n`;
  message += `🗂️ *Type:* ${ewallet.toUpperCase()}💵\n`;
  message += `🧮 *Count:* ${amount.toLocaleString()}\n`;
  message += `💸 *Tax (5%):* ${(fee).toLocaleString()}\n`;
  message += `💰 *Amount:* ${balance.toLocaleString()}`;

  // Membuat database masing-masing pengguna untuk setiap e-wallet jika belum ada
  if (!user.dana) user.dana = 0;
  if (!user.gopay) user.gopay = 0;
  if (!user.ovo) user.ovo = 0;

  // Menambahkan saldo top up ke saldo e-wallet yang dipilih
  user[ewallet] += balance;

  // Mengurangi saldo pengguna sesuai dengan jumlah yang dia top up
  user.money -= amount;

  // Menyimpan data pengguna ke dalam database
  global.db.data.users[m.sender] = user;
  global.db.write();

  // Menampilkan pesan ke pengguna
  conn.reply(m.chat, message, m);
}

handler.help = ['topup *<ewallet>* *<amount>*'];
handler.tags = ['rpg'];
handler.command = /^topup$/i;
handler.register = true;
handler.limit = true;

module.exports = handler;