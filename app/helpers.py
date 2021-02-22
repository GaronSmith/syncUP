# FILE REQUIRED FOR AWS S3
import boto3, botocore
from .config import S3_KEY, S3_SECRET, S3_BUCKET

s3 = boto3.client(
    "s3",
    aws_access_key_id=S3_KEY,
    aws_secret_access_key=S3_SECRET
)

# FUNCTION TO UPLOAD A FILE TO S3
def upload_file_to_s3(file, bucket_name, acl="public-read"):

    # Docs: http://boto3.readthedocs.io/en/latest/guide/s3.html

    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        # This is a catch all exception
        print("S3 ERROR: ", e)
        return e

    return "{}{}".format(app.config["S3_LOCATION"], file.filename)
