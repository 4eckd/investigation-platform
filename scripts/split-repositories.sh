#!/bin/bash

# Investigation Platform Repository Splitting Script
# This script automates the process of splitting the monorepo into individual repositories

set -e

echo "🚀 Investigation Platform Repository Splitting Script"
echo "=================================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "\n${BLUE}=== $1 ===${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "apps" ] || [ ! -d "packages" ]; then
    print_error "This script must be run from the root of the investigation-platform monorepo"
    exit 1
fi

print_status "Found monorepo structure"

# Define applications and their target repositories
declare -A apps=(
    ["noahdummett"]="https://github.com/4eckd/noahdummett-app.git"
    ["cayc"]="https://github.com/4eckd/cayc-app.git"
    ["brignac"]="https://github.com/4eckd/brignac-app.git"
    ["terrytgiang"]="https://github.com/4eckd/terrytgiang-app.git"
)

# Define packages and their target repositories
declare -A packages=(
    ["ui"]="https://github.com/4eckd/ui-components.git"
    ["data-parser"]="https://github.com/4eckd/data-parser.git"
)

# Function to add remote if it doesn't exist
add_remote_if_not_exists() {
    local remote_name=$1
    local remote_url=$2
    
    if git remote get-url "$remote_name" >/dev/null 2>&1; then
        print_warning "Remote '$remote_name' already exists"
    else
        git remote add "$remote_name" "$remote_url"
        print_status "Added remote '$remote_name' -> '$remote_url'"
    fi
}

# Function to split and push a subtree
split_and_push() {
    local prefix=$1
    local remote_name=$2
    local remote_url=$3
    
    print_header "Splitting $prefix"
    
    # Check if the directory exists
    if [ ! -d "$prefix" ]; then
        print_error "Directory '$prefix' does not exist"
        return 1
    fi
    
    # Add remote
    add_remote_if_not_exists "$remote_name" "$remote_url"
    
    # Fetch the remote to ensure it exists
    if ! git fetch "$remote_name" >/dev/null 2>&1; then
        print_error "Failed to fetch from remote '$remote_name'. Please ensure the repository exists and you have access."
        return 1
    fi
    
    # Push subtree
    print_status "Pushing subtree from '$prefix' to '$remote_name'"
    if git subtree push --prefix="$prefix" "$remote_name" master; then
        print_status "Successfully pushed '$prefix' to '$remote_url'"
    else
        print_error "Failed to push '$prefix' to '$remote_url'"
        return 1
    fi
}

# Function to display menu
show_menu() {
    echo ""
    echo "What would you like to do?"
    echo "1) Split all applications"
    echo "2) Split all packages"
    echo "3) Split everything"
    echo "4) Split specific application"
    echo "5) Split specific package"
    echo "6) List current remotes"
    echo "7) Exit"
    echo ""
    read -p "Enter your choice [1-7]: " choice
}

# Function to list remotes
list_remotes() {
    print_header "Current Git Remotes"
    git remote -v
}

# Function to split all applications
split_all_apps() {
    print_header "Splitting All Applications"
    for app in "${!apps[@]}"; do
        split_and_push "apps/$app" "origin-$app" "${apps[$app]}"
    done
}

# Function to split all packages
split_all_packages() {
    print_header "Splitting All Packages"
    for package in "${!packages[@]}"; do
        split_and_push "packages/$package" "origin-$package" "${packages[$package]}"
    done
}

# Function to split specific application
split_specific_app() {
    echo ""
    echo "Available applications:"
    for app in "${!apps[@]}"; do
        echo "  - $app"
    done
    echo ""
    read -p "Enter application name: " app_name
    
    if [[ -n "${apps[$app_name]}" ]]; then
        split_and_push "apps/$app_name" "origin-$app_name" "${apps[$app_name]}"
    else
        print_error "Application '$app_name' not found"
    fi
}

# Function to split specific package
split_specific_package() {
    echo ""
    echo "Available packages:"
    for package in "${!packages[@]}"; do
        echo "  - $package"
    done
    echo ""
    read -p "Enter package name: " package_name
    
    if [[ -n "${packages[$package_name]}" ]]; then
        split_and_push "packages/$package_name" "origin-$package_name" "${packages[$package_name]}"
    else
        print_error "Package '$package_name' not found"
    fi
}

# Main menu loop
while true; do
    show_menu
    case $choice in
        1)
            split_all_apps
            ;;
        2)
            split_all_packages
            ;;
        3)
            split_all_apps
            split_all_packages
            ;;
        4)
            split_specific_app
            ;;
        5)
            split_specific_package
            ;;
        6)
            list_remotes
            ;;
        7)
            print_status "Goodbye!"
            exit 0
            ;;
        *)
            print_error "Invalid choice. Please try again."
            ;;
    esac
done
