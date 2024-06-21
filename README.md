# ${\color{red}Color}{\color{green}ful\color{blue}Bot}$
A simple discord.js bot that allows a user to run the command `/colorme #<hex color here>` to automatically give them a role with their desired hex color.
If the desired color already exists, the user simply removes their existing hex color role and adds the desired.
If the desired color does not exist, the role is created and if they have an existing hex color it is removed from their roles.
When switching colors if removing the role will leave the role with 0 users with it, the role is deleted.

To help organize the roles a server admin may make a role with 'color' in it and all created roles will be populated under it. This color role is case insentitive and ignore the Colorfulbot role. Some examples of acceptable roles for organizing include
color, COLOR, ======colors======, =color=, myColor etc. It won't accept colour, well because I am american. Unluckly.

## Setting up on your own server
### 1. Give birth to the bot
To set up the bot for your own server since I will not be hosting it any time soon go to [Discord Developers Portal](https://discord.com/developers/).
You will probably have to log into your own discord account then once you're logged in make a new application, give it a name, like Colorfulbot.
###
On the left click on 'Bot'
![image](https://github.com/SirKriSftw/ColorfulBot/assets/60492952/96c6c857-56f0-46bd-ab90-983f3454e8b9)
Press these checkboxes then scroll up till you see 'Token' press Reset Token and copy the long text it gives you and just save it somewhere for now. 
Optionally set the icon and banner for the bot (can use the ones stored in the assets folder)
###
Now on the side again go to 'OAuth2' scroll down and select these check boxes for each section (the 2nd one only appears when you press bot)
![image](https://github.com/SirKriSftw/ColorfulBot/assets/60492952/354a8e44-5286-47ef-8b37-75481bed1fad)
![image](https://github.com/SirKriSftw/ColorfulBot/assets/60492952/7da84b8d-47bf-4d34-b422-7eb9a3816a18)
Then at the bottom of this you should see a GeneratedURL, copy is and paste it into the discord server you want the bot in. Click the link and invite the bot.

### 2. Give it brains
Download this repo, ensure you have [nodejs]([nodejs](https://nodejs.org/en/download/package-manager)) installed.
Add a file named ".env" into the main file and inside put `DISCORD_TOKEN = "<Bot token>"`, this token is what I told you to save earlier, if you lost it just go back to the bot page and press reset token.
In the same folder add a "config.json" file, you can leave it blank. Or set a testServer (the server you want to test stuff on), the clientId (the bot's id) and devs (your id). But this is only if you want to add/change the bot and do some testing

### 3. Make it run
Once files are setup and nodejs is installed just run 'node src/index.js' and it should run. Test it on your server by running the /help command.
To be clear the bot ONLY works while the program is running. So if you want it running ALL the time you will need to host it yourself.
Enjoy :D

## What it looks like
![image](https://github.com/SirKriSftw/ColorfulBot/assets/60492952/8ddd6f53-2d45-4201-b7f0-40eca7bcec3d)
![image](https://github.com/SirKriSftw/ColorfulBot/assets/60492952/080b713b-eaa8-40a5-9655-13fa018538f7)
![image](https://github.com/SirKriSftw/ColorfulBot/assets/60492952/426d00c4-4ff3-4bd7-9267-580e835a87a5)

![image](https://github.com/SirKriSftw/ColorfulBot/assets/60492952/925c1f34-4729-4946-aba2-72689ff90c54)
![image](https://github.com/SirKriSftw/ColorfulBot/assets/60492952/d5fa9139-9afc-4ef0-9bc3-7d98ff524f99)
![image](https://github.com/SirKriSftw/ColorfulBot/assets/60492952/2286d14c-0108-4dc2-a4c2-a1d62d5ac31d)





