# Contributing to AI Dev Shop

First off, thank you for considering contributing to AI Dev Shop! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming environment. Please be respectful and constructive in all interactions.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (n8n version, browser, etc.)

### 💡 Suggesting Features

Feature requests are welcome! Please include:

- **Use case** - Why is this feature needed?
- **Proposed solution** - How should it work?
- **Alternatives considered** - Other approaches you've thought about

### 🔧 Code Contributions

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

## Development Setup

### Prerequisites

- n8n instance (local or cloud)
- Node.js 18+
- Access to test Slack workspace
- Google Cloud project

### Local Development

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ai-dev-shop.git
cd ai-dev-shop

# Import workflows to your n8n instance
# Update credentials with your test accounts
# Activate workflows and test
```

### Testing Changes

1. Make changes to workflow JSON files
2. Import updated workflow to n8n
3. Test the complete flow from Slack message to deployment
4. Document any new configuration required

## Pull Request Process

1. **Update documentation** for any changed functionality
2. **Test thoroughly** - run a complete project through the system
3. **Update README** if adding new features
4. **Request review** from maintainers
5. **Address feedback** promptly

### PR Title Format

```
feat: Add new agent personality system
fix: Resolve duplicate message issue
docs: Update setup instructions
refactor: Simplify orchestrator logic
```

## Style Guidelines

### Workflow Naming

- Use descriptive node names: "Parse Client Message" not "Code1"
- Group related nodes visually
- Add sticky notes for complex logic

### Code in Code Nodes

```javascript
// ✅ Good: Clear, commented, error-handled
const projectId = body.projectId || 'unknown';
if (!projectId) {
  console.log('ERROR: Missing projectId');
  return [];
}

// ❌ Bad: Unclear, no error handling
const p = b.p;
```

### Documentation

- Use clear, concise language
- Include examples for complex features
- Keep setup instructions up-to-date

## 🏆 Recognition

Contributors will be:
- Listed in our README
- Mentioned in release notes
- Invited to our contributors Discord channel

## Questions?

Feel free to open an issue with the "question" label or reach out directly.

---

Thank you for helping make AI Dev Shop better! 🚀
