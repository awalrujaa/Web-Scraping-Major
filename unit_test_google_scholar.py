from cgitb import text
import time
import json
from lib2to3.pgen2 import driver
from django import urls
from selenium.webdriver.chrome.service import Service
from selenium import webdriver
from selenium.webdriver.common.by import By

serv_obj = Service("C:\Program Files (x86)\chromedriver.exe")
driver = webdriver.Chrome(service=serv_obj)

driver.get("https://scholar.google.com/citations?user=iocLiGcAAAAJ&hl=en&oi=ao")
driver.maximize_window()

driver.find_element(By.CSS_SELECTOR, "button#gsc_bpf_more").click()
time.sleep(5)
driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
driver.implicitly_wait(10)
#td.gsc_a_t
publications = driver.find_elements(By.CSS_SELECTOR, "a.gsc_a_at")


print(len(publications))
list_of_Publication = []
list_of_href = []

#a.gsc_a_at
#elements = driver.find_elements_by_id("link")

for publication in publications:
    #print(publication.text)
    list_of_Publication.append(publication.text)
    #print(publication.get_attribute('href'))
    list_of_href.append(publication.get_attribute('href'))

list_of_dict=[]
dict_of_citation={}
for href in list_of_href:
    driver.get(href)
    driver.implicitly_wait(10)
    elements = driver.find_elements(By.CSS_SELECTOR, "div.gsc_oci_field")
    i=0
    for element in elements:
        dict_of_citation[element.text] = driver.find_elements(By.CSS_SELECTOR, "div.gsc_oci_value")[i].text
        i=i+1
    dict_of_citation.pop('Description',None)
    dict_of_citation.pop('Total citations',None)
    dict_of_citation.pop('Scholar articles',None)
    print(dict_of_citation)
    print(""".
    .""")
    list_of_dict.append(dict_of_citation)


with open('list_of_dict_cite', 'w') as f:
    json.dump(list_of_dict,f)




# href_list_in_json = json.dumps(list_of_href, indent= 10)
# with open('href_list.json', 'w') as f:
#     json.dump(list_of_href,f)


