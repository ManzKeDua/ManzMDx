let handler = async (m, { conn, participants }) => {
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
  let money = Object.entries(global.db.data.users).sort((a, b) => b[1].money - a[1].money);
  let getUser = money.map(v => v[0]);
  let show = Math.min(10, money.length);
  let rankmoney = money.map(([user, data]) => user);
  let teks = `乂  *T O P - G L O B A L*\n\n`;
  teks += `“You are ranked *${rankmoney.indexOf(m.sender) + 1}* out of *${getUser.length}* users.”\n\n`;
  teks += money
    .slice(0, show)
    .map(([user, data], i) => 
      (i + 1) + '. @' + user.split`@`[0] + '\n' +
      '   *💴*  : *' + toRupiah(data.money) + '*\n' +
      '   *🎗*  : *' + data.level + '*'
    )
    .join('\n');
  teks += `\n\Yᴏɢɪʀɪ - ᴡᴀʙᴏᴛ ᴍᴀᴅᴇ ʙʏ ᴍᴀɴᴢᴋᴇɴᴢ`;
  m.reply(teks);
};

handler.command = ["topglobal","rank"];
handler.tags = ["xp", "main"];
handler.help = ["topglobal"];
handler.register = true;

module.exports = handler;

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}