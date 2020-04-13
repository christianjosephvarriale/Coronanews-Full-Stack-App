class Spider < ApplicationRecord
    
    def self.stats

        # delete current data
        begin
            File.open('world_stats.json', 'r') do |f|
              # do something with file
              File.delete(f)
            end
          rescue Errno::ENOENT
        end
        
        system 'scrapy crawl stats -o world_stats.json' # get updated stats

        world_map = JSON.parse Meta.first['world_map'] 
        world_stats = JSON.parse File.read('world_stats.json')

        countries = ["World", "USA", "Spain", "Italy", "Germany", "France", "Iran", "UK", "Turkey", "Switzerland", "Belgium", "Netherlands", "Canada", "Austria", "Portugal", "Brazil", "S. Korea", "Israel", "Sweden", "Norway", "Australia", "Russia", "Ireland", "Czechia", "Chile", "Denmark", "Poland", "Romania", "Malaysia", "Ecuador", "Philippines", "India", "Japan", "Pakistan", "Luxembourg", "Saudi Arabia", "Indonesia", "Thailand", "Finland", "Peru", "Mexico", "Greece", "Panama", "Serbia", "South Africa", "UAE", "Dominican Republic", "Iceland", "Colombia", "Argentina", "Qatar", "Algeria", "Ukraine", "Singapore", "Croatia", "Egypt", "Estonia", "Slovenia", "New Zealand", "Morocco", "Iraq", "Hong Kong", "Lithuania", "Armenia", "Moldova", "Bahrain", "Hungary", "Bosnia and Herzegovina", "Cameroon", "Tunisia", "Kazakhstan", "Azerbaijan", "Lebanon", "Latvia", "Bulgaria", "North Macedonia", "Kuwait", "Slovakia", "Andorra", "Belarus", "Costa Rica", "Cyprus", "Uruguay", "Taiwan", "Réunion", "Albania", "Jordan", "Burkina Faso", "Afghanistan", "Cuba", "Oman", "Uzbekistan", "Honduras", "Channel Islands", "San Marino", "Ivory Coast", "Vietnam", "Senegal", "Palestine", "Nigeria", "Malta", "Ghana", "Montenegro", "Mauritius", "Faeroe Islands", "Sri Lanka", "Georgia", "Venezuela", "DRC", "Niger", "Kyrgyzstan", "Martinique", "Bolivia", "Brunei ", "Guadeloupe", "Mayotte", "Kenya", "Isle of Man", "Cambodia", "Guinea", "Trinidad and Tobago", "Rwanda", "Gibraltar", "Paraguay", "Liechtenstein", "Bangladesh", "Madagascar", "Monaco", "Aruba", "Guatemala", "French Guiana", "El Salvador", "Jamaica", "Barbados", "Djibouti", "Uganda", "Macao", "Mali", "Togo", "French Polynesia", "Zambia", "Ethiopia", "Cayman Islands", "Bermuda", "Eritrea", "Bahamas", "Saint Martin", "Guyana", "Sint Maarten", "Congo", "Gabon", "Myanmar", "Tanzania", "Haiti", "Maldives", "Guinea-Bissau", "Libya", "New Caledonia", "Syria", "Benin", "Equatorial Guinea", "Antigua and Barbuda", "Dominica", "Mongolia", "Namibia", "Saint Lucia", "Fiji", "Grenada", "Curaçao", "Greenland", "Angola", "Sudan", "Liberia", "Suriname", "Laos", "Mozambique", "Seychelles", "Zimbabwe", "Nepal", "Chad", "Saint Kitts and Nevis", "Eswatini", "CAR", "Cabo Verde", "Vatican City", "St. Vincent Grenadines", "Somalia", "Mauritania", "Montserrat", "St. Barth", "Nicaragua", "Bhutan", "Turks and Caicos", "Botswana", "Gambia", "Belize", "Malawi", "Sierra Leone", "Anguilla", "British Virgin Islands", "Burundi", "Caribbean Netherlands", "Falkland Islands", "Papua New Guinea", "Timor-Leste"] 

        for country in world_map['objects']['units']['geometries'] do

            name = country['properties']['name']

            if ( countries.include? name )
             
                country['properties']['cases'] = world_stats[0][name][0]
                country['properties']['casesTrend'] = world_stats[0][name][1]

                country['properties']['deaths'] = world_stats[0][name][2]
                country['properties']['deathsTrend'] = world_stats[0][name][3]
            
            elsif name == 'United States'

                country['properties']['cases'] = world_stats[0]['USA'][0]
                country['properties']['casesTrend'] = world_stats[0]['USA'][1]

                country['properties']['deaths'] = world_stats[0]['USA'][2]
                country['properties']['deathsTrend'] = world_stats[0]['USA'][3]

            elsif name == 'United Kingdom'

                country['properties']['cases'] = world_stats[0]['UK'][0]
                country['properties']['casesTrend'] = world_stats[0]['UK'][1]

                country['properties']['deaths'] = world_stats[0]['UK'][2]
                country['properties']['deathsTrend'] = world_stats[0]['UK'][3]

            else 
              
                country['properties']['cases'] = 'data not reported'
                country['properties']['casesTrend'] = 'data not reported'

                country['properties']['deaths'] = 'data not reported'
                country['properties']['deathsTrend'] = 'data not reported'
            
            end
        end

        Meta.first.update(world_map: world_map.to_json, world_stats: world_stats.to_json)

        ca_stats = JSON.parse Meta.first['ca_stats']

        if ca_stats[ ca_stats.length() - 1 ]['date'] == Time.now.strftime("%Y/%m/%d")
            ca_stats[-1] = { date: Time.now.strftime("%Y/%m/%d"), cases: world_stats[0]['Canada'][0].squish.gsub(/,/, ''), deaths: world_stats[0]['Canada'][2].squish.gsub(/,/, '') } 
        else
            ca_stats.append( { date: Time.now.strftime("%Y/%m/%d"), cases: world_stats[0]['Canada'][0].squish.gsub(/,/, ''), deaths: world_stats[0]['Canada'][2].squish.gsub(/,/, '') } )
        end

        Meta.first.update(ca_stats: ca_stats.to_json)

        markers = []
        i = 1
        cases = []

        world_stats[0].keys.each do |country|
            cases.append(world_stats[0][country][0].squish.gsub(/,/, '').to_i)
        end

        cases = cases.sort
        min = cases.min
        range = cases.max - min

        world_stats[0].keys.each do |country|

            begin
                sleep(0.3)
                coordinate_info_json = JSON.parse(RestClient::Request.execute(method: :get, url: "https://us1.locationiq.com/v1/search.php?key=#{'8a092e494e1a3e'}&q=#{country.encode('utf-8')}&format=json",))
                coordinates = [ coordinate_info_json[0]['lat'].to_f, coordinate_info_json[0]['lon'].to_f ]

                color_val = ( ( cases.index( world_stats[0][country][0].squish.gsub(/,/, '').to_i ).to_f / (cases.length() - 1)) * 100 ).round

                puts color_val

                if color_val < 20
                    color = "#42f545"
                elsif color_val < 40
                    color = "#9cf542"
                elsif color_val < 80
                    color = '#eff542'
                elsif color_val < 95
                    color = '#f59c42'
                else 
                    color = '#fc0303'
                end

                marker = { value: world_stats[0][country][0].squish.gsub(/,/, '').to_i , cases: world_stats[0][country][0], casesTrend: world_stats[0][country][1], deaths: world_stats[0][country][2], deathsTrend: world_stats[0][country][3], color: color, country: country.encode('utf-8'), id: i, coordinates: coordinates }
                markers.append( marker )
                
                i += 1
                rescue 
                    puts 'whoops'
            end
        end

        Meta.first.update(markers: markers.to_json)
    end
end
