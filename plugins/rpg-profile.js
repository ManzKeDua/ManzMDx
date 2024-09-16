let fetch = require("node-fetch");
let canvafy = require ('canvafy')
let levelling = require('../lib/levelling')

let handler = async (m, { conn, command }) => {
  try {
    let who;
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    else who = m.quoted.sender ? m.quoted.sender : m.sender;

    let ppUrl = await conn.profilePictureUrl(who, 'image').catch((_) => "https://telegra.ph/file/1dff1788814dd281170f8.jpg");
    let pp = await (await fetch(ppUrl)).buffer();

    let user = global.db.data.users[who];
    let username = user.name;
    let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
    let curr = user.exp - min
    let limit = user.premium ? '∞' : user.limit; // Mengubah limit user premium menjadi 'Infinity' jika pengguna adalah premium
    let balance = user.money > 9999999999 ? '4̶0̶4̶ N̶o̶t̶ F̶o̶u̶n̶d̶' : user.money;
    let saldo = user.saldo; // Mengubah balance user yang lebih dari 999999999 menjadi 'Infinity'
    let level = user.level > 9999 ? '4̶0̶4̶ N̶o̶t̶ F̶o̶u̶n̶d̶' : user.level; // Mengubah level pengguna yang lebih dari 9999 menjadi 'Infinity'
    let role = user.role;
    let agama = user.agama;
    let gender = user.gender;
    let money = user.money;
    let bank = user.bank;
    let warn = user.warn;
    let job = user.job;
    let city = user.city;
    let registered = user.registered ? true : false;
    let skill = user.skill;
    let rank = user.owner ? 'Immortality' : user.premium ? 'Sepuh' : 'Kroco'; // Menambahkan 'Not Found' jika rank tidak terdefinisi
    let point = user.point
    let age = user.age > 4000 ? 'Unknown' : user.age;
    let isPremium = user.premium ? "√" : "×";
    let isVip = user.vip ? "√" : "×";
    let premiumExpired = user.premium ? new Date(user.premiumDate).toDateString() : "Not Found";
    let vipExpired = user.vip ? new Date(user.vipDate).toDateString() : "Not Found";
    let pasangan = user.pasangan ? global.db.data.users[user.pasangan].name : 'Not Have'; // Mengambil nama pasangan dari database
    let banned = user.banned ? true : false;
    let block = user.block ? true : false;
    let sahabat = user.sahabat ? '' + global.db.data.users[user.sahabat].name : 'Not Have';
    
    let caption = '乂 *U S E R - P R O F I L E*\n\n'
    caption += '- *Name* :' + ` ${username}\n`
    caption += '- *Role* :' + ` ${role}\n`
    caption += '- *Skill* :' + ` ${skill}\n`
    caption += '- *Rank* :' + ` ${rank}\n`
    caption += '- *Level* :' + ` ${level}\n`
    caption += '- *Money* :' + ` ${money}\n`
    caption += '- *Bank* :' + ` ${bank}\n`
    caption += '- *Point* :' + ` ${toRupiah(point)}\n`
    caption += '- *Limit* :' + ` ${limit}\n\n`  
    caption += '乂 *U S E R - S T A T U S*\n\n'
    caption += '- *Banned* :' + ` ${banned ? '√' : '×'}\n`
    caption += '- *Blocked* :' + ` ${block ? '√' : '×'}\n`
    caption += '- *Verified* :' + ` ${registered ? '√' : '×'}\n`
    caption += '- *Warn* :' + ` ${warn} / 5\n`
    caption += '- *Premium* :' + ` ${isPremium}\n`
    caption += '- *Expired* : ' + ` ${premiumExpired}\n`.trim()
    conn.sendMessage(m.chat, {
    text: caption, 
    contextInfo: {
    mentionedJid: [m.sender],
    externalAdReply: {
    title: 'You Profile!',
    thumbnailUrl: ppUrl,
    mediaType: 1,
    renderLargerThumbnail: true
    }}}, {quoted: m})
  } catch {
    let sender = m.sender;;
    let ppUrl = await conn.profilePictureUrl(sender, 'image').catch((_) => "https://telegra.ph/file/1dff1788814dd281170f8.jpg");
    let pp = await (await fetch(ppUrl)).buffer();

    let user = global.db.data.users[sender];
    let username = user.name;
    let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
    let curr = user.exp - min
    let limit = user.premium ? '∞' : user.limit; // Mengubah limit user premium menjadi 'Infinity' jika pengguna adalah premium
    let balance = user.money > 9999999999 ? '4̶0̶4̶ N̶o̶t̶ F̶o̶u̶n̶d̶' : user.money; // Mengubah balance user yang lebih dari 999999999 menjadi 'Infinity'
    let saldo = user.saldo; 
    let level = user.level > 9999 ? '4̶0̶4̶ N̶o̶t̶ F̶o̶u̶n̶d̶' : user.level; // Mengubah level pengguna yang lebih dari 9999 menjadi 'Infinity'
    let role = user.role;
    let agama = user.agama;
    let gender = user.gender;
    let job = user.job;
    let city = user.city;
    let money = user.money;
    let stamina = user.stamina;
    let bank = user.bank;
    let skill = user.skill;
    let warn = user.warn;
    let registered = user.registered ? true : false;
    let rank = user.owner ? 'Immortality' : user.premium ? 'Sepuh' : 'Kroco'; // Menambahkan 'Not Found' jika rank tidak terdefinisi
    let point = user.point
    let age = user.age > 4000 ? '-' : user.age;
    let isPremium = user.premium ? "√" : "×";
    let isVip = user.vip ? "√" : "×";
    let premiumExpired = user.premium ? new Date(user.premiumDate).toDateString() : "Not Found";
    let vipExpired = user.vip ? new Date(user.vipDate).toDateString() : "-";
    let pasangan = user.pasangan ? global.db.data.users[user.pasangan].name : 'Not Have'; // Mengambil nama pasangan dari database
    let banned = user.banned ? true : false;
    let block = user.block ? true : false;
    let sahabat = user.sahabat ? '' + global.db.data.users[user.sahabat].name : 'Not Have';

    let caption = '乂 *U S E R - P R O F I L E*\n\n'
    caption += '- *Name* :' + ` ${username}\n`
    caption += '- *Role* :' + ` ${role}\n`
    caption += '- *Skill* :' + ` ${skill}\n`
    caption += '- *Rank* :' + ` ${rank}\n`
    caption += '- *Level* :' + ` ${level}\n`
    caption += '- *Money* :' + ` ${money}\n`
    caption += '- *Bank* :' + ` ${bank}\n`
    caption += '- *Point* :' + ` ${toRupiah(point)}\n`
    caption += '- *Limit* :' + ` ${limit}\n\n`   
    caption += '乂 *U S E R - S T A T U S*\n\n'
    caption += '- *Banned* :' + ` ${banned ? '√' : '×'}\n`
    caption += '- *Blocked* :' + ` ${block ? '√' : '×'}\n`
    caption += '- *Verified* :' + ` ${registered ? '√' : '×'}\n`
    caption += '- *Warn* :' + ` ${warn} / 5\n`
    caption += '- *Premium* :' + ` ${isPremium}\n`
    caption += '- *Expired* : ' + ` ${premiumExpired}\n`.trim()
    conn.sendMessage(m.chat, {
    text: caption, 
    contextInfo: {
    mentionedJid: [m.sender],
    externalAdReply: {
    title: 'Your Profile!',
    thumbnailUrl: ppUrl,
    mediaType: 1,
    renderLargerThumbnail: true
    }}}, {quoted: m})
}
};

handler.command = /^(profile|me)$/i
handler.help = ['profile *@user*'];
handler.tags = ['rpg'];
handler.register = true;

module.exports = handler;

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}

function formatRupiah(number) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  return formatter.format(number);
}