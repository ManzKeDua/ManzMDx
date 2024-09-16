const canvacord = require('canvacord');
const { color } = require('../lib/color');
const levelling = require('../lib/levelling');
const fetch = require("node-fetch");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let user = global.db.data.users[m.sender];
    let { min, xp, max } = levelling.xpRange(user.level, global.multiplier);
    let ppUrl = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/0a70ee52eb457fbcc2b92.jpg");
    let pp = await (await fetch(ppUrl)).buffer();

    let exp = user.exp;
    let role = user.role;
    let curr = user.exp - min;
    let minxp = max - user.exp;
    let chating = `*Hi ${user.name}* This your Progress!
Levels:  [ *${user.level}* ]
Roles:  [ *${user.role}* ]

Use *.profile* to check full information`.trim();

    const rank = new canvacord.Rank()
        .setAvatar(pp)
        .setCurrentXP(curr)
        .setLevel(user.level, "RANK", true)
        .setRank(user.level, "LEVEL", true)
        .setLevelColor("#F3EEEA", "#2B2E35")
        .setRankColor("#FFFFFF", "#776B5D")
        .setRequiredXP(xp)
        .setStatus("streaming")
        .setProgressBar("#6636E5", "COLOR")
        .setProgressBarTrack("#FFFFFF")
        .setUsername(user.name)
        .setDiscriminator(`#0001`)
        .setFontSize(1.5);

    rank.build()
        .then(data => {
            conn.sendFile(m.chat, data, "RankCad.png", chating, m);
        });
};

handler.help = ["ceklevel", "infolevel"];
handler.tags = ["info"];
handler.command = ["ceklevel", "infolevel"];
module.exports = handler;