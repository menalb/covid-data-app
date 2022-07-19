from fileinput import filename
import requests

file_name = 'dpc-covid19-ita-regioni.csv'
url = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/' + file_name
r = requests.get(url)

print(r.headers)

#print(r.text)

with open(file_name,'wb') as f:
    f.write(r.text.encode('utf8'))