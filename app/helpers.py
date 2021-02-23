# FILE REQUIRED FOR AWS S3
import os
import boto3

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'tiff'}

# S3 CONNECTION
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_ACCESS_KEY"),
    aws_secret_access_key=os.environ.get(
        "S3_SECRET_ACCESS_KEY"),
)
S3_BUCKET = os.environ.get("S3_BUCKET_NAME")


# FUNCTION TO LIMIT TYPES OF FILES THAT S3 ACCEPTS
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# FUNCTION TO UPLOAD A FILE TO S3
def upload_file_to_s3(file, filename=None):

    # Docs: http://boto3.readthedocs.io/en/latest/guide/s3.html

    if not filename:
        filename = file.filename

    try:
        s3.put_object(
            Bucket=S3_BUCKET,
            Body=file,
            Key=filename
        )

    except Exception as e:
        # This is a catch all exception
        print("S3 ERROR: ", e)
        return e

    return "{}{}".format(app.config["S3_LOCATION"], file.filename)
