A user-matching, event-scheduling, and chumming Discord bot built for the UC Berkeley Ascend Discord server.


## Intro

ChumBot is a Discord bot designed for the UC Berkeley Ascend Discord server, implemented using Discord.js. The bot facilitates chumming by matching users into pairs/groups based on similar interests, and scheduling meeting times based on aligned availability.

The bot is deployed with AWS onto an EC2 instance.


## Contents

* /events - event files
* /public - static directories such as /images
* README.md - this file
* index.js - central app file with event readers
* package.json, package-lock.json - package info
* config.json - config file


## Features 
- Welcomes user
- Responds to greetings
- Kicks user
- Adds users to voice channel based on common interests
- Plays music in voice channels (in progress)
- Creates Google Calendar events (in progress)


## Install

**To add this bot to a server:**
1. Follow directions in link: https://discord.com/oauth2/authorize?client_id=773485474944778271&scope=bot
