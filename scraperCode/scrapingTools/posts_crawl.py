import scrapy
from scrapy.utils.project import get_project_settings
from scrapy.crawler import CrawlerProcess
from scraping.spiders.posts_spider import PostsSpider

setting = get_project_settings()
process = CrawlerProcess(setting)

process.crawl(PostsSpider)
process.start()