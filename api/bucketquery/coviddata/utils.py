from datetime import datetime
from dateutil.relativedelta import relativedelta

def parseDate(pars, paramName) -> str:
    if paramName not in pars or pars[paramName] == '':
        return formatDate((datetime.today() + relativedelta(months=-5)))
    else:
        return pars[paramName]


def formatDate(date: datetime) -> str:
    return date.strftime("%Y-%m-%d")

def parseDateFromString(date:str)->datetime:
    return datetime.strptime(date, "%Y-%m-%d")

def checkDateFromNotTooBig(maxMonths: int, dateFrom: str) -> bool:
    min = datetime.today() + relativedelta(months=-maxMonths)
    dtFrom = parseDateFromString(dateFrom)
    return dtFrom >= datetime.combine(min,datetime.min.time())

def checkDateInTheFuture(dateFrom: str) -> bool:
    today = datetime.today()
    dtFrom = parseDateFromString(dateFrom)
    return dtFrom > datetime.combine(today, datetime.min.time())

def s3Query(s3Client, query: str, bucketName: str, filePath: str) -> str:
    resp = s3Client.select_object_content(
        Bucket=bucketName,
        Key=filePath,
        ExpressionType='SQL',
        Expression=query,
        InputSerialization={'Parquet': {}, 'CompressionType': 'NONE'},
        OutputSerialization={'JSON': {}},
    )

    message = ''

    for event in resp['Payload']:
        if 'Records' in event:
            records = event['Records']['Payload'].decode(
                'utf-8').replace('\n', ',')
            message = '['+records[:-1]+']'

    return message
