const Discord = require("discord.js");
const Webhook = new Discord.WebhookClient(process.env.WEBHOOK_PAYMENTS_ID, process.env.WEBHOOK_PAYMENTS_TOKEN);

module.exports = {
	bronze: async (user, data) => {
		const embedDonate = new Discord.MessageEmbed()
        	.setColor("#008000")
        	.setAuthor("Nova Compra Feita!", "https://cdn.discordapp.com/avatars/719557072429252618/e8b67685bc1a2686a7de6873d5861b5e.png?size=2048")
        	.setDescription(`O usuário <@${user.id}> realizou uma compra de Money! <a:PeriquitoDad:799477527033806858>` +
            	`\n\nComprou o pacote de **Money** de **${data.currency} ${data.total}**, e ganhou \`$100.000\` de Money! <a:PeriquitoMoney:799477528350949427>` +
            	`\n\nGostaram da atitude dele? Reaja no **(<:PeriquitoStar:799477541865652244>)**.`)
        	.setFooter(`• Doador: ${user.username}#${user.discriminator}`, `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`)
        	.setTimestamp();

        Webhook.send(`<@${user.id}>`, {
            embeds: [embedDonate]
        });
    }
}