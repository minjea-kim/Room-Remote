#!/bin/sh


# Kill Any Lingering Ports
processPID_1=$(netstat -aon | findstr "4040" | head -1 | awk '{ print $5; }')
taskkill //pid $processPID_1

processPID_2=$(netstat -aon | findstr "4041" | head -1 | awk '{ print $5; }')
taskkill //pid $processPID_2


# read wait1

echo "Starting ngrok instances.."
# Start new ngrok instances
C:\\Users\\min_j\\OneDrive\\Desktop\\ngrok.exe http --host-header=rewrite 8080 &
C:\\Users\\min_j\\OneDrive\\Desktop\\ngrok.exe http 3000 & 

curl http://localhost:4040/api/tunnels -o client-webhook.json
curl http://localhost:4041/api/tunnels -o server-webhook.json

echo "Writing new webhook..."
node editEnv.js

echo "Starting Room Remote.."
npm run dev

echo "----------------------------"
echo "Press enter to stop"
read wait