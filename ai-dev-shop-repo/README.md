<p align="center">
  <img src="assets/logo.svg" alt="AI Dev Shop Logo" width="200"/>
</p>

<h1 align="center">🏭 AI Dev Shop</h1>

<p align="center">
  <strong>Your AI-Powered Development Team That Never Sleeps</strong>
</p>

<p align="center">
  <a href="#-demo">View Demo</a> •
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-documentation">Documentation</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/n8n-Powered-orange?style=for-the-badge&logo=n8n" alt="n8n Powered"/>
  <img src="https://img.shields.io/badge/Claude-AI-blueviolet?style=for-the-badge" alt="Claude AI"/>
  <img src="https://img.shields.io/badge/Slack-Integration-4A154B?style=for-the-badge&logo=slack" alt="Slack"/>
  <img src="https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel" alt="Vercel"/>
</p>

---

## 🎬 Demo

<p align="center">
  <img src="assets/demo.gif" alt="AI Dev Shop Demo" width="800"/>
</p>

> **From idea to deployed app in ~15 minutes** — Watch 9 AI agents collaborate to build your web application in real-time via Slack.

### 🌐 Live Examples Built by AI Dev Shop

| Project | Description | Built In |
|---------|-------------|----------|
| [Air Fryer Timer](https://projlq9vh11766551950259.vercel.app) | React timer with 30+ food presets | 18 min |
| [QuestNotes](https://projua4vvx1766634968225.vercel.app) | GBA-style note-taking RPG | 21 min |

---

## ✨ Features

### 🤖 9 Specialized AI Agents

<table>
<tr>
<td align="center" width="11%">
<img src="assets/agents/maya.png" width="60"/><br/>
<b>Maya</b><br/>
<sub>Account Manager</sub>
</td>
<td align="center" width="11%">
<img src="assets/agents/chris.png" width="60"/><br/>
<b>Chris</b><br/>
<sub>Product Manager</sub>
</td>
<td align="center" width="11%">
<img src="assets/agents/alex.png" width="60"/><br/>
<b>Alex</b><br/>
<sub>Tech Lead</sub>
</td>
<td align="center" width="11%">
<img src="assets/agents/riley.png" width="60"/><br/>
<b>Riley</b><br/>
<sub>Designer</sub>
</td>
<td align="center" width="11%">
<img src="assets/agents/jordan.png" width="60"/><br/>
<b>Jordan</b><br/>
<sub>Frontend Dev</sub>
</td>
<td align="center" width="11%">
<img src="assets/agents/sam.png" width="60"/><br/>
<b>Sam</b><br/>
<sub>Backend Dev</sub>
</td>
<td align="center" width="11%">
<img src="assets/agents/taylor.png" width="60"/><br/>
<b>Taylor</b><br/>
<sub>Code Reviewer</sub>
</td>
<td align="center" width="11%">
<img src="assets/agents/quinn.png" width="60"/><br/>
<b>Quinn</b><br/>
<sub>QA Engineer</sub>
</td>
<td align="center" width="11%">
<img src="assets/agents/casey.png" width="60"/><br/>
<b>Casey</b><br/>
<sub>DevOps</sub>
</td>
</tr>
</table>

Each agent has a unique personality and specialization, working together through Slack channels just like a real development team.

### 🚀 End-to-End Automation

```
💬 Your Idea → 📋 Planning → 🎨 Design → 💻 Development → 🔍 Review → 🧪 Testing → 🚀 Deploy → 🎁 Delivered!
```

| What You Do | What AI Dev Shop Does |
|-------------|----------------------|
| Describe your idea in Slack | Everything else |
| Say "yes" to proceed | Creates project plan & architecture |
| Wait ~15 minutes | Designs UI, writes code, reviews, tests |
| Receive live URL | Deploys to GitHub & Vercel |

### 🛡️ Quality Built-In

- **Code Review Gate** — Taylor reviews all code, loops back for fixes if needed
- **Automated Testing** — Quinn creates comprehensive test plans
- **Consistent Architecture** — Agents read each other's docs for consistency
- **Error Recovery** — Smart retries and fallback responses

### 💬 Real-Time Collaboration

Watch your project come to life in Slack:

- **#client-portal** — Chat with Maya about your project
- **#dev-team-internal** — See agents collaborate in real-time
- **Progress Updates** — Get notified as each phase completes
- **Revision Support** — Request changes after delivery

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                        SLACK WORKSPACE                              │
│  ┌──────────────────┐              ┌──────────────────────────┐    │
│  │  #client-portal  │              │   #dev-team-internal     │    │
│  │  (Client ↔ Maya) │              │   (Agent Collaboration)  │    │
│  └────────┬─────────┘              └─────────────┬────────────┘    │
└───────────┼──────────────────────────────────────┼─────────────────┘
            │                                      │
            ▼                                      ▼
┌───────────────────────────────────────────────────────────────────┐
│                         n8n WORKFLOWS                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐   │
│  │  Client Intake  │→ │ Agent Executor  │→ │   Orchestrator  │   │
│  │  (Message Hub)  │  │  (Claude CLI)   │  │ (Phase Control) │   │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘   │
└───────────────────────────────────────────────────────────────────┘
            │                      │                    │
            ▼                      ▼                    ▼
┌───────────────────┐  ┌───────────────────┐  ┌─────────────────────┐
│   Google Sheets   │  │    VPS Server     │  │  GitHub + Vercel    │
│  (Project State)  │  │  (Code Execution) │  │    (Deployment)     │
└───────────────────┘  └───────────────────┘  └─────────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Workflow Engine** | [n8n](https://n8n.io) (self-hosted or cloud) |
| **AI Brain** | [Claude](https://anthropic.com) via Claude CLI |
| **Communication** | Slack Bot API |
| **State Management** | Google Sheets |
| **Code Execution** | VPS with SSH |
| **Deployment** | GitHub + Vercel |

---

## 🚀 Quick Start

### Prerequisites

- [n8n](https://n8n.io) instance (cloud or self-hosted)
- [Slack Workspace](https://slack.com) with bot permissions
- [Google Cloud](https://console.cloud.google.com) project with Sheets API
- VPS with [Claude CLI](https://github.com/anthropics/claude-cli) installed
- [Vercel](https://vercel.com) account
- [GitHub](https://github.com) account with CLI access

### Installation

1. **Clone this repository**
   ```bash
   git clone https://github.com/Vishal2602/ai-dev-shop.git
   cd ai-dev-shop
   ```

2. **Import workflows to n8n**
   - Go to your n8n instance
   - Import the 3 workflow JSON files from `/workflows`
   - Update credentials for Slack, Google Sheets, SSH

3. **Configure Slack**
   - Create a Slack app with Bot permissions
   - Create channels: `#client-portal`, `#dev-team-internal`
   - Install app to workspace

4. **Set up Google Sheets**
   - Create spreadsheet with "Projects" and "agent_personalities" sheets
   - Share with your Google service account
   - Update spreadsheet ID in workflows

5. **Configure VPS**
   - Install Claude CLI and authenticate
   - Create project directory: `/home/aidevshop/ai-dev-shop-projects/`
   - Set up GitHub CLI and Vercel CLI

6. **Activate workflows**
   - Enable all 3 workflows in n8n
   - Test with a message in #client-portal

### 📖 Detailed Setup Guide

See [docs/SETUP.md](docs/SETUP.md) for step-by-step instructions with screenshots.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Setup Guide](docs/SETUP.md) | Complete installation instructions |
| [Architecture](docs/ARCHITECTURE.md) | System design deep-dive |
| [Agent Personalities](docs/AGENTS.md) | Customize your AI team |
| [Troubleshooting](docs/TROUBLESHOOTING.md) | Common issues & solutions |
| [API Reference](docs/API.md) | Webhook endpoints & payloads |

---

## 🔧 Configuration

### Environment Variables

```env
# Slack
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_CLIENT_CHANNEL=C0A2V1H5W06
SLACK_INTERNAL_CHANNEL=C0A3RBZJCKS

# Google Sheets
GOOGLE_SHEETS_ID=your-spreadsheet-id

# VPS
VPS_HOST=your-vps-ip
VPS_USER=aidevshop
VPS_PROJECT_PATH=/home/aidevshop/ai-dev-shop-projects
```

### Customization

- **Agent Personalities**: Edit the `agent_personalities` sheet in Google Sheets
- **Phase Timeouts**: Modify `timeoutSeconds` in Agent Executor workflow
- **Quality Gates**: Adjust retry count in Orchestrator workflow

---

## 🤝 Contributing

We love contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Ideas for Contributions

- [ ] Add more agent personalities
- [ ] Support for additional deployment targets (Netlify, AWS)
- [ ] Mobile app integration
- [ ] Voice interface
- [ ] Project templates

---

## 📜 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [n8n](https://n8n.io) — The incredible workflow automation platform
- [Anthropic](https://anthropic.com) — For Claude AI
- [Slack](https://slack.com) — Team communication infrastructure
- [Vercel](https://vercel.com) — Seamless deployments

---

## 📬 Contact

- **Twitter**: [@YourHandle](https://twitter.com/YourHandle)
- **Email**: your.email@example.com
- **Discord**: [Join our community](https://discord.gg/yourserver)

---

<p align="center">
  <b>Built with ❤️ by humans and AI working together</b>
</p>

<p align="center">
  <a href="https://github.com/Vishal2602/ai-dev-shop/stargazers">⭐ Star us on GitHub</a>
</p>
