# FILE REQUIRED FOR AWS S3
import os
from datetime import datetime
import boto3

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'tiff'}

# S3 CONNECTION
s3 = ''
try:
    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ.get("S3_ACCESS_KEY"),
        aws_secret_access_key=os.environ.get(
            "S3_SECRET_ACCESS_KEY"),
    )
except Exception as e:
    print(f"S3 ERROR: {e}")

S3_BUCKET = "syncupgs"

try:
    S3_BUCKET_SERVER = s3.get_bucket_location(Bucket=S3_BUCKET)[
        'LocationConstraint']
except Exception as e:
    print(f"S3 ERROR: {e}")

S3_LOCATION = f'http://{S3_BUCKET}.s3.{S3_BUCKET_SERVER}.amazonaws.com/'


# FUNCTION TO LIMIT TYPES OF FILES THAT S3 ACCEPTS
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# FUNCTION TO UPLOAD A FILE TO S3
def upload_file_to_s3(file):

    # Docs: http://boto3.readthedocs.io/en/latest/guide/s3.html

    filename = f"{file.filename}-{datetime.now().strftime('%Y%m%d%H%M%S%f')}"

    try:
        s3.upload_fileobj(
            file,
            S3_BUCKET,
            filename,
            ExtraArgs={
                "ACL": 'public-read',
                "ContentType": file.content_type,
            }
        )

    except Exception as e:
        # This is a catch all exception
        print("S3 ERROR: ", e)
        return e

    return f"{S3_LOCATION}{filename}"
