curl -X POST \
  'https://hrcws9cl96.execute-api.eu-north-1.amazonaws.com/development/status' \
  -H 'content-type: application/json' \
  -H 'day: Thursday' \
  -d '{ "time": "evening" }' | jq
