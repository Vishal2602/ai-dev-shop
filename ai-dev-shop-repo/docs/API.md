# API Reference

Webhook endpoints and payload formats for AI Dev Shop.

## Webhook Endpoints

### Agent Executor

**URL:** `POST /webhook/agent-executor`

Triggers an AI agent to perform a task.

#### Request Payload

```json
{
  "agentId": "frontend",
  "projectId": "proj_abc123_1766551950259",
  "task": "Build the complete React application",
  "clientMessage": "Original client message",
  "threadTs": "1766551950.259000",
  "channelId": "C0A2V1H5W06",
  "isResume": false,
  "phase": "development",
  "clientBrief": "Build a todo app with dark mode",
  "isRevision": false,
  "revisionFeedback": "",
  "isDelivery": false
}
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `agentId` | string | Yes | Agent identifier (e.g., "acct_mgr", "frontend") |
| `projectId` | string | Yes | Unique project identifier |
| `task` | string | No | Task description for agent |
| `clientMessage` | string | No | Latest client message |
| `threadTs` | string | Yes | Slack thread timestamp for replies |
| `channelId` | string | Yes | Slack channel ID |
| `isResume` | boolean | No | Whether client confirmed to proceed |
| `phase` | string | Yes | Current development phase |
| `clientBrief` | string | No | Accumulated client requirements |
| `isRevision` | boolean | No | Whether this is a revision request |
| `revisionFeedback` | string | No | Client's revision feedback |
| `isDelivery` | boolean | No | Whether this is the delivery phase |

#### Response

```json
{
  "success": true,
  "message": "Agent triggered"
}
```

---

### Project Orchestrator

**URL:** `POST /webhook/orchestrator`

Advances project to next phase and triggers appropriate agents.

#### Request Payload

```json
{
  "projectId": "proj_abc123_1766551950259",
  "currentPhase": "development",
  "action": "next",
  "threadTs": "1766551950.259000",
  "channelId": "C0A2V1H5W06",
  "clientBrief": "Build a todo app with dark mode",
  "reviewPassed": false,
  "reviewFailed": false
}
```

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `projectId` | string | Yes | Unique project identifier |
| `currentPhase` | string | Yes | Phase that just completed |
| `action` | string | Yes | Action to take (always "next") |
| `threadTs` | string | Yes | Slack thread timestamp |
| `channelId` | string | Yes | Slack channel ID |
| `clientBrief` | string | No | Client requirements |
| `reviewPassed` | boolean | No | Whether code review passed |
| `reviewFailed` | boolean | No | Whether code review failed |

#### Response

```json
{
  "success": true,
  "nextPhase": "review",
  "agents": ["reviewer"]
}
```

---

## Data Models

### Project

Stored in Google Sheets `Projects` sheet.

```json
{
  "project_id": "proj_abc123_1766551950259",
  "thread_ts": "'1766551950.259000",
  "channel_id": "C0A2V1H5W06",
  "user_id": "U123456789",
  "client_brief": "Build a todo app with dark mode...",
  "current_phase": "development",
  "status": "active",
  "created_at": "2025-12-25T10:00:00Z",
  "updated_at": "2025-12-25T10:15:00Z"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `project_id` | string | Unique ID: `proj_{random}_{timestamp}` |
| `thread_ts` | string | Slack thread timestamp (prefixed with `'` for text) |
| `channel_id` | string | Slack channel where project started |
| `user_id` | string | Client's Slack user ID |
| `client_brief` | string | Accumulated requirements |
| `current_phase` | string | Current development phase |
| `status` | string | `active`, `stopped`, `revising`, `complete` |
| `created_at` | string | ISO 8601 creation timestamp |
| `updated_at` | string | ISO 8601 last update timestamp |

### Agent Personality

Stored in Google Sheets `agent_personalities` sheet.

```json
{
  "agent_id": "frontend",
  "name": "Jordan",
  "role": "Frontend Developer",
  "emoji": "💻",
  "personality": "Detail-oriented and passionate about UI..."
}
```

| Field | Type | Description |
|-------|------|-------------|
| `agent_id` | string | Unique agent identifier |
| `name` | string | Display name for Slack |
| `role` | string | Job title |
| `emoji` | string | Emoji prefix for messages |
| `personality` | string | Personality description for prompts |

---

## Phase Lifecycle

### Standard Phases

```
intake → planning → design → development → review → testing → deployment → delivery → complete
```

| Phase | Order | Agents | Timeout |
|-------|-------|--------|---------|
| intake | 1 | acct_mgr | 2 min |
| planning | 2 | pm, tech_lead | 6 min |
| design | 3 | designer | 6 min |
| development | 4 | frontend, backend | 20 min |
| review | 5 | reviewer | 7 min |
| testing | 6 | qa | 7 min |
| deployment | 7 | devops | 12 min |
| delivery | 8 | acct_mgr | 3 min |
| complete | 9 | - | - |

### Revision Phases

```
revision → revision_deploy → revision_delivery → complete
```

| Phase | Order | Agents |
|-------|-------|--------|
| revision | 101 | designer, frontend |
| revision_deploy | 102 | devops |
| revision_delivery | 103 | acct_mgr |

---

## Quality Gate

The review phase includes a quality gate. When the reviewer outputs `REVIEW_STATUS: FAIL`, the orchestrator loops back to development.

### Detection Patterns

```javascript
const reviewFailPatterns = [
  /REVIEW_STATUS:\s*FAIL/i,
  /REVIEW_STATUS:FAIL/i,
  /\*\*REVIEW_STATUS:\s*FAIL\*\*/i
];
```

### Retry Logic

- Maximum 2 retries
- After 2 failures, proceeds with warning
- Retry count passed in orchestrator payload

---

## Error Handling

### Agent Executor Errors

| Error Type | Exit Code | Fallback |
|------------|-----------|----------|
| timeout | 124 | Phase-specific fallback message |
| empty_response | 0 | Generic completion message |
| connection | varies | Error notification to internal channel |
| claude_error | varies | Fallback + error notification |

### Fallback Messages

```javascript
const fallbacks = {
  'planning': '📋 Done. PROJECT_PLAN.md and ARCHITECTURE.md created.',
  'design': '🎨 Done. DESIGN.md is ready.',
  'development': '💻 Done. Core application built.',
  'review': '🔍 Code review complete. REVIEW_STATUS: PASS',
  'testing': '🧪 Done. TEST_PLAN.md created.',
  'deployment': '🚀 Deployment in progress.',
  'delivery': '🎁 Your project is ready!'
};
```

---

## Slack Message Formats

### Internal Agent Message

```
{emoji} *{name}* ({role}):

{response}

_Project: `{projectId}` | Phase: {phase}_
```

### Client Progress Update

```
{progressEmoji} {progressMessage}

_~{estimatedMinutes} min remaining_
```

### Phase Transition (Internal)

```
{emoji} *Phase {current}/{total}*: {currentName} → {nextName}

*Project:* `{projectId}`
*Agents:* {agentList}
*Task:* {taskDescription}
```

---

## Integration Examples

### Trigger Agent Manually

```bash
curl -X POST https://your-n8n/webhook/agent-executor \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "acct_mgr",
    "projectId": "test_123",
    "phase": "intake",
    "clientMessage": "Hello!",
    "threadTs": "1234567890.123456",
    "channelId": "C0A2V1H5W06"
  }'
```

### Advance Phase Manually

```bash
curl -X POST https://your-n8n/webhook/orchestrator \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "test_123",
    "currentPhase": "intake",
    "action": "next",
    "threadTs": "1234567890.123456",
    "channelId": "C0A2V1H5W06"
  }'
```
