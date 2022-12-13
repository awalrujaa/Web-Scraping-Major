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
    let elements = await driver.findElements(By.css("a.gsc_a_at"));

    for(let e of elements) {
        // console.log(await e.getText());
        list_of_Publication.push(await e.getText());
        list_of_href.push(await e.getAttribute('href'));
    }


    
    console.log(list_of_href);
    for (let url of list_of_href){
        await driver.get(url);
        console.log(url);
        //await driver.manage().setTimeouts( { implicit: 10000 } );
        
    }
    
    // for href in list_of_href:
    // driver.get(href)
    // driver.implicitly_wait(10)
    // elements = driver.find_elements(By.CSS_SELECTOR, "div.gsc_oci_field")
    // i=0
    // for element in elements:
    //     dict_of_citation[element.text] = driver.find_elements(By.CSS_SELECTOR, "div.gsc_oci_value")[i].text
    //     i=i+1
    // dict_of_citation.pop('Description',None)
    // dict_of_citation.pop('Total citations',None)
    // dict_of_citation.pop('Scholar articles',None)
    // print(dict_of_citation)
    // print(""".
    // .""")
    // list_of_dict.append(dict_of_citation)



})();


  


