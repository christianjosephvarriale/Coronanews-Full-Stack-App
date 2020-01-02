# logic designed by Christian J. Varriale
# 
# if you see the word class="
# then find that index, and find the index of the closing "
# split that substring into a list
# for every item in that list, preform CSS to CSSMod
# prepend classes. to each element
# then join them with commas
# write the new string up to index 1, then className={[ , then newstr, then ]}
import re

ret_lst = []
read_lst = []

with open('./code.txt') as f:
    read_lst = f.readlines()

for line in read_lst:
    match_obj = re.search(r'class="(.*?)"', line)
    if match_obj:
        # this must be changed 
        index_start = match_obj.span()[0]
        index_start += 7
        index_end = match_obj.span()[1] - 1

        classes = line[index_start:index_end]

        # turn classes into camelCase
        cap = False
        new_line = ''
        for char in classes:
            if char == '_' or char == '-':
                cap = True
            elif char.isalpha() and cap:
                new_line += char.capitalize()
                cap = False
            else:
                new_line += char
          
        # check how many classes if joining is required

        class_lst = new_line.split(" ")

        if len(class_lst) == 1:
          ret_line = 'className={' + class_lst[0] + '}'

        else:
          ret_line = 'className={[' + ",".join( new_line.split(" ") ) + '].join(" ")}'
        
        new_str = re.sub(r'class="(.*?)"', ret_line, line)

        ret_lst.append(new_str)
        

    else:
        ret_lst.append(line)

with open("codeUpdated.txt", "w") as f:
  for line in ret_lst:
    f.write(line)