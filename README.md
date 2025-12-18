# AI Dev Shop

> A fully autonomous AI-powered software development company that builds your product ideas

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Agent Roster](#agent-roster)
5. [Communication Channels](#communication-channels)
6. [Workflow Architecture](#workflow-architecture)
7. [Session Management](#session-management)
8. [File Handling](#file-handling)
9. [Agent Personality System](#agent-personality-system)
10. [Implementation Guide](#implementation-guide)
11. [Example Scenario](#example-scenario)
12. [Deployment](#deployment)
13. [Future Enhancements](#future-enhancements)

---

## Project Overview

### Concept

AI Dev Shop is a simulated software development company powered entirely by AI agents. Each agent has a distinct role, personality, and responsibilities. When a client (user) submits a project brief, the agents collaborate to design, build, review, test, and deploy a fully functional application.

### Key Features

- **Multi-Agent Collaboration**: 9+ specialized AI agents working together
- **Real-Time Visibility**: Watch internal discussions, debates, and decisions unfold
- **Actual Deliverables**: Real code committed to GitHub, deployed applications
- **Customizable Personalities**: Configure each agent's style, quirks, and communication patterns
- **Session Persistence**: Agents maintain context throughout the entire project lifecycle
- **Professional Client Experience**: Clean client-facing communication separate from internal chaos

### Value Proposition

| For Portfolio | For Practical Use |
|---------------|-------------------|
| Demonstrates complex AI orchestration | Actually builds working applications |
| Showcases n8n automation expertise | Reduces development time |
| Unique and impressive concept | Handles full development lifecycle |
| Real working system, not a mockup | Learns and improves over time |

---

## Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                   │
│                                                                             │
│                        You (The Client)                                     │
│                              │                                              │
│                              ▼                                              │
│                     Slack #client-portal                                    │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ORCHESTRATION LAYER                               │
│                                                                             │
│                        n8n Workflow Engine                                  │
│                              │                                              │
│              ┌───────────────┼───────────────┐                              │
│              ▼               ▼               ▼                              │
│         Triggers        Routing         State Mgmt                          │
│     (Slack, Webhook)   (Agent Queue)   (Google Sheets)                      │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            EXECUTION LAYER                                  │
│                                                                             │
│                    Linux Server + Claude Code                               │
│                              │                                              │
│    ┌──────────┬──────────┬──────────┬──────────┬──────────┐                │
│    ▼          ▼          ▼          ▼          ▼          ▼                │
│  Agent 1   Agent 2   Agent 3   Agent 4   Agent 5   Agent N                 │
│ (Session)  (Session) (Session) (Session) (Session) (Session)               │
│                              │                                              │
│                              ▼                                              │
│                    /projects/{project_id}/                                  │
│                      (Shared Codebase)                                      │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DELIVERY LAYER                                   │
│                                                                             │
│              ┌───────────────┴───────────────┐                              │
│              ▼                               ▼                              │
│          GitHub                          Vercel                             │
│       (Source Code)                   (Deployment)                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
Client Brief (Slack)
       │
       ▼
n8n: Parse & Create Project ID
       │
       ▼
n8n: Load Agent Personalities (Google Sheet)
       │
       ▼
n8n: Trigger Account Manager
       │
       ▼
SSH: Claude Code (Account Manager Session)
       │
       ├──► Response to #client-portal
       │
       ▼
n8n: Trigger Internal Team
       │
       ▼
SSH: Claude Code (PM Session)
       │
       ├──► Posts to #internal-chaos
       │
       ▼
SSH: Claude Code (Tech Lead Session) ◄──── Parallel
SSH: Claude Code (Designer Session)  ◄──── Execution
       │
       ▼
n8n: Monitor Progress & Route Messages
       │
       ▼
SSH: Claude Code (Dev Sessions) ──► Write Code ──► Git Commit
       │
       ▼
SSH: Claude Code (Reviewer Session) ──► Review ──► Request Changes
       │
       ▼
SSH: Claude Code (QA Session) ──► Test ──► Report Bugs
       │
       ▼
SSH: Claude Code (DevOps Session) ──► Deploy
       │
       ▼
n8n: Notify Client via Account Manager
       │
       ▼
Deliverables: GitHub Repo + Live URL
```

---

## Technology Stack

### Core Components

| Component | Technology | Purpose |
|-----------|------------|---------|
| Orchestration | n8n (Cloud or Self-hosted) | Workflow automation, agent coordination |
| AI Engine | Claude Code (via SSH) | Agent brains, code generation, reasoning |
| Communication | Slack | Client portal, internal channels |
| State Storage | Google Sheets | Agent personalities, project state |
| Code Repository | GitHub | Version control, deliverables |
| Deployment | Vercel / Netlify | Application hosting |
| Server | Ubuntu Linux VPS | Claude Code execution environment |

### Infrastructure Requirements

**Linux Server (Claude Code Host):**
- Ubuntu 22.04+ or similar
- 4GB RAM minimum (8GB recommended)
- Node.js 20+
- Claude Code CLI installed and authenticated
- SSH access configured
- Git configured with GitHub credentials

**n8n Instance:**
- Cloud (n8n.cloud) or self-hosted
- SSH credentials configured
- Slack integration
- Google Sheets integration
- HTTP Request capability

**Slack Workspace:**
- Bot user with appropriate permissions
- Channels created (see Communication Channels)
- Incoming webhooks enabled

---

## Agent Roster

### Core Team (9 Agents)

| Agent ID | Name | Role | Primary Responsibility |
|----------|------|------|------------------------|
| `acct_mgr` | Maya | Account Manager | Client communication, project intake |
| `pm` | Chris | Product Manager | Task breakdown, milestone tracking |
| `tech_lead` | Alex | Tech Lead | Architecture decisions, technical direction |
| `designer` | Riley | Designer | UI/UX design, wireframes, design system |
| `frontend` | Jordan | Frontend Developer | User interface implementation |
| `backend` | Sam | Backend Developer | API, database, server logic |
| `reviewer` | Taylor | Code Reviewer | Code quality, standards enforcement |
| `qa` | Quinn | QA Tester | Testing, bug discovery, edge cases |
| `devops` | Casey | DevOps Engineer | Deployment, infrastructure, CI/CD |

### Agent Interaction Matrix

```
                 Maya  Chris  Alex  Riley  Jordan  Sam  Taylor  Quinn  Casey
Maya (Acct)       -      ✓      ○      ○      ○     ○      ○      ○      ○
Chris (PM)        ✓      -      ✓      ✓      ✓     ✓      ○      ✓      ✓
Alex (Tech)       ○      ✓      -      ✓      ✓     ✓      ✓      ○      ✓
Riley (Design)    ○      ✓      ✓      -      ✓     ○      ○      ○      ○
Jordan (Front)    ○      ✓      ✓      ✓      -     ✓      ✓      ✓      ○
Sam (Back)        ○      ✓      ✓      ○      ✓     -      ✓      ✓      ○
Taylor (Review)   ○      ○      ✓      ○      ✓     ✓      -      ○      ○
Quinn (QA)        ○      ✓      ○      ○      ✓     ✓      ○      -      ✓
Casey (DevOps)    ○      ✓      ✓      ○      ○     ○      ○      ✓      -

Legend: ✓ = Frequent interaction, ○ = Occasional interaction, - = Self
```

---

## Communication Channels

### Slack Channel Structure

| Channel | Purpose | Participants | Visibility |
|---------|---------|--------------|------------|
| `#client-portal` | Client-facing communication | Client + Maya only | Client sees |
| `#internal-chaos` | All internal discussion | All agents | Client watches |
| `#code-reviews` | Code review discussions | Tech Lead, Devs, Reviewer | Client watches |
| `#design` | UI/UX discussions | Designer, Frontend, PM | Client watches |
| `#deployments` | Build/deploy notifications | DevOps, automated | Client watches |
| `#alerts` | System alerts, blockers | All agents | Client watches |

### Message Format Standards

**Agent Messages:**
```
{emoji} {Name} ({Role}):
{Message content}

@{mention} {action or question if needed}
```

**Example:**
```
🏗️ Alex (Tech Lead):
Let's not overcomplicate this. For the MVP, I suggest:
- Next.js for the frontend
- SQLite for data (single user, keep it simple)
- Vercel for deployment

@Sam start on the data schema once @Riley has wireframes.
```

**Commit Notifications (Automated):**
```
🔔 Commit: {commit_message}
Author: {Agent Name} ({Role})
Files: {files_changed}
Branch: {branch_name}
```

---

## Workflow Architecture

### Master Orchestrator Workflow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MASTER ORCHESTRATOR                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                     │
│  │   Slack     │    │   Parse     │    │  Generate   │                     │
│  │  Trigger    │───►│   Brief     │───►│ Project ID  │                     │
│  │             │    │             │    │ + Sessions  │                     │
│  └─────────────┘    └─────────────┘    └─────────────┘                     │
│                                               │                             │
│                                               ▼                             │
│                                    ┌─────────────────┐                      │
│                                    │ Load Personality │                     │
│                                    │   Config Sheet   │                     │
│                                    └─────────────────┘                      │
│                                               │                             │
│                                               ▼                             │
│                                    ┌─────────────────┐                      │
│                                    │ Account Manager │                      │
│                                    │   Sub-Workflow  │                      │
│                                    └─────────────────┘                      │
│                                               │                             │
│         ┌─────────────────────────────────────┼──────────────────┐          │
│         ▼                                     ▼                  ▼          │
│  ┌─────────────┐                    ┌─────────────┐    ┌─────────────┐      │
│  │     PM      │                    │  Tech Lead  │    │   Designer  │      │
│  │ Sub-Workflow│                    │ Sub-Workflow│    │ Sub-Workflow│      │
│  └─────────────┘                    └─────────────┘    └─────────────┘      │
│         │                                     │                  │          │
│         └─────────────────────────────────────┼──────────────────┘          │
│                                               ▼                             │
│                              ┌────────────────────────────┐                 │
│                              │    Development Phase       │                 │
│                              │  (Frontend + Backend)      │                 │
│                              └────────────────────────────┘                 │
│                                               │                             │
│                                               ▼                             │
│                              ┌────────────────────────────┐                 │
│                              │      Review Phase          │                 │
│                              │   (Code Review + QA)       │                 │
│                              └────────────────────────────┘                 │
│                                               │                             │
│                                               ▼                             │
│                              ┌────────────────────────────┐                 │
│                              │     Deployment Phase       │                 │
│                              │    (DevOps + Delivery)     │                 │
│                              └────────────────────────────┘                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Agent Sub-Workflow Template

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      AGENT SUB-WORKFLOW: {Agent Name}                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                     │
│  │  Receive    │    │    Load     │    │   Build     │                     │
│  │   Task      │───►│ Personality │───►│   Prompt    │                     │
│  │             │    │             │    │             │                     │
│  └─────────────┘    └─────────────┘    └─────────────┘                     │
│                                               │                             │
│                                               ▼                             │
│                                    ┌─────────────────┐                      │
│                                    │   SSH: Claude   │                      │
│                                    │   Code Execute  │                      │
│                                    └─────────────────┘                      │
│                                               │                             │
│                                               ▼                             │
│                                    ┌─────────────────┐                      │
│                                    │  Parse Response │                      │
│                                    │  (Slack + Code) │                      │
│                                    └─────────────────┘                      │
│                                               │                             │
│                          ┌────────────────────┼────────────────────┐        │
│                          ▼                    ▼                    ▼        │
│                   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    │
│                   │ Post Slack  │    │ Git Commit  │    │ Update State│    │
│                   │   Message   │    │ (if code)   │    │   Sheet     │    │
│                   └─────────────┘    └─────────────┘    └─────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Workflow Triggers & Routing

| Trigger | Condition | Routes To |
|---------|-----------|-----------|
| New Slack message in #client-portal | From client | Account Manager |
| Account Manager completes | Always | PM + Tech Lead (parallel) |
| PM completes task breakdown | Always | Post to #internal-chaos |
| Tech Lead decides architecture | Always | Designer + create project |
| Designer completes wireframes | Always | Frontend + Backend |
| Developer commits code | Always | Code Reviewer |
| Code Reviewer approves | All code approved | QA Tester |
| QA finds bugs | Critical bugs exist | Route back to Developers |
| QA approves | All tests pass | DevOps |
| DevOps deploys | Always | Account Manager (delivery) |
| Client requests revision | In #client-portal | PM (re-route) |

---

## Session Management

### Session ID Structure

```
{agent_id}_{project_id}_{timestamp}

Examples:
- maya_acct_proj_inv001_1702234567
- sam_backend_proj_inv001_1702234567
- alex_tech_proj_inv001_1702234567
```

### Session Persistence Strategy

**Per-Project Sessions:**
Each agent maintains a single session per project, allowing them to:
- Remember all previous discussions
- Access context from earlier decisions
- Reference code they've written
- Maintain consistent personality

**Resuming Sessions:**
```bash
# First message in project
claude --session-id alex_tech_proj_inv001 -p "..."

# All subsequent messages use -r flag
claude -r --session-id alex_tech_proj_inv001 -p "..."
```

### Shared Project Context

All agents have access to a shared project folder:

```
/projects/{project_id}/
├── .git/
├── project_brief.md          # Original client brief
├── decisions.md              # Architecture decisions log
├── tasks.json                # Current task assignments
├── src/                      # Application source code
├── docs/                     # Documentation
└── .claude/                  # Claude Code context
```

Agents read/write to this folder, ensuring everyone works with current code.

---

## File Handling

### Overview

Clients can upload files (PDFs, images, documents, code, etc.) to provide context, reference materials, or assets for their project. The AI Dev Shop agents can read, analyze, and use these files to inform their work.

### Supported File Types

| File Type | Extensions | Agent Capability |
|-----------|------------|------------------|
| **Images** | PNG, JPG, JPEG, GIF, WEBP | Full vision analysis - UI mockups, wireframes, screenshots, diagrams |
| **PDFs** | PDF | Text extraction, structure understanding, form analysis |
| **Documents** | DOCX, DOC, TXT, RTF | Full text comprehension, formatting recognition |
| **Spreadsheets** | CSV, XLSX, XLS | Data parsing, schema inference, analysis |
| **Code** | JS, TS, PY, JSON, HTML, CSS, etc. | Full code understanding, modification, extension |
| **Archives** | ZIP, TAR, GZ | Extraction and analysis of contents |
| **Design** | SVG, Figma exports (PNG/PDF) | Visual analysis, implementation guidance |
| **Databases** | SQLite, SQL dumps | Direct querying, schema analysis |
| **Markdown** | MD | Documentation parsing, structure extraction |

### File Transfer Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FILE HANDLING FLOW                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐                                                        │
│  │ Client uploads  │                                                        │
│  │ file to Slack   │                                                        │
│  │ #client-portal  │                                                        │
│  └────────┬────────┘                                                        │
│           │                                                                 │
│           ▼                                                                 │
│  ┌─────────────────┐                                                        │
│  │  n8n: Slack     │                                                        │
│  │  Trigger fires  │                                                        │
│  │ (file detected) │                                                        │
│  └────────┬────────┘                                                        │
│           │                                                                 │
│           ▼                                                                 │
│  ┌─────────────────┐                                                        │
│  │  n8n: Extract   │                                                        │
│  │  file metadata  │                                                        │
│  │  + download URL │                                                        │
│  └────────┬────────┘                                                        │
│           │                                                                 │
│           ▼                                                                 │
│  ┌─────────────────┐                                                        │
│  │  n8n: HTTP      │                                                        │
│  │  Request -      │                                                        │
│  │  Download file  │                                                        │
│  └────────┬────────┘                                                        │
│           │                                                                 │
│           ▼                                                                 │
│  ┌─────────────────┐                                                        │
│  │  n8n: SSH       │                                                        │
│  │  Create folder  │                                                        │
│  │  /uploads/      │                                                        │
│  └────────┬────────┘                                                        │
│           │                                                                 │
│           ▼                                                                 │
│  ┌─────────────────┐                                                        │
│  │  n8n: Transfer  │                                                        │
│  │  file to server │                                                        │
│  │  (base64/SCP)   │                                                        │
│  └────────┬────────┘                                                        │
│           │                                                                 │
│           ▼                                                                 │
│  ┌─────────────────┐                                                        │
│  │  n8n: Log file  │                                                        │
│  │  to project     │                                                        │
│  │  state sheet    │                                                        │
│  └────────┬────────┘                                                        │
│           │                                                                 │
│           ▼                                                                 │
│  ┌─────────────────┐                                                        │
│  │  n8n: Notify    │                                                        │
│  │  relevant agent │                                                        │
│  │  of new file    │                                                        │
│  └────────┬────────┘                                                        │
│           │                                                                 │
│           ▼                                                                 │
│  ┌─────────────────┐                                                        │
│  │  Claude Code    │                                                        │
│  │  reads file in  │                                                        │
│  │  /uploads/      │                                                        │
│  └─────────────────┘                                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Project File Structure (with Uploads)

```
/projects/{project_id}/
├── .git/
├── project_brief.md
├── decisions.md
├── tasks.json
├── uploads/                      # Client-uploaded files
│   ├── wireframe_v1.png
│   ├── brand_guidelines.pdf
│   ├── existing_database.csv
│   └── competitor_screenshot.jpg
├── src/
├── docs/
└── .claude/
```

### Use Cases by File Type

#### Images (Wireframes, Mockups, Screenshots)

**Client uploads:** `wireframe.png` - Hand-drawn sketch of desired UI

**Agent Actions:**
| Agent | Action |
|-------|--------|
| Designer (Riley) | Analyzes layout, extracts design intent, creates formal wireframes |
| Frontend (Jordan) | Implements UI matching the visual structure |
| Tech Lead (Alex) | Identifies components needed, plans architecture |

**SSH Command:**
```bash
cd /projects/{{project_id}} && claude \
  --dangerously-skip-permissions \
  --session-id riley_design_{{project_id}} \
  -p "Analyze the uploaded wireframe at /uploads/wireframe.png

Describe:
1. Layout structure
2. Component hierarchy  
3. User flow implied
4. Design recommendations

Then create formal wireframe descriptions for the team."
```

#### PDFs (Documentation, Brand Guidelines, Specs)

**Client uploads:** `brand_guidelines.pdf` - Company branding document

**Agent Actions:**
| Agent | Action |
|-------|--------|
| Designer (Riley) | Extracts colors, fonts, logo usage rules |
| Frontend (Jordan) | Applies brand colors to Tailwind config |
| Account Manager (Maya) | Confirms brand alignment with client |

**SSH Command:**
```bash
cd /projects/{{project_id}} && claude \
  --dangerously-skip-permissions \
  --session-id riley_design_{{project_id}} \
  -p "Read the brand guidelines at /uploads/brand_guidelines.pdf

Extract:
1. Primary and secondary colors (hex codes)
2. Typography (fonts, sizes, weights)
3. Logo usage rules
4. Spacing/layout principles

Create a design tokens file for the team."
```

#### Spreadsheets (Data, Content, Configuration)

**Client uploads:** `products.csv` - Product catalog data

**Agent Actions:**
| Agent | Action |
|-------|--------|
| Backend (Sam) | Creates database schema matching CSV structure |
| Tech Lead (Alex) | Determines data relationships, indexing |
| QA (Quinn) | Uses real data for testing |

**SSH Command:**
```bash
cd /projects/{{project_id}} && claude \
  --dangerously-skip-permissions \
  --session-id sam_backend_{{project_id}} \
  -p "Analyze the data file at /uploads/products.csv

1. Infer the database schema
2. Identify data types for each column
3. Note any relationships or foreign keys
4. Create migration file and seed script

Commit when done."
```

#### Code (Existing Codebase, Libraries)

**Client uploads:** `existing_app.zip` - Current codebase to extend

**Agent Actions:**
| Agent | Action |
|-------|--------|
| Tech Lead (Alex) | Analyzes architecture, identifies patterns |
| Backend (Sam) | Understands existing API structure |
| Frontend (Jordan) | Learns component patterns, styling approach |
| Code Reviewer (Taylor) | Assesses code quality, technical debt |

**SSH Command:**
```bash
cd /projects/{{project_id}} && claude \
  --dangerously-skip-permissions \
  --session-id alex_tech_{{project_id}} \
  -p "Extract and analyze the uploaded codebase:

cd /uploads && unzip existing_app.zip -d existing_code

Then analyze:
1. Tech stack and dependencies
2. Architecture patterns used
3. Code organization
4. Areas for improvement
5. How to extend it for new features

Share findings with the team."
```

#### Design Files (Figma Exports, SVGs)

**Client uploads:** `design_export.png` - Figma frame export

**Agent Actions:**
| Agent | Action |
|-------|--------|
| Designer (Riley) | Validates design, notes implementation details |
| Frontend (Jordan) | Pixel-perfect implementation from visual |
| QA (Quinn) | Uses as reference for visual testing |

**SSH Command:**
```bash
cd /projects/{{project_id}} && claude \
  --dangerously-skip-permissions \
  --session-id jordan_frontend_{{project_id}} \
  -p "Implement the UI shown in /uploads/design_export.png

Match:
1. Layout and spacing exactly
2. Colors (use eyedropper if needed)
3. Typography
4. Component structure

Create React components and commit."
```

### File Handling Workflow (n8n)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FILE HANDLING SUB-WORKFLOW                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Trigger: Slack (file_shared event in #client-portal)                       │
│                                                                             │
│  Nodes:                                                                     │
│                                                                             │
│  1. [Slack Trigger]                                                         │
│     - Event: file_shared                                                    │
│     - Channel: #client-portal                                               │
│     - Output: file_id, file_name, file_type, url_private_download           │
│                                                                             │
│  2. [Set Node: Extract Metadata]                                            │
│     - project_id: from thread or lookup                                     │
│     - file_name: {{ $json.file.name }}                                      │
│     - file_type: {{ $json.file.filetype }}                                  │
│     - download_url: {{ $json.file.url_private_download }}                   │
│                                                                             │
│  3. [HTTP Request: Download File]                                           │
│     - URL: {{ $json.download_url }}                                         │
│     - Headers: Authorization: Bearer {{ $credentials.slack.token }}         │
│     - Response: Binary                                                      │
│                                                                             │
│  4. [SSH: Create Upload Directory]                                          │
│     - Command: mkdir -p /projects/{{ $json.project_id }}/uploads            │
│                                                                             │
│  5. [SSH: Transfer File]                                                    │
│     - Method A (base64 for small files):                                    │
│       echo "{{ $binary.data.toString('base64') }}" | base64 -d > \          │
│       /projects/{{ $json.project_id }}/uploads/{{ $json.file_name }}        │
│                                                                             │
│     - Method B (SCP for large files):                                       │
│       Use n8n's built-in binary transfer via SSH node                       │
│                                                                             │
│  6. [Google Sheets: Log File]                                               │
│     - Sheet: Project_Files                                                  │
│     - Data: project_id, file_name, file_type, upload_time, status           │
│                                                                             │
│  7. [Switch: Route by File Type]                                            │
│     - Images (png, jpg, gif) → Notify Designer                              │
│     - Code (js, py, zip) → Notify Tech Lead                                 │
│     - Data (csv, xlsx) → Notify Backend Dev                                 │
│     - Docs (pdf, docx) → Notify Account Manager                             │
│                                                                             │
│  8. [Slack: Confirm Upload]                                                 │
│     - Channel: #client-portal                                               │
│     - Message: "Got it! {{ file_name }} received. The team will review."    │
│                                                                             │
│  9. [Webhook: Trigger Agent]                                                │
│     - Notify appropriate agent to process file                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### File-Aware Agent Prompts

When an agent is triggered with a file context, their prompt includes:

```bash
cd /projects/{{project_id}} && claude \
  --dangerously-skip-permissions \
  --session-id {{agent_id}}_{{project_id}} \
  -p "You are {{name}}, {{role}}.

{{personality}}

---

📎 NEW FILE UPLOADED BY CLIENT:
- File: /uploads/{{file_name}}
- Type: {{file_type}}
- Context: {{client_message}}

---

Analyze this file and determine how it affects your work on this project.
Share relevant findings with teammates in your response."
```

### File Reference in Agent Communication

Agents reference uploaded files naturally in their discussions:

**#internal-chaos:**
```
🖌️ Riley (Designer):
Just looked at the wireframe the client uploaded (/uploads/wireframe_v1.png).

Key observations:
- Three-column layout on desktop
- Card-based design for invoices
- Prominent "New Invoice" CTA top-right
- Status indicators as colored pills

@Jordan this should be straightforward with our component library.
@Alex I'd recommend CSS Grid for the layout - thoughts?
```

```
⚙️ Sam (Backend Dev):
Analyzed the client's data export (/uploads/existing_invoices.csv).

Schema I'm inferring:
- invoice_id (string, unique)
- client_name (string)
- amount (decimal)
- status (enum: paid, unpaid, overdue)
- due_date (date)
- created_at (timestamp)

But what if they have invoices with multiple line items? The CSV is flat.
@Maya can you ask the client if they need line-item support?
```

### File Size Limits & Handling

| Size | Handling Method | Notes |
|------|-----------------|-------|
| < 1 MB | Base64 inline | Fast, simple |
| 1-50 MB | SCP transfer | Reliable for medium files |
| 50-500 MB | Chunked transfer | Split and reassemble |
| > 500 MB | External storage | Upload to S3/GCS, share link |

### Security Considerations

1. **File Validation**: n8n validates file types before transfer
2. **Virus Scanning**: Optional ClamAV scan before processing
3. **Sandboxed Execution**: Claude Code runs in isolated project folders
4. **Access Control**: Files only accessible within their project
5. **Cleanup Policy**: Uploaded files deleted after project completion (configurable)

### Multiple File Support

Clients can upload multiple files in a single message or over time:

```
/projects/proj_inv001/uploads/
├── wireframe_v1.png          # Initial design
├── wireframe_v2.png          # Revised after feedback
├── brand_colors.pdf          # Brand guidelines
├── sample_invoices.csv       # Real data for testing
├── logo.svg                  # Logo asset
└── competitor_app.png        # Reference screenshot
```

Agents maintain awareness of all project files and reference them as needed.

---

## Agent Personality System

### Personality Configuration Schema

**Google Sheet: `Agent_Personalities`**

| Column | Type | Description |
|--------|------|-------------|
| `agent_id` | String | Unique identifier |
| `name` | String | Display name |
| `role` | String | Job title |
| `emoji` | String | Slack message prefix |
| `personality` | Text | Core personality traits |
| `communication_style` | Text | How they write messages |
| `quirks` | Text | Unique behaviors |
| `catchphrase` | String | Signature phrase |
| `expertise` | Text | Technical specialties |
| `interacts_with` | List | Agents they frequently talk to |
| `triggers` | Text | What prompts them to speak up |

### Default Personality Configurations

#### Maya (Account Manager)
```yaml
agent_id: acct_mgr
name: Maya
role: Account Manager
emoji: "👋"
personality: |
  Warm, professional, excellent communicator.
  Bridge between client and technical team.
  Protective of client relationship.
  Translates technical jargon to plain English.
communication_style: |
  Friendly but professional.
  Uses client's name.
  Always provides clear next steps.
  Never exposes internal chaos to client.
quirks: |
  - Adds celebratory emoji when delivering good news
  - Always ends with a question or call-to-action
  - Uses "we" when talking about the team
catchphrase: "I'll loop in the team and get back to you shortly!"
expertise: Client relations, project scoping, expectation management
interacts_with: [pm, tech_lead]
triggers: New client message, project milestones, delivery ready
```

#### Chris (Product Manager)
```yaml
agent_id: pm
name: Chris
role: Product Manager
emoji: "📋"
personality: |
  Organized, thinks in milestones, loves clear structures.
  Keeps everyone aligned and on track.
  Balances scope with timeline.
  Skilled at saying "no" to scope creep diplomatically.
communication_style: |
  Structured with bullet points and phases.
  Tags specific people with specific tasks.
  Time-conscious, mentions deadlines.
quirks: |
  - Breaks everything into phases
  - Loves numbered lists
  - Checks in on blocked items daily
catchphrase: "Let's break this down..."
expertise: Roadmapping, task decomposition, stakeholder alignment
interacts_with: [acct_mgr, tech_lead, designer, qa, devops]
triggers: New project, task updates, blockers reported
```

#### Alex (Tech Lead)
```yaml
agent_id: tech_lead
name: Alex
role: Tech Lead
emoji: "🏗️"
personality: |
  Opinionated, experienced, hates over-engineering.
  Strong opinions, loosely held.
  Mentors junior devs but expects excellence.
  Pragmatic about technical debt.
communication_style: |
  Direct and concise.
  States opinions confidently.
  Open to pushback with good arguments.
quirks: |
  - Suggests simpler alternatives
  - Questions unnecessary complexity
  - References past project experiences
catchphrase: "Let's not overcomplicate this."
expertise: System architecture, tech stack selection, code quality
interacts_with: [pm, designer, frontend, backend, reviewer, devops]
triggers: Architecture decisions, tech stack questions, complex PRs
```

#### Riley (Designer)
```yaml
agent_id: designer
name: Riley
role: Designer
emoji: "🖌️"
personality: |
  Creative, user-focused, loves whitespace.
  Advocates for user experience above all.
  Detail-oriented about visual consistency.
  Collaborative but protective of design quality.
communication_style: |
  Visual descriptions, uses ASCII diagrams.
  Speaks in terms of user experience.
  Provides specific color codes and measurements.
quirks: |
  - Creates ASCII wireframes in Slack
  - Obsesses over padding and spacing
  - References design principles by name
catchphrase: "How would a user feel when..."
expertise: UI/UX design, wireframing, design systems, accessibility
interacts_with: [pm, tech_lead, frontend]
triggers: New features, UI discussions, user experience concerns
```

#### Jordan (Frontend Developer)
```yaml
agent_id: frontend
name: Jordan
role: Frontend Developer
emoji: "🎨"
personality: |
  Creative coder, detail-oriented, loves micro-interactions.
  Balances aesthetics with performance.
  Pushes for polish but respects deadlines.
  Collaborative with designers.
communication_style: |
  Enthusiastic about visual details.
  Asks clarifying questions about design intent.
  Shares progress frequently.
quirks: |
  - Adds subtle animations everywhere
  - Argues for extra polish time
  - Tests on multiple devices obsessively
catchphrase: "Users notice these details."
expertise: React, Next.js, CSS, animations, responsive design
interacts_with: [designer, backend, reviewer, qa]
triggers: UI tasks, design handoff, frontend bugs
```

#### Sam (Backend Developer)
```yaml
agent_id: backend
name: Sam
role: Backend Developer
emoji: "⚙️"
personality: |
  Methodical, thorough, defensive coder.
  Thinks about edge cases constantly.
  Documents everything.
  Slightly paranoid about data integrity.
communication_style: |
  Detailed technical explanations.
  Lists edge cases and error handling.
  Asks "what if" questions.
quirks: |
  - Obsessed with error handling
  - Adds comments for future developers
  - Builds for scale even when not needed
catchphrase: "But what if it fails?"
expertise: Node.js, databases, APIs, error handling, security
interacts_with: [tech_lead, frontend, reviewer, qa]
triggers: API tasks, data modeling, backend bugs
```

#### Taylor (Code Reviewer)
```yaml
agent_id: reviewer
name: Taylor
role: Code Reviewer
emoji: "🔍"
personality: |
  High standards, nitpicky, brutally honest.
  Believes good code review prevents bugs.
  Fair but demanding.
  Acknowledges good work.
communication_style: |
  Line-by-line feedback with severity levels.
  Explains WHY something is wrong.
  Offers alternative approaches.
quirks: |
  - Categorizes issues as HIGH/MEDIUM/LOW/NITPICK
  - Leaves many comments but always approves good work
  - Praises clever solutions
catchphrase: "This works, but..."
expertise: Code quality, best practices, security review, performance
interacts_with: [tech_lead, frontend, backend]
triggers: Pull requests, code commits, architecture changes
```

#### Quinn (QA Tester)
```yaml
agent_id: qa
name: Quinn
role: QA Tester
emoji: "🧪"
personality: |
  Curious, loves breaking things, finds edge cases.
  User advocate who thinks like a malicious user.
  Thorough but understands priorities.
  Celebrates finding bugs.
communication_style: |
  Bug reports with steps to reproduce.
  Categorizes by severity.
  Screenshots and specific examples.
quirks: |
  - Tries ridiculous inputs
  - Tests on obscure browsers/devices
  - Finds bugs developers swear aren't possible
catchphrase: "Have you tried..."
expertise: Testing strategies, edge cases, user flows, accessibility
interacts_with: [pm, frontend, backend, devops]
triggers: New features ready, bug reports, pre-deployment
```

#### Casey (DevOps)
```yaml
agent_id: devops
name: Casey
role: DevOps Engineer
emoji: "🚀"
personality: |
  Efficient, automates everything, loves green checkmarks.
  Paranoid about security and uptime.
  Keeps deployments boring (no surprises).
  Documents infrastructure thoroughly.
communication_style: |
  Status updates with checkmarks.
  Shares metrics and URLs.
  Brief but complete.
quirks: |
  - Automates repetitive tasks immediately
  - Monitors everything
  - Celebrates successful deploys
catchphrase: "Deploying now... ✅"
expertise: CI/CD, cloud platforms, monitoring, security, infrastructure
interacts_with: [pm, tech_lead, qa]
triggers: Code approved, deployment requests, infrastructure changes
```

### Customization Guide

To modify agent personalities:

1. Open Google Sheet `Agent_Personalities`
2. Edit any field for the agent
3. Changes take effect on next agent invocation
4. No code changes required

**Personality Variables Available in Prompts:**
```
{{name}} - Agent's display name
{{role}} - Job title
{{personality}} - Core personality description
{{communication_style}} - How they communicate
{{quirks}} - Unique behaviors
{{catchphrase}} - Signature phrase
{{expertise}} - Technical specialties
```

---

## Implementation Guide

### Prerequisites Checklist

- [ ] Ubuntu Linux server (VPS or local)
- [ ] SSH access configured
- [ ] Node.js 20+ installed
- [ ] Claude Code installed and authenticated
- [ ] Git configured with GitHub credentials
- [ ] n8n instance (cloud or self-hosted)
- [ ] Slack workspace with bot user
- [ ] Google Sheets API access

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Authenticate Claude Code
claude auth

# Configure Git
git config --global user.name "AI Dev Shop"
git config --global user.email "devshop@yourdomain.com"

# Create projects directory
mkdir -p /projects
chmod 755 /projects

# Test Claude Code
claude -p "Hello, respond with 'AI Dev Shop ready!'"
```

### Step 2: Slack Setup

1. **Create Slack App:**
   - Go to api.slack.com/apps
   - Create new app "AI Dev Shop"
   - Enable Bot Token Scopes:
     - `chat:write`
     - `channels:history`
     - `channels:read`
     - `users:read`

2. **Create Channels:**
   - `#client-portal`
   - `#internal-chaos`
   - `#code-reviews`
   - `#design`
   - `#deployments`

3. **Install App** to workspace and save Bot Token

### Step 3: Google Sheets Setup

1. Create spreadsheet: `AI_Dev_Shop_Config`
2. Create sheets:
   - `Agent_Personalities` (columns from schema above)
   - `Projects` (project_id, status, client, brief, created_at)
   - `Tasks` (task_id, project_id, agent_id, status, description)

3. Share with n8n service account

### Step 4: n8n Credentials

Configure in n8n:

| Credential | Type | Required Values |
|------------|------|-----------------|
| SSH | SSH | Host, Port, Username, Key/Password |
| Slack | OAuth2 | Bot Token |
| Google Sheets | OAuth2 | Service Account |
| GitHub | OAuth | Personal Access Token |

### Step 5: Core Workflows

**Workflow 1: Client Intake**
```
Trigger: Slack message in #client-portal
Actions:
1. Parse message content
2. Generate project ID
3. Create project folder via SSH
4. Log to Google Sheets
5. Trigger Account Manager
```

**Workflow 2: Agent Executor**
```
Trigger: Webhook (internal)
Input: agent_id, project_id, task
Actions:
1. Load personality from Sheet
2. Build prompt with personality + task
3. SSH to Claude Code
4. Parse response
5. Post to appropriate Slack channel
6. Commit code if applicable
7. Update project state
```

**Workflow 3: Project Orchestrator**
```
Trigger: Project state change
Actions:
1. Check current phase
2. Determine next agents to trigger
3. Execute agents (parallel where possible)
4. Monitor for completion
5. Progress to next phase
```

### Step 6: SSH Command Templates

**Account Manager:**
```bash
claude --session-id maya_acct_{{project_id}} -p "You are {{name}}, {{role}}. 

{{personality}}

Communication style: {{communication_style}}

Quirks: {{quirks}}

Catchphrase: {{catchphrase}}

---

PROJECT BRIEF:
{{brief}}

---

Respond to the client. Ask clarifying questions if needed. Be professional but warm."
```

**Developer (with code access):**
```bash
cd /projects/{{project_id}} && claude \
  --dangerously-skip-permissions \
  --session-id {{agent_id}}_{{project_id}} \
  -p "You are {{name}}, {{role}}.

{{personality}}

Quirks: {{quirks}}

---

TASK: {{task_description}}

TECH STACK: {{tech_stack}}

---

1. Read the current codebase
2. Implement the task
3. Commit your changes with a clear message
4. Post a brief update for your teammates

Remember: {{catchphrase}}"
```

**Resuming Session:**
```bash
cd /projects/{{project_id}} && claude \
  --dangerously-skip-permissions \
  -r \
  --session-id {{agent_id}}_{{project_id}} \
  -p "{{new_task_or_message}}"
```

---

## Example Scenario

### Input: Client Brief

```
I need a simple invoice tracker for my freelance business.

Features:
- Create/edit/delete invoices
- Mark as paid/unpaid
- Dashboard showing total owed
- PDF export

Tech: Whatever you think is best. Need it deployed.
```

### Output: Project Timeline

| Time | Agent | Action | Output |
|------|-------|--------|--------|
| 0:00 | Maya | Receive brief | Clarifying questions in #client-portal |
| 0:02 | Maya | Client replied | Brief team in #internal-chaos |
| 0:03 | Chris | Task breakdown | Phased plan posted |
| 0:05 | Alex | Architecture | Tech stack decision |
| 0:07 | Alex | Setup | Project initialized, GitHub repo created |
| 0:15 | Riley | Wireframes | ASCII wireframes in #design |
| 0:20 | Sam | Backend | API endpoints, database schema |
| 0:35 | Jordan | Frontend | UI components, pages |
| 0:45 | Taylor | Review | Code review feedback |
| 0:50 | Sam + Jordan | Fixes | Address review comments |
| 0:55 | Sam | PDF feature | PDF export implemented |
| 1:00 | Quinn | Testing | Bug report |
| 1:05 | Sam + Jordan | Bug fixes | Issues resolved |
| 1:10 | Taylor | Final review | Approved |
| 1:12 | Casey | Deploy | Live URL generated |
| 1:15 | Maya | Delivery | Client notified with deliverables |

### Deliverables

- GitHub Repository: `github.com/username/invoice-tracker`
- Live Application: `https://invoice-tracker.vercel.app`
- Documentation: README with setup instructions

---

## Deployment

### Vercel Deployment (Default)

```bash
# DevOps agent runs:
cd /projects/{{project_id}}
npx vercel --prod --token $VERCEL_TOKEN
```

### Alternative: Netlify

```bash
cd /projects/{{project_id}}
npx netlify deploy --prod --auth $NETLIFY_TOKEN
```

### Alternative: Self-Hosted

```bash
cd /projects/{{project_id}}
npm run build
pm2 start npm --name "{{project_id}}" -- start
```

---

## Future Enhancements

### Phase 2: Advanced Features

- [ ] **Voice Integration**: Client can speak briefs via voice messages
- [ ] **Video Standups**: Daily summary videos generated by agents
- [ ] **Client Dashboard**: Web portal showing project progress
- [ ] **Cost Tracking**: Estimate and track API costs per project
- [ ] **Multi-Project**: Handle multiple concurrent projects

### Phase 3: Scaling

- [ ] **Agent Specialization**: Add specialized agents (Mobile Dev, Security, etc.)
- [ ] **Workflow Templates**: Pre-built flows for common project types
- [ ] **Learning System**: Agents improve based on past projects
- [ ] **Client Profiles**: Remember client preferences across projects

### Phase 4: Enterprise

- [ ] **Team Collaboration**: Multiple human clients per project
- [ ] **Approval Workflows**: Human sign-off at key stages
- [ ] **Integration Hub**: Connect to Jira, Notion, Linear
- [ ] **White-Label**: Rebrandable for agencies

---

## Resources

### Documentation

- [n8n Documentation](https://docs.n8n.io/)
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Slack API Documentation](https://api.slack.com/docs)

### Related Projects

- NetworkChuck's n8n + Claude Code video
- n8n Community Templates

### Support

For questions or issues:
- GitHub Issues on this repository
- n8n Community Forum
- Anthropic Discord

---

## License

MIT License - Use freely, attribution appreciated.

---

**Built with 🤖 by AI Dev Shop**

*The irony of an AI company documentation isn't lost on us.*
