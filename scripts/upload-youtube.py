#!/usr/bin/env python3
"""
Hikayat · YouTube Video Auto-Uploader
Uploads generated Arabic kids videos directly to YouTube using YouTube Data API v3.
"""

import os
import sys
import argparse
import pickle
import google.auth
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

SCOPES = ['https://www.googleapis.com/auth/youtube.upload']
TOKEN_FILE = 'data/youtube_token.pickle'
CLIENT_SECRETS = 'client_secrets.json'

def get_authenticated_service():
    creds = None
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, 'rb') as token:
            creds = pickle.load(token)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(CLIENT_SECRETS):
                print(f"Error: '{CLIENT_SECRETS}' not found.")
                print("Please download your OAuth 2.0 Client Secret JSON from Google Cloud Console and save it as 'client_secrets.json'.")
                sys.exit(1)
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS, SCOPES)
            print("Starting authentication server...", flush=True)
            creds = flow.run_local_server(
                port=0,
                prompt='consent',
                open_browser=True
            )

        os.makedirs('data', exist_ok=True)
        with open(TOKEN_FILE, 'wb') as token:
            pickle.dump(creds, token)

    return build('youtube', 'v3', credentials=creds)

def upload_video(file_path, title, description, tags, privacy="public", category_id="27"):
    if not os.path.exists(file_path):
        print(f"Error: File not found: {file_path}")
        return None

    youtube = get_authenticated_service()

    body = {
        'snippet': {
            'title': title,
            'description': description,
            'tags': tags,
            'categoryId': category_id,
            'defaultLanguage': 'ar',
            'defaultAudioLanguage': 'ar'
        },
        'status': {
            'privacyStatus': privacy,
            'selfDeclaredMadeForKids': True,  # COPPA compliant for children
        }
    }

    media = MediaFileUpload(file_path, chunksize=-1, resumable=True, mimetype='video/mp4')
    request = youtube.videos().insert(part=','.join(body.keys()), body=body, media_body=media)

    print(f"Uploading '{file_path}' to YouTube...")
    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"Uploaded {int(status.progress() * 100)}%")

    video_id = response.get('id')
    print(f"\nUpload Successful!")
    print(f"Video ID: {video_id}")
    print(f"YouTube URL: https://youtu.be/{video_id}")
    return video_id

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Upload video to YouTube for Hikayat.')
    parser.add_argument('--file', required=True, help='Path to .mp4 video file')
    parser.add_argument('--title', required=True, help='Video Title')
    parser.add_argument('--desc', default='Learn Arabic for kids with Hikayat · حكايات للأطفال', help='Video Description')
    parser.add_argument('--tags', default='arabic for kids,learn arabic,arabic cartoon,arabic alphabet', help='Comma-separated tags')
    parser.add_argument('--privacy', default='public', choices=['public', 'unlisted', 'private'], help='Privacy status')

    args = parser.parse_args()
    tags_list = [t.strip() for t in args.tags.split(',') if t.strip()]

    upload_video(
        file_path=args.file,
        title=args.title,
        description=args.desc,
        tags=tags_list,
        privacy=args.privacy
    )
