# from selenium import webdriver
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.common.by import By

# driver = webdriver.Firefox()
# driver.get("http://www.python.org")
# assert "Python" in driver.title
# elem = driver.find_element(By.NAME, "q")
# elem.clear()
# elem.send_keys("pycon")
# elem.send_keys(Keys.RETURN)
# assert "No results found." not in driver.page_source
# driver.close()

from cgitb import text
from lib2to3.pgen2 import driver
from django import urls
from selenium.webdriver.chrome.service import Service
from selenium import webdriver
from selenium.webdriver.common.by import By

serv_obj = Service("C:\Program Files (x86)\chromedriver.exe")
driver = webdriver.Chrome(service=serv_obj)

driver.get("https://www.researchgate.net/profile/Aman-Shakya")
driver.maximize_window()

driver.find_element(By.PARTIAL_LINK_TEXT, "Publications").click()
#nova-legacy-v-publication-item__title
publications = driver.find_elements(By.CSS_SELECTOR, "div.nova-legacy-v-publication-item__title")
print(len(publications))

#links = driver.find_elements(By.CSS_SELECTOR, "div.nova-legacy-v-publication-item__title")
#print(links[1].get_attribute('itemprop'))
for publication in publications:
    print(publication.text)
    link = publication.find_element(By.CSS_SELECTOR, ".nova-legacy-e-link--theme-bare")
    print(link.get_attribute('href'))



#print(publications[1].text)

