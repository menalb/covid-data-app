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
        return (datetime.today() + relativedelta(months=-1)).strftime("%Y-%m-%d")
    else:
        return pars[paramName]


def queryData(region: str, dateFrom: str) -> str:
    resp = s3.select_object_content(
        Bucket= BucketName,
        Key=RegionFileName,
        ExpressionType='SQL',
        Expression=f"SELECT data,stato,codice_regione,denominazione_regione,ricoverati_con_sintomi,terapia_intensiva,totale_ospedalizzati,isolamento_domiciliare,totale_positivi,variazione_totale_positivi,nuovi_positivi,dimessi_guariti,deceduti,casi_da_sospetto_diagnostico,casi_da_screening,totale_casi,tamponi FROM s3object s where denominazione_regione ='{region}' and data > '{dateFrom}'",
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
