let handler = async (m, { args }) => {
  if (args.length !== 1) {
    return conn.reply(m.chat, 'Silakan masukkan jumlah uang yang ingin diubah menjadi poin! Contoh: .moneytopoint 1000', m)
  }
  let money = parseInt(args[0])
  if (isNaN(money) || money <= 0) {
    throw 'Jumlah uang yang dimasukkan harus angka positif!'
  }
  
  let user = global.db.data.users[m.sender]
  if (!user) {
    user = { point: 0, money: 0 }
    global.db.data.users[m.sender] = user
  }

  if (user.money < money) {
    return conn.reply(m.chat, 'Uang kamu tidak cukup untuk melakukan konversi!', m)
  }

  let fee = Math.floor(money * 0.5)
  let point = Math.floor(money * 0.5)
  let message = `• Kamu mengonversi uang senilai ${money}\n`
  message += `• Dan kamu mendapatkan poin senilai ${point}\n`
  message += `• Biaya fee kamu adalah ${fee}`

  // Deduct the money from the user's balance
  user.money -= money
  user.point = (user.point || 0) + point

  global.db.write()
  conn.reply(m.chat, message, m)
}

handler.help = ['moneytopoint *<amount>*']
handler.tags = ['rpg']
handler.command = /^moneytopoint$/i
handler.register = true
handler.limit = true

module.exports = handler