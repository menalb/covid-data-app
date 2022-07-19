from fileinput import filename
import requests

def downloadFile(url:str,destinationFileName:str):
    r = requests.get(url)
    with open(destinationFileName,'wb') as f:
        f.write(r.text.encode('utf8'))