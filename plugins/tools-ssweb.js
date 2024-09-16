var fs = require('fs');
var path = require('path');
var fetch = require('node-fetch');
var handler = async (m, { conn, command, args, text }) => {
  if (!text) return conn.reply(m.chat, '• *Example :* .ssweb https://kemii.my.id', m);
  var phone = text.toLowerCase().includes("--phone");
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  if (phone) {
  let hp = await sshp(text)
  await conn.sendFile(m.chat, hp, '', done, m)
  } else {
  try {
  let ss = await ssweb(text)
  conn.sendFile(m.chat, ss, '', done, m)
  } catch (e) {
  await conn.reply(m.chat, '```Status Request :```'+' `Failed`', m)
  }
  }
}
handler.help = ['ssweb','sspc'];
handler.tags = ['tools'];
handler.command = ['ssweb', 'sspc', 'ss',]

handler.limit = true;
handler.fail = null;

module.exports = handler;

async function sshp(url = "", full = false, type = "phone") {
  type = type.toLowerCase();
  if (!["desktop", "tablet", "phone"].includes(type)) type = "desktop";
  let form = new URLSearchParams();
  form.append("url", url);
  form.append("device", type);
  if (!!full) form.append("full", "on");
  form.append("cacheLimit", 0);
  let res = await axios({
    url: "https://www.screenshotmachine.com/capture.php",
    method: "post",
    data: form,
  });
  let cookies = res.headers["set-cookie"];
  let buffer = await axios({
    url: "https://www.screenshotmachine.com/" + res.data.link,
    headers: {
      cookie: cookies.join(""),
    },
    responseType: "arraybuffer",
  });
  return Buffer.from(buffer.data);
}

async function ssweb(url = "", full = false, type = "desktop") {
  type = type.toLowerCase();
  if (!["desktop", "tablet", "phone"].includes(type)) type = "desktop";
  let form = new URLSearchParams();
  form.append("url", url);
  form.append("device", type);
  if (!!full) form.append("full", "on");
  form.append("cacheLimit", 0);
  let res = await axios({
    url: "https://www.screenshotmachine.com/capture.php",
    method: "post",
    data: form,
  });
  let cookies = res.headers["set-cookie"];
  let buffer = await axios({
    url: "https://www.screenshotmachine.com/" + res.data.link,
    headers: {
      cookie: cookies.join(""),
    },
    responseType: "arraybuffer",
  });
  return Buffer.from(buffer.data);
}