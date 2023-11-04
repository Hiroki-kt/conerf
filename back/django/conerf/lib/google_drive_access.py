import io

from apiclient.discovery import build
from google.oauth2 import service_account
from googleapiclient.http import MediaIoBaseDownload

SCOPES = ["https://www.googleapis.com/auth/drive"]


class GoogleDriveAccess:
    def __init__(self):
        credentials = service_account.Credentials.from_service_account_file(
            "keys/client_secret.json"
        )
        self.scoped_credentials = credentials.with_scopes(SCOPES)
        self.drive_service = build("drive", "v3", credentials=self.scoped_credentials)

    def get_files_list_in_a_folder(self, share_folder_id):
        response = (
            self.drive_service.files()
            .list(
                supportsAllDrives=True,
                includeItemsFromAllDrives=True,
                q=f"parents in '{share_folder_id}' and trashed = false",
                fields="nextPageToken, files(id, name)",
            )
            .execute()
        )

        files = []
        # TODO: Check file type, if it is a folder, then call this function recursively
        for file in response.get("files", []):
            print(f"Found file: {file.get('name')} ({file.get('id')})")
            files.append(file.get("id"))
        return files

    def download_file(self, file_id, output_file):
        request = self.drive_service.files().get_media(fileId=file_id)
        file = io.FileIO(output_file, mode="wb")
        downloader = MediaIoBaseDownload(file, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()
            print(f"Download {int(status.progress() * 100)}.")
        return


if __name__ == "__main__":
    gda = GoogleDriveAccess()
    files = gda.get_files_list_in_a_folder("1ZASK5vbLvd4IvzW6Qfz1X-7nELsRSuiF")
    for count, file in enumerate(files):
        gda.download_file(file, f"/mnt/test/{count}.MOV")
