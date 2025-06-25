#!/bin/bash

# Set paths
DATE=$(date +%Y_%m_%d)
SOURCE_DIR="$HOME/Desktop/anchorstack-site"
BACKUP_DIR="$SOURCE_DIR/Backups"
ZIP_NAME="anchorstack_site_backup_${DATE}.zip"

# Create backups folder if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create the zip
zip -r "$BACKUP_DIR/$ZIP_NAME" \
  "$SOURCE_DIR/vault.html" \
  "$SOURCE_DIR/images/" \
  "$SOURCE_DIR/anchorstack_vault_lifetime_tracking.csv" \
  "$SOURCE_DIR/emails/" 2>/dev/null

echo "✅ Backup created: $BACKUP_DIR/$ZIP_NAME"

