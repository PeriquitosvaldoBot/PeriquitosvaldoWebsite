const guildsUser = await (await fetch(`https://discord.com/api/guilds/${guildID}/members/${user.id}`, {
    headers: {
        "content-type": "application/json",
        authorization: `Bot ${process.env.TOKEN_BOT}`,
    },
})).json();

let guilds = [];

const guildsUser = await (await fetch("https://discord.com/api/users/@me/guilds", {
	headers: {
    	authorization: `Bearer ${request.session.bearer_token}`,
	},
})).json();

guildsUser.forEach((guild) => {
	const perm = new Permissions(guild.permissions);
	if (perm.has("MANAGE_GUILD")) {
		guilds.push(guild);
	};
});

console.log(guilds);