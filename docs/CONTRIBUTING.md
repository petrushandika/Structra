# 🤝 Structra — Contributing Guidelines

Thank you for your interest in contributing to Structra! This document provides guidelines and instructions for contributing to the project.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Message Conventions](#commit-message-conventions)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)

---

## 📜 Code of Conduct

By participating in this project, you agree to:
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

---

## 🚀 How to Contribute

### Reporting Bugs

1. **Check existing issues** — Search GitHub Issues to see if the bug is already reported
2. **Create detailed report**:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Error messages and logs
   - System information (OS, Node.js version, etc.)
   - Screenshots if applicable

### Suggesting Features

1. **Check roadmap** — See [ROADMAP.md](ROADMAP.md) for planned features
2. **Create feature request**:
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation approach
   - Examples if applicable

### Contributing Code

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**
4. **Write tests** for new features
5. **Update documentation** if needed
6. **Submit a pull request**

---

## 🔧 Development Setup

### Prerequisites

- **Node.js** 18+ or newer
- **Bun** 1.0+ (for backend)
- **Docker** and **Docker Compose**
- **PostgreSQL** 14+ (or use Docker)
- **Git**

### Initial Setup

1. **Clone your fork**:
```bash
git clone https://github.com/your-username/structra.git
cd structra
```

2. **Add upstream remote**:
```bash
git remote add upstream https://github.com/your-org/structra.git
```

3. **Install dependencies**:
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
bun install
```

4. **Setup environment variables**:
```bash
# Copy example files
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

5. **Start services**:
```bash
docker-compose up -d
```

6. **Run migrations**:
```bash
cd backend
bun run db:migrate
```

7. **Start development servers**:
```bash
# Terminal 1: Backend
cd backend
bun run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

See [11 Getting Started](11%20Getting%20Started.md) for detailed setup instructions.

---

## 📝 Code Style Guidelines

### TypeScript/JavaScript

- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Use **meaningful variable names**
- Write **self-documenting code**
- Add **JSDoc comments** for public APIs

**Example:**
```typescript
/**
 * Analyzes a design image and generates canonical schema
 * @param image - Base64 encoded image or image URL
 * @param options - Analysis options
 * @returns Promise resolving to canonical schema
 */
async function analyzeDesign(
  image: string,
  options?: AnalysisOptions
): Promise<CanonicalSchema> {
  // Implementation
}
```

### File Organization

- **One component per file**
- **Group related files** in directories
- **Use index files** for clean imports
- **Separate concerns** (UI, logic, types)

### Naming Conventions

- **Files**: `kebab-case.ts` or `PascalCase.tsx` for components
- **Variables/Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`
- **Components**: `PascalCase`

---

## 💬 Commit Message Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(api): add batch processing endpoint

Add new /analyze/batch endpoint for processing multiple designs
in a single request. Includes rate limiting and error handling.

Closes #123
```

```
fix(ai): handle edge case in blob detection

Fix issue where blob shapes were not detected correctly when
overlapping with text elements.

Fixes #456
```

```
docs(readme): update installation instructions

Add Docker Compose setup instructions and environment variable
configuration details.
```

---

## 🔄 Pull Request Process

### Before Submitting

1. **Update your branch**:
```bash
git fetch upstream
git rebase upstream/main
```

2. **Run tests**:
```bash
# Frontend
cd frontend
npm test

# Backend
cd ../backend
bun test
```

3. **Check linting**:
```bash
npm run lint
bun run lint
```

4. **Update documentation** if your changes affect:
   - API endpoints
   - Configuration
   - Usage patterns
   - Architecture

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
```

### Review Process

1. **Automated checks** must pass (CI/CD)
2. **Code review** by maintainers
3. **Address feedback** and update PR
4. **Approval** from at least one maintainer
5. **Merge** by maintainer

---

## 🧪 Testing Requirements

### Unit Tests

- **Coverage target**: 80%+
- **Test new features**: All new code must have tests
- **Test bug fixes**: Include regression tests

**Example:**
```typescript
describe('analyzeDesign', () => {
  it('should generate canonical schema from image', async () => {
    const image = 'base64...';
    const result = await analyzeDesign(image);
    
    expect(result).toHaveProperty('meta');
    expect(result.meta.schemaVersion).toBe('1.0');
  });
});
```

### Integration Tests

- Test API endpoints
- Test database interactions
- Test AI pipeline integration

### E2E Tests

- Test complete user flows
- Test error scenarios
- Test edge cases

---

## 📚 Documentation

### Code Documentation

- **JSDoc** for all public functions
- **Type definitions** for complex types
- **Inline comments** for complex logic

### User Documentation

- Update relevant docs in `docs/` directory
- Add examples for new features
- Update API documentation if endpoints change
- Update CHANGELOG.md for user-facing changes

### Documentation Style

- Use clear, concise language
- Include code examples
- Add diagrams for complex concepts
- Cross-reference related docs

---

## 🎯 Areas for Contribution

### High Priority

- **Bug fixes** — Check GitHub Issues
- **Documentation improvements** — Clarify unclear sections
- **Test coverage** — Add missing tests
- **Performance optimizations** — Improve response times

### Medium Priority

- **New features** — See [ROADMAP.md](ROADMAP.md)
- **SDK improvements** — Enhance developer experience
- **UI/UX improvements** — Better user interface
- **Integration examples** — More use cases

### Low Priority

- **Code refactoring** — Improve code quality
- **Tooling improvements** — Better dev tools
- **Examples** — More code examples

---

## ❓ Getting Help

- **Documentation**: Check [README.md](README.md) and docs
- **Issues**: Search GitHub Issues
- **Discussions**: GitHub Discussions
- **Discord**: Community Discord server

---

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes for significant contributions
- Credited in documentation where applicable

Thank you for contributing to Structra! 🎉

---

<div align="center">

## 📖 Navigation

<table>
<tr>
<td align="left">

**[← Previous: CHANGELOG](CHANGELOG.md)**  
*Version History*

</td>
<td align="center">

**[↑ Index](README.md)**  
*Documentation Overview*

</td>
<td align="right">

**[Next: Troubleshooting →](TROUBLESHOOTING.md)**  
*Common Issues and Solutions*

</td>
</tr>
</table>

---

<details>
<summary><b>📚 Related Documentation</b></summary>

<table>
<tr>
<td>

**[Getting Started](11%20Getting%20Started.md)**  
Development setup guide

</td>
<td>

**[Architecture](09%20Architecture.md)**  
System architecture overview

</td>
</tr>
<tr>
<td>

**[Roadmap](ROADMAP.md)**  
Planned features and improvements

</td>
<td>

**[Code of Conduct](CONTRIBUTING.md#code-of-conduct)**  
Community guidelines

</td>
</tr>
</table>

</details>

</div>

