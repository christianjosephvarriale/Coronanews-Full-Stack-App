import scrapy
import re
import sys

class PostsSpider(scrapy.Spider):
    ''' Spider class to scrape a general news site based on the node level / sibling nodes of the given body '''

    name = "posts"
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0'}
    meta={'dont_redirect': True}

    try:
        start_data = sys.argv[1][:15] # search with a couple of characters
        url = sys.argv[2]
    except:
        pass

    # start url to extract page 1
    def start_requests(self):
        ''' request using a GET HTTP request on url provided to the scraper '''
        yield scrapy.Request(url=self.url, callback=self.extract, meta=self.meta, method='GET', headers=self.headers)

    def extract(self, response):
        ''' extracts the page data using XPATH selectors '''

        yield { 'element' : response.xpath(f"//p[contains(text(), \"{self.start_data}\")]").get() } 
        for e in response.xpath(f"//p[contains(text(), \"{self.start_data}\")]/following-sibling::p").getall():
            yield { 'element' : e }
            
        
