const puppeteer = require('puppeteer');

const SECRET_EMAIL = 'sir_paa'
const SECRET_PASSWORD = '0740756210'



const TWEET_DATA = 'This is another test'

let browser = null
let page = null

const main = async()=>{
    const browser = await puppeteer.launch({
        headless:false
    })
    const page = await browser.newPage()
    await page.goto('https://twitter.com/login',{waitUntil:'networkidle2'})
    
    await page.type('input[name="session[username_or_email]"]', SECRET_EMAIL, {delay:25})
    await page.type('input[name="session[password]"]', SECRET_PASSWORD, {delay:25})
    await page.click('div[data-testid="LoginForm_Login_Button"]')
     await page.waitFor(2000)

    
    //***this is the part where the user presses the tweet button and sends something */
    await page.waitForSelector('[data-testid="SideNav_NewTweet_Button"]')
    await page.click('[data-testid="SideNav_NewTweet_Button"]')

    await page.waitForSelector('[data-testid="tweetTextarea_0"]')
    await page.click('[data-testid="tweetTextarea_0"]')

    await page.keyboard.type(TWEET_DATA,{delay:25})
    await page.click('[data-testid="tweetButton"]')

    

    

    




    // await page.type('div[data-text="true"]',TWEET_DATA,{delay:25})
    // await page.waitFor('div[data-testid="AppTabBar_Explore_Link"]')
    // await page.keyboard.press('Enter');
    // await page.type('span[data-text="true"]','#kenyatta',{delay:50})

    // await page.keyboard.press('Enter');
    // await page.waitFor(2000) 


}

main()