const axios = require("axios")
const express = require("express")
const cheerio = require("cheerio")
const app = express()
const port = 3000

async function borsa() {
let bitcoin;
let eth;
let doge;
let bitcointr;
let ethtr;
let dogetr;

let response = await axios.get("https://piyasa.paratic.com/kripto-coin/")
let data = response.data
const $ = cheerio.load(data);

const bitcointable = $('body > div.mobileWrapper > section > div.componentContainer.Component_KriptoTop10 > div.content > div > div > table > tbody > tr:nth-child(1) > td:nth-child(3)');
bitcointable.each(function() {
    let title = $(this).text();
    bitcoin = title;
});
const ethtable = $('body > div.mobileWrapper > section > div.componentContainer.Component_KriptoTop10 > div.content > div > div > table > tbody > tr:nth-child(2) > td:nth-child(3)');
ethtable.each(function() {
    let title = $(this).text();
    eth = title;
});
const dogetable = $('body > div.mobileWrapper > section > div.componentContainer.Component_KriptoTop10 > div.content > div > div > table > tbody > tr:nth-child(9) > td:nth-child(3)');
dogetable.each(function() {
    let title = $(this).text();
    doge = title;
});

const bitcointabletr = $('body > div.mobileWrapper > section > div.componentContainer.Component_KriptoTop10 > div.content > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4)');
bitcointabletr.each(function() {
    let title = $(this).text();
    bitcointr = title;
});

const ethtabletr = $('body > div.mobileWrapper > section > div.componentContainer.Component_KriptoTop10 > div.content > div > div > table > tbody > tr:nth-child(2) > td:nth-child(4)');
ethtabletr.each(function() {
    let title = $(this).text();
    ethtr = title;
});

const dogetabletr = $('body > div.mobileWrapper > section > div.componentContainer.Component_KriptoTop10 > div.content > div > div > table > tbody > tr:nth-child(9) > td:nth-child(4)');
dogetabletr.each(function() {
    let title = $(this).text();
    dogetr = title;
});

return {
    "bitcoin" : {"usd":`${bitcoin}`,"tr":`${bitcointr}`},
    "eth" : {"usd":`${eth}`,"tr":`${ethtr}`},
    "doge" :  {"usd":`${doge}`,"tr":`${dogetr}`}
}
}

app.get("/borsa", async (req, res) => {
    let data = await borsa()
    res.send(data)
})

app.listen(port, () => {
    console.log(`Started http://localhost:${port}`)
})