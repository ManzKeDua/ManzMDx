let now = new Date()
let tanggal = now.getDate()
let bulan = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12][now.getMonth()]
let tahun = now.getFullYear()

let handler = async (m, { conn, participants, usedPrefix }) => {
	const listUmur = [];
	for (const { id } of participants) {
		if (!(id in global.db.data.users)) global.db.data.users[id] = {};
		let user = global.db.data.users[id];
		let res = { id, name: await conn.getName(id) , umur: 0, nextUmur: 0 };
			
		if (user?.TTL && user.TTL.includes('-')) {
			let { tttt, bb, tt } = spliter(user.TTL);
			if (tttt == NaN && bb == NaN && tt == NaN) (
				res.umur = 0,
				res.nextUmur = 0
			);
			else {
				res.umur = (bulan >= bb && tanggal >= tt || bb < bulan) ? tahun - tttt : tahun - tttt - 1;
				res.nextUmur = bulan >= bb && tanggal >= tt ? `${tahun + 1}-${bb < 10 ? "0" + bb : bb}-${tt < 10 ? "0" + tt : tt}` : bb < bulan ? `${tahun + 1}-${bb < 10 ? "0" + bb : bb}-${tt < 10 ? "0" + tt : tt}` : `${tahun}-${bb < 10 ? "0" + bb : bb}-${tt < 10 ? "0" + tt : tt}`;
			}
		};
		listUmur.push(res);
	};
	if (listUmur.length < 1)
		throw `Belum ada user yg mendaftarkan tanggal lahir dibot ini.\nKetik *${usedPrefix}umur* - untuk mendaftar`;
		let captionss = `
*LIST UMUR:*

${listUmur.map(v => `
• Nama: ${v.name}
• Jid : @${v.id.split('@')[0]}
• Umur: ${v.umur != 0 ? v.umur : 'Belum terdaftar'}
• Ulang Tahun: ${v.nextUmur != 0 ? v.nextUmur : 'Belum terdaftar'}`.trim()).join('\n\n')}
`.trim()
	conn.reply(m.chat, captionss, m, { mentions: conn.parseMention(captionss) });
};
handler.command = handler.help = ["listumur"];
handler.tags = ["group"];
handler.group = true;

handler.limit = 1;
module.exports = handler;

function spliter(text) {
	if (!text.includes('-')) return {};
	text = text.split('-');
	let tttt = Number(text[0])
	let bb = Number(text[1])
	let tt = Number(text[2]);
	
	if (isNaN(tttt)) tttt = NaN;
	if (isNaN(bb)) bb = NaN;
	if (isNaN(tt)) tt = NaN;
	
	return {
		tttt,
		bb,
		tt
	};
};