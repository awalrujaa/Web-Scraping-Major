const {Builder, By, until} = require('selenium-webdriver');
require("chromedriver");

var list_of_Publication = [];
var list_of_href = [];
(async function example() {
    let driver = new Builder()
        .forBrowser('chrome')
        .build();

    await driver.get('https://scholar.google.com/citations?user=iocLiGcAAAAJ&hl=en&oi=ao');

    await driver.findElement(By.css("button#gsc_bpf_more")).click();
    await driver.wait(until.elementLocated(By.css('span#gsc_a_nn')), 5000);
    const iframe = await driver.findElement(By.css("span#gsc_a_nn"));
    await driver.actions().scroll(0, 0, 0, 0, iframe).perform();
    await driver.manage().setTimeouts( { implicit: 10000 } );
    console.log("displayed!");
    await driver.wait(until.elementLocated(By.css('a.gsc_a_at')), 10000);
    await driver.sleep(5000);
    let publications = await driver.findElements(By.css("a.gsc_a_at"));

    for(let publication of publications) {
        // console.log(await e.getText());
        list_of_Publication.push(await publication.getText());
        list_of_href.push(await publication.getAttribute('href'));
    }


    
    //console.log(list_of_href);
    for (let url of list_of_href){
        await driver.get(url);
        //console.log(url);
        await driver.manage().setTimeouts( { implicit: 10000 } );
        let elements = await driver.findElements(By.css("div.gsc_oci_field"));
        var dict_of_citation = {};
        let i = 0;
        for( element of elements){
            let x = await driver.findElements(By.css("div.gsc_oci_value"));
            dict_of_citation['Title'] = await driver.findElement(By.css("a.gsc_oci_title_link")).getText();
            dict_of_citation['URL'] = await driver.findElement(By.css("a.gsc_oci_title_link")).getAttribute('href');
            dict_of_citation[await element.getText()] = await x[i].getText();
            i = i+1;
            delete dict_of_citation['Description'];
            delete dict_of_citation['Total citations'];
            delete dict_of_citation['Scholar articles'];
            
        }
        console.log(dict_of_citation);


        
   }
    

})();


  


