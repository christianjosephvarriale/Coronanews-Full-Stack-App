import scrapy
import re
import sys
import logging

class StatsSpider(scrapy.Spider):
    ''' Spider class to scrape the https://www.worldometers.info/coronavirus/ page  '''

    name = "stats"
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0'}
    meta={ 'dont_redirect': True }
    url = 'https://www.worldometers.info/coronavirus/'

    # start url to extract page 1
    def start_requests(self):
        ''' request using a GET HTTP request on url provided to the scraper '''
        yield scrapy.Request(url=self.url, callback=self.extract, meta=self.meta, method='GET', headers=self.headers)

    def extract(self, response):
        ''' extracts the page data using XPATH selectors '''

        data = list( map (lambda td: re.sub("<.*?>", "", td), list( map ( lambda td: td.replace("\n","") , response.xpath(f"//table[@id='main_table_countries_today']/tbody/tr[not(contains(@class,'total_row_world'))]/td[not(contains(@style,'none'))]").getall()))))
        regions = response.xpath(f"//table[@id='main_table_countries_today']/tbody/tr/td/a/text()").getall()

        res = {  }
        region = ''

        i = 0
        while regions:
            if i % 12 == 0: # it's a country title
                region = regions.pop(0)
                data.pop(0)
                res[region] = []
            else:
                res[region].append(data.pop(0))
            i+=1

        res.pop('China', None)

        yield res
            
        
