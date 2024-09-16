/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

let levelling = require('../lib/levelling')

let handler = async (m, {
  conn,
  usedPrefix
}) => {
	let {
                registered,
                age,
                lastrampok,
                lastdagang,
                lastcodereg,
                lastberkebon,
                lasthourly,
                lastberburu,
                lastbansos,
                lastadventure,
                lastfishing,
                lastwar,
                lastngojek,
                lastgrab,
                lastnebang,
                lastmulung,
                lastbisnis,
                lastduel,
                lastmining,
                lastdungeon,
                lastclaim,
                lastweekly,
                lastmonthly
            } = global.db.data.users[m.sender]
  let user = global.db.data.users[m.sender]
  let health = global.db.data.users[m.sender].health
  let strenght = global.db.data.users[m.sender].strenght
  let speed = global.db.data.users[m.sender].speed
  let defense = global.db.data.users[m.sender].defense
  let attack = global.db.data.users[m.sender].attack
  let regeneration = global.db.data.users[m.sender].regeneration
  let stamina = global.db.data.users[m.sender].stamina
  let armor = global.db.data.users[m.sender].armor
  let armordurability = global.db.data.users[m.sender].armordurability
  let sworddurability = global.db.data.users[m.sender].sworddurability
  let pickaxedurability = global.db.data.users[m.sender].pickaxedurability
  let fishingroddurability = global.db.data.users[m.sender].fishingroddurability
  // let warn = global.db.data.users[m.sender].warn
  let pet = global.db.data.users[m.sender].pet
  let kucing = global.db.data.users[m.sender].kucing
  let _anjing = global.db.data.users[m.sender].anakanjing
  let lion = global.db.data.users[m.sender].lion
  let _lion = global.db.data.users[m.sender].anaklion
  let robo = global.db.data.users[m.sender].robo
  let _robo = global.db.data.users[m.sender].anakrobo
  let anjing = global.db.data.users[m.sender].anjing
  let pickaxe = global.db.data.users[m.sender]. pickaxe
  let katana = global.db.data.users[m.sender].katana
  let axe = global.db.data.users[m.sender].axe
  let bow = global.db.data.users[m.sender].bow
  let fishingrod = global.db.data.users[m.sender]. fishingrod
  let _kucing = global.db.data.users[m.sender].anakkucing
  let rubah = global.db.data.users[m.sender].rubah
  let _rubah = global.db.data.users[m.sender].anakrubah
  let serigala = global.db.data.users[m.sender].serigala
  let _serigala = global.db.data.users[m.sender].anakserigala
  let naga = global.db.data.users[m.sender].naga
  let _naga = global.db.data.users[m.sender].anaknaga
  let kuda = global.db.data.users[m.sender].kuda
  let _kuda = global.db.data.users[m.sender].anakkuda
  let phonix = global.db.data.users[m.sender].phonix
  let _phonix = global.db.data.users[m.sender].anakphonix
  let griffin = global.db.data.users[m.sender].griffin
  let _griffin = global.db.data.users[m.sender].anakgriffin
  let kyubi = global.db.data.users[m.sender].kyubi
  let _kyubi = global.db.data.users[m.sender].anakkyubi
  let centaur = global.db.data.users[m.sender].centaur
  let _centaur = global.db.data.users[m.sender].anakcentaur
  let diamond = global.db.data.users[m.sender].diamond
  let coal = global.db.data.users[m.sender].coal
  let potion = global.db.data.users[m.sender].potion
  let ramuan = global.db.data.users[m.sender].ramuan
  let common = global.db.data.users[m.sender].common
  let makananpet = global.db.data.users[m.sender].makananpet
  let makanannaga = global.db.data.users[m.sender].makanannaga
  let makananphonix = global.db.data.users[m.sender].makananphonix
  let makanangriffin = global.db.data.users[m.sender].makanangriffin
  let makanankyubi = global.db.data.users[m.sender].makanankyubi
  let makanancentaur = global.db.data.users[m.sender].makanancentaur
  let uncommon = global.db.data.users[m.sender].uncommon
  let mythic = global.db.data.users[m.sender].mythic
  let legendary = global.db.data.users[m.sender].legendary
  let level = global.db.data.users[m.sender].level
  let vodka = global.db.data.users[m.sender].vodka
  let rendang = global.db.data.users[m.sender].rendang
  let roti = global.db.data.users[m.sender].roti
  let soda = global.db.data.users[m.sender].soda
  let boba = global.db.data.users[m.sender].boba
  let soju = global.db.data.users[m.sender].soju
  let kopimatcha = global.db.data.users[m.sender].kopimatcha
  let susu = global.db.data.users[m.sender].susu
  let kentang = global.db.data.users[m.sender].kentang
  let sushi = global.db.data.users[m.sender].sushi
  let steak = global.db.data.users[m.sender].steak
  let ganja = global.db.data.users[m.sender].ganja
  let nugget = global.db.data.users[m.sender].nugget
  let salads = global.db.data.users[m.sender].salads
  let candy = global.db.data.users[m.sender].candy
  let ramen = global.db.data.users[m.sender].ramen
  let pizza = global.db.data.users[m.sender].pizza
  let bandage = global.db.data.users[m.sender].bandage
  let spagetti = global.db.data.users[m.sender].spagetti
  let croissant = global.db.data.users[m.sender].croissant
  let onigiri = global.db.data.users[m.sender].onigiri
  let hamburger = global.db.data.users[m.sender].hamburger
  let hotdog = global.db.data.users[m.sender].hotdog
  let cake = global.db.data.users[m.sender].cake
  let sandwich = global.db.data.users[m.sender].sandwich
  let escream = global.db.data.users[m.sender].escream
  let pudding = global.db.data.users[m.sender].pudding
  let juice = global.db.data.users[m.sender].juice
  let teh = global.db.data.users[m.sender].teh
  let popcorn = global.db.data.users[m.sender].popcorn
  let kopi = global.db.data.users[m.sender].kopi
  let money = global.db.data.users[m.sender].money
  let tambang = global.db.data.users[m.sender].tambang
  let pertanian = global.db.data.users[m.sender].pertanian
  let camptroops = global.db.data.users[m.sender].camptroops
  let benteng = global.db.data.users[m.sender].benteng
  let house = global.db.data.users[m.sender].house
  let industri = global.db.data.users[m.sender].industri
  let masjid = global.db.data.users[m.sender].masjid
  let gereja = global.db.data.users[m.sender].gereja
  let rumahsakit = global.db.data.users[m.sender].rumahsakit
  let exp = global.db.data.users[m.sender].exp
  let sampah = global.db.data.users[m.sender].sampah
  let anggur = global.db.data.users[m.sender].anggur
  let jeruk = global.db.data.users[m.sender].jeruk
  let apel = global.db.data.users[m.sender].apel
  let mangga = global.db.data.users[m.sender].mangga
  let pisang = global.db.data.users[m.sender].pisang
  let bibitanggur = global.db.data.users[m.sender].bibitanggur
  let bibitjeruk = global.db.data.users[m.sender].bibitjeruk
  let bibitapel = global.db.data.users[m.sender].bibitapel
  let bibitmangga = global.db.data.users[m.sender].bibitmangga
  let bibitpisang = global.db.data.users[m.sender].bibitpisang
  let gardenboxs = global.db.data.users[m.sender].gardenboxs
  let nabung = global.db.data.users[m.sender].nabung
  let bank = global.db.data.users[m.sender].bank
  let limit = global.db.data.users[m.sender].limit
  let cupon = global.db.data.users[m.sender].cupon
  let tiketcoin = global.db.data.users[m.sender].tiketcoin
  let tiketm = global.db.data.users[m.sender].healtmonster
  let aqua = global.db.data.users[m.sender].aqua
  let expg = global.db.data.users[m.sender].expg
  let boxs = global.db.data.users[m.sender].boxs
  let botol = global.db.data.users[m.sender].botol
  let kayu = global.db.data.users[m.sender].kayu
  let batu = global.db.data.users[m.sender].batu
  let iron = global.db.data.users[m.sender].iron
  let emerald = global.db.data.users[m.sender].emerald
  let sword = global.db.data.users[m.sender].sword
  let string = global.db.data.users[m.sender].string
  let kaleng = global.db.data.users[m.sender].kaleng
  let kardus = global.db.data.users[m.sender].kardus
  let berlian = global.db.data.users[m.sender].berlian
  let emas = global.db.data.users[m.sender].emas
  let emaspro = global.db.data.users[m.sender].emasbatang
  let hero = global.db.data.users[m.sender].hero
  let exphero = global.db.data.users[m.sender].exphero
  let {
    max
  } = levelling.xpRange(level, exp, global.multiplier)
  // let name = m.fromMe ? conn.user : conn.contacts[m.sender]
  let name = m.sender
  let sortedmoney = Object.entries(global.db.data.users).sort((a, b) => b[1].money - a[1].money)
  let sortedlevel = Object.entries(global.db.data.users).sort((a, b) => b[1].level - a[1].level)
  let sorteddiamond = Object.entries(global.db.data.users).sort((a, b) => b[1].diamond - a[1].diamond)
  let sortedpotion = Object.entries(global.db.data.users).sort((a, b) => b[1].potion - a[1].potion)
  let sortedsampah = Object.entries(global.db.data.users).sort((a, b) => b[1].sampah - a[1].sampah)
  let sortedcommon = Object.entries(global.db.data.users).sort((a, b) => b[1].common - a[1].common)
  let sorteduncommon = Object.entries(global.db.data.users).sort((a, b) => b[1].uncommon - a[1].uncommon)
  let sortedmythic = Object.entries(global.db.data.users).sort((a, b) => b[1].mythic - a[1].mythic)
  let sortedlegendary = Object.entries(global.db.data.users).sort((a, b) => b[1].legendary - a[1].legendary)
  let usersmoney = sortedmoney.map(v => v[0])
  let usersdiamond = sorteddiamond.map(v => v[0])
  let userspotion = sortedpotion.map(v => v[0])
  let userssampah = sortedsampah.map(v => v[0])
  let userslevel = sortedlevel.map(v => v[0])
  let userscommon = sortedcommon.map(v => v[0])
  let usersuncommon = sorteduncommon.map(v => v[0])
  let usersmythic = sortedmythic.map(v => v[0])
  let userslegendary = sortedlegendary.map(v => v[0])
  let str = `
Inventory *${await conn.getName(name)}*

+ *U S E R - S T A T S*
*[ 🚴 ]* • Speed: *${speed}*
*[ 🩸 ]* • Regeneration: *${regeneration}* 
*[ 🧗 ]* • Strength: *${strenght}*
*[ 🥊 ]* • Attack: *${attack}*
*[ 🛡️ ]* • Defense: *${defense}*
*[ ⚗️ ]* • Stamina: *${stamina}*

+ *U S E R - P R O F I L E*
*[ 💉 ]* • Health: *${health}*
*[ 💰 ]* • Money: *${money}*
*[ 🎟️ ]* • Limit: *${limit}*
*[ 📊 ]* • Level: *${level}*
*[ 🔥 ]* • Exp: *${exp}*
*[ 💳 ]* • Atm: *${bank}*
*[ 🎫 ]* • Cupon: *${cupon}*
*[ 🧫 ]* • Expg: *${expg}*
*[ 🏷️ ]* • Tiketm: *${tiketm}*
*[ 🔖 ]* • Tiketcoin: *${tiketcoin}*

+ *T O O L S*
*[ 🛡️ ]* • Armor: *${armor == 0 ? 'Tidak Punya' : '' || armor == 1 ? 'Leather Armor' : '' || armor == 2 ? 'Iron Armor' : '' || armor == 3 ? 'Gold Armor' : '' || armor == 4 ? 'Diamond Armor' : '' || armor == 5 ? 'Emerald Armor' : '' || armor == 6 ? 'Crystal Armor' : '' || armor == 7 ? 'Obsidian Armor' : '' || armor == 8 ? 'Netherite Armor' : '' || armor == 9 ? 'Wither Armor' : '' || armor == 10 ? 'Dragon Armor' : '' || armor == 11 ? 'Hacker Armor' : '' || armor == 12 ? 'GOD Armor' : ''}*
*[ ⚔️ ]* • Sword: *${sword == 0 ? 'Tidak Punya' : '' || sword == 1 ? 'Wooden Sword' : '' || sword == 2 ? 'Iron Sword' : '' || sword == 3 ? 'Gold Sword' : '' || sword == 4 ? 'Diamond Sword' : '' || sword == 5 ? 'Netherite Sword' : '' || armor == 6 ? 'Crystal Sword' : '' || sword == 7 ? 'Obsidian Sword' : '' || sword == 8 ? 'Netherite Sword' : '' || sword == 9 ? 'Wither Sword' : '' || sword == 10 ? 'Dragon Sword' : '' || sword == 11 ? 'Hacker Sword' : '' || sword == 12 ? 'GOD Sword' : ''}*
*[ 🎣 ]* • FishingRod: *${fishingrod == 0 ? 'Tidak Punya' : '' || fishingrod == 1 ? 'Wood FishingRod' : '' || fishingrod == 2 ? 'Iron FishingRod' : '' || fishingrod == 3 ? 'Gold FishingRod' : '' || fishingrod == 4 ? 'Diamond FishingRod' : '' || fishingrod == 5 ? 'Netherite FishingRod' : '' || fishingrod == 6 ? 'Crystal FishingRod' : '' || fishingrod == 7 ? 'Obsidian FishingRod' : '' || fishingrod == 8 ? 'Netherite FishingRod' : '' || fishingrod == 9 ? 'Wither FishingRod' : '' || fishingrod == 10 ? 'Dragon FishingRod' : '' || fishingrod == 11 ? 'Hacker FishingRod' : '' || fishingrod == 12 ? 'GOD FishingRod' : ''}*
*[ ⛏️ ]* • Pickaxe: *${pickaxe == 0 ? 'Tidak Punya' : '' || pickaxe == 1 ? 'Wood Pickaxe' : '' || pickaxe == 2 ? 'Iron Pickaxe' : '' || pickaxe == 3 ? 'Gold Pickaxe' : '' || pickaxe == 4 ? 'Diamond Pickaxe' : '' || pickaxe == 5 ? 'Netherite Pickaxe' : '' || pickaxe == 6 ? 'Crystal Pickaxe' : '' || pickaxe == 7 ? 'Obsidian Pickaxe' : '' || pickaxe == 8 ? 'Netherite Pickaxe' : '' || pickaxe == 9 ? 'Wither Pickaxe' : '' || pickaxe == 10 ? 'Dragon Pickaxe' : '' || pickaxe == 11 ? 'Hacker Pickaxe' : '' || pickaxe == 12 ? 'GOD Pickaxe' : ''}*
*[ 🦯 ]* • Katana: *${katana == 0 ? 'Tidak Punya' : '' || katana == 1 ? 'Wood Katana' : '' || katana == 2 ? 'Iron Katana' : '' || katana == 3 ? 'Gold Katana' : '' || katana == 4 ? 'Diamond Katana' : '' || katana == 5 ? 'Netherite Katana' : '' || katana == 6 ? 'Crystal Katana' : '' || katana == 7 ? 'Obsidian Katana' : '' || katana == 8 ? 'Netherite Katana' : '' || katana == 9 ? 'Wither Katana' : '' || katana == 10 ? 'Dragon Katana' : '' || katana == 11 ? 'Hacker Katana' : '' || katana == 12 ? 'GOD Katana' : ''}*
*[ 🪓 ]* • Axe: *${axe== 0 ? 'Tidak Punya' : '' || axe== 1 ? 'Wood Axe' : '' || axe== 2 ? 'Iron Axe' : '' || axe== 3 ? 'Gold Axe' : '' || axe== 4 ? 'Diamond Axe' : '' || axe== 5 ? 'Netherite Axe' : '' || axe== 6 ? 'Crystal Axe' : '' || axe== 7 ? 'Obsidian Axe' : '' || axe== 8 ? 'Netherite Axe' : '' || axe== 9 ? 'Wither Axe' : '' || axe== 10 ? 'Dragon Axe' : '' || axe== 11 ? 'Hacker Axe' : '' || axe== 12 ? 'GOD Axe' : ''}*
*[ 🏹 ]* • Bow: *${bow == 0 ? 'Tidak Punya' : '' || bow == 1 ? 'Wood Bow' : '' || bow == 2 ? 'Iron Bow' : '' || bow == 3 ? 'Gold Bow' : '' || bow == 4 ? 'Diamond Bow' : '' || bow == 5 ? 'Netherite Bow' : '' || bow == 6 ? 'Crystal Bow' : '' || bow == 7 ? 'Obsidian Bow' : '' || bow == 8 ? 'Netherite Bow' : '' || bow == 9 ? 'Wither Bow' : '' || bow == 10 ? 'Dragon Bow' : '' || bow == 11 ? 'Hacker Bow' : '' || bow == 12 ? 'GOD Bow' : ''}*

+ *O T H E R*
*[ 🧪 ]* • Potion: *${potion}*
*[ 🌿 ]* • Ramuan: *${ramuan}*
*[ 🕸️ ]* • String: *${string}*
*[ 🗡️ ]* • Sword: *${sword}*
*[ 🗑️ ]* • Sampah: *${sampah}*
*[ 🌳 ]* • Kayu: *${kayu}*
*[ 🪨 ]* • Batu: *${batu}*
*[ 🧲 ]* • Total Other: *${potion + ramuan + makanannaga + string + sword + sampah + kayu + batu}* other

+ *F O O D - P E T*
*[ 🥩 ]* • Makanan Pet: *${makananpet}*
*[ 🍗 ]* • Makanan Phonix: *${makananphonix}*
*[ 🍖 ]* • Makanan Naga: *${makanannaga}*
*[ 🥫 ]* • Makanan Griffin: *${makanangriffin}*
*[ 🍖 ]* • Makanan Kyubi: *${makanankyubi}*
*[ 🫓 ]* • Makanan Centaur: *${makanancentaur}*
*[ 🍴 ]* • Total Food - Pet: *${makananpet + makananphonix + makanannaga + makanangriffin + makanankyubi + makanancentaur}* food pet

+ *C R E A T E*
*[ 📦 ]* • Boxs: *${boxs}*
*[ 🎁 ]* • Common: *${common}*
*[ 💌 ]* • Uncommon: *${uncommon}*
*[ 🗃️ ]* • Mythic: *${mythic}*
*[ 📮 ]* • Legendary: *${legendary}*
*[ 🐾 ]* • Pet: *${pet}*
*[ 🍄 ]* • Gardenboxs: *${gardenboxs}*
*[ 📩 ]* • Total Create: *${boxs + common + uncommon + mythic + legendary + pet + gardenboxs}* create

+ *B U I L D I N G S*
*[ 🏯 ]* • Benteng: *${benteng}*
*[ 🏨 ]* • Rumah Sakit: *${rumahsakit}*
*[ 🏞️ ]* • Pertanian: *${pertanian}*
*[ 🏭 ]* • Industri: *${industri}*
*[ 🏘️ ]* • Rumah: *${house}*
*[ ⛰️ ]* • Tambang: *${tambang}*
*[ 🕌 ]* • Masjid: *${masjid}*
*[ ⛪ ]* • Gereja: *${gereja}*
*[ 🏕️ ]* • Camptroops: *${camptroops}*
*[ 🚧 ]* • Total Building: *${benteng + rumahsakit + pertanian + industri + camptroops + tambang + house}* buildings

+ *F R U I T S*
*[ 🥭 ]* • Mangga: ${mangga}
*[ 🍇 ]* • Anggur: ${anggur}
*[ 🍌 ]* • Pisang: ${pisang}
*[ 🍊 ]* • Jeruk: ${jeruk}
*[ 🍏 ]* • Apel: ${apel}
*[ 🍒 ]* • Total Fruits: *${boxs + mangga + anggur + pisang + jeruk + apel}* fruits

+ *D R I N K*
*[ 🍷 ]* • Vodka: ${vodka}
*[ 🥤 ]* • Aqua: ${aqua}
*[ 🧃 ]* • Juice: ${juice}
*[ ☕ ]* • Kopi: ${kopi}
*[ 🥃 ]* • Teh: ${teh}
*[ 🧋 ]* • Boba: ${boba}
*[ 🍵 ]* • Kopi Matcha: ${kopimatcha}
*[ 🍾 ]* • Soju: ${soju}
*[ 🥛 ]* • Susu: ${susu}
*[ 🍸 ]* • Total Drinks: *${vodka + aqua + soda + juice + kopi + teh + soju + kopimatcha + susu + boba}* drinks

+ *F O O D*
*[ 🍞 ]* • Roti: ${roti}
*[ 🍣 ]* • Sushi: ${sushi}
*[ 🥩 ]* • Steak: ${steak}
*[ 🥘 ]* • Rendang: ${rendang}
*[ 🍱 ]* • Nuggets: ${nugget}
*[ 🥗 ]* • Salads: ${salads}
*[ 🍬 ]* • Candy: ${candy}
*[ 🍕 ]* • Pizza: ${pizza}
*[ 💉 ]* • Bandage: ${bandage}
*[ ☘️ ]* • Ganja: ${ganja}
*[ 🍝 ]* • Spagetti: ${spagetti}
*[ 🥐 ]* • Croissant: ${croissant}
*[ 🍙 ]* • Onigiri: ${onigiri}
*[ 🍔 ]* • Hamburger: ${hamburger}
*[ 🌭 ]* • Hotdog: ${hotdog}
*[ 🍰 ]* • Cake: ${cake}
*[ 🥪 ]* • Sandwich: ${sandwich}
*[ 🍨 ]* • Escream: ${escream}
*[ 🍮 ]* • Pudding: ${pudding}
*[ 🍿 ]* • Popcorn: ${popcorn}
*[ 🍟 ]* • Kentang: ${kentang}
*[ 🥡 ]* • Total Food: *${roti + sushi + steak + rendang + nugget + salads + pizza + candy + bandage + ganja + spagetti + croissant + onigiri + hamburger + hotdog + cake + sandwich + escream + pudding + popcorn + kentang}* food

+ *S E E D S*
*[ 🌱 ]* • Bibit Mangga: ${bibitmangga}
*[ ☘️ ]* • Bibit Anggur: ${bibitanggur}
*[ 🌳 ]* • Bibit Pisang: ${bibitpisang}
*[ 🌴 ]* • Bibit Jeruk: ${bibitjeruk}
*[ 🌿 ]* • Bibit Apel: ${bibitapel}
*[ 🪴 ]* • Total Bibit: *${bibitmangga + bibitanggur + bibitpisang + bibitjeruk + bibitapel}* bibit

+ *T R A S H*
*[ 📦 ]* • Kardus: ${kardus}
*[ 🍶 ]* • Kaleng: ${kaleng}
*[ 🧋 ]* • Botol: ${botol}
*[ 🧺 ]* • Total Trash: *${kardus + kaleng + botol}* trash

+ *O R E*
*[ 🟩 ]* • emerald: ${emerald}
*[ 🪙 ]* • Emas: ${emas}
*[ 💎 ]* • Diamond: ${diamond}
*[ 🔗 ]* • Iron: *${iron}*
*[ ⚫ ]* • Coal: *${coal}*
*[ 🪨 ]* • Total Ore: *${emerald + emas + diamond + iron + coal}* ore

+ *H E R O*
*[ 🦸 ]* • Hero: *${hero == 0 ? 'Tidak Punya' : '' || hero == 1 ? 'Level 1' : '' || hero == 2 ? 'Level 2' : '' || hero == 3 ? 'Level 3' : '' || hero == 4 ? 'Level 4' : '' || hero == 5 ? 'Level 5' : '' || hero == 6 ? 'Level 6' : '' || hero == 7 ? 'Level 7' : '' || hero == 8 ? 'Level 8' : '' || hero == 9 ? 'Level 9' : '' || hero == 10 ? 'Level 10' : '' || hero == 11 ? 'Level 11' : '' || hero == 12 ? 'Level 12' : '' || hero == 13 ? 'Level 13' : '' || hero == 14 ? 'Level 14' : '' || hero == 15 ? 'Level 15' : '' || hero == 16 ? 'Level 16' : '' || hero == 17 ? 'Level 17' : '' || hero == 18 ? 'Level 18' : '' || hero == 19 ? 'Level 19' : '' || hero == 20 ? 'Level 20' : '' || hero == 21 ? 'Level 21' : '' || hero == 22 ? 'Level 22' : '' || hero == 23 ? 'Level 23' : '' || hero == 24 ? 'Level 24' : '' || hero == 25 ? 'Level 25' : '' || hero == 26 ? 'Level 26' : '' || hero == 27 ? 'Level 27' : '' || hero == 28 ? 'Level 28' : '' || hero == 29 ? 'Level 29' : '' || hero == 30 ? 'Level 30' : '' || hero == 31 ? 'Level 31' : '' || hero == 32 ? 'Level 32' : '' || hero == 33 ? 'Level 33' : '' || hero == 34 ? 'Level 34' : '' || hero == 35 ? 'Level 35' : '' || hero == 36 ? 'Level 36' : '' || hero == 37 ? 'Level 37'  : '' || hero == 38 ? 'Level 38' : '' || hero == 39 ? 'Level 39' : '' || hero == 40 ? 'Level MAX' : ''}*

+ *P E T*
*[ 🐈 ]* • Kucing: *${kucing == 0 ? 'Tidak Punya' : '' || kucing == 1 ? 'Level 1' : '' || kucing == 2 ? 'Level 2' : '' || kucing == 3 ? 'Level 3' : '' || kucing == 4 ? 'Level 4' : '' || kucing == 5 ? 'Level MAX' : ''}*
*[ 🐎 ]* • Kuda: *${kuda == 0 ? 'Tidak Punya' : '' || kuda == 1 ? 'Level 1' : '' || kuda == 2 ? 'Level 2' : '' || kuda == 3 ? 'Level 3' : '' || kuda == 4 ? 'Level 4' : '' || kuda == 5 ? 'Level MAX' : ''}*
*[ 🐕 ]* • Anjing: *${anjing == 0 ? 'Tidak Punya' : '' || anjing == 1 ? 'Level 1' : '' || anjing == 2 ? 'Level 2' : '' || anjing == 3 ? 'Level 3' : '' || anjing == 4 ? 'Level 4' : '' || anjing == 5 ? 'Level MAX' : ''}*
*[ 🐉 ]* • Naga: *${naga == 0 ? 'Tidak Punya' : '' || naga == 1 ? 'Level 1' : '' || naga == 2 ? 'Level 2' : '' || naga == 3 ? 'Level 3' : '' || naga == 4 ? 'Level 4' : '' || naga == 5 ? 'Level 5' : '' || naga == 6 ? 'Level 6' : '' || naga == 7 ? 'Level 7' : '' || naga == 8 ? 'Level 8' : '' || naga == 9 ? 'Level 9' : '' || naga == 10 ? 'Level 10' : '' || naga == 11 ? 'Level 11' : '' || naga == 12 ? 'Level 12' : '' || naga == 13 ? 'Level 13' : '' || naga == 14 ? 'Level 14' : '' || naga == 15 ? 'Level 15' : '' || naga == 16 ? 'Level 16' : '' || naga == 17 ? 'Level 17' : '' || naga == 18 ? 'Level 18' : '' || naga == 19 ? 'Level 19' : '' || naga == 20 ? 'Level MAX' : ''}*
*[ 🤖 ]* • Robo: *${robo == 0 ? 'Tidak Punya' : '' || robo == 1 ? 'Level 1' : '' || robo == 2 ? 'Level 2' : '' || robo == 3 ? 'Level 3' : '' || robo == 4 ? 'Level 4' : '' || robo == 5 ? 'Level 5' : '' || robo == 6 ? 'Level 6' : '' || robo == 7 ? 'Level 7' : '' || robo == 8 ? 'Level 8' : '' || robo == 9 ? 'Level 9' : '' || robo == 10 ? 'Level 10' : '' || robo == 11 ? 'Level 11' : '' || robo == 12 ? 'Level 12' : '' || robo == 13 ? 'Level 13' : '' || robo == 14 ? 'Level 14' : '' || robo == 15 ? 'Level 15' : '' || robo == 16 ? 'Level 16' : '' || robo == 17 ? 'Level 17' : '' || robo == 18 ? 'Level 18' : '' || robo == 19 ? 'Level 19' : '' || robo == 20 ? 'Level MAX' : ''}*
*[ 🦊 ]* • Kyubi: *${kyubi == 0 ? 'Tidak Punya' : '' || kyubi == 1 ? 'Level 1' : '' || kyubi == 2 ? 'Level 2' : '' || kyubi == 3 ? 'Level 3' : '' || kyubi == 4 ? 'Level 4' : '' || kyubi == 5 ? 'Level 5' : '' || kyubi == 6 ? 'Level 6' : '' || kyubi == 7 ? 'Level 7' : '' || kyubi == 8 ? 'Level 8' : '' || kyubi == 9 ? 'Level 9' : '' || kyubi == 10 ? 'Level 10' : '' || kyubi == 11 ? 'Level 11' : '' || kyubi == 12 ? 'Level 12' : '' || kyubi == 13 ? 'Level 13' : '' || kyubi == 14 ? 'Level 14' : '' || kyubi == 15 ? 'Level MAX' : ''}*
*[ 🦬 ]* • Centaur: *${centaur == 0 ? 'Tidak Punya' : '' || centaur == 1 ? 'Level 1' : '' || centaur == 2 ? 'Level 2' : '' || centaur == 3 ? 'Level 3' : '' || centaur == 4 ? 'Level 4' : '' || centaur == 5 ? 'Level 5' : '' || centaur == 6 ? 'Level 6' : '' || centaur == 7 ? 'Level 7' : '' || centaur == 8 ? 'Level 8' : '' || centaur == 9 ? 'Level 9' : '' || centaur == 10 ? 'Level 10' : '' || centaur == 11 ? 'Level 11' : '' || centaur == 12 ? 'Level 12' : '' || centaur == 13 ? 'Level 13' : '' || centaur == 14 ? 'Level 14' : '' || centaur == 15 ? 'Level MAX' : ''}*
*[ 🐅 ]* • Rubah: *${rubah == 0 ? 'Tidak Punya' : '' || rubah == 1 ? 'Level 1' : '' || rubah == 2 ? 'Level 2' : '' || rubah == 3 ? 'Level 3' : '' || rubah == 4 ? 'Level 4' : '' || rubah == 5 ? 'Level MAX' : ''}*  
*[ 🦅 ]* • Phonix: *${phonix == 0 ? 'Tidak Punya' : '' || phonix == 1 ? 'Level 1' : '' || phonix == 2 ? 'Level 2' : '' || phonix == 3 ? 'Level 3' : '' || phonix == 4 ? 'Level 4' : '' || phonix == 5 ? 'Level 5' : '' || phonix == 6 ? 'Level 6' : '' || phonix == 7 ? 'Level 7' : '' || phonix == 8 ? 'Level 8' : '' || phonix == 9 ? 'Level 9' : '' || phonix == 10 ? 'Level 10' : '' || phonix == 11 ? 'Level 11' : '' || phonix == 12 ? 'Level 12' : '' || phonix == 13 ? 'Level 13' : '' || phonix == 14 ? 'Level 14' : '' || phonix == 15 ? 'Level MAX' : ''}*
*[ 🦕 ]* • Griffin: *${griffin == 0 ? 'Tidak Punya' : '' || griffin == 1 ? 'Level 1' : '' || griffin == 2 ? 'Level 2' : '' || griffin == 3 ? 'Level 3' : '' || griffin == 4 ? 'Level 4' : '' || griffin == 5 ? 'Level 5' : '' || griffin == 6 ? 'Level 6' : '' || griffin == 7 ? 'Level 7' : '' || griffin == 8 ? 'Level 8' : '' || griffin == 9 ? 'Level 9' : '' || griffin == 10 ? 'Level 10' : '' || griffin == 11 ? 'Level 11' : '' || griffin == 12 ? 'Level 12' : '' || griffin == 13 ? 'Level 13' : '' || griffin == 14 ? 'Level 14' : '' || griffin == 15 ? 'Level MAX' : ''}*
*[ 🦁 ]* • Lion: *${lion == 0 ? 'Tidak Punya' : '' || lion == 1 ? 'Level 1' : '' || lion == 2 ? 'Level 2' : '' || lion == 3 ? 'Level 3' : '' || lion == 4 ? 'Level 4' : '' || lion == 5 ? 'Level 5' : '' || lion == 6 ? 'Level 6' : '' || lion == 7 ? 'Level 7' : '' || lion == 8 ? 'Level 8' : '' || lion == 9 ? 'Level 9' : '' || lion == 10 ? 'Level 10' : '' || lion == 11 ? 'Level 11' : '' || lion == 12 ? 'Level 12' : '' || lion == 13 ? 'Level 13' : '' || lion == 14 ? 'Level 14' : '' || lion == 15 ? 'Level MAX' : ''}*
*[ 🐺 ]* • Serigala: *${serigala == 0 ? 'Tidak Punya' : '' || serigala == 1 ? 'Level 1' : '' || serigala == 2 ? 'Level 2' : '' || serigala == 3 ? 'Level 3' : '' || serigala == 4 ? 'Level 4' : '' || serigala == 5 ? 'Level 5' : '' || serigala == 6 ? 'Level 6' : '' || serigala == 7 ? 'Level 7' : '' || serigala == 8 ? 'Level 8' : '' || serigala == 9 ? 'Level 9' : '' || serigala == 10 ? 'Level 10' : '' || serigala == 11 ? 'Level 11' : '' || serigala == 12 ? 'Level 12' : '' || serigala == 13 ? 'Level 13' : '' || serigala == 14 ? 'Level 14' : '' || serigala == 15 ? 'Level MAX' : ''}*
*[ 🐾 ]* • Total Pet: *${kucing + kuda + naga + kyubi + centaur + rubah + phonix + griffin + serigala}* pet

+ *C O O L D O W N S*
*[ 🏹 ]* • Berburu : ${lastberburu > 0 ? '×' : '√'}
*[ ⛰️ ]* • Adventure : ${lastadventure > 0 ? '×' : '√'}
*[ ⚔️ ]* • Duel : ${lastduel > 0 ? '×' : '√'}
*[ 🛡️ ]* • War : ${lastwar > 0 ? '×'  : '√'}
*[ 🎃 ]* • Dungeon : ${lastdungeon > 0 ? '×' : '√'}
*[ 💱 ]* • Berdagang : ${lastdagang > 0 ? '×'  : '√'}
*[ 🧺 ]* • Berkebun : ${lastberkebon > 0 ? '×'  : '√'}
*[ ⛏️ ]* • Mining : ${lastmining > 0 ? '×' : '√'}
*[ 🎣 ]* • Fishing : ${lastfishing > 0 ? '×'  : '√'}
*[ 💰 ]* • Bansos : ${lastbansos > 0 ? '×' : '√'}
*[ 🎐 ]* • Hourly : ${lasthourly > 0 ? '×' : '√'}
*[ 🛵 ]* • Ngojek : ${lastngojek > 0 ? '×' : '√'}
*[ 🚕 ]* • Grab : ${lastgrab > 0 ? '×' : '√'}
*[ 📌 ]* • Mulung : ${lastmulung > 0 ? '×' : '√'}
*[ 🪓 ]* • Nebang : ${lastnebang > 0 ? '×' : '√'}
*[ 📉 ]* • Berbisnis : ${lastbisnis > 0 ? '×' : '√'}
*[ 🗃️ ]* • Claim : ${lastclaim > 0 ? '×' : '√'}
*[ 🎁 ]* • Weekly : ${lastweekly > 0 ? '×' : '√'}
*[ 📮 ]* • Monthly : ${lastmonthly > 0 ? '×' : '√'}

+ *A C H I E V E M E N T*
1.Top level *${userslevel.indexOf(m.sender) + 1}* dari *${userslevel.length}*
2.Top Money *${usersmoney.indexOf(m.sender) + 1}* dari *${usersmoney.length}*
3.Top Diamond *${usersdiamond.indexOf(m.sender) + 1}* dari *${usersdiamond.length}*
4.Top Potion *${userspotion.indexOf(m.sender) + 1}* dari *${userspotion.length}*
5.Top Common *${userscommon.indexOf(m.sender) + 1}* dari *${userscommon.length}*
6.Top Uncommon *${usersuncommon.indexOf(m.sender) + 1}* dari *${usersuncommon.length}*
7.Top Mythic *${usersmythic.indexOf(m.sender) + 1}* dari *${usersmythic.length}*
8.Top Legendary *${userslegendary.indexOf(m.sender) + 1}* dari *${userslegendary.length}*
9.Top Sampah *${userssampah.indexOf(m.sender) + 1}* dari *${userssampah.length}*
\n${readMore}`.trim()
conn.reply(m.chat, str, m, {
    contextInfo: {
        externalAdReply: {
            mediaType: 1,
            title: 'You Inventori!',
            thumbnailUrl: 'https://telegra.ph/file/fec93c411c9753c79f545.jpg',
            renderLargerThumbnail: true,
            sourceUrl: ''
        }
    }
})
};

handler.help = ['inv']
handler.tags = ['rpg']
handler.command = /^(inv|inventory)$/i
handler.rpg = true
handler.group = false
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)