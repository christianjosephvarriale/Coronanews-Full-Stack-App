import scrapy
import requests
import re
import time
import csv

class BaseSpider(scrapy.Spider):
    ''' create the Base Spider 
        ExtractionPipeline is required for operation '''

    name = "stock"
    metrics = ['/key-statistics','/history','/financials','/balance-sheet','/cash-flow','/analysis']
    tickers = []

    def start_requests(self):
        ''' opens tickers.txt and maps each url to it's parsing function '''

        with open('tickers1.txt','r') as f:
            tickers = [ticker.strip('\n') for ticker in f.readlines()]

        # create formated urls with metrics and tickers inserted
        urls = [f'https://finance.yahoo.com/quote/{ticker}{metric}?p={ticker}' for ticker in \
        tickers for metric in self.metrics]
        
        # map each url to it's parser and disable redirects for invalid tickers
        parse_func_lst = [self.parse_stats, self.parse_his] + [self.parse_fince_anly]*4
        for index, url in enumerate(urls):
             yield scrapy.Request(url, parse_func_lst[index%6], meta={'dont_redirect': True})

    def parse_his(self, response):
        ''' parses history by calling a POST request on the company CSV file '''

        # retrive the url, ticker, and metric from the call
        url = response.url
        ticker = re.search(r'/[A-Z]+/', url).group()[1:-1]
        metric = re.search(r'[A-Z]/.+p', url).group()[2:-2]

        # retrive date from the current date to Jan 1, 2000 or earliest possible entry
        current_date = str(int(time.time()))
        start_date = '946684800' 

        # make POST call with appropriate headers
        POST_url = f'https://query1.finance.yahoo.com/v7/finance/download/{ticker}?period1={start_date}&period2={current_date}&interval=1d&events=history&crumb=AGQ3nGNGtbA'
        headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0'}
        response = requests.post(POST_url, headers=headers)

        # remove newlines and commas and retrive the fieldnames
        data = re.split(r'[,\n]', response.text) 
        fieldnames, data = data[:7], data[7:]

        # write each row to a csv output file
        with open(f'{ticker}-{metric}.csv', mode='w') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            dic = {}
            while data: 
                for index, field in enumerate(fieldnames):
                    dic[field] = data[index]
                writer.writerow(dic)
                data = data[7:]
                dic = {}

    def parse_fince_anly(self, response):
        ''' parses the Income statement, balance sheet, and Cash-flow statements in addition
            to analysis page'''

        # retrieve data and url
        data = response.xpath('//tbody/tr/td//text()').extract()
        url = response.url
        data_yield_dic = {}

        # if analytics page handle headers
        if re.search(r'[A-Z]/.+p', url).group()[2:-2] == 'analysis': report_periods = create_analysis_headers(response)
        else: report_periods,_ = data[1:5],remove_titles(data)
        data = data[5:]

        # yield each metric with all 4 reporting periods and their respective data
        while data:
            field = data.pop(0)
            data_yield_dic[field] = {}
            for index, period in enumerate(report_periods):
                data_yield_dic[field][period] = data[index]
            data_yield_dic['url'] = url
            yield data_yield_dic
            data = data[4:]
            data_yield_dic = {}

    def parse_stats(self, response):
        ''' parses the key-statistics page '''

        metrics = response.xpath('//tbody/tr/td[1]/span//text()').extract()
        data = response.xpath('//tbody/tr/td[2]//text()').extract()
        url = response.url

        for metric,data in zip(metrics,data):
            data_yield_dic = {'url':url,metric:data}
            yield data_yield_dic
            data_yield_dic = {}

def create_analysis_headers(response):
    ''' creates the headers for the analysis page '''
    report_periods = []
    header_data = response.xpath('//thead/tr//text()').extract()
    report_period = ''
    for header in header_data[1:13]:
        if ')' in header: 
            report_period += header
            report_periods.append(report_period)
            report_period = ''
        else: 
            report_period += ' ' + header
    return report_periods

def remove_titles(lst):
    ''' removes the titles from the data list through mutation'''
    for index, item in enumerate(lst):
        if re.match(r'[A-Z]', item) is not None and re.match(r'[A-Z]',lst[index+1]) is not None:
            lst.remove(item)
