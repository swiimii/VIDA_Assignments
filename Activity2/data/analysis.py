import csv
import datetime

with open('data.csv') as data:
    reader = csv.reader(data, delimiter=',')
    print("Year, Day of year, Cost, Description")
    for row in reader:
        for i in range(len(row)):
            row[i] = row[i].strip()
        date = datetime.datetime.strptime(row[1], r"%Y-%m-%d")
        day_of_year = str(date.timetuple().tm_yday)
        year = str(date.year)
        cost = row[2]
        description = row[3]
        print(','.join([year, day_of_year, cost, description]))