# ${\color{red}Color}{\color{green}ful\color{blue}Bot}$
A simple discord.js bot that allows a user to run the commands `/colorme <color>` and `/roleme <role>`.
To quickly setup the bot just run `/setup <setup name> <permissions>`
- `/setup <setup name> <permissions>` 
  - The setup name argument can either be colors or roles, this determines which roles to setup.
  - The permissions argument is optional but if set to true setups the permission roles so only certain users can assign hex colors and roles.
- `/colorme <color>`
  - The color argument can be a hex value or an existing color role in the server's color list.
- `/roleme <role>`
  - The role argument is the name of the role to assign to the user that is in the server's role list.

The color/role list are roles that are inbetween the roles 'color'/'color end' and 'role'/'role end' respectively, this is what the setup command does for you. And looks like this:
<p align = "center">
  <img src = "https://github.com/SirKriSftw/ColorfulBot/assets/60492952/a14da9ca-915c-438b-b350-b53db60e7400">
</p>

- To be able to use /colorme with a hex color one of two conditions must be met:
  - There is no `hexable` role on the server
  - There is a `hexable` role and the user running the command has it
- To be able to use /roleme one of two conditions must be met:
  - There is no `role-able` role on the server
  - There is a `role-able` role and the user running the command has it



## Setting up on your own server
### 1. Give birth to the bot
To set up the bot for your own server go to [Discord Developers Portal](https://discord.com/developers/).
You will have to log into your own discord account then once you're logged in make a new application, give it a name, like Colorfulbot.
###
On the left click on 'Bot'
Scroll up till you see 'Token' press Reset Token and copy the long text it gives you and just save it somewhere for now. 
Optionally set the icon and banner for the bot (can use the ones stored in the assets folder)
###
Now on the side again go to 'OAuth2' scroll down and select these check boxes for each section (the second one only appears when you press bot)
<p align = "center">
  <img src = "https://github.com/SirKriSftw/ColorfulBot/assets/60492952/354a8e44-5286-47ef-8b37-75481bed1fad">
</p>
<p align = "center">
  <img src = "https://github.com/SirKriSftw/ColorfulBot/assets/60492952/7da84b8d-47bf-4d34-b422-7eb9a3816a18">
</p>
Then at the bottom of this you should see a GeneratedURL, copy it and paste it into the discord server you want the bot in. Click the link and invite the bot.

### 2. Give it brains
Download this repo, ensure you have [nodejs]([nodejs](https://nodejs.org/en/download/package-manager)) installed.
Add a file named `.env` into the main file and inside put `DISCORD_TOKEN = "<Bot token>"`, this token is what I told you to save earlier, if you lost it just go back to the bot page and press reset token.
In the same folder add a `config.json` file, you can leave it blank. Or set a testServer (the server you want to test stuff on), the clientId (the bot's id) and devs (your id). But this is only if you want to add/change the bot and do some testing of your own.

### 3. Make it run
Once files are setup and nodejs is installed just run `node src/index.js` and it should run. Test it on your server by running the `/help` command.
To be clear the bot ONLY works while the program is running. So if you want it running ALL the time you will need to host it yourself.
Enjoy :D

## What it looks like
<p align = "center">
  <img src = "https://github.com/SirKriSftw/ColorfulBot/assets/60492952/abbadaf1-dab2-4a82-9e45-2b5497a3ab49">
</p>
<p align = "center">
  <img src = "https://github.com/SirKriSftw/ColorfulBot/assets/60492952/1b5754df-d9cb-4c30-a94e-2cfa4e143860">
  <img src = "https://github.com/SirKriSftw/ColorfulBot/assets/60492952/cafeb8b9-777b-4230-9597-4f3e5540a52e">
</p>
<p align = "center">
  <img src = "https://github.com/SirKriSftw/ColorfulBot/assets/60492952/36496721-74eb-40fb-b955-0de20cce70f0">
  <img src = "https://github.com/SirKriSftw/ColorfulBot/assets/60492952/b3fe8e81-01c1-4fc6-bfb6-24bac91b9520">
  <img src = "https://github.com/SirKriSftw/ColorfulBot/assets/60492952/c4445b24-bf3e-49a2-892d-9f642ca1b8a0">
</p>
<p align = "center">
  <img src = "https://github.com/SirKriSftw/ColorfulBot/assets/60492952/420bf1cc-8abf-4e41-8fee-2ce247868e10">
</p>
<p align = "center">
  <img src = "https://github.com/SirKriSftw/ColorfulBot/assets/60492952/f614a6f7-b15d-4a4a-9237-5b496e7df051">
</p>
<p align = "center">
  <img src = "https://github.com/SirKriSftw/ColorfulBot/assets/60492952/202446c9-9aa1-4a9f-8d08-547a6e4a35d2">
</p>
<p align = "center">
  <img src = "https://github.com/SirKriSftw/ColorfulBot/assets/60492952/18421f48-abd0-473e-8afb-e4c239a12e79">
</p>






