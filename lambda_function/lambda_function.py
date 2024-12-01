import os
import json
import requests

def lambda_handler(event, context):
    try:
        # クエリパラメータからuser_idを取得
        user_id = event.get('queryStringParameters', {}).get('user_id')

        if not user_id or not isinstance(user_id, str):
            return {
                'statusCode': 400,
                'body': json.dumps({
                    'count': 0,
                    'message': 'user_id is required'
                })
            }

        qiita_access_token = os.environ.get('QIITA_ACCESS_TOKEN')
        if not qiita_access_token:
            raise Exception('QIITA_ACCESS_TOKEN is not configured')

        per_page = 100
        page = 1

        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {qiita_access_token}'
        }

        query_params = {
            'page': str(page),
            'per_page': str(per_page),
            'query': f'user:{user_id} created:>=2024-12-01 created:<=2024-12-15'
        }

        url = 'https://qiita.com/api/v2/items'
        response = requests.get(url, headers=headers, params=query_params)

        if not response.ok:
            error_text = response.text
            raise Exception(f'Failed to fetch data from Qiita API: {response.status_code} {error_text}')

        data = response.json()

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'count': len(data),
                'articles': [
                    {
                        'id': article['id'],
                        'title': article['title'],
                        'userId': article['user']['id'],
                        'userName': article['user']['name'],
                        'created_at': article['created_at'],
                        'updated_at': article['updated_at'],
                        'url': article['url']
                    } for article in data
                ]
            })
        }

    except Exception as error:
        print('Error details:', error)
        return {
            'statusCode': 500,
            'body': json.dumps({
                'count': 0,
                'message': str(error) or 'Internal Server Error'
            })
        }
