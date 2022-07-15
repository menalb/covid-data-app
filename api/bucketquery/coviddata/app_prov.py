from http_response import okResponse, badRequestResponse
from datetime import datetime
from typing import Union
from dateutil.relativedelta import relativedelta
import os

import boto3

BucketName = os.environ.get('BUCKET_NAME')
ProvFileName = os.environ.get('PROV_FILE_NAME')

s3 = boto3.client('s3')


def lambda_handler(event, context):
    try:

        if not(event['queryStringParameters']) is None and 'prov' in event['queryStringParameters']:
            prov = event['queryStringParameters']['prov']
            dateFrom = parseDate(event['queryStringParameters'], 'date-from')

            message = queryData(prov, dateFrom)

            return okResponse(message)
        else:
            return badRequestResponse('Province is missing')

    except Exception as e:
        print(e)
        return {
            "statusCode": 500,
        }


def parseDate(pars, paramName) -> str:
    if paramName not in pars or pars[paramName] == '':
        return (datetime.today() + relativedelta(months=-1)).strftime("%Y-%m-%d")
    else:
        return pars[paramName]


def queryData(prov: str, dateFrom: str) -> str:

    query = f"""
    SELECT 
        denominazione_regione AS region,
        denominazione_provincia AS province,
        sigla_provincia AS province_initials,
        totale_casi AS total,
        data AS reporting_date 
    FROM s3object s 
    WHERE sigla_provincia ='{prov}' AND data > '{dateFrom}'
    """
    resp = s3.select_object_content(
        Bucket=BucketName,
        Key=ProvFileName,
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
