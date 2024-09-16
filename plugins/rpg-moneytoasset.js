// Definisikan konversi uang menjadi aset di sini
let conversionRate = {
  'bitcoin': 0.0001,
  'ethereum': 0.001,
  'ripple': 1,
  'litecoin': 0.01,
  'cardano': 10,
  'solana': 0.1,
  'binancecoin': 0.01,
  'polkadot': 1,
  'dogecoin': 100,
  'gold': 0.01,
  'silver': 0.1,
  'platinum': 0.001,
  'palladium': 0.001,
  'copper': 0.1,
  'oil': 0.01,
  'gas': 0.01,
  'wheat': 10,
  'corn': 10,
  'soybeans': 10,
  'coffee': 10,
  'sugar': 10,
  'cotton': 10,
  'cocoa': 10,
  'rubber': 10,
  'apple': 1.05,
  'google': 1.05,
  'amazon': 1.05,
  'facebook': 1.05,
  'microsoft': 1.05,
  'tesla': 1.05,
  'netflix': 1.05,
  'nvidia': 1.05,
  'eurusd': 1.02,
  'usdjpy': 1.02,
  'gbpusd': 1.02,
  'audusd': 1.02,
  'usdcad': 1.02,
  'usdchf': 1.02,
  'nzdusd': 1.02,
  'eurjpy': 1.02,
  'gbpjpy': 1.02,
  // Tambahkan konversi untuk aset lain sesuai kebutuhan
}

let handler = async (m, { args }) => {
  if (args.length !== 2) {
    let assetList = Object.keys(conversionRate).map(asset => `• ${asset}`).join('\n')
    let helpMessage = `Berikut adalah list *Asset* yang kamu bisa convert :\n\n${assetList}\n\n_Example_ :\n.moneytoasset 1000000 *bitcoin*`
    return conn.reply(m.chat, helpMessage, m, {
      contextInfo: {
        externalAdReply: {
          mediaType: 1,
          title: 'ManzMD',
          thumbnailUrl: 'https://telegra.ph/file/cfeccde1a0fb1ebc62a13.jpg',
          renderLargerThumbnail: true,
          sourceUrl: ''
        }
      }
    })
  }
  let money = parseInt(args[0])
  if (isNaN(money) || money <= 0) {
    throw 'Jumlah uang yang dimasukkan harus angka positif!'
  }
  let asset = args[1].toLowerCase()

  if (!conversionRate.hasOwnProperty(asset)) {
    throw 'Aset yang dimasukkan tidak valid!'
  }
  let amount = Math.floor(money * conversionRate[asset])
  let message = `• Kamu menconvert uang senilai ${money} menjadi ${asset} senilai ${amount}\n`
  let user = global.db.data.users[m.sender]
  if (!user) {
    user = { [asset]: 0 }
    global.db.data.users[m.sender] = user
  }
  user[asset] = (user[asset] || 0) + amount
  global.db.write()
  conn.reply(m.chat, message, m)
}

handler.help = ['moneytoasset *<jumlah uang>* *<nama aset>*']
handler.tags = ['rpg']
handler.command = /^moneytoasset$/i
handler.register = true
handler.limit = true

module.exports = handler