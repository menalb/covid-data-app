from utils import parseDate, checkDateFromNotTooBig, checkDateInTheFuture, s3Query
from http_response import okResponse, badRequestResponse
from datetime import datetime
from typing import Union
from dateutil.relativedelta import relativedelta
import os

import boto3

BucketName = os.environ.get('BUCKET_NAME')
FileName = os.environ.get('REGION_FILE_NAME')
maxMonths = 5
s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:

        if not(event['queryStringParameters']) is None and 'region' in event['queryStringParameters']:
            region = event['queryStringParameters']['region'].replace(' ','-')
            dateFrom = parseDate(event['queryStringParameters'], 'date-from')

            if not checkDateFromNotTooBig(maxMonths, dateFrom):
                return badRequestResponse(f'date-from should be max {maxMonths} months in the past')
                
            if checkDateInTheFuture(dateFrom) :
                return badRequestResponse(f'date-from should not be in the future')

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
        reporting_date,
        country,
        region_code,
        region,
        total_infected,
        delta_infected,
        new_infected,
        discharged_healed,
        deaths,
        total,
        swabs, 

        total_infected_prev,
        delta_infected_prev,
        new_infected_prev,
        discharged_healed_prev,
        deaths_prev,
        total_prev,
        swabs_prev
    FROM s3object s 
    WHERE region ='{region}' AND reporting_date > '{dateFrom}'
    """

    return s3Query(s3, query, BucketName, FileName)