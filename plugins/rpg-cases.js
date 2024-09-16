let handler = async (m, { args, text, conn, usedPrefix, command }) => {
	if (!text)
		return conn.sendMessage(m.chat, {
		text: `Available cases:
		
1. Revolution Case
2. -
3. -

_"How i can spin these cases?"_ we will release it soon as possible.`,
		contextInfo: {
			externalAdReply: {
				showAdAttribution: true,
				title: 'DCODEKEMII',
				body: 'Version: 3.0.0',
				thumbnailUrl: 'https://telegra.ph/file/a0371b91b27062b283df8.jpg',
				mediaType: 1,
				renderLargerThumbnail: true
			}
		}
	}, { quoted: m })

	if (args[0]?.toLowerCase() === "1") {
		if (!args[1]) {
			return conn.sendMessage(m.chat, {
				text: `Revolution Case
		
Rewards would gives you:
1. AK-47 | Head Shot
2. M4A4 | Temukau
3. P2000 | Wicked Sick
4. AWP | Duality
5. UMP-45 | Wild Child
6. R8 Revolver | Banana Cannon
7. P90 | Neoqueen
8. M4A1-S | Emphorosaur-S
9. Glock-18 | Umbral Rabbit
10. MAC-10 | Sakkaku
11. MP5-SD | Liquidation
12. MAG-7 | Insomnia
13. Tec-9 | Rebel
14. SG 553 | Cyberforce
15. SCAR-20 | Fragments
16. P250 | Re.built
17. MP9 | Featherweight

Want to see about the skin? type this as example > */case 1 1*`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "Revolution Case",
						thumbnailUrl: 'https://telegra.ph/file/b9a47736c11971daf4c9f.jpg',
						mediaType: 1,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "1") {
			return conn.sendMessage(m.chat, {
				text: `*# About AK-47 | Head Shot*

*∘ Rarity:* Covert (Ancient) (Red)
∘ *Description:* It has been custom painted with a "HEAD SHOT GUN" graffiti and finished with pearlescent coating.
∘ *Flavor Text:* _*Everyone has goals, but are you willing to put in the work to achieve them? - Booth, Arms Dealer*_
∘ *Finish Style:* Custom Paint Job 
∘ *Finish Catalog:* 1221
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "AK-47 | Head Shot",				
						thumbnailUrl: 'https://telegra.ph/file/1b0f990c93c68c60358bc.jpg',
						mediaType: 1,						
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "2") {
			return conn.sendMessage(m.chat, {
				text: `*# About M4A4 | Temukau*

*∘ Rarity:* Covert (Ancient) (Red)
∘ *Description:* A custom paint job in the style of Japanese animation has been applied and depicts a female CT agent fighting against a T-side rush.
∘ *Flavor Text:* _*"Stand your ground!"*_
∘ *Finish Style:* Custom Paint Job 
∘ *Finish Catalog:* 1228
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "M4A4 | Temukau",						
						thumbnailUrl: 'https://telegra.ph/file/7c453cd1cdb5a199e90d3.jpg',
						mediaType: 1,						
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "3") {
			return conn.sendMessage(m.chat, {
				text: `*# About P2000 | Wicked Sick*

*∘ Rarity:* Classified (Legendary) (Pinkish purple)
∘ *Description:* This custom paint job features neon-colored designs meant to grab (and keep) your attention.
∘ *Flavor Text:* _*Can I have your attention please?*_
∘ *Finish Style:* Custom Paint Job 
∘ *Finish Catalog:* 1224
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "P2000 | Wicked Sick",						
						thumbnailUrl: 'https://telegra.ph/file/4e57a5ec0142ae6766872.jpg',
						mediaType: 1,						
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "4") {
			return conn.sendMessage(m.chat, {
				text: `*# About AWP | Duality*

*∘ Rarity:* Classified (Legendary) (Pinkish purple)
∘ *Description:* It has been custom painted with a snake on either side. One snake is red and the other is gold.
∘ *Flavor Text:* _*There's two sides to every story*_
∘ *Finish Style:* Gunsmith
∘ *Finish Catalog:* 1222
∘ *Added:* 16 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "AWP | Duality",
						thumbnailUrl: 'https://telegra.ph/file/43130682f5fc7a4ea0a85.jpg',
						mediaType: 1,

						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "5") {
			return conn.sendMessage(m.chat, {
				text: `*# About UMP-45 | Wild Child*

*∘ Rarity:* Classified (Legendary) (Pinkish purple)
∘ *Description:* Beneath sketches of bullets, a crown, and other designs, bands of neon color are the base of this custom painted UMP-45.
∘ *Flavor Text:* _*The concept is simple, it's the execution that's difficult*_
∘ *Finish Style:* Custom Paint Job 
∘ *Finish Catalog:* 1236
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "UMP-45 | Wild Child",

						thumbnailUrl: 'https://telegra.ph/file/5c1b4b3d2b22778c792a1.jpg',
						mediaType: 1,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "6") {
			return conn.sendMessage(m.chat, {
				text: `*# About R8 Revolver | Banana Cannon*

*∘ Rarity:* Restricted (Mythical) (Purple)
∘ *Description:* It has been custom painted to resemble a very ripe banana.
∘ *Flavor Text:* _*Catch them slipping*_
∘ *Finish Style:* Gunsmith
∘ *Finish Catalog:* 1232
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "R8 Revolver | Banana Cannon",
						thumbnailUrl: 'https://telegra.ph/file/532aeaae619a744747bb4.jpg',
						mediaType: 1,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "7") {
			return conn.sendMessage(m.chat, {
				text: `*# About P90 | Neoqueen*

*∘ Rarity:* Restricted (Mythical) (Purple)
∘ *Description:* It has been custom painted using a mix of military and sci-fi styles.
∘ *Flavor Text:* _*Custom crafted for all your rushing needs*_
∘ *Finish Style:* Gunsmith
∘ *Finish Catalog:* 1233
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "P90 | Neoqueen",
						thumbnailUrl: 'https://telegra.ph/file/b1197fbfa6bae66ca6ce7.jpg',
						mediaType: 1,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "8") {
			return conn.sendMessage(m.chat, {
				text: `*# About M4A1-S | Emphorosaur-S*

*∘ Rarity:* Restricted (Mythical) (Purple)
∘ *Description:* It has been custom painted to look like a dinosaur is clawing through the side of the weapon.
∘ *Flavor Text:* _*Feeding frenzy*_
∘ *Finish Style:* Custom Paint Job
∘ *Finish Catalog:* 1223
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "M4A1-S | Emphorosaur-S",
						thumbnailUrl: 'https://telegra.ph/file/6a265960c1794291103df.jpg',
						mediaType: 1,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "9") {
			return conn.sendMessage(m.chat, {
				text: `*# About Glock-18 | Umbral Rabbit*

*∘ Rarity:* Restricted (Mythical) (Purple)
∘ *Description:* It has been custom painted with a dreamlike scene of a mystical rabbit hopping before a full moon.
∘ *Flavor Text:* _*Take a leap of faith*_
∘ *Finish Style:* Custom Paint Job
∘ *Finish Catalog:* 1227
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "Glock-18 | Umbral Rabbit",
						thumbnailUrl: 'https://telegra.ph/file/719fbcb56dbf879c403ea.jpg',
						mediaType: 1,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "10") {
			return conn.sendMessage(m.chat, {
				text: `*# About MAC-10 | Sakkaku*

*∘ Rarity:* Restricted (Mythical) (Purple)
∘ *Description:* In specific lighting the eyes on this custom painted MAC-10 glow red.
∘ *Flavor Text:* _*Make your perception their reality*_
∘ *Finish Style:* Custom Paint Job
∘ *Finish Catalog:* 1229
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "MAC-10 | Sakkaku",
						thumbnailUrl: 'https://telegra.ph/file/924b0b35dd8dedd72225d.jpg',
						mediaType: 1,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "11") {
			return conn.sendMessage(m.chat, {
				text: `*# About MP5-SD | Liquidation*

*∘ Rarity:* Mil-Spec (Rare) (Dark Blue)
∘ *Description:* Its dark base and carefully selected red and blue highlights make this custom painted MP5-SD appear as if it's glowing under ambient light.
∘ *Flavor Text:* _*Quiet reflection*_
∘ *Finish Style:* Custom Paint Job
∘ *Finish Catalog:* 1231
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "MP5-SD | Liquidation",
						thumbnailUrl: 'https://telegra.ph/file/614115da7bbbf316e4bfd.jpg',
						mediaType: 1,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "12") {
			return conn.sendMessage(m.chat, {
				text: `*# About MAG-7 | Insomnia*

*∘ Rarity:* Mil-Spec (Rare) (Dark Blue)
∘ *Description:* It has been custom painted with a design depicting fish swimming into a person's mouth using an orange and black color palette.
∘ *Flavor Text:* _*Gulp, gulp, gulp*_
∘ *Finish Style:* Custom Paint Job
∘ *Finish Catalog:* 1220
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "MAG-7 | Insomnia",
						thumbnailUrl: 'https://telegra.ph/file/a8a78644c020af8b7658c.jpg',
						mediaType: 1,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "13") {
			return conn.sendMessage(m.chat, {
				text: `*# About Tec-9 | Rebel*

*∘ Rarity:* Mil-Spec (Rare) (Dark Blue)
∘ *Description:* This custom painted TEC-9 is covered in loosely affiliated designs using a muted color palette.
∘ *Flavor Text:* _*One shot, one kill, one round at a time*_
∘ *Finish Style:* Custom Paint Job
∘ *Finish Catalog:* 1235
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "Tec-9 | Rebel",
						thumbnailUrl: 'https://telegra.ph/file/e5dba5539b46f5953ae79.jpg',
						mediaType: 1,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "14") {
			return conn.sendMessage(m.chat, {
				text: `*# About SG 553 | Cyberforce*

*∘ Rarity:* Mil-Spec (Rare) (Dark Blue)
∘ *Description:* The CYBERFORCE INC logo has been custom painted over a red and black base.
∘ *Flavor Text:* _*"CYBERFORCE INC: We secure your future so you don't have to!"*_
∘ *Finish Style:* Custom Paint Job
∘ *Finish Catalog:* 1234
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "SG 553 | Cyberforce",
						thumbnailUrl: 'https://telegra.ph/file/86863b12d59749e78fdf8.jpg',
						mediaType: 1,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "15") {
			return conn.sendMessage(m.chat, {
				text: `*# About SCAR-20 | Fragments*

*∘ Rarity:* Mil-Spec (Rare) (Dark Blue)
∘ *Description:* The gunmetal-colored custom paint job creates the illusion that the weapon's geometry has changed.
∘ *Flavor Text:* _*Fragment of your imagination*_
∘ *Finish Style:* Gunsmith
∘ *Finish Catalog:* 1226
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "SCAR-20 | Fragments",
						thumbnailUrl: 'https://telegra.ph/file/68b9f34cd33b3ffa141f1.jpg',
						mediaType: 1,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "16") {
			return conn.sendMessage(m.chat, {
				text: `*# About P250 | Re.built*

*∘ Rarity:* Mil-Spec (Rare) (Dark Blue)
∘ *Description:* Interlocking triangles and other clean, minimal designs have been custom painted on this P250.
∘ *Flavor Text:* _*Ninth time's the charm*_
∘ *Finish Style:* Custom Paint Job
∘ *Finish Catalog:* 1230
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "P250 | Re.built",
						thumbnailUrl: 'https://telegra.ph/file/8d582e12e923f7ab71ae8.jpg',
						mediaType: 1,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		} else if (args[1]?.toLowerCase() === "17") {
			return conn.sendMessage(m.chat, {
				text: `*# About MP9 | Featherweight*
				
*∘ Rarity:* Mil-Spec (Rare) (Dark Blue)
∘ *Description:* It has been custom painted in black and white to appear porous, which saves weight for the weapon holder.
∘ *Flavor Text:* _*A good marksman doesn't blame their tools*_
∘ *Finish Style:* Custom Paint Job
∘ *Finish Catalog:* 1225
∘ *Added:* 10 February 2023
∘ *Creator:* Workshop Submission
∘ *Update:* Case, Capsule, Kit, Oh My!`,
				contextInfo: {
					externalAdReply: {
						showAdAttribution: true,
						title: "MP9 | Featherweight",
						thumbnailUrl: 'https://telegra.ph/file/5b62820833219b38ed1dc.jpg',
						mediaType: 1,
						renderLargerThumbnail: true
					}
				}
			}, { quoted: m })
		}
	}
};
handler.help = ["cases"];
handler.tags = ["rpg"];
handler.command = /^(cases)$/i;

module.exports = handler