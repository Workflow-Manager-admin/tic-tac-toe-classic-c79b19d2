#!/bin/bash
cd /home/kavia/workspace/code-generation/tic-tac-toe-classic-c79b19d2/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

