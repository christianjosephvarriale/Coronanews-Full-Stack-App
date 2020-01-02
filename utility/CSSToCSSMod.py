# specs
# if it contains an @ skip it
# if the line contains a ; skip it
# once you find a letter, for every _ | - found remove them
# until you hit another letter. then capitalize that letter

import re

ret_lst = []
read_lst = []

with open('./blog.txt') as f:
    read_lst = f.readlines()

for line in read_lst:
    if re.search(r'[@;]', line):
        ret_lst.append(line)
    else:
        cap = False
        new_line = ''
        for char in line:
            if char == '_' or char == '-':
                cap = True
            elif char.isalpha() and cap:
                new_line += char.capitalize()
                cap = False
            else:
                new_line += char

        ret_lst.append(new_line)

with open('./blogUpdated.txt', 'w') as f:
    for line in ret_lst:
        f.write(line)