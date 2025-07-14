# Repository Overview

This document provides an overview of all repositories in the Investigation Platform ecosystem.

## Main Monorepo

**investigation-platform** - Main monorepo containing all applications and packages
- **URL**: https://github.com/4eckd/investigation-platform
- **Description**: Nx monorepo with Next.js apps and shared packages
- **Technologies**: Nx, Next.js 14, TypeScript, React, Tailwind CSS
- **CI/CD**: GitHub Actions with semantic-release
- **Status**: ✅ Active Development

## Application Repositories

These repositories are available for splitting if legal isolation is needed:

### noahdummett-app
- **URL**: https://github.com/4eckd/noahdummett-app
- **Description**: Next.js 14 application for Noah Dummett
- **Path in monorepo**: `/apps/noahdummett`
- **Status**: 🔄 Ready for splitting

### cayc-app
- **URL**: https://github.com/4eckd/cayc-app
- **Description**: Next.js 14 application for CAYC
- **Path in monorepo**: `/apps/cayc`
- **Status**: 🔄 Ready for splitting

### brignac-app
- **URL**: https://github.com/4eckd/brignac-app
- **Description**: Next.js 14 application for Brignac
- **Path in monorepo**: `/apps/brignac`
- **Status**: 🔄 Ready for splitting

### terrytgiang-app
- **URL**: https://github.com/4eckd/terrytgiang-app
- **Description**: Next.js 14 application for Terry Tgiang
- **Path in monorepo**: `/apps/terrytgiang`
- **Status**: 🔄 Ready for splitting

## Package Repositories

These repositories are available for splitting shared packages:

### ui-components
- **URL**: https://github.com/4eckd/ui-components
- **Description**: Shared UI component library
- **Path in monorepo**: `/packages/ui`
- **Technologies**: React, TypeScript, Tailwind CSS
- **Status**: 🔄 Ready for splitting

### data-parser
- **URL**: https://github.com/4eckd/data-parser
- **Description**: Timeline and HAR parsing utilities
- **Path in monorepo**: `/packages/data-parser`
- **Technologies**: TypeScript, Node.js
- **Features**: Timeline parsing, HAR file analysis
- **Status**: 🔄 Ready for splitting

## Development Workflow

### Current State (Monorepo)
- All development happens in the main `investigation-platform` repository
- Shared dependencies and build tools
- Unified CI/CD pipeline
- Easy cross-package changes

### Future State (Split Repositories)
- Individual repositories for each application/package
- Independent development and deployment
- Separate CI/CD pipelines
- Legal isolation capabilities

## Quick Commands

### Clone the monorepo
```bash
git clone https://github.com/4eckd/investigation-platform.git
cd investigation-platform
npm install
```

### Start development
```bash
# Start specific app
npx nx dev noahdummett

# Build all projects
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

### Repository Management
```bash
# List all remotes
git remote -v

# Add split repository remotes (when needed)
git remote add origin-noahdummett https://github.com/4eckd/noahdummett-app.git
git remote add origin-ui https://github.com/4eckd/ui-components.git
```

## Status Legend

- ✅ **Active Development**: Primary development repository
- 🔄 **Ready for splitting**: Repository exists but not yet split
- 🔀 **Split and synced**: Repository has been split and is being maintained
- 📦 **Independent**: Repository is completely independent
- 🔒 **Archived**: Repository is archived and no longer maintained

## Next Steps

1. **Continue monorepo development** - Keep all code in the main repository
2. **Split when needed** - Use `git subtree` to split repositories for legal isolation
3. **Maintain sync** - Keep monorepo and split repositories in sync as needed
4. **Independent development** - Transition to independent development when appropriate

For detailed splitting instructions, see [subtree-splitting.md](./subtree-splitting.md).
