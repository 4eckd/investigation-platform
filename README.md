# Investigation Platform

[![CI](https://github.com/your-org/investigation-platform/workflows/CI/badge.svg)](https://github.com/your-org/investigation-platform/actions)

A monorepo containing Next.js applications and shared libraries for the Investigation Platform. Built with Nx for optimal developer experience and CI/CD automation.

## 🏗️ Architecture

This monorepo follows a structured approach:

```
investigation-platform/
├── apps/
│   ├── noahdummett/     # Next.js 14 app (app router)
│   ├── cayc/            # Next.js 14 app (app router)
│   ├── brignac/         # Next.js 14 app (app router)
│   └── terrytgiang/     # Next.js 14 app (app router)
├── packages/
│   ├── ui/              # Shared component library
│   └── data-parser/     # Timeline & HAR parsing utilities
└── tools/               # Build tools and configurations
```

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npx nx dev noahdummett  # or cayc, brignac, terrytgiang
   ```

3. **Build all projects**:
   ```bash
   npm run build
   ```

## 📦 Projects

### Applications

- **`apps/noahdummett`** - Next.js 14 application with app router
- **`apps/cayc`** - Next.js 14 application with app router
- **`apps/brignac`** - Next.js 14 application with app router
- **`apps/terrytgiang`** - Next.js 14 application with app router

### Shared Libraries

- **`packages/ui`** - Shared React component library with TypeScript
- **`packages/data-parser`** - Timeline and HAR parsing utilities

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server for all apps
- `npm run build` - Build all projects
- `npm run lint` - Lint all projects
- `npm run test` - Run tests for all projects
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run commit` - Create conventional commits

### Working with Nx

```bash
# Run specific project
npx nx dev noahdummett
npx nx build ui
npx nx lint data-parser

# Run command for multiple projects
npx nx run-many -t build
npx nx run-many -t lint -p ui,data-parser

# Show project graph
npx nx graph
```

## 🔄 Git Workflow

### Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning:

```bash
# Use the commit helper
npm run commit

# Or format manually
git commit -m "feat: add new timeline parser"
git commit -m "fix: resolve HAR parsing issue"
git commit -m "docs: update README"
```

### Supported Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

## 🚢 CI/CD

### GitHub Actions

Automated workflows for:

- **Linting** - ESLint and Prettier checks
- **Testing** - Unit and integration tests
- **Building** - Production builds
- **Releases** - Automated semantic versioning

### Semantic Release

Automated versioning and releases based on commit messages:

- `fix:` triggers patch release (1.0.1)
- `feat:` triggers minor release (1.1.0)
- `BREAKING CHANGE:` triggers major release (2.0.0)

## 📊 Data Parser Features

### Timeline Parser

```typescript
import { TimelineParser } from '@investigation-platform/data-parser';

// Parse from JSON
const timeline = TimelineParser.parseFromJSON(jsonData);

// Parse from Markdown
const timeline = TimelineParser.parseFromMarkdown(markdownData);

// Filter and export
const filtered = TimelineParser.filterByDateRange(timeline, startDate, endDate);
const exported = TimelineParser.exportToJSON(filtered);
```

### HAR Parser

```typescript
import { HARParser } from '@investigation-platform/data-parser';

// Parse HAR file
const harData = HARParser.parseFromJSON(harFileContent);

// Analyze performance
const metrics = HARParser.getPerformanceMetrics(harData);

// Export analysis
const analysis = HARParser.exportAnalysis(harData);
const csv = HARParser.exportToCSV(harData);
```

## 🎨 UI Components

```typescript
import { Button, Card, Layout } from '@investigation-platform/ui';

// Use shared components
<Layout header={<Header />}>
  <Card>
    <Button variant="primary" size="lg">
      Get Started
    </Button>
  </Card>
</Layout>
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests for specific project
npx nx test ui
npx nx test data-parser

# Run e2e tests
npx nx e2e noahdummett-e2e
```

## 📚 Learn More

- [Nx Documentation](https://nx.dev)
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Release](https://github.com/semantic-release/semantic-release)

## 🔧 Future Enhancements

- **Subtree Splitting**: Sub-repos can be split later via `git subtree` if legal isolation is needed
- **Micro-frontends**: Module federation for independent deployments
- **Shared Documentation**: Unified documentation site
- **Design System**: Extended UI component library
