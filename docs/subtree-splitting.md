# Subtree Splitting Guide

This document explains how to split the monorepo into separate repositories if legal isolation is needed.

## Available Repositories

The following repositories have been created and are ready for subtree splitting:

### Applications
- **noahdummett-app**: https://github.com/4eckd/noahdummett-app
- **cayc-app**: https://github.com/4eckd/cayc-app
- **brignac-app**: https://github.com/4eckd/brignac-app
- **terrytgiang-app**: https://github.com/4eckd/terrytgiang-app

### Packages
- **ui-components**: https://github.com/4eckd/ui-components
- **data-parser**: https://github.com/4eckd/data-parser

## Splitting Process

### Prerequisites

1. Ensure you have push access to the target repositories
2. Have the main investigation-platform repository cloned locally
3. Install GitHub CLI (`gh`) if not already installed

### Splitting an Application

To split an application (e.g., noahdummett):

```bash
# 1. Navigate to the monorepo root
cd investigation-platform

# 2. Create a subtree push to the target repository
git subtree push --prefix=apps/noahdummett origin-noahdummett master

# 3. Add the remote for the target repository (if not already added)
git remote add origin-noahdummett https://github.com/4eckd/noahdummett-app.git

# 4. Push the subtree
git subtree push --prefix=apps/noahdummett origin-noahdummett master
```

### Splitting a Package

To split a package (e.g., ui):

```bash
# 1. Navigate to the monorepo root
cd investigation-platform

# 2. Add the remote for the target repository
git remote add origin-ui https://github.com/4eckd/ui-components.git

# 3. Push the subtree
git subtree push --prefix=packages/ui origin-ui master
```

### Automated Splitting Script

Here's a script to automate the splitting process:

```bash
#!/bin/bash

# Split applications
declare -A apps=(
  ["noahdummett"]="https://github.com/4eckd/noahdummett-app.git"
  ["cayc"]="https://github.com/4eckd/cayc-app.git"
  ["brignac"]="https://github.com/4eckd/brignac-app.git"
  ["terrytgiang"]="https://github.com/4eckd/terrytgiang-app.git"
)

# Split packages
declare -A packages=(
  ["ui"]="https://github.com/4eckd/ui-components.git"
  ["data-parser"]="https://github.com/4eckd/data-parser.git"
)

# Function to split and push
split_and_push() {
  local prefix=$1
  local remote_name=$2
  local remote_url=$3
  
  echo "Splitting $prefix to $remote_url"
  
  # Add remote if it doesn't exist
  if ! git remote get-url "$remote_name" > /dev/null 2>&1; then
    git remote add "$remote_name" "$remote_url"
  fi
  
  # Push subtree
  git subtree push --prefix="$prefix" "$remote_name" master
}

# Split applications
for app in "${!apps[@]}"; do
  split_and_push "apps/$app" "origin-$app" "${apps[$app]}"
done

# Split packages
for package in "${!packages[@]}"; do
  split_and_push "packages/$package" "origin-$package" "${packages[$package]}"
done
```

## Maintaining Split Repositories

After splitting, you can continue to develop in the monorepo and push changes to individual repositories:

```bash
# To push updates to a specific repository
git subtree push --prefix=apps/noahdummett origin-noahdummett master

# To pull changes from a split repository back to monorepo
git subtree pull --prefix=apps/noahdummett origin-noahdummett master
```

## Important Notes

1. **One-way sync**: Initially, splitting is one-way from monorepo to individual repos
2. **History preservation**: `git subtree` preserves commit history for the split directories
3. **Independent development**: Once split, repositories can be developed independently
4. **Legal isolation**: Each repository can have its own license and access controls
5. **CI/CD**: Each split repository will need its own CI/CD configuration

## Considerations

- **Shared dependencies**: Split repositories will lose the benefit of shared dependencies
- **Code duplication**: Common code might need to be duplicated or published as separate packages
- **Maintenance overhead**: More repositories means more maintenance
- **Deployment complexity**: Individual deployment pipelines need to be set up

## Reverting Split

If you need to revert back to monorepo development:

1. Archive or delete the split repositories
2. Remove the remote references from the monorepo
3. Continue development in the monorepo as normal

The monorepo approach allows for easy transition between unified and split development based on legal and business requirements.
