curl -X POST \
  '127.0.0.1:3030/status' \
  -H 'content-type: application/json' \
  -H 'day: Thursday' \
  -d '{ "filename": "test.jpg" }' | jq
  # 'https://hrcws9cl96.execute-api.eu-north-1.amazonaws.com/development/status' \
