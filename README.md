# FlameForge API

This is an unofficial Genshin Impact API that delivers comprehensive data on characters, weapons, and artifacts. Built with Node.js, Express, and MongoDB, this API provides developers with seamless access to essential Genshin Impact information. Explore character details, weapon stats, and artifact attributes, all within the framework of a robust and user-friendly API.

<!-- Table of Contents -->

## How to Install and Run the Project

- Clone this repository or download the zip [Extract the zip after downloading]
- Open terminal in the root folder
- run ```npm install```
- run ```npm run make```
- run ```npm run start```

# Get random character

    GET /api/character
    GET /api/character?infoSize=full

# Get single character by name
    
    GET /api/character?name=character-name
    GET /api/character?name=character-name&infoSize=full

# Get all characters

    GET /api/characters
    GET /api/characters?infoSize=full

## Get all characters by vision

    GET /api/characters?vision=specify-vision
    GET /api/characters?vision=specify-vision&infoSize=full

    [pyro, hydro, anemo, electro, dendro, cryo, geo]

## Get all characters by region

    GET /api/characters?region=specify-region
    GET /api/characters?region=specify-region&infoSize=full

    [mondstadt, liyue-harbor, inazuma-city, sumeru, fontaine]

## Get all characters by rarity

    GET /api/characters?rarity=5
    GET /api/characters?rarity=5&infoSize=full

    [4, 5]

## Get all characters by weapon type

    GET /api/characters?weapon=claymore
    GET /api/characters?weapon=claymore&infoSize=full

    [sword, claymore, polearm, bow, catalyst]
