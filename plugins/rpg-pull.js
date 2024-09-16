const moneymins = 1;
const withdrawalFeePercentage = 0.05; // 5% withdrawal fee

const formatMoney = (amount) => {
  if (amount >= 1e6) {
    return (amount / 1e6).toFixed(2) + 'M';
  } else if (amount >= 1e3) {
    return (amount / 1e3).toFixed(2) + 'K';
  }
  return amount.toString();
};

let handler = async (m, { conn, command, args }) => {
  // Check if the user has specified a withdrawal method and amount
  if (!args[1] || !['bank', 'dana', 'gopay', 'ovo'].includes(args[1].toLowerCase()) || isNaN(args[0])) {
    return conn.reply(m.chat, `Please enter the correct input to make a withdrawal:
- bank
- dana
- gopay
- ovo

_Example_: .pull/pullall bank
`, m, {
    contextInfo: {
        externalAdReply: {
            mediaType: 1,
            title: 'AXELLDX',
            thumbnailUrl: 'https://telegra.ph/file/49b0be06b8c6762bd8f16.jpg',
            renderLargerThumbnail: true,
            sourceUrl: ''
        }
    }
});
  }

  // Determine e-wallet type and check balance
  let eWallet = args[1].toLowerCase();
  let eWalletBalance = 0;
  let eWalletName = '';
  switch (eWallet) {
    case 'dana':
      eWalletBalance = global.db.data.users[m.sender].dana || 0;
      eWalletName = 'Dana';
      break;
    case 'gopay':
      eWalletBalance = global.db.data.users[m.sender].gopay || 0;
      eWalletName = 'GoPay';
      break;
    case 'ovo':
      eWalletBalance = global.db.data.users[m.sender].ovo || 0;
      eWalletName = 'OVO';
      break;
    default:
      eWalletBalance = global.db.data.users[m.sender].bank || 0;
      eWalletName = 'Bank';
      break;
  }

  // Handle "pull" command for specific amount
  if (/^pull|tarik/i.test(command)) {
    let count = parseInt(args[0]);
    const withdrawalAmount = moneymins * count;
    const withdrawalFee = withdrawalAmount * withdrawalFeePercentage;
    const totalWithdrawal = withdrawalAmount - withdrawalFee;

    if (eWalletBalance >= withdrawalAmount) {
      global.db.data.users[m.sender][eWallet] -= withdrawalAmount;
      global.db.data.users[m.sender].money += totalWithdrawal;

      return conn.reply(m.chat, `
*––––––『  W I T H D R A W 』––––––*
🪪 *Name:* ${conn.getName(m.sender)}
📊 *Status:* [ √ ] • Success
🗂️ *Type:* ${eWalletName} 💵
🧮 *Count:* ${formatMoney(count)}
💸 *Tax (5%):* ${formatMoney(withdrawalFee)}
💰 *Amount:* ${formatMoney(totalWithdrawal)}
`, m);
    } else {
      return conn.reply(m.chat, `Insufficient balance in your ${eWalletName} account. Your current balance is ${formatMoney(eWalletBalance)}.`, m);
    }
  }
}

handler.help = ['pull *<amount>* [e-wallet]', 'tarik *<jumlah>* [e-wallet]'];
handler.tags = ['rpg'];
handler.command = /^(pull|tarik)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;
handler.limit = true;
handler.admin = false;
handler.botAdmin = false;

handler.fail = null;
handler.exp = 0;

module.exports = handler;