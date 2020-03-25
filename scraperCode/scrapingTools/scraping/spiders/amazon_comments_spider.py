import scrapy
import re

class AmazonSpider(scrapy.Spider):
    ''' Spider class to scrape any base url through scrapy crawl amazon -o amazon.csv 
        Disable all Pipelines '''

    name = "amazon"
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0'}

    # start url to extract page 1
    url = 'https://www.amazon.com/Compression-Medical-Nursing-Socks-Running-Fitness-15-20mmHg/product-reviews/B079RBNMXR/ref=cm_cr_dp_d_show_all_top?ie=UTF8&reviewerType=all_reviews'
    
    def start_requests(self):
        ''' request using a POST HTTP request on url '''
        yield scrapy.Request(url=self.url, callback=self.extract, method='POST', headers=self.headers)

    def extract(self, response):
        ''' extracts the page data using XPATH selectors and recursively follows each page '''

        # number of fields to export
        section_num = 9 
        reviews = response.xpath('//div[contains(@id,"customer_review")]')
        export_lst = []
        export_headers = ['reviewer_name','rating','review_title','review_date','product_size','product_color','verification_status','body','upvotes','img_src']
        export_dic = {}

        for review in reviews:
            # extract each text item and map to export header
            for text in list(filter(lambda text:not (re.search(r'\n', text) or re.search(r'Top Contributor', text)), review.xpath('.//*//text()').extract()))[:section_num]:
                export_lst.append(text)

            # take care of the image source case
            img_src = review.xpath('.//div[contains(@id,"imageSection")]/div/img/@src').extract() # attachment case
            if img_src: export_lst.append(img_src)
            else: export_lst.append(None)

            [export_dic.update({header: text}) for text, header in zip(export_lst, export_headers)]
            yield export_dic
            
            export_dic = {}
            export_lst = []

        # allow for recursive following to the next page link
        next_page = response.css('li.a-last a')[0]
        yield response.follow(next_page, callback=self.extract)

                
