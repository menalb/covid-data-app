from utils import parseDate, s3Query
from http_response import okResponse, badRequestResponse
from datetime import datetime
from typing import Union
from dateutil.relativedelta import relativedelta
import os

import boto3

BucketName = os.environ.get('BUCKET_NAME')
FileName = os.environ.get('REGION_FILE_NAME')

s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:

        if not(event['queryStringParameters']) is None and 'region' in event['queryStringParameters']:
            region = event['queryStringParameters']['region'].replace(' ','-')
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
        dimessi_guariti AS discharged_healed,
        deceduti AS deaths,
        totale_casi AS total,
        tamponi AS swabs 
    FROM s3object s 
    WHERE denominazione_regione ='{region}' AND data > '{dateFrom}'
    """

    return s3Query(s3, query, BucketName, FileName)