// This program will search for something, go to the page of the searchthen 
// goes to the page of the first person it sees and follows the person
// it will then go back to the first page, and do it to the rest of t6he page if there is a 
// loop somewhere
const puppeteer = require('puppeteer');

const SECRET_EMAIL = 'sir_paa'//enter your username
const SECRET_PASSWORD = '0740756210'//enter your password
const TWEET_DATA = 'this is your third tweet'//your tweet data
const SEARCH_DATA = 'coding'

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
     await page.waitForSelector('[data-testid="AppTabBar_Explore_Link"]')
     await page.click('[data-testid="AppTabBar_Explore_Link"]')

     await page.waitForSelector('[data-testid="SearchBox_Search_Input"]')
     await page.click('[data-testid="SearchBox_Search_Input"]',{delay:25})
     await page.waitFor(2000)
     await page.keyboard.type(SEARCH_DATA,{delay:25})
     await page.keyboard.press('Enter');
     await page.waitFor(2000)


    //  //This part of the code will go to the first users page
    //  await page.waitForSelector('[class="css-4rbku5 css-18t94o4 css-1dbjc4n r-1loqt21 r-1wbh5a2 r-dnmrzs r-1ny4l3l"]')
    //  await page.click('[class="css-4rbku5 css-18t94o4 css-1dbjc4n r-1loqt21 r-1wbh5a2 r-dnmrzs r-1ny4l3l"]')
    //  await page.waitForSelector('[data-testid="1043804966526365696-follow"]')
    //  await page.waitFor(2000)
    //  await page.click('[data-testid="1043804966526365696-follow"]')
    //  await page.waitFor(2000)
    //  await page.goBack()

     let mySet = new Set();
     try {
         let previousHeight;
         //while (items.length<itemTargetCount){
             for(let i=0;i<2;i++){
                 const elementHandles = await page.$$('a.css-4rbku5 css-18t94o4 css-1dbjc4n r-1loqt21 r-1wbh5a2 r-dnmrzs r-1ny4l3l')
                 const propertyJsHandles = await Promise.all(
                    elementHandles.map(handle=>handle.getProperty('href')) 
                 );
                 const urls = await Promise.all(
                    elementHandles.map(handle=>handle.jsonValue())  
                 );
                
                 urls.forEach(item=>mySet.add(item))
                console.log(urls);

                 previousHeight = await page.evaluate('document.body.scrollHeight');
                 await page.evaluate('window.scrollTo(0,document.body.scrollHeight)')
                 await page.waitForFunction(`document.body.scrollHeight>${previousHeight}`)
             }
         }catch(e){console.log(e)}
         console.log("---------------------");
         console.log(mySet);
     


    

    




    


}

main()