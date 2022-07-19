# import json
import requests
import os
import boto3
from botocore.exceptions import ClientError
from utils import downloadFile
from data_prep.region import buildRegionDataSet

DownloadFileName = os.environ.get('DOWNLOAD_FILE_NAME')
FileUrl = os.environ.get('FILE_URL')
BucketName = os.environ.get('BUCKET_NAME')
RegionFileName = os.environ.get('REGION_FILE_NAME')

s3 = boto3.client('s3')

def lambda_handler(event, context):
    downloadFilePath = '/tmp/'+DownloadFileName
    destinationFilePath = '/tmp/region_compare_full'
    try:
        downloadFile(FileUrl,downloadFilePath)

        buildRegionDataSet(downloadFilePath,destinationFilePath)

        uploadFile(destinationFilePath+'.parquet',BucketName,'test/'+RegionFileName)


    except Exception as e:
        print(e)
        raise e

    return {}


def uploadFile(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = os.path.basename(file_name)

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except ClientError as e:
        print(e)
        return False
    return True