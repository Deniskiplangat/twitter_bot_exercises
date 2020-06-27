const puppeteer = require('puppeteer');

const main = async()=>{
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://reddit.com', { waitUntil: 'networkidle2' })
    await page.pdf({path:'reddit.pdf',format:'A4'})

    await browser.close()
}
main()