# AI Dev Shop - Setup Guide

Complete step-by-step instructions to get your AI Dev Shop running.

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] n8n account (cloud) or self-hosted instance
- [ ] Slack workspace with admin access
- [ ] Google Cloud account
- [ ] VPS or cloud server with SSH access
- [ ] GitHub account
- [ ] Vercel account
- [ ] Anthropic API key (for Claude CLI)

## 🔧 Step 1: n8n Setup

### Option A: n8n Cloud (Recommended)

1. Sign up at [n8n.io](https://n8n.io)
2. Create a new workspace
3. Note your instance URL (e.g., `https://your-instance.app.n8n.cloud`)

### Option B: Self-Hosted

```bash
# Using Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

## 💬 Step 2: Slack Configuration

### Create Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click **Create New App** → **From scratch**
3. Name: `AI Dev Shop`
4. Select your workspace

### Configure Bot Permissions

Navigate to **OAuth & Permissions** and add these Bot Token Scopes:

```
channels:history
channels:read
chat:write
chat:write.public
users:read
```

### Enable Event Subscriptions

1. Go to **Event Subscriptions**
2. Enable Events
3. Request URL: `https://your-n8n-instance/webhook/slack-events`
4. Subscribe to bot events:
   - `message.channels`
   - `message.groups`

### Create Channels

1. Create `#client-portal` (public)
2. Create `#dev-team-internal` (can be private)
3. Invite the bot to both channels

### Install App

1. Go to **Install App**
2. Click **Install to Workspace**
3. Copy the **Bot User OAuth Token** (starts with `xoxb-`)

### Get Channel IDs

In Slack:
1. Right-click channel name
2. Click **View channel details**
3. Scroll to bottom for Channel ID

## 📊 Step 3: Google Sheets Setup

### Create Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project: `AI Dev Shop`
3. Enable Google Sheets API
4. Create Service Account:
   - IAM & Admin → Service Accounts → Create
   - Name: `ai-dev-shop-sheets`
   - Grant role: Editor
5. Create key (JSON) and download

### Create Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet: `AI Dev Shop Data`
3. Share with service account email (found in JSON key)

### Set Up Sheets

**Sheet 1: Projects**

| project_id | thread_ts | channel_id | user_id | client_brief | current_phase | status | created_at | updated_at |
|------------|-----------|------------|---------|--------------|---------------|--------|------------|------------|

**Sheet 2: agent_personalities**

| agent_id | name | role | emoji | personality |
|----------|------|------|-------|-------------|
| acct_mgr | Maya | Account Manager | 👋 | Warm, professional, client-focused |
| pm | Chris | Product Manager | 📋 | Strategic, detail-oriented, organized |
| tech_lead | Alex | Tech Lead | 🔧 | Analytical, thorough, technical expert |
| designer | Riley | Designer | 🎨 | Creative, aesthetic-focused, user-centric |
| frontend | Jordan | Frontend Developer | 💻 | Detail-oriented, UI perfectionist |
| backend | Sam | Backend Developer | ⚙️ | Logical, systems-thinking, efficient |
| reviewer | Taylor | Code Reviewer | 🔍 | Meticulous, quality-focused, constructive |
| qa | Quinn | QA Engineer | 🧪 | Thorough, edge-case hunter, systematic |
| devops | Casey | DevOps Engineer | 🚀 | Automation expert, deployment specialist |

## 🖥️ Step 4: VPS Setup

### Provision Server

Recommended specs:
- 2 CPU cores
- 4GB RAM
- 40GB storage
- Ubuntu 22.04 LTS

### Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Claude CLI
npm install -g @anthropic-ai/claude-cli

# Authenticate Claude CLI
claude login
# Follow prompts to authenticate with Anthropic

# Install GitHub CLI
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update && sudo apt install gh -y

# Authenticate GitHub CLI
gh auth login

# Install Vercel CLI
npm install -g vercel

# Authenticate Vercel
vercel login
```

### Create Project Directory

```bash
# Create user
sudo useradd -m -s /bin/bash aidevshop
sudo passwd aidevshop

# Create project directory
sudo mkdir -p /home/aidevshop/ai-dev-shop-projects
sudo chown -R aidevshop:aidevshop /home/aidevshop
```

## 📥 Step 5: Import Workflows

### Import to n8n

1. In n8n, go to **Workflows**
2. Click **Import from File**
3. Import each workflow:
   - `workflows/client-intake.json`
   - `workflows/agent-executor.json`
   - `workflows/project-orchestrator.json`

### Configure Credentials

Create these credentials in n8n:

**Slack API**
- Type: Slack API
- Access Token: Your `xoxb-` token

**Google Sheets OAuth**
- Type: Google Sheets OAuth2
- Upload service account JSON

**SSH Password**
- Type: SSH Password
- Host: Your VPS IP
- Username: `aidevshop`
- Password: Your password

### Update Workflow Settings

In each workflow, update:

1. **Client Intake**
   - Slack channel IDs
   - Google Sheets document ID

2. **Agent Executor**
   - SSH host/credentials
   - Slack channel IDs
   - Google Sheets document ID

3. **Project Orchestrator**
   - Slack channel IDs
   - Google Sheets document ID

## ✅ Step 6: Activate & Test

### Activate Workflows

1. Open each workflow
2. Toggle **Active** to ON
3. Verify webhooks are registered

### Test the System

1. Go to `#client-portal` in Slack
2. Send a message: "I want to build a simple todo app"
3. Maya should respond within 30 seconds
4. Reply with "yes" or "let's build it"
5. Watch the magic happen!

## 🔍 Troubleshooting

### Workflow Not Triggering

- Check Slack Event Subscriptions URL
- Verify bot is in the channel
- Check n8n execution logs

### Claude CLI Errors

```bash
# Test Claude CLI manually
ssh aidevshop@your-vps
cd /home/aidevshop/ai-dev-shop-projects
claude -p "Hello, say 'test successful'"
```

### Google Sheets Access Denied

- Verify service account email is shared on spreadsheet
- Check OAuth token hasn't expired
- Regenerate credentials if needed

## 🎉 Success!

Your AI Dev Shop is now ready. Start building amazing things!

For advanced configuration, see:
- [Architecture Deep-Dive](ARCHITECTURE.md)
- [Agent Customization](AGENTS.md)
- [API Reference](API.md)
