import io

from apiclient.discovery import build
from google.oauth2 import service_account
from googleapiclient.http import MediaIoBaseDownload

SCOPES = ["https://www.googleapis.com/auth/drive"]
SHARE_FOLDER_ID = "1ZASK5vbLvd4IvzW6Qfz1X-7nELsRSuiF"


def get_movies():
    credentials = service_account.Credentials.from_service_account_file(
        "keys/client_secret.json"
    )
    scoped_credentials = credentials.with_scopes(SCOPES)
    drive_service = build("drive", "v3", credentials=scoped_credentials)

    response = (
        drive_service.files()
        .list(
            supportsAllDrives=True,
            includeItemsFromAllDrives=True,
            q=f"parents in '{SHARE_FOLDER_ID}' and trashed = false",
            fields="nextPageToken, files(id, name)",
        )
        .execute()
    )

    for file in response.get("files", []):
        print(f"Found file: {file.get('name')} ({file.get('id')})")
        request = drive_service.files().get_media(fileId=file.get("id"))
        # file = io.BytesIO()
        file = io.FileIO(f"/mnt/test/{file.get('name')}", mode="wb")
        downloader = MediaIoBaseDownload(file, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()
            print(f"Download {int(status.progress() * 100)}.")


if __name__ == "__main__":
    get_movies()
