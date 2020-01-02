class ScriptsController < ApplicationController
    protect_from_forgery prepend: true

    #def yahoo

    #    require 'rubygems'
    #    require 'zip'
    #    require 'find'

        # loop through the params and create a string
    #    argString = ' '
    #    params[:tickers].each do |i|
    #       argString = argString + i + ' ' 
    #    end

        # create random Id
    #    id = SecureRandom.uuid

    #    system 'python scraperCode/scrapingTools/scrape.py' + ' yahoo ' + id.to_s + argString

    #    zipfile_name = 'client/src/scrapedFiles/financialData-' + id.to_s + '.zip'
    #    path = 'client/src/scrapedFiles'

    #    data = File.read(zipfile_name)
    #    send_data data, :disposition => 'attachment', :filename => 'zipFile.zip'
    # end

    def amazon

        # create random Id
        id = SecureRandom.uuid

        system 'python scraperCode/scrapingTools/scrape.py' + ' amazon ' + id.to_s + ' ' + params[:url].to_s

        data = File.read('client/src/scrapedFiles/comments-' + id.to_s + '.csv')

        # now cleanup the file data
        File.delete('client/src/scrapedFiles/comments-' + id.to_s + '.csv')
        send_data data, :disposition => 'attachment', :filename => 'comments.csv'
    end
end
