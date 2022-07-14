from typing import Union
import json


def okResponse(message):
    return statusCodeResponse(200, message)


def noContentResponse(message):
    return statusCodeResponse(204, message)


def createdResponse(message):
    return statusCodeResponse(201, message)


def badRequestResponse(message):
    return statusCodeResponse(400, {'errorMessage': message})


def statusCodeResponse(statusCode, message):
    return {
        'statusCode': statusCode,
        'body': message,
        'headers':
        {
            "Access-Control-Allow-Origin": "*"
        }}
