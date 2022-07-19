import boto3
import os
from utils import downloadFile, uploadFile
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

        uploadFile(s3, destinationFilePath+'.parquet',
                   BucketName, RegionFileName+'.parquet')


    except Exception as e:
        print(e)
        raise e

    return {}