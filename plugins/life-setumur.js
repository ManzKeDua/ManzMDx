/** !! THIS CODE GENERATE BY RODOTZ X ZHUBOT !! **/

var handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) {
    return m.reply(`Masukkan Umur!\n\nContoh: *${usedPrefix + command} 1*`)
  }
  var user = global.db.data.users[m.sender]
  var age = parseInt(text)

  if (age <= 70) {
    user.age = age
    m.reply(`Sukses mengganti umur ke *${age}*`)
  } else {
    m.reply(`Umur maksimal *70 tahun*`)
  }
}

handler.command = handler.help = ["setumur", "setage"]
handler.tags = ["life"]

module.exports = handler