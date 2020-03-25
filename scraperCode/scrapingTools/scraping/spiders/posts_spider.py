import scrapy
import re
import sys

class PostsSpider(scrapy.Spider):
    ''' Spider class to scrape any base url through scrapy crawl amazon -o amazon.csv 
        Disable all Pipelines '''

    name = "posts"
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0'}
    meta={'dont_redirect': True}

    start_data = sys.argv[1][:15] # search with a couple of characters
    url = sys.argv[2]

    # start url to extract page 1
    def start_requests(self):
        ''' request using a GET HTTP request on url provided to the scraper '''
        yield scrapy.Request(url=self.url, callback=self.extract, meta=self.meta, method='GET', headers=self.headers)

    def extract(self, response):
        ''' extracts the page data using XPATH selectors '''

        for e in response.xpath(f"//p[contains(text(), \"{self.start_data}\")]/following-sibling::p").getall():
            yield { 'element' : e }
            
        
