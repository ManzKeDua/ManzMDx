let handler = async (m, {
	command,
	usedPrefix,
	DevMode,
	args
}) => {
	let type = (args[0] || '').toLowerCase()
    let msk = (args[0] || '').toLowerCase()
    let user = global.db.data.users[m.sender]
    let author = global.author
let cok = `乂 *C O O K I N G*

• The following is a list of dishes that you can *Cook* :
🧆 • _Rawon_
🥘 • _Semur_
🍛 • _Nasi Uduk_
🍲 • _Soto_
🍗 • _Ayam Goreng_
🍢 • _Sate_
🍖 • _Babi Guling_
🍝 • _Mie Ayam_
🐟 • _Ikan Bakar_
🥡 • _Ayam Gulai_
🍤 • _Pempek_`
try {
       if (/masak|cook/i.test(command)) {
    const count = args[1] && args[1].length > 0 ? Math.min(5, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count);
    switch (type) {
        case 'rawon':
            if (user.sapi < count * 2 || user.coal < count || user.jahe < count * 3 || user.garam < count * 2 || user.gula < count * 2 || user.cabai < count * 3) {
                conn.reply(m.chat, `Anda tidak memiliki bahan untuk memasak Rawon\nAnda butuh 2 Sapi, 3 Jahe, 2 Garam, 2 Gula, 3 Cabai, dan 1 Coal untuk setiap masakan`, m);
            } else {
                user.sapi -= count * 2;
                user.jahe -= count * 3;
                user.garam -= count * 2;
                user.gula -= count * 2;
                user.cabai -= count * 3;
                user.coal -= count;
                user.rawon += count;
                conn.reply(m.chat, `Sukses memasak ${count} Rawon`, m);
            }
            break;
        case 'semur':
            if (user.ayam < count * 2 || user.coal < count || user.jahe < count * 2 || user.kemiri < count * 3 || user.asam < count * 3 || user.kecap < count) {
                conn.reply(m.chat, `Anda tidak memiliki bahan untuk memasak Semur\nAnda butuh 2 Ayam, 2 Jahe, 3 Kemiri, 3 Asam, 1 Kecap, dan 1 Coal untuk setiap masakan`, m);
            } else {
                user.ayam -= count * 2;
                user.jahe -= count * 2;
                user.kemiri -= count * 3;
                user.asam -= count * 3;
                user.kecap -= count;
                user.coal -= count;
                user.semur += count;
                conn.reply(m.chat, `Sukses memasak ${count} Semur`, m);
            }
            break;
        case 'nasiuduk':
            if (user.ayam < count * 2 || user.coal < count || user.kunyit < count * 2 || user.garam < count * 3 || user.bawang < count * 2) {
                conn.reply(m.chat, `Anda tidak memiliki bahan untuk memasak Nasi Uduk\nAnda butuh 2 Ayam, 2 Kunyit, 2 Bawang, 3 Garam, dan 1 Coal untuk setiap masakan`, m);
            } else {
                user.ayam -= count * 2;
                user.coal -= count;
                user.kunyit -= count * 2;
                user.garam -= count * 3;
                user.bawang -= count * 2;
                user.nasiuduk += count;
                conn.reply(m.chat, `Sukses memasak ${count} Nasi Uduk`, m);
            }
            break;
        case 'soto':
            if (user.kambing < count * 2 || user.coal < count || user.asam < count * 2 || user.kecap < count || user.terasi < count * 2) {
                conn.reply(m.chat, `Anda tidak memiliki bahan untuk memasak Soto\nAnda butuh 2 Kambing, 2 Asam, 1 Kecap, 2 Terasi, dan 1 Coal untuk setiap masakan`, m);
            } else {
                user.kambing -= count * 2;
                user.coal -= count;
                user.asam -= count * 2;
                user.kecap -= count;
                user.terasi -= count * 2;
                user.soto += count;
                conn.reply(m.chat, `Sukses memasak ${count} Soto`, m);
            }
            break;
        case 'ayamgoreng':
            if (user.ayam < count * 2 || user.coal < count) {
                conn.reply(m.chat, `Anda tidak memiliki bahan untuk memasak Ayam Goreng\nAnda butuh 2 Ayam dan 1 Coal untuk setiap masakan`, m);
            } else {
                user.ayam -= count * 2;
                user.coal -= count;
                user.ayamgoreng += count;
                conn.reply(m.chat, `Sukses memasak ${count} Ayam Goreng`, m);
            }
            break;
        case 'sate':
            if (user.kambing < count * 2 || user.coal < count || user.cabai < count * 2 || user.bawang < count * 3 || user.kecap < count) {
                conn.reply(m.chat, `Anda tidak memiliki bahan untuk memasak Sate\nAnda butuh 2 Kambing, 2 Cabai, 3 Bawang, 1 Kecap, dan 1 Coal untuk setiap masakan`, m);
            } else {
                user.kambing -= count * 2;
                user.cabai -= count * 2;
                user.bawang -= count * 3;
                user.kecap -= count;
                user.coal -= count;
                user.sate += count;
                conn.reply(m.chat, `Sukses memasak ${count} Sate`, m);
            }
            break;
        case 'babiguling':
            if (user.babi < count * 2 || user.coal < count || user.cabai < count * 3 || user.kecap < count) {
                conn.reply(m.chat, `Anda tidak memiliki bahan untuk memasak Babi Guling\nAnda butuh 2 Babi, 3 Cabai, 1 Kecap, dan 1 Coal untuk setiap masakan`, m);
            } else {
                user.babi -= count * 2;
                user.cabai -= count * 3;
                user.kecap -= count;
                user.coal -= count;
                user.babiguling += count;
                conn.reply(m.chat, `Sukses memasak ${count} Babi Guling`, m);
            }
            break;
        case 'mieayam':
            if (user.ayam < count * 2 || user.coal < count || user.asam < count * 2 || user.bawang < count * 3) {
                conn.reply(m.chat, `Anda tidak memiliki bahan untuk memasak Mie Ayam\nAnda butuh 2 Ayam, 2 Asam, 3 Bawang, dan 1 Coal untuk setiap masakan`, m);
            } else {
                user.ayam -= count * 2;
                user.asam -= count * 2;
                user.bawang -= count * 3;
                user.coal -= count;
                user.mieayam += count;
                conn.reply(m.chat, `Sukses memasak ${count} Mie Ayam`, m);
            }
            break;
        case 'ikanbakar':
            if (user.lele < count * 2 || user.coal < count) {
                conn.reply(m.chat, `Anda tidak memiliki bahan untuk memasak Ikan Bakar\nAnda butuh 2 Lele dan 1 Coal untuk setiap masakan`, m);
            } else {
                user.lele -= count * 2;
                user.coal -= count;
                user.ikanbakar += count;
                conn.reply(m.chat, `Sukses memasak ${count} Ikan Bakar`, m);
            }
            break;
        case 'ayamgulai':
            if (user.ayam < count * 2 || user.coal < count || user.gula < count * 2 || user.terasi < count * 3) {
                conn.reply(m.chat, `Anda tidak memiliki bahan untuk memasak Ayam Gulai\nAnda butuh 2 Ayam, 2 Gula, 3 Terasi, dan 1 Coal untuk setiap masakan`, m);
            } else {
                user.ayam -= count * 2;
                user.gula -= count * 2;
                user.terasi -= count * 3;
                user.coal -= count;
                user.ayamgulai += count;
                conn.reply(m.chat, `Sukses memasak ${count} Ayam Gulai`, m);
            }
            break;
        case 'pempek':
            if (user.bawal < count * 2 || user.coal < count || user.kemiri < count * 3 || user.asam < count) {
                conn.reply(m.chat, `Anda tidak memiliki bahan untuk memasak Pempek\nAnda butuh 2 Bawal, 3 Kemiri, 1 Asam, dan 1 Coal untuk setiap masakan`, m);
            } else {
                user.bawal -= count * 2;
                user.kemiri -= count * 3;
                user.asam -= count;
                user.coal -= count;
                user.pempek += count;
                conn.reply(m.chat, `Sukses memasak ${count} Pempek`, m);
            }
            break					
                default:
                await conn.reply(m.chat, cok, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'Your cooking',
                    thumbnailUrl: 'https://telegra.ph/file/84de30b46b1091419e014.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        });
            }
        }
    } catch (e) {
        conn.reply(m.chat, `Sepertinya ada yg eror,coba laporin ke owner deh`, m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.reply(jid, 'shop.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}

handler.help = ['masak <masakan> <args>', 'cook <masakan> <args>']
handler.tags = ['rpg']
handler.group = true
handler.command = /^(masak|cook)$/i

module.exports = handler