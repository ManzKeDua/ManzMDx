let handler = async (m, { conn, args, command }) => {
  conn.duel = conn.duel || [];
  if (args.length !== 0) {
    const mentionedJid = m.mentionedJid ? m.mentionedJid[0] : args[0].replace(/[@ .+-]/g, '').replace(' ', '') + '@s.whatsapp.net';
    if (!conn.duel.includes(mentionedJid)) {
      conn.duel.push(mentionedJid);
    }
  }
  const who = conn.duel[0];
  const user = global.db.data.users[m.sender];
  const enemy = who ? global.db.data.users[who] : null;
  const count = args[1] && args[1].length > 0 ? Math.min(100, Math.max(parseInt(args[1]), 1)) : 1;
  const nama = conn.getName(m.sender);

  const randomaku = `${Math.floor(Math.random() * 101)}`.trim();
  const randomkamu = `${Math.floor(Math.random() * 81)}`.trim();
  const Aku = parseInt(randomaku);
  const Kamu = parseInt(randomkamu);

  const __timers = new Date() - user.lastduel;
  const _timers = 300000 - __timers;
  const timers = clockString(_timers);

  try {
    if (/duel/.test(command)) {
      if (!who) return conn.reply(m.chat, 'Tag salah satu, yang ingin diajak Duel!', m);

      const pler = `@${m.sender.replace(/@.+/, '')} mengajak duel ${args[0]}\n\nPilih Y atau N`;
      const mentionedJid = [m.sender];

      if (new Date() - user.lastduel > 300000) {
        m.reply(pler, null, { mentions: mentionedJid });
      } else {
        conn.reply(m.chat, `Kamu sudah bertarung!\n\nTunggu hingga *${timers}*`, m);
      }
    } else if (/Y/i.test(command)) {
      if (!who) return;
      if (!conn.duel.includes(who)) return conn.reply(m.chat, 'Lu siapa?\nkok ikut kut mau duel', m);
      user.lastduel = new Date().getTime();
      if (Aku > Kamu) {
        user.money -= 900;
        enemy.money += 900;
        conn.duel.splice(conn.duel.indexOf(who), 1);
        conn.reply(m.chat, `@${who.split("@")[0]} *Menang* Gelud\n*Hadiah:*\n900 Money buat beli gorengan`, m, { mentions: [who] });
      } else if (Aku < Kamu) {
        user.money += 450;
        enemy.money -= 450;
        conn.duel.splice(conn.duel.indexOf(who), 1);
        conn.reply(m.chat, `@${who.split("@")[0]} *Kalah* Gelud\n*Hadiah:*\n450 money lumayan buat beli Limit`, m, { mentions: [who] });
      } else {
        user.money += 250;
        enemy.money += 250;
        conn.duel.splice(conn.duel.indexOf(who), 1);
        conn.reply(m.chat, `@${who.split("@")[0]}\n *Seri*\nmasing-masing 250 Money`, m, { mentions: [who] });
      }
    } else if (/N/i.test(command)) {
      if (!who) return;
      if (!conn.duel.includes(who)) return conn.reply(m.chat, 'Tidak bisa mengganggu orang Pertarungan!', m);
      conn.reply(m.chat, `@${who.split("@")[0]} membatalkan Pertarungan!`, m, { mentions: [who] });
      conn.duel.splice(conn.duel.indexOf(who), 1);
    }
  } catch (e) {
    return conn.reply(m.chat, `${e}`, m);
  }
};

handler.help = ['duel *<@user>*'];
handler.tags = ['rpg'];
handler.command = /^(duel|dya|dno)$/i;
handler.group = true;

module.exports = handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}