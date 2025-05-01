import fs from 'fs';
/* const response = await fetch('https://www.proshop.dk/Baerbar');

const result = await response.text();
fs.writeFileSync("index.html", result); */

import {load} from 'cheerio'
const page = await fs.readFileSync("index.html".toString())

const $ = load(page)
$("#products [product]").each((index, element) => {
    const name = $(element).find("h2[product-display-name]").text();
    const price = $(element).find(".site-currency-lg").text();

    console.log(name, price)
})