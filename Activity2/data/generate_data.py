import csv
import datetime
from operator import indexOf

info = {
        '2016': {'x1':50, 'y':300, 'x2':800},
        '2017': {'x1':50, 'y':150, 'x2':800}
}
colors = {'winter-storm-freeze':'#ccc', 'drought-wildfire':'#ffffd9',
          'flooding':'#41b6c4', 'tropical-cyclone':'#081d58', 'severe-storm':'#c7e9b4'}

with open('data.csv') as data:
    reader = csv.reader(data, delimiter=',')
    for row in reader:
        if 'Year' in str(row): continue
        color_key = row[0]
        year = row[1]
        day = row[2]
        cost = row[3]
        description = row[4]
        print(f'<circle cx="{int(int(day) / 365 * 750)+ 50}" cy="{info[year]["y"]}" r="{cost}" fill="{colors[color_key]}" opacity=".6" />')