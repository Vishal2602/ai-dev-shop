# n8n Workflows

This directory contains the three n8n workflows that power AI Dev Shop.

## Importing Workflows

1. Open your n8n instance
2. Go to **Workflows** → **Import from File**
3. Import each JSON file:
   - `client-intake.json` - First
   - `agent-executor.json` - Second
   - `project-orchestrator.json` - Third

## Configuration Required

After importing, you need to update credentials and IDs:

### 1. Replace Placeholder Values

Search and replace in each workflow:

| Placeholder | Replace With |
|-------------|--------------|
| `YOUR_CLIENT_CHANNEL_ID` | Your #client-portal Slack channel ID |
| `YOUR_INTERNAL_CHANNEL_ID` | Your #dev-team-internal Slack channel ID |
| `YOUR_GOOGLE_SHEETS_ID` | Your Google Sheets document ID |

### 2. Configure Credentials

Each workflow needs these credentials configured:

- **Slack API** - Bot User OAuth Token
- **Google Sheets OAuth2** - Service account credentials
- **SSH Password** - VPS access (Agent Executor only)

### 3. Activate Workflows

1. Test each workflow manually first
2. Toggle **Active** to ON
3. Verify webhook URLs are registered

## Workflow Dependency

```
Client Intake → Agent Executor → Project Orchestrator
     ↓                ↓                  ↓
  (Slack)         (Claude CLI)      (Phase Logic)
```

The workflows communicate via internal webhooks:
- `/webhook/agent-executor`
- `/webhook/orchestrator`
