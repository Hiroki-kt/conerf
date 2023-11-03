from apiclient.discovery import build
from google.oauth2 import service_account

SCOPES = ["https://www.googleapis.com/auth/drive"]
SHARE_FOLDER_ID = "1pt4G0DgFVRrUMlfsCusA2tBi22dPrde1"


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


if __name__ == "__main__":
    get_movies()
