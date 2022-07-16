from utils import parseDate, s3Query
from http_response import okResponse, badRequestResponse
from typing import Union
import os

import boto3

BucketName = os.environ.get('BUCKET_NAME')
FileName = os.environ.get('PROV_FILE_NAME')

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

    return s3Query(s3,query,BucketName,FileName)