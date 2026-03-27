#!/bin/bash
# Sync Obsidian vault to the repo's content folder

# Use environment variable or fallback to default path
OBSIDIAN_VAULT="${OBSIDIAN_VAULT_PATH:-/home/obsidian/refinekit_vault/Website}"
REPO_VAULT="$(dirname "$0")/../src/content/vault"

# Ensure the target directory exists
mkdir -p "$REPO_VAULT"

# Sync files (rsync preserves structure, deletes removed files)
rsync -av --delete \
  --exclude='.obsidian' \
  --exclude='.trash' \
  "$OBSIDIAN_VAULT/" "$REPO_VAULT/"

echo "Vault synced from $OBSIDIAN_VAULT to $REPO_VAULT"
