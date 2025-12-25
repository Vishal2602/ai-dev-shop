# 🏭 AI Dev Shop

**Multi-Agent AI Development Platform**

> A fully automated software development platform that simulates a complete development team using 9 specialized AI agents. Built on n8n workflow automation and powered by Claude AI, the system can take a client's idea and deliver a fully functional, deployed web application in approximately 15-20 minutes.

---

## 🚀 Key Features

- **End-to-end automation** from idea to deployment
- **9 specialized AI agents** with distinct personalities and roles
- **Real-time collaboration** via Slack channels
- **Automatic deployment** to GitHub and Vercel
- **Quality gates** with code review and testing phases
- **Client revision support** for post-delivery changes

---

## 🏗️ Architecture

### Technology Stack

| Component | Technology |
|-----------|------------|
| Workflow Engine | n8n Cloud |
| AI Model | Claude AI (Anthropic) |
| Communication | Slack (Bot API) |
| Data Storage | Google Sheets |
| Code Execution | VPS via SSH (Claude CLI) |
| Deployment | GitHub + Vercel |

### Core Workflows

| Workflow | ID | Purpose |
|----------|-----|---------|
| Client Intake | `jz1Y0oulAXAcHomp` | Handles Slack messages, project creation, conversation routing |
| Project Orchestrator | `U6UqbnU4BJUxGq3R` | Manages phase transitions, triggers agents, tracks progress |
| Agent Executor | `x7xaSutm8VusPuoV` | Executes AI agents via Claude CLI, posts responses to Slack |

### Slack Channels

| Channel | ID | Purpose |
|---------|-----|---------|
| #client-portal | `C0A2V1H5W06` | Client-facing communication |
| #dev-team-internal | `C0A3RBZJCKS` | Internal agent discussions |

---

## 👥 AI Agent Team

| Emoji | Name | Role | Agent ID | Personality |
|-------|------|------|----------|-------------|
| 👋 | Maya | Account Manager | `acct_mgr` | Warm, professional, client-focused |
| 📋 | Chris | Product Manager | `pm` | Strategic, detail-oriented, organized |
| 🔧 | Alex | Tech Lead | `tech_lead` | Analytical, thorough, technical expert |
| 🎨 | Riley | Designer | `designer` | Creative, aesthetic-focused, user-centric |
| 💻 | Jordan | Frontend Developer | `frontend` | Detail-oriented, UI perfectionist |
| ⚙️ | Sam | Backend Developer | `backend` | Logical, systems-thinking, efficient |
| 🔍 | Taylor | Code Reviewer | `reviewer` | Meticulous, quality-focused, constructive |
| 🧪 | Quinn | QA Engineer | `qa` | Thorough, edge-case hunter, systematic |
| 🚀 | Casey | DevOps Engineer | `devops` | Automation expert, deployment specialist |

---

## 📋 Project Lifecycle

### Development Phases

| # | Phase | Agents | Timeout | Deliverables |
|---|-------|--------|---------|--------------|
| 1 | Intake | Maya | 2 min | Client requirements gathered |
| 2 | Planning | Chris, Alex | 6 min | PROJECT_PLAN.md, ARCHITECTURE.md |
| 3 | Design | Riley | 6 min | DESIGN.md |
| 4 | Development | Jordan, Sam | 20 min | Complete React application |
| 5 | Review | Taylor | 7 min | Code review with PASS/FAIL |
| 6 | Testing | Quinn | 7 min | TEST_PLAN.md |
| 7 | Deployment | Casey | 12 min | GitHub repo, Vercel deployment |
| 8 | Delivery | Maya | 3 min | Live URLs delivered to client |

### Quality Gate

The Review phase includes a quality gate. If Taylor outputs `REVIEW_STATUS: FAIL`, the project loops back to Development for fixes (up to 2 retries).

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT                                   │
│                    (Slack #client-portal)                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT INTAKE WORKFLOW                        │
│  • Filter bot messages                                           │
│  • Detect new vs thread replies                                  │
│  • Create/update project in Google Sheets                        │
│  • Route to appropriate handler                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AGENT EXECUTOR WORKFLOW                       │
│  • Load agent personality                                        │
│  • Build context-aware prompt                                    │
│  • Execute Claude CLI via SSH                                    │
│  • Post response to Slack                                        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PROJECT ORCHESTRATOR WORKFLOW                   │
│  • Check idempotency (prevent duplicates)                        │
│  • Determine next phase                                          │
│  • Update Google Sheets                                          │
│  • Trigger next agents                                           │
│  • Enforce quality gate                                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    [Repeat until complete]
```

---

## 📁 Project File Structure

Each project creates the following structure on the VPS:

```
/home/aidevshop/ai-dev-shop-projects/{project_id}/
├── PROJECT_PLAN.md      # Project overview and features
├── ARCHITECTURE.md      # Technical architecture decisions
├── DESIGN.md            # Design system and styling
├── TEST_PLAN.md         # Testing strategy and cases
├── DEPLOYMENT.md        # Live URLs and deployment info
├── src/                 # Application source code
├── docs/                # Additional documentation
└── uploads/             # Client-uploaded files
```

---

## ⚙️ Configuration

### Google Sheets Structure

**Spreadsheet ID:** `1ENLzIEmiIEPmYBF1vDdiiGjR4kSJqjsAr6XM7TwtTU8`

#### Projects Sheet

| Column | Description |
|--------|-------------|
| project_id | Unique identifier (e.g., proj_abc123_1766551950259) |
| thread_ts | Slack thread timestamp for replies |
| channel_id | Slack channel ID |
| user_id | Client's Slack user ID |
| client_brief | Accumulated client requirements |
| current_phase | Current development phase |
| status | active, stopped, revising, complete |
| created_at | Project creation timestamp |
| updated_at | Last update timestamp |

#### Agent Personalities Sheet

| Column | Description |
|--------|-------------|
| agent_id | Unique agent identifier |
| name | Agent's display name |
| role | Job title/role |
| emoji | Agent's emoji identifier |
| personality | Personality description for prompts |

### Webhook Endpoints

| Endpoint | URL |
|----------|-----|
| Agent Executor | `http://localhost:5678/webhook/agent-executor` |
| Orchestrator | `http://localhost:5678/webhook/orchestrator` |

### Required Credentials

| Credential | Purpose |
|------------|---------|
| Slack API | Bot token for posting messages |
| Google Sheets OAuth | Read/write project data |
| SSH Password | Access to VPS for Claude CLI |

---

## 🔧 Troubleshooting

### Common Issues

#### Duplicate Messages/Transitions
- **Symptom:** Same phase transition posted multiple times
- **Cause:** Race condition when multiple agents complete simultaneously
- **Solution:** Idempotency check in Orchestrator prevents duplicates

#### Infinite Loop / Bot Responding to Self
- **Symptom:** Workflow triggers repeatedly on its own messages
- **Cause:** Bot message not filtered, especially message_changed events
- **Solution:** Parse Message node filters by bot_id, app_id, bot_profile, subtype, and n8n signature

#### Agent Response Truncated
- **Symptom:** Agent response cut off mid-sentence
- **Cause:** Timeout reached before Claude CLI completed
- **Solution:** Increase timeout for complex phases

#### Inconsistent Project Names
- **Symptom:** Different agents use different names for the same project
- **Cause:** Agents not reading existing project documentation
- **Solution:** Shared context instructions tell agents to read PROJECT_PLAN.md first

### Debug Checklist

1. Check workflow execution logs in n8n
2. Verify Google Sheets project status and phase
3. Check Slack channel for error notifications
4. Verify SSH connection to VPS
5. Check Claude CLI authentication on VPS
6. Review project folder contents on VPS

---

## 🆕 Recent Improvements (v2.0)

### Race Condition Fix
Implemented idempotency check to prevent duplicate phase transitions when multiple agents complete simultaneously.

### Agent Consistency
Added shared context instructions requiring agents to read existing documentation before starting work.

### Quality Gate Enforcement
Review phase now enforces quality gates with loop-back on FAIL (up to 2 retries).

### Improved Timeouts
Increased timeouts: Development (20 min), Deployment (12 min), Review (7 min).

### Client Progress Updates
Added friendly progress notifications with estimated time remaining.

### Smart Truncation
Improved response truncation that preserves REVIEW_STATUS and deployment URLs.

---

## 📄 License

Proprietary - All rights reserved

---

## 👤 Author

Built with ❤️ using n8n + Claude AI

**n8n Instance:** https://n8n.srv1191709.hstgr.cloud
