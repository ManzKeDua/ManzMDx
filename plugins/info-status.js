let { MessageType } = require('@adiwajshing/baileys');
let { performance } = require('perf_hooks');
let osu = require('node-os-utils');

let handler = async (m, { conn, usedPrefix, DevMode }) => {
    try {
        let NotDetect = 'Not Detect';
        let old = performance.now();
        let cpu = osu.cpu;
        let cpuCore = cpu.count();
        let drive = osu.drive;
        let mem = osu.mem;
        let netstat = osu.netstat;
        let OS = osu.os.platform();
        let cpuModel = cpu.model();
        let cpuPer;

        let p1 = cpu.usage().then(cpuPercentage => {
            cpuPer = cpuPercentage;
        }).catch(() => {
            cpuPer = NotDetect;
        });

        let driveTotal, driveUsed, drivePer;
        let p2 = drive.info().then(info => {
            driveTotal = (info.totalGb + ' GB'),
            driveUsed = info.usedGb,
            drivePer = (info.usedPercentage + '%')
        }).catch(() => {
            driveTotal = NotDetect,
            driveUsed = NotDetect,
            drivePer = NotDetect;
        });

        let ramTotal, ramUsed;
        let p3 = mem.info().then(info => {
            ramTotal = info.totalMemMb,
            ramUsed = info.usedMemMb;
        }).catch(() => {
            ramTotal = NotDetect,
            ramUsed = NotDetect;
        });

        let netsIn, netsOut;
        let p4 = netstat.inOut().then(info => {
            netsIn = (info.total.inputMb + ' MB'),
            netsOut = (info.total.outputMb + ' MB');
        }).catch(() => {
            netsIn = NotDetect,
            netsOut = NotDetect;
        });

        await Promise.all([p1, p2, p3, p4]);
        await m.reply('Tunggu Sebentar...');
        let _ramTotal = (ramTotal + ' MB');
        let neww = performance.now();

        let serverMessage = `
  • *S T A T U S*

┌  ◦ OS: *${OS}*
│  ◦ CPU Model: *${cpuModel}*
│  ◦ CPU Core: *${cpuCore} Core*
│  ◦ CPU: *${cpuPer}%*
│  ◦ Ram: *${ramUsed} / ${_ramTotal}(${/[0-9.+/]/g.test(ramUsed) && /[0-9.+/]/g.test(ramTotal) ? Math.round(100 * (ramUsed / ramTotal)) + '%' : NotDetect})*
│  ◦ Drive: *${driveUsed} / ${driveTotal} (${drivePer})*
│  ◦ Ping: *${Math.round(neww - old)} ms*
│  ◦ Internet IN: *${netsIn}*
└  ◦ Internet OUT: *${netsOut}*
`.trim();

        // Create the fake reply with contextInfo
        await conn.sendMessage(m.chat, {
            text: serverMessage,
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'Yogiri',
                    thumbnailUrl: 'https://telegra.ph/file/30cfc2bd4544ae56710f1.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                },
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288101737637@newsletter',
                    newsletterName: 'Powered By ManzUwuw'
                }
            }
        }, {
            quoted: {
                key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
                message: {
                    conversation: getWIBTime()
                }
            }
        });

        console.log(OS);
    } catch (e) {
        console.log(e);
        m.reply('Error!!');
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'Status.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text);
            }
        }
    }
};

handler.help = ['', 'bot'].map(v => 'status' + v);
handler.tags = ['tools'];
handler.command = /^(status)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;

handler.admin = false;
handler.botAdmin = false;

handler.fail = null;

module.exports = handler;

function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor(ms / 60000) % 60;
    let s = Math.floor(ms / 1000) % 60;
    console.log({ ms, h, m, s });
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

function getWIBTime() {
    const offset = 7; // WIB is UTC+7
    let date = new Date();
    let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    let wibDate = new Date(utc + (3600000 * offset));
    let hours = wibDate.getHours();
    let minutes = wibDate.getMinutes();
    let seconds = wibDate.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let strTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') + ampm;
    return strTime;
}