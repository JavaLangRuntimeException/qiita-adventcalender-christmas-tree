# AWS Lambda Python 3.11 ベースイメージを使用
FROM public.ecr.aws/lambda/python:3.11

# 作業ディレクトリを設定
WORKDIR ${LAMBDA_TASK_ROOT}

# 依存関係ファイルをコピー
COPY requirements.txt ${LAMBDA_TASK_ROOT}

# 依存関係をインストール
RUN pip install --no-cache-dir -r requirements.txt

# Lambda関数のコードをコピー
COPY lambda_function.py ${LAMBDA_TASK_ROOT}

# Lambdaハンドラーを指定
CMD [ "lambda_function.lambda_handler" ]

