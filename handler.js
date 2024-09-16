const simple = require('./lib/simple')
const util = require('util')
const PhoneNumber = require('awesome-phonenumber')
const { color } = require('./lib/color')
const moment = require("moment-timezone")
const NeoApi = require("@neoxr/wb")
const b = new NeoApi()
const fetch = require("node-fetch")
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@adiwajshing/baileys")

const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
    async handler(chatUpdate) {
        if (global.db.data == null) await loadDatabase()
        this.msgqueque = this.msgqueque || []
        // console.log(chatUpdate)
        if (!chatUpdate) return
        // if (chatUpdate.messages.length > 2 || !chatUpdate.messages.length) return
        if (chatUpdate.messages.length > 1) console.log(chatUpdate.messages)
        let m = chatUpdate.messages[chatUpdate.messages.length - 1]
        if (!m) return
        //console.log(JSON.stringify(m, null, 4))
        try {
            m = simple.smsg(this, m) || m
            if (!m) return
            // console.log(m)
            m.exp = 0
            m.limit = false
            try {
                let user = global.db.data.users[m.sender]
                if (typeof user !== 'object') global.db.data.users[m.sender] = {}
                if (user) {
                    if (!isNumber(user.exp)) user.exp = 0
                    if (!isNumber(user.jobexp)) user.jobexp = 0
                    if (!isNumber(user.buaya)) user.buaya = 0
                    if (!isNumber(user.banteng)) user.banteng = 0
                    if (!isNumber(user.harimau)) user.harimau = 0
                    if (!isNumber(user.gajah)) user.gajah = 0
                    if (!isNumber(user.kambing)) user.kambing = 0
                    if (!isNumber(user.panda)) user.panda = 0
                    if (!isNumber(user.kerbau)) user.kerbau = 0
                    if (!isNumber(user.sapi)) user.sapi = 0
                    if (!isNumber(user.monyet)) user.monyet = 0
                    if (!isNumber(user.babihutan)) user.babihutan = 0
                    if (!isNumber(user.babi)) user.babi = 0
                    if (!isNumber(user.ayam)) user.ayam = 0
                    if (!isNumber(user.limit)) user.limit = 50
                    if (!isNumber(user.joinlimit)) user.joinlimit = 1
                    if (!isNumber(user.money)) user.money = 0
                    if (!isNumber(user.following)) user.following = 0
                    if (!isNumber(user.followers)) user.followers = 0
                    if (!isNumber(user.saldo)) user.saldo = 0
                    if (!isNumber(user.balance)) user.balance = 0
                    if (!isNumber(user.point)) user.point = 10000
                    if (!isNumber(user.bank)) user.bank = 100000
                    if (!isNumber(user.debt)) user.debt = 0
                    if (!isNumber(user.lastclaim)) user.lastclaim = 0
                    if (!('registered' in user)) user.registered = false
                    if (!user.registered) {
                        if (!('name' in user)) user.name = m.name
                        if (!('jid' in user)) user.jid = m.sender
                        if (!('email' in user)) user.email = ''
                        if (!('nomer' in user)) user.nomer = ''
                        if (!('code' in user)) user.code = ''
                        if (!('wa' in user)) user.wa = ''
                        if (!("ultah" in user)) user.ultah = ''
                        if (!('nope' in user)) user.nope = ''
                        if (!isNumber(user.codeExpire)) user.codeExpire = 0
                        if (!isNumber(user.attempt)) user.attempt = 0
                        if (!isNumber(user.age)) user.age = -1
                        if (!isNumber(user.regTime)) user.regTime = -1
                        if (!isNumber(user.eregTime)) user.eregTime = -1
                    }
                    if (!isNumber(user.afk)) user.afk = -1
                    if (!('afkReason' in user)) user.afkReason = ''
                    if (!('pasangan' in user)) user.pasangan = ''
                    if (!('sahabat' in user)) user.sahabat = ''
                    if (!('banned' in user)) user.banned = false
                    if (!('jail' in user)) user.jail = false
                    if (!('block' in user)) user.block = false
                    if (!('acc' in user)) user.acc = false
                    if (!('premium' in user)) user.premium = false
                    if (!("login" in user)) user.login = false
                    if (!('vip' in user)) user.vip = false
                    if (!('zevent' in user)) user.zevent = false
                    if (!user.acc) user.acc = false
                    if (!user.acc) user.end = false
                    if (!isNumber(user.premiumDate)) user.premiumDate = 0
                    if (!isNumber(user.vipDate)) user.vipDate = 0
                    if (!isNumber(user.zeventDate)) user.zeventDate = 0
                    if (!isNumber(user.bannedDate)) user.bannedDate = 0
                    if (!isNumber(user.blockDate)) user.blockDate = 0
                    if (!isNumber(user.warn)) user.warn = 0
                    if (!isNumber(user.warning)) user.warning = 0
                    if (!isNumber(user.count)) user.count = 0
                    if (!isNumber(user.level)) user.level = 0
                    if (!('role' in user)) user.role = 'Beginner'
                    if (!('roles' in user)) user.roles = 'Not Have'
                    if (!('pekerjaan' in user)) user.pekerjaan = 'Not Have'
                    if (!('gender' in user)) user.gender = 'Not Have'
                    if (!('city' in user)) user.city = 'Not Have'
                    if (!('agama' in user)) user.agama = 'Not Have'
                    if (!("skill" in user)) user.skill = ""
                    if (!("korps" in user)) user.korps = ""
                    if (!("korpsgrade" in user)) user.korpsgrade = ""
                    if (!("breaths" in user)) user.breaths = ""
                    if (!("magic" in user)) user.magic = ""
                    if (!("demon" in user)) user.demon = ""
                    if (!("title" in user)) user.title = ""
                    if (!("rank" in user)) user.title = ""
                    if (!("job" in user)) user.job = "Not Have"
                    if (!('autolevelup' in user)) user.autolevelup = true
                    
                    if (!isNumber(user.darahiblis)) user.darahiblis = 0
                    if (!isNumber(user.demonblood)) user.demonblood = 0
                    if (!isNumber(user.demonkill)) user.demonkill = 0
                    if (!isNumber(user.hashirakill)) user.hashirakill = 0
                    if (!isNumber(user.alldemonkill)) user.alldemonkill = 0
                    if (!isNumber(user.allhashirakill)) user.allhashirakill = 0
                    
                    if (!isNumber(user.attack)) user.attack = 0
                    if (!isNumber(user.strenght)) user.strenght = 0
                    if (!isNumber(user.speed)) user.speed = 0
                    if (!isNumber(user.defense)) user.defense = 0
                    if (!isNumber(user.regeneration)) user.regeneration = 0
                    
                    if (!isNumber(user.dana)) user.dana = 0
                    if (!isNumber(user.gopay)) user.gopay = 0
                    if (!isNumber(user.ovo)) user.ovo = 0
                    
                    if (!isNumber(user.kecap)) user.kecap = 0
                    if (!isNumber(user.garam)) user.garam = 0
                    if (!isNumber(user.gula)) user.gula = 0
                    if (!isNumber(user.asam)) user.asam = 0
                    if (!isNumber(user.jahe)) user.jahe = 0
                    if (!isNumber(user.cabai)) user.cabai = 0
                    if (!isNumber(user.bawang)) user.bawang = 0
                    if (!isNumber(user.kemiri)) user.kemiri = 0
                    if (!isNumber(user.kunyit)) user.kunyit = 0
                    if (!isNumber(user.terasi)) user.terasi = 0
                                        
                    if (!isNumber(user.casinospins)) user.casinospins = 0
                    if (!isNumber(user.transfercount)) user.transfercount = 0

                    if (!isNumber(user.health)) user.health = 100
                    if (!isNumber(user.healtmonster)) user.healtmonster = 100
                    if (!isNumber(user.armormonster)) user.armormonster = 0
                    if (!isNumber(user.potion)) user.potion = 0
                    if (!isNumber(user.tiketcoin)) user.tiketcoin = 0
                    if (!isNumber(user.healtmonster)) user.healtmonster = 0
                    if (!isNumber(user.pc)) user.pc = 0
                    if (!isNumber(user.spammer)) user.spammer = 0
                    if (!isNumber(user.expg)) user.expg = 0
                    if (!isNumber(user.trash)) user.trash = 0
                    if (!isNumber(user.sampah)) user.sampah = 0
                    if (!isNumber(user.wood)) user.wood = 0
                    if (!isNumber(user.rock)) user.rock = 0
                    if (!isNumber(user.string)) user.string = 0
                    if (!isNumber(user.petFood)) user.petFood = 0

                    if (!isNumber(user.emerald)) user.emerald = 0
                    if (!isNumber(user.coal)) user.coal = 0
                    if (!isNumber(user.diamond)) user.diamond = 0
                    if (!isNumber(user.berlian)) user.berlian = 0
                    if (!isNumber(user.emas)) user.emas = 0
                    if (!isNumber(user.gold)) user.gold = 0
                    if (!isNumber(user.iron)) user.iron = 0
                    if (!isNumber(user.string)) user.string = 0
                    
                    if (!isNumber(user.anggur)) user.anggur = 0
                    if (!isNumber(user.jeruk)) user.jeruk = 0
                    if (!isNumber(user.mangga)) user.mangga = 0
                    if (!isNumber(user.apel)) user.apel = 0
                    if (!isNumber(user.pisang)) user.pisang = 0
                    if (!isNumber(user.bibitanggur)) user.bibitanggur = 0
                    if (!isNumber(user.bibitjeruk)) user.bibitjeruk = 0
                    if (!isNumber(user.bibitmangga)) user.bibitmangga = 0
                    if (!isNumber(user.bibitapel)) user.bibitapel = 0
                    if (!isNumber(user.bibitpisang)) user.bibitpisang = 0
                    if (!isNumber(user.gardenboxs)) user.gardenboxs = 0
                    if (!isNumber(user.spagety)) user.spagety = 0
                    if (!isNumber(user.stamina)) user.stamina = 0
                    if (!isNumber(user.bensin)) user.bensin = 0
                    
                    if (!isNumber(user.botol)) user.botol = 0
                    if (!isNumber(user.kardus)) user.kardus = 0
                    if (!isNumber(user.kaleng)) user.kaleng = 0
                    if (!isNumber(user.aqua)) user.aqua = 0
                    if (!isNumber(user.kayu)) user.kayu = 0
                    if (!isNumber(user.batu)) user.batu = 0
                    if (!isNumber(user.kapak)) user.kapak = 0
                    if (!isNumber(user.obat)) user.obat = 0
                    if (!isNumber(user.clan)) user.clan = 0
                    if (!isNumber(user.pickaxe)) user.pickaxe = 0

                    if (!isNumber(user.common)) user.common = 0
                    if (!isNumber(user.cupon)) user.cupon = 0
                    if (!isNumber(user.gems)) user.gems = 0
                    if (!isNumber(user.boxs)) user.boxs = 0
                    if (!isNumber(user.uncommon)) user.uncommon = 0
                    if (!isNumber(user.mythic)) user.mythic = 0
                    if (!isNumber(user.legendary)) user.legendary = 0
                    if (!isNumber(user.pet)) user.pet = 0
                    if (!isNumber(user.ramuan)) user.ramuan = 0
                    
                    if (!isNumber(user.lastramuanclaim)) user.lastramuanclaim = 0
                    if (!isNumber(user.lastpotionclaim)) user.lastpotionclaim = 0
                    if (!isNumber(user.laststringclaim)) user.laststringclaim = 0
                    if (!isNumber(user.lastswordclaim)) user.lastswordclaim = 0
                    if (!isNumber(user.lastsironclaim)) user.lastsironclaim = 0
                    if (!isNumber(user.lastweaponclaim)) user.lastweaponclaim = 0
                    if (!isNumber(user.lastsmancingclaim)) user.lastsmancingclaim = 0
                    
                    if (!isNumber(user.ramuannagalast)) user.ramuannagalast = 0
                    if (!isNumber(user.ramuannagalast)) user.ramuanlionlast = 0
                    if (!isNumber(user.ramuanrobolast)) user.ramuanrobolast = 0
                    if (!isNumber(user.ramuanrubahlast)) user.ramuanrubahlast = 0
                    if (!isNumber(user.ramuankucinglast)) user.ramuankucinglast = 0
                    if (!isNumber(user.ramuanserigalalast)) user.ramuanserigalalast = 0
                    if (!isNumber(user.ramuangriffinlast)) user.ramuangriffinlast = 0
                    if (!isNumber(user.ramuanphonixlast)) user.ramuanphonixlast = 0
                    if (!isNumber(user.ramuancentaurlast)) user.ramuancentaurlast = 0
                    if (!isNumber(user.ramuankudalast)) user.ramuankudalast = 0
                    if (!isNumber(user.ramuankyubilast)) user.ramuankyubilast = 0
                    if (!isNumber(user.ramuanherolast)) user.ramuanherolast = 0
                    if (!isNumber(user.ramuananjinglast)) user.ramuananjinglast = 0
                    
                    if (!isNumber(user.hero)) user.hero = 1
                    if (!isNumber(user.exphero)) user.exphero = 0
                    if (!isNumber(user.pillhero)) user.pillhero = 0
                    if (!isNumber(user.waifuexp)) user.waifuexp = 0
                    if (!isNumber(user.herolastclaim)) user.herolastclaim = 0
                    
                    if (!isNumber(user.paus)) user.paus = 0
                    if (!isNumber(user.kepiting)) user.kepiting = 0
                    if (!isNumber(user.cumi)) user.cumi = 0
                    if (!isNumber(user.gurita)) user.gurita = 0
                    if (!isNumber(user.buntal)) user.buntal = 0
                    if (!isNumber(user.dory)) user.dory = 0
                    if (!isNumber(user.lobster)) user.lobster = 0
                    if (!isNumber(user.lumba)) user.lumba = 0
                    if (!isNumber(user.hiu)) user.hiu = 0
                    if (!isNumber(user.ikan)) user.ikan = 0
                    if (!isNumber(user.nila)) user.nila = 0
                    if (!isNumber(user.lele)) user.lele = 0
                    if (!isNumber(user.udang)) user.udang = 0
                    if (!isNumber(user.orca)) user.orca = 0
                    if (!isNumber(user.umpan)) user.umpan = 0
                    if (!isNumber(user.pancingan)) user.pancingan = 1
                    if (!isNumber(user.anakpancingan)) user.anakpancingan = 0
                    if (!isNumber(user.lastmancingemosi)) user.lastmancingemosi = 0
                    if (!isNumber(user.lastmancingeasy)) user.lastmancingeasy = 0
                    if (!isNumber(user.lastmancingnormal)) user.lastmancingnormal = 0
                    if (!isNumber(user.lastmancinghard)) user.lastmancinghard = 0
                    if (!isNumber(user.lastmancingextreme)) user.lastmancingextreme = 0
                    
                    if (!isNumber(user.kucing)) user.kucing = 0
                    if (!isNumber(user.kucinglastclaim)) user.kucinglastclaim = 0
                    if (!isNumber(user.lion)) user.lion = 0
                    if (!isNumber(user.lionlastclaim)) user.lionlastclaim = 0
                    if (!isNumber(user.robo)) user.robo = 0
                    if (!isNumber(user.robolastclaim)) user.robolastclaim = 0
                    if (!isNumber(user.kuda)) user.kuda = 0
                    if (!isNumber(user.kudalastclaim)) user.kudalastclaim = 0
                    if (!isNumber(user.rubah)) user.rubah = 0
                    if (!isNumber(user.rubahlastclaim)) user.rubahlastclaim = 0
                    if (!isNumber(user.anjing)) user.anjing = 0
                    if (!isNumber(user.anjinglastclaim)) user.anjinglastclaim = 0
                    if (!isNumber(user.serigala)) user.serigala = 0
                    if (!isNumber(user.serigalalastclaim)) user.serigalalastclaim = 0
                    if (!isNumber(user.naga)) user.naga = 0
                    if (!isNumber(user.nagalastclaim)) user.nagalastclaim = 0
                    if (!isNumber(user.phonix)) user.phonix = 0
                    if (!isNumber(user.phonixlastclaim)) user.phonixlastclaim = 0
                    if (!isNumber(user.kyubi)) user.kyubi = 0
                    if (!isNumber(user.kyubilastclaim)) user.kyubilastclaim = 0
                    if (!isNumber(user.griffin)) user.griffin = 0
                    if (!isNumber(user.griffinlastclaim)) user.griffinlastclaim = 0
                    if (!isNumber(user.centaur)) user.centaur = 0
                    if (!isNumber(user.centaurlastclaim)) user.centaurlastclaim = 0
                    
                    if (!isNumber(user.anakkucing)) user.anakkucing = 0
                    if (!isNumber(user.anakkuda)) user.anakkuda = 0
                    if (!isNumber(user.anakrobo)) user.anakrobo = 0
                    if (!isNumber(user.anakrubah)) user.anakrubah = 0
                    if (!isNumber(user.anakanjing)) user.anakanjing = 0
                    if (!isNumber(user.anakserigala)) user.anakserigala = 0
                    if (!isNumber(user.anaknaga)) user.anaknaga = 0
                    if (!isNumber(user.anakphonix)) user.anakphonix = 0
                    if (!isNumber(user.anakkyubi)) user.anakkyubi = 0
                    if (!isNumber(user.anakgriffin)) user.anakgriffin = 0
                    if (!isNumber(user.anakcentaur)) user.anakcentaur = 0
                    
                    if (!isNumber(user.makananpet)) user.makananpet = 0 
                    if (!isNumber(user.makanannaga)) user.makanannaga = 0
                    if (!isNumber(user.makananphonix)) user.makananphonix = 0
                    if (!isNumber(user.makanangriffin)) user.makanangriffin = 0
                    if (!isNumber(user.makanankyubi)) user.makanankyubi = 0
                    if (!isNumber(user.makanancentaur)) user.makanancentaur = 0
                    
                    if (!isNumber(user.nugget)) user.nugget = 0
                    if (!isNumber(user.rendang)) user.rendang = 0
                    if (!isNumber(user.salads)) user.salads = 0
                    if (!isNumber(user.steak)) user.steak = 0
                    if (!isNumber(user.candy)) user.candy = 0
                    if (!isNumber(user.ramen)) user.ramen = 0
                    if (!isNumber(user.pizza)) user.pizza = 0
                    if (!isNumber(user.vodka)) user.vodka = 0
                    if (!isNumber(user.sushi)) user.sushi = 0
                    if (!isNumber(user.bandage)) user.bandage = 0
                    if (!isNumber(user.ganja)) user.ganja = 0
                    if (!isNumber(user.soda)) user.soda = 0
                    if (!isNumber(user.roti)) user.roti = 0
                    if (!isNumber(user.spagetti)) user.spagetti = 0
                    if (!isNumber(user.croissant)) user.croissant = 0
                    if (!isNumber(user.onigiri)) user.onigiri = 0
                    if (!isNumber(user.hamburger)) user.hamburger = 0
                    if (!isNumber(user.hotdog)) user.hotdog = 0
                    if (!isNumber(user.cake)) user.cake = 0
                    if (!isNumber(user.sandwich)) user.sandwich = 0
                    if (!isNumber(user.escream)) user.escream = 0
                    if (!isNumber(user.pudding)) user.pudding = 0
                    if (!isNumber(user.juice)) user.juice = 0
                    if (!isNumber(user.teh)) user.teh = 0
                    if (!isNumber(user.popcorn)) user.popcorn = 0
                    if (!isNumber(user.kopi)) user.kopi = 0
                    if (!isNumber(user.boba)) user.boba = 0
                    if (!isNumber(user.susu)) user.susu = 0
                    if (!isNumber(user.kopimatcha)) user.kopimatcha = 0                    
                    if (!isNumber(user.soju)) user.soju = 0                    
                    if (!isNumber(user.soup)) user.soup = 0                    
                    if (!isNumber(user.kentang)) user.kentang = 0                    
                    if (!isNumber(user.rawon)) user.rawon = 0                    
                    if (!isNumber(user.semur)) user.semur = 0                    
                    if (!isNumber(user.nasiuduk)) user.nasiuduk = 0                    
                    if (!isNumber(user.soto)) user.soto = 0 
                    if (!isNumber(user.sate)) user.sate = 0                  
                    if (!isNumber(user.ayamgoreng)) user.ayamgoreng = 0                  
                    if (!isNumber(user.babiguling)) user.babiguling = 0                  
                    if (!isNumber(user.mieayam)) user.mieayam = 0    
                    if (!isNumber(user.ikanbakar)) user.ikanbakar = 0                  
                    if (!isNumber(user.ayamgulai)) user.ayamgulai = 0                  
                    if (!isNumber(user.pempek)) user.pempek = 0                  
                    
                    if (!isNumber(user.rumahsakit)) user.rumahsakit = 0
                    if (!isNumber(user.benteng)) user.benteng = 0
                    if (!isNumber(user.camptroops)) user.camptroops = 0
                    if (!isNumber(user.pertanian)) user.pertanian = 0
                    if (!isNumber(user.tambang)) user.tambang = 0
                    if (!isNumber(user.house)) user.house = 0
                    if (!isNumber(user.industri)) user.industri = 0
                    if (!isNumber(user.masjid)) user.masjid = 0
                    if (!isNumber(user.gereja)) user.gereja = 0

                    if (!isNumber(user.kuda)) user.kuda = 0
                    if (!isNumber(user.kudaexp)) user.kudaexp = 0
                    if (!isNumber(user.kucing)) user.kucing = 0
                    if (!isNumber(user.kucingexp)) user.kucingexp = 0
                    if (!isNumber(user.rubah)) user.rubah = 0
                    if (!isNumber(user.rubahexp)) user.rubahexp = 0
                    if (!isNumber(user.anjing)) user.anjing = 0
                    if (!isNumber(user.anjingexp)) user.anjingexp = 0
                    if (!isNumber(user.kuda)) user.kuda = 0
                    if (!isNumber(user.kudaexp)) user.kudaexp = 0
                    if (!isNumber(user.robo)) user.robo = 0
                    if (!isNumber(user.roboexp)) user.roboexp = 0
                    if (!isNumber(user.lion)) user.lion = 0
                    if (!isNumber(user.lionexp)) user.lionexp = 0
                    if (!isNumber(user.naga)) user.naga = 0
                    if (!isNumber(user.nagaexp)) user.nagaexp = 0
                    if (!isNumber(user.centaur)) user.centaur = 0
                    if (!isNumber(user.centaurexp)) user.centaurexp = 0
                    if (!isNumber(user.phonix)) user.phonix = 0
                    if (!isNumber(user.phonixexp)) user.phonixexp = 0
                    if (!isNumber(user.griffin)) user.griffin = 0
                    if (!isNumber(user.griffinexp)) user.griffinexp = 0
                    if (!isNumber(user.kyubi)) user.kyubi = 0   
                    if (!isNumber(user.kyubiexp)) user.kyubiexp = 0 
                    if (!isNumber(user.serigala)) user.serigala = 0 
                    if (!isNumber(user.serigalaexp)) user.serigalaexp = 0                                  

                    if (!isNumber(user.kudalastfeed)) user.kudalastfeed = 0                    
                    if (!isNumber(user.kucinglastfeed)) user.kucinglastfeed = 0
                    if (!isNumber(user.rubahlastfeed)) user.rubahlastfeed = 0
                    if (!isNumber(user.anjinglastfeed)) user.anjinglastfeed = 0
                    if (!isNumber(user.kudalastfeed)) user.kudalastfeed = 0
                    if (!isNumber(user.robolastfeed)) user.robolastfeed = 0
                    if (!isNumber(user.lionlastfeed)) user.lionlastfeed = 0
                    if (!isNumber(user.nagalastfeed)) user.nagalastfeed = 0
                    if (!isNumber(user.centaurlastfeed)) user.centaurlastfeed = 0
                    if (!isNumber(user.phonixlastfeed)) user.phonixlastfeed = 0
                    if (!isNumber(user.griffinlastfeed)) user.griffinlastfeed = 0
                    if (!isNumber(user.kyubilastfeed)) user.kyubilastfeed = 0    
                    if (!isNumber(user.serigalalastfeed)) user.serigalalastfeed = 0 

                    if (!isNumber(user.armor)) user.armor = 0
                    if (!isNumber(user.armordurability)) user.armordurability = 0
                    if (!isNumber(user.weapon)) user.weapon = 0
                    if (!isNumber(user.weapondurability)) user.weapondurability = 0
                    if (!isNumber(user.sword)) user.sword = 0
                    if (!isNumber(user.sworddurability)) user.sworddurability = 0
                    if (!isNumber(user.pickaxe)) user.pickaxe = 0
                    if (!isNumber(user.pickaxedurability)) user.pickaxedurability = 0
                    if (!isNumber(user.fishingrod)) user.fishingrod = 0
                    if (!isNumber(user.fishingroddurability)) user.fishingroddurability = 0
                    if (!isNumber(user.katana)) user.katana = 0
                    if (!isNumber(user.katanadurability)) user.katanadurability = 0
                    if (!isNumber(user.bow)) user.bow = 0
                    if (!isNumber(user.bowdurability)) user.bowdurability = 0
                    if (!isNumber(user.kapak)) user.kapak = 0
                    if (!isNumber(user.kapakdurability)) user.kapakdurability = 0
                    if (!isNumber(user.axe)) user.axe = 0
                    if (!isNumber(user.axedurability)) user.axedurability = 0
                    if (!isNumber(user.pisau)) user.pisau = 0
                    if (!isNumber(user.pisaudurability)) user.pisaudurability = 0
                    
                    if (!isNumber(user.kerjasatu)) user.kerjasatu = 0
                    if (!isNumber(user.kerjadua)) user.kerjadua = 0
                    if (!isNumber(user.kerjatiga)) user.kerjatiga = 0
                    if (!isNumber(user.kerjaempat)) user.kerjaempat = 0
                    if (!isNumber(user.kerjalima)) user.kerjalima = 0
                    if (!isNumber(user.kerjaenam)) user.kerjaenam = 0
                    if (!isNumber(user.kerjatujuh)) user.kerjatujuh = 0
                    if (!isNumber(user.kerjadelapan)) user.kerjadelapan = 0
                    if (!isNumber(user.kerjasembilan)) user.kerjasembilan = 0
                    if (!isNumber(user.kerjasepuluh)) user.kerjasepuluh = 0
                    if (!isNumber(user.kerjasebelas)) user.kerjasebelas = 0
                    if (!isNumber(user.kerjaduabelas)) user.kerjaduabelas = 0
                    if (!isNumber(user.kerjatigabelas)) user.kerjatigabelas = 0
                    if (!isNumber(user.kerjaempatbelas)) user.kerjaempatbelas = 0
                    if (!isNumber(user.kerjalimabelas)) user.kerjalimabelas = 0
                    if (!isNumber(user.kerjaenambelas)) user.kerjaenambelas = 0
                    if (!isNumber(user.kerjatujuhbelas)) user.kerjatujuhbelas = 0
                    if (!isNumber(user.kerjadelapanbelas)) user.kerjadelapanbelas = 0
                    if (!isNumber(user.kerjasembilanbelas)) user.kerjasembilanbelas = 0
                    if (!isNumber(user.kerjaduapuluh)) user.kerjaduapuluh = 0
                    if (!isNumber(user.kerjaduasatu)) user.kerjaduasatu = 0
                    if (!isNumber(user.kerjaduadua)) user.kerjaduadua = 0
                    if (!isNumber(user.kerjaduatiga)) user.kerjaduatiga = 0
                    if (!isNumber(user.kerjaduaempat)) user.kerjaduaempat = 0
                    if (!isNumber(user.kerjadualima)) user.kerjadualima = 0
                    if (!isNumber(user.kerjaduaenam)) user.kerjaduaenam = 0
                    if (!isNumber(user.kerjaduatujuh)) user.kerjaduatujuh = 0
                    if (!isNumber(user.kerjaduadelapan)) user.kerjaduadelapan = 0
                    if (!isNumber(user.kerjaduasembilan)) user.kerjaduasembilan = 0
                    if (!isNumber(user.kerjatigapuluh)) user.kerjatigapuluh = 0
                    if (!isNumber(user.judilast)) user.judilast = 0
                    if (!isNumber(user.reglast)) user.reglast = 0
                    if (!isNumber(user.unreglast)) user.unreglast = 0
                    if (!isNumber(user.unereglast)) user.unereglast = 0
                    if (!isNumber(user.ereglast)) user.ereglast = 0
                    if (!isNumber(user.snlast)) user.snlast = 0
                    if (!isNumber(user.spinlast)) user.spinlast = 0
                    
                    if (!isNumber(user.lastwarpet)) user.lastwarpet = 0
                    if (!isNumber(user.lastspam)) user.lastspam = 0
                    if (!isNumber(user.lastpekerjaan)) user.lastpekerjaan = 0
                    if (!isNumber(user.lastclaim)) user.lastclaim = 0
                    if (!isNumber(user.lastkoboy)) user.lastkoboy = 0
                    if (!isNumber(user.lastadventure)) user.lastadventure = 0
                    if (!isNumber(user.lastgoplanet)) user.lastgoplanet = 0
                    if (!isNumber(user.lastfishing)) user.lastfishing = 0
                    if (!isNumber(user.lastdungeon)) user.lastdungeon = 0
                    if (!isNumber(user.lastcrusade)) user.lastcrusade = 0
                    if (!isNumber(user.lastduel)) user.lastduel = 0
                    if (!isNumber(user.lastcode)) user.lastcode = 0
                    if (!isNumber(user.lastlink)) user.lastlink = 0
                    if (!isNumber(user.lastrob)) user.lastrob = 0
                    if (!isNumber(user.lastopen)) user.lastopen = 0
                    if (!isNumber(user.lasteasy)) user.lasteasy = 0
                    if (!isNumber(user.lastnambang)) user.lastnambang = 0
                    if (!isNumber(user.lastbunuhi)) user.lastbunuhi = 0
                    if (!isNumber(user.lastmining)) user.lastmining = 0
                    if (!isNumber(user.lasthunt)) user.lasthunt = 0
                    if (!isNumber(user.lastweekly)) user.lastweekly = 0
                    if (!isNumber(user.lastmonthly)) user.lastmonthly = 0
                    if (!isNumber(user.lastmulung)) user.lastmulung = 0
                    if (!isNumber(user.lastdagang)) user.lastdagang = 0
                    if (!isNumber(user.lastbisnis)) user.lastbisnis = 0
                    if (!isNumber(user.lastnebang)) user.lastnebang = 0
                    if (!isNumber(user.lastberkebon))user.lastberkebon = 0
                    if (!isNumber(user.lastadventure)) user.lastadventure = 0
                    if (!isNumber(user.lastgoplanet)) user.lastgoplanet = 0
                    if (!isNumber(user.lastberburu)) user.lastberburu = 0
                    if (!isNumber(user.lastngojek)) user.lastngojek = 0
                    if (!isNumber(user.lastgrab)) user.lastgrab = 0
                    if (!isNumber(user.lastroket)) user.lastroket = 0
                    if (!isNumber(user.lastkerja)) user.lastkerja = 0
                    if (!isNumber(user.lastjobkerja)) user.lastjobkerja = 0
                    if (!isNumber(user.lastcasinospins)) user.lastcasinospins = 0
                    if (!isNumber(user.lastjobchange)) user.lastjobchange = 0
                    if (!isNumber(user.lastnguli)) user.lastnguli = 0
                    if (!isNumber(user.lastbo)) user.lastbo = 0
                    if (!isNumber(user.freelimit)) user.freelimit = 0
                    if (!isNumber(user.newuserclaimed)) user.newuserclaimed = 0
                } else global.db.data.users[m.sender] = {
                    exp: 0,
                    jobexp: 0,
                    limit: 50,
                    joinlimit: 1,
                    spammer: 0,
                    money: 100000,
                    saldo: 0,
                    balance: 0,
                    point: 10000,
                    bank: 100000,
                    debt: 0,
                    health: 100,
                    tiketcoin: 0,
                    healtmonster: 100,
                    armormonster: 0,
                    lastclaim: 0,
                    registered: false,
                    registeredevent: false,
                    name: m.name,
                    jid: m.sender,
                    email: '',
                    nomer: '',
                    code: '',
                    codeExpire: 0,
                    bannedDate: 0,
                    blockDate: 0,
                    attempt: 0,
                    age: -1,
                    regTime: -1,
                    eregTime: -1,
                    afk: -1,
                    afkReason: '',
                    pasangan: '',
                    sahabat: '',
                    banned: false,
                    jail: false,
                    block: false,
                    acc: false,
                    premium: false,
                    login: false,
                    zevent: false,
                    acc: 0,
                    followers: 0,
                    following: 0,
                    end: 0,
                    warn: 0,
                    count: 0,
                    pc: 0,
                    expg: 0,
                    level: 0,
                    skill: "",
                    korps: "",
                    korpsgrade: "",
                    demon: "",
                    title: "",
                    rank: "",
                    breaths: "",
                    magic: "",
                    pekerjaaan: "Not have",
                    gender: "Not have",
                    city: "Not have",
                    job: "Not Have",
                    agama: "Not Have",
                    role: 'Newbie l',
                    roles: 'Not Have',
                    autolevelup: true,

                    potion: 10,
                    trash: 0,
                    sampah: 0,
                    wood: 0,
                    rock: 0,
                    string: 0,
                    
                    casinospins: 0,
                    transfercount: 0,
                    
                    darahiblis: 0,
                    demonblood: 0,
                    demonkill: 0,
                    hashirakill: 0,
                    alldemonkill: 0,
                    allhashirakill: 0,
                    
                    attack: 0,
                    speed: 0,
                    strenght: 0,
                    defense: 0,
                    regeneration: 0,
                    
                    kecap: 0,
                    gula: 0,
                    asam: 0,
                    jahe: 0,
                    garam: 0,
                    cabai: 0,
                    bawang: 0,
                    kemiri: 0,
                    kunyit: 0,
                    terasi: 0,
                    
                    dana: 0,
                    gopay: 0,
                    ovo: 0,
                    
                    gula: 0,
                    asam: 0,
                    jahe: 0,
                    kunyit: 0,
                    terasi: 0,
                    kecap: 0,
                    cabai: 0,
                    bawang: 0,
                    kemiri: 0,
                    garam: 0,

                    emerald: 0,
                    diamond: 0,
                    berlian: 0,
                    emas: 0,
                    gold: 0,
                    iron: 0,
                    coal: 0,
                    
                    pisang: 0,
                    anggur: 0,
                    mangga: 0,
                    jeruk: 0,
                    apel: 0,
                    bibitpisang: 0,
                    bibitanggur: 0,
                    bibitmangga: 0,
                    bibitjeruk: 0,
                    bibitapel: 0,
                    gardenboxs: 0,
                    spagety: 0,
                    stamina: 0,
                    bensin: 0,
                    
                    nuggets: 0,
                    rendang: 0,
                    salads: 0,
                    steak: 0,
                    candy: 0,
                    ramen: 0,
                    pizza: 0,
                    vodka: 0,
                    sushi: 0,
                    bandage: 0,
                    ganja: 0, 
                    soda: 0,
                    roti: 0,
                    spagetti: 0,
                    croissant: 0,
                    onigiri: 0,
                    hamburger: 0,
                    hotdog: 0,
                    cake: 0,
                    sandwich: 0,
                    escream: 0,
                    pudding: 0,
                    juice: 0,
                    teh: 0,
                    popcorn: 0,
                    kopi: 0,
                    boba: 0,
                    susu: 0,
                    kopimatcha: 0,
                    soju: 0,
                    soup: 0,
                    kentang: 0,
                    rawon: 0,
                    semur: 0,
                    nasiuduk: 0,
                    soto: 0,
                    sate: 0,
                    ayamgoreng: 0,
                    babiguling: 0,
                    mieayam: 0,
                    ikanbakar: 0,
                    ayamgulai: 0,
                    pempek: 0,
                    
                    rumahsakit: 0,
                    tambang: 0,
                    pertanian: 0,
                    camptroops: 0,
                    benteng: 0,
                    house: 0,
                    industri: 0,
                    masjid: 0,
                    gereja: 0,
                    
                    botol: 0,
                    kardus: 0,
                    kaleng: 0,
                    aqua: 0,
                    kayu: 0,
                    batu: 0,
                    kapak: 0,
                    obat: 0,
                    clan: 0,
                    pickaxe: 0,

                    cupon: 0,
                    gems: 0,
                    boxs: 0,
                    common: 0,
                    uncommon: 0,
                    mythic: 0,
                    legendary: 0,
                    pet: 0,
                    ramuan: 0,
                    
                    ramuannagalast: 0,
                    ramuankyubilast: 0,
                    ramuanphonixlast: 0,
                    ramuanserigalalast: 0,
                    ramuananjinglast: 0,
                    ramuancentaurlast: 0,
                    ramuankudalast: 0,
                    ramuankucinglast: 0,
                    ramuanrubahlast: 0,
                    ramuangriffinlast: 0,
                    ramuanherolast: 0,
                    ramuanrobolast: 0,
                    ramuanlionlast: 0,

                    kuda: 0,
                    kudaexp: 0,
                    kucing: 0,
                    kucingngexp: 0,
                    rubah: 0,
                    rubahexp: 0,
                    anjing: 0,
                    anjingexp: 0,
                    naga: 0,
                    nagaexp: 0,
                    phonix: 0,
                    phonixexp: 0,
                    centaur: 0,
                    centaurexp: 0,
                    griffin: 0,
                    griffinexp: 0,
                    serigala: 0,
                    serigalaexp: 0,
                    lion: 0,
                    lionexp: 0,
                    robo: 0,
                    roboexp: 0,
                    kyubi: 0,
                    kyubiexp: 0,
                    
                    hero: 1,
                    exphero: 0,
                    pillhero: 0,
                    waifuexp: 0,
                    herolastclaim: 0,
                    
                    udang: 0,
                    hiu: 0,
                    lobster: 0,
                    lumba: 0,
                    ikan: 0,
                    nila: 0,
                    lele: 0,
                    buntal: 0,
                    gurita: 0,
                    dory: 0,
                    cumi: 0,
                    kepiting: 0,
                    paus: 0,
                    orca: 0,
                    umpan: 0,
                    pancingan: 1,
                    anakpancingan: 0,
                    
                    anakkucing: 0,
                    anakkuda: 0,
                    anakrubah: 0,
                    anakanjing: 0,
                    anakserigala: 0,
                    anaknaga: 0,
                    anakphonix: 0,
                    anakkyubi: 0,
                    anakgriffin: 0,
                    anakcentaur: 0,
                    anakrobo: 0,
                    anaklion: 0,
                    
                    kucing: 0,
                    kucinglastclaim: 0,
                    kuda: 0,
                    kudalastclaim: 0,
                    rubah: 0,
                    rubahlastclaim: 0,
                    serigala: 0,
                    serigalalastclaim: 0,
                    naga: 0,
                    nagalastclaim: 0,
                    phonix: 0,
                    phonixlastclaim: 0,
                    anjing: 0,
                    anjinglastclaim: 0,
                    kyubi: 0,
                    kyubilastclaim: 0,
                    griffin: 0,
                    griffinlastclaim: 0,
                    centaur: 0,
                    centaurlastclaim: 0,
                    lion: 0,
                    lionlastclaim: 0,
                    robo: 0,
                    robolastclaim: 0,
                    
                    makananpet: 0,
                    makananphonix: 0,
                    makanannaga: 0,
                    makanangriffin: 0,
                    makanankyubi: 0,
                    makanancentaur: 0,

                    kudalastfeed: 0,
                    kucinglastfeed: 0,
                    rubahlastfeed: 0,
                    anjinglastfeed: 0,
                    robolastfeed: 0,
                    lionlastfeed: 0,
                    nagalastfeed: 0,
                    phonixlastfeed: 0,
                    centaurlastfeed: 0,
                    griffinlastfeed: 0,
                    serigalalastfeed: 0,
                    kyubilastfeed: 0,

                    armor: 0,
                    armordurability: 0,
                    weapon: 0,
                    weapondurability: 0,
                    sword: 0,
                    sworddurability: 0,
                    pickaxe: 0,
                    pickaxedurability: 0,
                    fishingrod: 0,
                    fishingroddurability: 0,
                    katana: 0,
                    katanadurability: 0,
                    bow: 0,
                    bowdurability: 0,
                    kapak: 0,
                    kapakdurability: 0,
                    axe: 0,
                    axedurability: 0,
                    pisau: 0,
                    pisaudurability: 0,
                    
                    judilast: 0,
                    reglast: 0,
                    ereglast: 0,
                    unreglast: 0,
                    unereglast: 0,
                    snlast: 0,
                    spinlast: 0,
                    
                    kerjasatu: 0,
                    kerjadua: 0,
                    kerjatiga: 0,
                    kerjaempat: 0,
                    kerjalima: 0,
                    kerjaenam: 0,
                    kerjatujuh: 0,
                    kerjadelapan: 0,
                    kerjasembilan: 0,
                    kerjasepuluh: 0,
                    kerjasebelas: 0,
                    kerjaduabelas: 0,
                    kerjatigabelas: 0,
                    kerjaempatbelas: 0,
                    kerjalimabelas: 0,
                    kerjaenambelas: 0,
                    kerjatujuhbelas: 0,
                    kerjadelapanbelas: 0,
                    kerjasembilanbelas: 0,
                    kerjaduapuluh: 0,
                    kerjaduasatu: 0,
                    kerjaduadua: 0,
                    kerjaduatiga: 0,
                    kerjaduaempat: 0,
                    kerjadualima: 0,
                    kerjaduaenam: 0,
                    kerjaduatujuh: 0,
                    kerjaduadelapan: 0,
                    kerjaduasembilan: 0,
                    kerjatigapuluh: 0, 
                    
                    lastramuanclaim: 0,
                    lastpotionclaim: 0,
                    laststringclaim: 0,
                    lastswordclaim: 0,
                    lastweaponclaim: 0,
                    lastsironclaim: 0,
                    lastsmancingclaim: 0,
                    
                    lastmancingemosi: 0,
                    lastmancingeasy: 0,
                    lastmancingnormal: 0,
                    lastmancinghard: 0,
                    lastmancingextreme: 0,
                    lastwarpet: 0,
                    lastspam: 0,
                    lastpekerjaan: 0,
                    lastclaim: 0,
                    lastkoboy: 0,
                    lastadventure: 0,
                    lastgoplanet: 0,
                    lastfishing: 0,
                    lastdungeon: 0,
                    lastcrusade: 0,
                    lastduel: 0,
                    lastcode: 0,
                    lastlink: 0,
                    lastnambang: 0,
                    lastmining: 0,
                    lasthunt: 0,
                    lastweekly: 0,
                    lastmonthly: 0,
                    lastrob: 0,
                    lastbunuhi: 0,
                    lastopen: 0,
                    lasteasy: 0,
                    lastmulung: 0,
                    lastdagang: 0,
                    lastbisnis: 0,
                    lastnebang: 0,
                    lastberkebon: 0,
                    lastadventure: 0,
                    lastgoplanet: 0,
                    lastberburu: 0,
                    lastngojek: 0,
                    lastgrab: 0,
                    lastroket: 0,
                    lastkerja: 0,
                    lastjobkerja: 0,
                    lastjobchange: 0,
                    lastnguli: 0,
                    freelimit: 0,
                    lastbo: 0,
                    newuserclaimed: 0,
                }
                let chat = global.db.data.chats[m.chat]
                if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
                if (chat) {
                    if (!('isBanned' in chat)) chat.isBanned = false
                    if (!('welcome' in chat)) chat.welcome = true
                    if (!('autoread' in chat)) chat.autoread = false
                    if (!('detect' in chat)) chat.detect = false
                    if (!('sWelcome' in chat)) chat.sWelcome = `Selamat Datang @user`
                    if (!('sBye' in chat)) chat.sBye = `Selamat Tinggal @user`
                    if (!('sPromote' in chat)) chat.sPromote = '@user telah di promote'
                    if (!('sDemote' in chat)) chat.sDemote = '@user telah di demote'
                    if (!('delete' in chat)) chat.delete = true
                    if (!('antiVirtex' in chat)) chat.antiVirtex = false
                    if (!('antiLink' in chat)) chat.antiLink = false
                    if (!('antiNsfw' in chat)) chat.antiNsfw = false
                    if (!('captcha' in chat)) chat.captcha = false
                    if (!('antifoto' in chat)) chat.antiFoto = false
                    if (!('antividio' in chat)) chat.antiVideo = false
                    if (!('autoJpm' in chat)) chat.autoJpm = false
                    if (!('antiPorn' in chat)) chat.antiPorn = false
                    if (!('antiSpam' in chat)) chat.antiSpam = false
                    if (!('freply' in chat)) chat.freply = false
                    if (!('simi' in chat)) chat.simi = false
                    if (!('ai' in chat)) chat.ai = false
                    if (!('ngetik' in chat)) chat.ngetik = false
                    if (!('autoVn' in chat)) chat.autoVn = false
                    if (!('antiSticker' in chat)) chat.antiSticker = false
                    if (!('stiker' in chat)) chat.stiker = false
                    if (!('antiBadword' in chat)) chat.antiBadword = false
                    if (!('viewonce' in chat)) chat.viewonce = false
                    if (!('useDocument' in chat)) chat.useDocument = false
                    if (!('antiToxic' in chat)) chat.antiToxic = false
                    if (!isNumber(chat.expired)) chat.expired = 0
                } else global.db.data.chats[m.chat] = {
                    isBanned: false,
                    welcome: true,
                    autoread: false,
                    simi: false,
                    ai: false,
                    ngetik: false,
                    autoVn: false,
                    stiker: false,
                    antiSticker: false,
                    antiBadword: false,
                    antiSpam: false,
                    detect: false,
                    autoJpm: false,
                    sWelcome: '',
                    sBye: '',
                    sPromote: '@user telah di promote!',
                    sDemote: '@user telah di demote',
                    ultah: "",
                    delete: true,
                    antiLink: false,
                    antiNsfw: false,
                    captcha: false,
                    antifoto: false,
                    antuvidio: false,
                    antiPorn: false
                }
                 let akinator = global.db.data.users[m.sender].akinator
			if (typeof akinator !== 'object')
				global.db.data.users[m.sender].akinator = {}
			if (akinator) {
				if (!('sesi' in akinator))
					akinator.sesi = false
				if (!('server' in akinator))
					akinator.server = null
				if (!('frontaddr' in akinator))
					akinator.frontaddr = null
				if (!('session' in akinator))
					akinator.session = null
				if (!('signature' in akinator))
					akinator.signature = null
				if (!('question' in akinator))
					akinator.question = null
				if (!('progression' in akinator))
					akinator.progression = null
				if (!('step' in akinator))
					akinator.step = null
				if (!('soal' in akinator))
					akinator.soal = null
			} else
				global.db.data.users[m.sender].akinator = {
					sesi: false,
					server: null,
					frontaddr: null,
					session: null,
					signature: null,
					question: null,
					progression: null,
					step: null, 
					soal: null
				}
	     	    let simulator = global.db.data.users[m.sender].simulator 
                if (typeof simulator !== 'object') global.db.data.users[m.sender].simulator = {}
                if (simulator) {
                   if (!isNumber(simulator.toko_mu)) simulator.toko_mu = 0
                   if (!isNumber(simulator.mobil_mu)) simulator.mobil_mu = 0
                   if (!isNumber(simulator.emas_mu)) simulator.emas_mu = 0
                   if (!isNumber(simulator.perhiasan_mu)) simulator.perhiasan_mu = 0
                   if (!isNumber(simulator.makanan_mu)) simulator.makanan_mu = 0
                   if (!isNumber(simulator.minuman_mu)) simulator.minuman_mu = 0
                   if (!isNumber(simulator.warung_mu)) simulator.warung_mu = 0
                   if (!isNumber(simulator.rumah_mu)) simulator.rumah_mu = 0
                   if (!('login' in simulator)) simulator.login = false
                   if (!simulator.login) {
                   if (!('name' in simulator)) simulator.name = m.name
                   if (!('gender' in simulator)) simulator.gender = ''
                   if (!('umur' in simulator)) simulator.umur = ''
                   if (!('profile' in simulator)) simulator.profile = ''
                   if (!('suami' in simulator)) simulator.suami = ''
                   if (!('istri' in simulator)) simulator.istri = ''
                   if (!('tgl_nikah' in simulator)) simulator.tgl_nikah = ''
                   if (!('mas_kawin' in simulator)) simulator.mas_kawin = ''
                   }
                   if (!('status_nikah' in simulator)) simulator.status_nikah = 'belum nikah'
                } else global.db.data.users[m.sender].simulator = {
                   nama: '',
	      	   	   gender: '',
		           umur: '',
			  	   login: false,
			       profile: '',
			       suami: '',
                   istri: '',
                   tgl_nikah: '',
                   status_nikah: 'belum nikah',
                   mas_kawin: '',
                   toko_mu: 0,
                   mobil_mu: 0,
                   emas_mu: 0,
                   perhiasan_mu: 0,
                   makanan_mu: 0,
                   minuman_mu: 0,
                   warung_mu: 0,
                   rumah_mu: 0
                }
                
            } catch (e) {
                console.error(e)
            }
            if (opts['nyimak']) return
            if (!m.fromMe && opts['self']) return
            if (opts['pconly'] && m.chat.endsWith('g.us')) return
            if (opts['gconly'] && !m.chat.endsWith('g.us') && !m.fromMe)
                   return conn.reply(m.chat, '*Sedang dalam mode hanya group, silahkan join group bot untuk menggunakan fitur.*\nGcbot:https://chat.whatsapp.com/J4FSaZcI6taLCMAWPz3JlL')
            if (opts['swonly'] && m.chat !== 'status@broadcast') return
            if (typeof m.text !== 'string') m.text = ''
            if (opts['queque'] && m.text) {
                this.msgqueque.push(m.id || m.key.id)
                await delay(this.msgqueque.length * 1000)
            }
            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue
                if (!plugin.all) continue
                if (typeof plugin.all !== 'function') continue
                try {
                    await plugin.all.call(this, m, chatUpdate)
                } catch (e) {
                    if (typeof e === 'string') continue
                    console.error(e)
                }
            }
            if (m.isBaileys) return
            m.exp += Math.ceil(Math.random() * 10)

            let usedPrefix
            let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

            let isROwner = [global.conn.user.jid, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let isOwner = isROwner || m.fromMe
            let isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let groupMetadata = (m.isGroup ? (conn.chats[m.chat] || {}).metadata : {}) || {}
            let participants = (m.isGroup ? groupMetadata.participants : []) || []
            let user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User Data
            let bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
            let isAdmin = user && user.admin || false // Is User Admin?
            let isBotAdmin = bot && bot.admin || false // Are you Admin?
            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue
                if (!opts['restrict']) if (plugin.tags && plugin.tags.includes('admin')) {
                    // global.dfail('restrict', m, this)
                    continue
                }
                const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix
                let match = (_prefix instanceof RegExp ? // RegExp Mode?
                    [[_prefix.exec(m.text), _prefix]] :
                    Array.isArray(_prefix) ? // Array?
                        _prefix.map(p => {
                            let re = p instanceof RegExp ? // RegExp in Array?
                                p :
                                new RegExp(str2Regex(p))
                            return [re.exec(m.text), re]
                        }) :
                        typeof _prefix === 'string' ? // String?
                            [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
                            [[[], new RegExp]]
                ).find(p => p[1])
                if (typeof plugin.before === 'function') if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                })) continue
                if (typeof plugin !== 'function') continue
                if ((usedPrefix = (match[0] || '')[0])) {
                    let noPrefix = m.text.replace(usedPrefix, '')
                    let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                    args = args || []
                    let _args = noPrefix.trim().split` `.slice(1)
                    let text = _args.join` `
                    command = (command || '').toLowerCase()
                    let fail = plugin.fail || global.dfail // When failed
                    let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
                        plugin.command.test(command) :
                        Array.isArray(plugin.command) ? // Array?
                            plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                                cmd.test(command) :
                                cmd === command
                            ) :
                            typeof plugin.command === 'string' ? // String?
                                plugin.command === command :
                                false

                    if (!isAccept) continue
                    m.plugin = name
                    if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                        let chat = global.db.data.chats[m.chat]
                        let user = global.db.data.users[m.sender]
                        if (name != 'unbanchat.js' && chat && chat.isBanned) return // Except this
                        if (name != 'unbanuser.js' && user && user.banned) return
                    }
                    if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
                        fail('owner', m, this)
                        continue
                    }
                    if (plugin.rowner && !isROwner) { // Real Owner
                        fail('rowner', m, this)
                        continue
                    }
                    if (plugin.owner && !isOwner) { // Number Owner
                        fail('owner', m, this)
                        continue
                    }
                    if (plugin.mods && !isMods) { // Moderator
                        fail('mods', m, this)
                        continue
                    }
                    if (plugin.premium && !isPrems) { // Premium
                        fail('premium', m, this)
                        continue
                    }
                    if (plugin.group && !m.isGroup) { // Group Only
                        fail('group', m, this)
                        continue
                    } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
                        fail('botAdmin', m, this)
                        continue
                    } else if (plugin.admin && !isAdmin) { // User Admin
                        fail('admin', m, this)
                        continue
                    }
                    if (plugin.private && m.isGroup) { // Private Chat Only
                        fail('private', m, this)
                        continue
                    }
                    if (plugin.register == true && _user.registered == false) { // Butuh daftar?
                        fail('unreg', m, this)
                        continue
                    }
                    m.isCommand = true
                    let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // XP Earning per command
                    if (xp > 200) m.reply('Ngecit -_-') // Hehehe
                    else m.exp += xp
                    if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
                        this.reply(m.chat, `Limit anda habis, silahkan beli melalui *${usedPrefix}buy*`, m)
                        continue // Limit habis
                    }
                    if (plugin.level > _user.level) {
                        this.reply(m.chat, `diperlukan level ${plugin.level} untuk menggunakan perintah ini. Level kamu ${_user.level}`, m)
                        continue // If the level has not been reached
                    }
                    let extra = {
                        match,
                        usedPrefix,
                        noPrefix,
                        _args,
                        args,
                        command,
                        text,
                        conn: this,
                        participants,
                        groupMetadata,
                        user,
                        bot,
                        isROwner,
                        isOwner,
                        isAdmin,
                        isBotAdmin,
                        isPrems,
                        chatUpdate,
                    }                          
                    try {
                        await plugin.call(this, m, extra)
                        if (!isPrems) m.limit = m.limit || plugin.limit || false
                    } catch (e) {
                        // Error occured
                        m.error = e
                        console.error(e)
                        if (e) {
                            let text = util.format(e)
                            for (let key of Object.values(APIKeys))
                                text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                            if (e.name)
                            for (let jid of owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != this.user.jid)) {
                                let data = (await this.onWhatsApp(jid))[0] || {}
                                if (data.exists)
                                    m.reply(`*Plugin:* ${m.plugin}\n*Sender:* @${m.sender.split`@`[0]}\n*Chat:* ${m.chat}\n*Chat Name:* ${await this.getName(m.chat)}\n*Command:* ${usedPrefix}${command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\``.trim(), data.jid, { mentions: [m.sender] })
                            }
                            m.reply(text)
                        }
                    } finally {
                        // m.reply(util.format(_user))
                        if (typeof plugin.after === 'function') {
                            try {
                                await plugin.after.call(this, m, extra)
                            } catch (e) {
                                console.error(e)
                            }
                        }
                        if (m.limit) m.reply(+ m.limit + ' Limit terpakai')
                   }
                    break
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
             //conn.sendPresenceUpdate('composing', m.chat) // kalo pengen auto vn hapus // di baris dekat conn
            //console.log(global.db.data.users[m.sender])
            let user, stats = global.db.data.stats
            if (m) {
                if (m.sender && (user = global.db.data.users[m.sender])) {
                    user.exp += m.exp
                    user.limit -= m.limit * 1
                }

                let stat
                if (m.plugin) {
                    let now = + new Date
                    if (m.plugin in stats) {
                        stat = stats[m.plugin]
                        if (!isNumber(stat.total)) stat.total = 1
                        if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
                        if (!isNumber(stat.last)) stat.last = now
                        if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
                    } else stat = stats[m.plugin] = {
                        total: 1,
                        success: m.error != null ? 0 : 1,
                        last: now,
                        lastSuccess: m.error != null ? 0 : now
                    }
                    stat.total += 1
                    stat.last = now
                    if (m.error == null) {
                        stat.success += 1
                        stat.lastSuccess = now
                    }
                }
            }

            try {
                 require('./lib/print')(m, this)
             } catch (e) {
                 console.log(m, m.quoted, e)
             }
            if (opts['autoread']) await this.readMessages([m.key])
        }
    },
   async participantsUpdate({ id, participants, action }) {
        if (opts['self']) return
        // if (id in conn.chats) return // First login will spam
        if (global.isInit) return
        let chat = db.data.chats[id] || {}
        let text = ''
        switch (action) {
        case 'add':
        case 'remove':
		case 'leave':
		case 'invite':
		case 'invite_v4':
                if (chat.welcome) {
                    let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
                    for (let user of participants) {
                        let pp = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9mFzSckd12spppS8gAJ2KB2ER-ccZd4pBbw&usqp=CAU'
                        try {
                             pp = await this.profilePictureUrl(user, 'image')
                        } catch (e) {
                        } finally {
                        text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc ? groupMetadata.desc.toString() : '') :
        (chat.sBye || this.bye || conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
                            this.sendMessage(id, {
                            text: text,
                            contextInfo: {
			    mentionedJid: [user],
                            externalAdReply: {  
                            title: action === 'add' ? 'Selamat Datang' : 'Selamat tinggal',
                            body: global.wm,
                            thumbnailUrl: pp,
                            sourceUrl: 'https://whatsapp.com/channel/0029VaXUJdL30LKYn5JdGX3S',
                            mediaType: 1,
                            renderLargerThumbnail: true 
                            }}}, { quoted: null})
                        }
                    }
                }
                break                        
            case 'promote':
                text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
            case 'demote':
                if (!text) text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
                text = text.replace('@user', '@' + participants[0].split('@')[0])
                if (chat.detect) this.sendMessage(id, text, {
                    contextInfo: {
                        mentionedJid: this.parseMention(text)
                    }
                })
                break
        }
    },
    async delete({ remoteJid, fromMe, id, participant }) {
        if (fromMe) return
        let chats = Object.entries(conn.chats).find(([user, data]) => data.messages && data.messages[id])
        if (!chats) return
        let msg = JSON.parse(chats[1].messages[id])
        let chat = global.db.data.chats[msg.key.remoteJid] || {}
        if (chat.delete) return
        await this.reply(msg.key.remoteJid, `
Terdeteksi @${participant.split`@`[0]} telah menghapus pesan
Untuk mematikan fitur ini, ketik
*.enable delete*
`.trim(), msg, {
            mentions: [participant]
        })
        this.copyNForward(msg.key.remoteJid, msg).catch(e => console.log(e, msg))
    }
}

global.dfail = (type, m, conn) => {
    let msg = {
        rowner: 'Perintah ini hanya dapat digunakan oleh _*OWWNER!1!1!*_',
        owner: 'Perintah ini hanya dapat digunakan oleh _*Owner Bot*_!',
        mods: 'Perintah ini hanya dapat digunakan oleh _*Moderator*_ !',
        premium: 'Perintah ini hanya untuk member _*Premium*_ !',
        group: 'Perintah ini hanya dapat digunakan di grup!',
        private: 'Perintah ini hanya dapat digunakan di Chat Pribadi!',
        admin: 'Perintah ini hanya untuk *Admin* grup!',
        botAdmin: 'Jadikan bot sebagai *Admin* untuk menggunakan perintah ini!',
        unreg: 'Silahkan daftar untuk menggunakan fitur ini dengan cara mengetik:\n\n*#daftar nama.umur*\n\nContoh: *#daftar Mansur.16*',
        restrict: 'Fitur ini di *disable*!'
    }[type]
    if (msg) return m.reply(msg)
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    delete require.cache[file]
    if (global.reloadHandler) console.log(global.reloadHandler())
})
