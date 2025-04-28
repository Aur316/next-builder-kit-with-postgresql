#!/bin/sh
branch_name=$(git symbolic-ref --short HEAD)
pattern="^(feat|fix|chore|docs|style|refactor|perf|test|ci|build|revert)/.+$"

if echo "$branch_name" | grep -Eq "$pattern"; then
  echo "Branch name OK: $branch_name"
else
  echo "Invalid branch: '$branch_name'"
  echo "Allowed pattern: feat/<desc> | fix/<desc> | chore/<desc> | docs/<desc> | style/<desc> | refactor/<desc> | perf/<desc> | test/<desc> | ci/<desc> | build/<desc> | revert/<desc>"
 exit 1
fi
