# blizz_token_tracker
A Node.js project to pull Blizzard WoW token data to a database and display a graph of price changes on the front-end.

This project was created to track and store the Blizzard token prices over time and analyze the changes. The project requires the following:
- a mysql database
- ~~an account with mashed to access the Blizzard API~~
- the access tokens needed to use the API accessed through the developer site -> ~~https://dev.battle.net~~ https://develop.battle.net*

Will be adding the stored procedures and tables to the code section in a future update. Live example to come soon.

*Blizzard has overhauled their API and developer site, all that is needed is an accound with Blizzard. I ended up signing in and creating a new app on my regualr blizzard/battle.net login. Old dev profiles should still exist, just at the new url, but check the email from Blizzard to be sure.
