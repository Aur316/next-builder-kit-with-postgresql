#!/bin/sh
branch_name=$(git symbolic-ref --short HEAD)
pattern="^(feat|fix)/.+$"

if echo "$branch_name" | grep -Eq "$pattern"; then
  echo "Branch name OK: $branch_name"
else
  echo "Invalid branch: '$branch_name'"
  echo "Allowed pattern: feat/<desc>  |  fix/<desc>"
  exit 1
fi
