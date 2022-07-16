from datetime import datetime
from dateutil.relativedelta import relativedelta

def parseDate(pars, paramName) -> str:
    if paramName not in pars or pars[paramName] == '':
        return (datetime.today() + relativedelta(months=-6)).strftime("%Y-%m-%d")
    else:
        return pars[paramName]


def s3Query(s3Client,query: str, bucketName: str, filePath: str) -> str:
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
