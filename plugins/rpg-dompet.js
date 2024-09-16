let handler = async (m, { conn, args }) => {
  let target = m.mentionedJid[0] || m.sender;
  let user = global.db.data.users[target];
  let name = user.name || 'Unknown';
  let point = user.point || 0;
  let exp = user.exp || 0;
  let limit = user.limit || 0;
  let balance = user.money || 0;
  let atm = user.bank || 0;
  let level = user.level || 0;
  let role = user.role || 'No Role';
  let dana = user.dana || 0;
  let gopay = user.gopay || 0;
  let ovo = user.ovo || 0;

  const formatMoney = (value) => {
    if (typeof value !== 'number' || isNaN(value)) return '0';
    let absValue = Math.abs(value);
    let abbreviated, detailed;

    if (absValue >= 1e9) {
      abbreviated = (absValue / 1e9).toFixed(1).replace(/\.0$/, '') + 'M';
      detailed = Math.round(absValue / 1e6).toLocaleString() + '.000.000';
    } else if (absValue >= 1e6) {
      abbreviated = (absValue / 1e6).toFixed(1).replace(/\.0$/, '') + 'JT';
      detailed = Math.round(absValue / 1e3).toLocaleString() + '.000';
    } else if (absValue >= 1e3) {
      abbreviated = (absValue / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
      detailed = absValue.toLocaleString();
    } else {
      abbreviated = absValue.toLocaleString();
      detailed = absValue.toLocaleString();
    }

    return (value < 0 ? '-' : '') + `${abbreviated} - ${detailed}`;
  };

  const withdrawFromBank = (amount) => {
    if (atm >= amount) {
      atm -= amount;
      if (balance < 0) {
        let debt = Math.abs(balance);
        if (amount >= debt) {
          balance += debt;
          amount -= debt;
        } else {
          balance += amount;
          amount = 0;
        }
      }
      balance += amount;
    } else {
      throw new Error('Insufficient funds in the bank');
    }
  };

  // Example usage of withdraw function (amount to withdraw can be passed via args)
  try {
    let amountToWithdraw = parseInt(args[0]) || 0;
    if (amountToWithdraw > 0) {
      withdrawFromBank(amountToWithdraw);
    }
  } catch (error) {
    return conn.sendMessage(m.chat, { text: error.message }, { quoted: m });
  }

  let formattedBalance = formatMoney(balance);
  let formattedAtm = formatMoney(atm);
  let formattedDana = formatMoney(dana);
  let formattedGopay = formatMoney(gopay);
  let formattedOvo = formatMoney(ovo);

  let capt = `*U S E R - B A N K*\n\n`;
  capt += `📇  ◦  *Name* : ${name}\n`;
  capt += `🪙  ◦  *Points* : ${point}\n`;
  capt += `💴  ◦  *Money* : ${formattedBalance}\n`;
  capt += `💳  ◦  *Bank* : ${formattedAtm}\n\n`;
  capt += `*U S E R - E W A L L E T*\n\n`;
  capt += `💶   ◦  *Dana* : ${formattedDana}\n`;
  capt += `💵   ◦  *GoPay* : ${formattedGopay}\n`;
  capt += `💷   ◦  *Ovo* : ${formattedOvo}\n\n`;
  capt += `ᴘᴏᴋɪɪ ᴍᴀᴅᴇ ʙʏ ᴀxᴇʟʟᴅx`;

  conn.sendMessage(m.chat, {
    text: capt,
    contextInfo: {
      externalAdReply: {
        title: 'AXELLDX',
        thumbnailUrl: 'https://telegra.ph/file/9bb25df62f06b289bf31f.jpg',
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });

  // Save updated user data
  user.bank = atm;
  user.money = balance;
};

handler.help = ['balance', 'balance *@user*', 'mywallet', 'ewallet *@user*'];
handler.tags = ['info'];
handler.command = /^bal(ance)?|dompet|bank|mywallet|ewallet$/i;

module.exports = handler;