from http_response import okResponse, badRequestResponse
from datetime import datetime
from typing import Union
from dateutil.relativedelta import relativedelta
import os

import boto3

BucketName = os.environ.get('BUCKET_NAME')
RegionFileName = os.environ.get('REGION_FILE_NAME')


s3 = boto3.client('s3')


def lambda_handler(event, context):
    try:

        if not(event['queryStringParameters']) is None and 'region' in event['queryStringParameters']:
            region = event['queryStringParameters']['region']
            dateFrom = parseDate(event['queryStringParameters'], 'date-from')

            message = queryData(region, dateFrom)

            return okResponse(message)
        else:
            return badRequestResponse('Region is missing')

    except Exception as e:
        print(e)
        return {
            "statusCode": 500,
        }


def parseDate(pars, paramName) -> str:
    if paramName not in pars or pars[paramName] == '':
        return (datetime.today() + relativedelta(months=-6)).strftime("%Y-%m-%d")
    else:
        return pars[paramName]


def queryData(region: str, dateFrom: str) -> str:
    query =f"""
    SELECT 
        data As reporting_date,
        stato AS country,
        codice_regione AS region_code,
        denominazione_regione AS region,
        totale_positivi AS total_infected,
        variazione_totale_positivi as delta_infected,
        nuovi_positivi AS new_infected,
        deceduti AS deaths,        
        totale_casi AS total,
        tamponi AS swabs 
    FROM s3object s 
    WHERE denominazione_regione ='{region}' AND data > '{dateFrom}'
    """

    resp = s3.select_object_content(
        Bucket= BucketName,
        Key=RegionFileName,
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
