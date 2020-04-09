class Spider < ApplicationRecord
    
    def self.stats

        # delete current data
        begin
            File.open('client/src/world_stats.json', 'r') do |f|
              # do something with file
              File.delete(f)
            end
          rescue Errno::ENOENT
        end
        
        system 'scrapy crawl stats -o client/src/world_stats.json' # get updated stats

        world_map = JSON.parse File.read("client/src/world_map.json") 
        world_stats = JSON.parse File.read("client/src/world_stats.json")

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

        File.open("client/src/world_map.json","w") do |f|
            f.write(world_map.to_json)
        end

        ca_stats = JSON.parse File.read("client/src/ca_stats.json")

        if ca_stats[ ca_stats.length() - 1 ]['date'] == Time.now.strftime("%Y/%m/%d")
        else
            ca_stats.append( { date: Time.now.strftime("%Y/%m/%d"), cases: world_stats[0]['Canada'][0].squish.gsub(/,/, ''), deaths: world_stats[0]['Canada'][2].squish.gsub(/,/, '') } )
        end

        File.open("client/src/ca_stats.json","w") do |f|
            f.write(ca_stats.to_json)
        end

    end
end
