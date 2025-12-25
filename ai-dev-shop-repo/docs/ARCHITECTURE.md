# AI Dev Shop - Architecture

Deep-dive into the system design and how components interact.

## System Overview

AI Dev Shop is an event-driven, multi-agent system built on n8n workflow automation. The architecture follows a microservices-like pattern where each workflow handles a specific responsibility.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              EXTERNAL LAYER                              │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │    Slack    │  │   GitHub    │  │   Vercel    │  │   Client    │    │
│  │   Bot API   │  │     API     │  │     API     │  │   Browser   │    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │
└─────────┼────────────────┼────────────────┼────────────────┼───────────┘
          │                │                │                │
          ▼                ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           ORCHESTRATION LAYER                            │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐   │
│  │   Client Intake   │  │  Agent Executor   │  │    Orchestrator   │   │
│  │     Workflow      │  │     Workflow      │  │     Workflow      │   │
│  │                   │  │                   │  │                   │   │
│  │  • Message Parse  │  │  • Prompt Build   │  │  • Phase Logic    │   │
│  │  • Bot Filter     │  │  • Claude CLI     │  │  • Idempotency    │   │
│  │  • Project CRUD   │  │  • Response Parse │  │  • Agent Trigger  │   │
│  │  • Routing        │  │  • Slack Post     │  │  • Quality Gate   │   │
│  └─────────┬─────────┘  └─────────┬─────────┘  └─────────┬─────────┘   │
│            │                      │                      │              │
│            └──────────────────────┼──────────────────────┘              │
│                                   │                                     │
│                      Internal Webhook Communication                     │
└───────────────────────────────────┼─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                             DATA LAYER                                   │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐   │
│  │   Google Sheets   │  │    VPS Server     │  │   Project Files   │   │
│  │                   │  │                   │  │                   │   │
│  │  • Projects       │  │  • Claude CLI     │  │  • Source Code    │   │
│  │  • Agents         │  │  • GitHub CLI     │  │  • Documentation  │   │
│  │  • State          │  │  • Vercel CLI     │  │  • Artifacts      │   │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

## Core Design Principles

### 1. Event-Driven Architecture

All workflows are triggered by events:
- Slack messages trigger Client Intake
- Webhooks trigger Agent Executor and Orchestrator
- No polling or scheduled triggers

### 2. Stateless Execution

Workflows don't maintain state internally:
- All state stored in Google Sheets
- Each execution reads fresh state
- Enables horizontal scaling

### 3. Idempotent Operations

Critical operations are idempotent:
- Phase transitions check current state before updating
- Duplicate triggers are safely ignored
- Race conditions handled gracefully

### 4. Fail-Safe Defaults

System continues operating on errors:
- Fallback responses for Claude CLI failures
- Error notifications to internal channel
- Automatic retries with backoff

## Workflow Details

### Client Intake Workflow

**Responsibility**: Entry point for all client communication

**Flow**:
```
Slack Message
    │
    ▼
┌─────────────────┐
│ Filter Bot Msgs │ ← Prevents infinite loops
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Parse Message  │ ← Extract thread_ts, user, text
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Is Thread Reply │─Yes─│  Lookup Project │
└────────┬────────┘     └────────┬────────┘
         │No                     │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│  Create Project │     │ Continue/Revise │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
            ┌─────────────────┐
            │ Trigger Agent   │
            │   Executor      │
            └─────────────────┘
```

**Key Features**:
- Bot message filtering (bot_id, app_id, subtype, message_changed)
- Thread vs new message detection
- Project creation with unique IDs
- Stop command support
- Revision request detection

### Agent Executor Workflow

**Responsibility**: Execute AI agents and manage responses

**Flow**:
```
Webhook Trigger
    │
    ▼
┌─────────────────┐
│ Load Personality│ ← From Google Sheets
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Build Prompt   │ ← Phase-specific instructions
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Claude CLI     │ ← SSH to VPS, timeout by phase
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Parse Response  │ ← Extract URLs, status, errors
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Post to Slack  │ ← Client or internal channel
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Trigger       │
│  Orchestrator   │
└─────────────────┘
```

**Key Features**:
- Dynamic prompt construction with shared context
- Phase-specific timeouts (2-20 minutes)
- Smart truncation preserving important data
- Quality gate detection (REVIEW_STATUS)
- Error recovery with fallback responses

### Project Orchestrator Workflow

**Responsibility**: Manage project lifecycle and phase transitions

**Flow**:
```
Webhook Trigger
    │
    ▼
┌─────────────────┐
│ Determine Phase │ ← Calculate next phase
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Lookup Project  │ ← Get current state from Sheets
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ Check Idempotency   │ ← Prevent duplicate transitions
└────────┬────────────┘
         │
         ▼
┌─────────────────┐
│ Update Phase    │ ← Write new phase to Sheets
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Is Complete?    │─Yes─│ Notify Complete │
└────────┬────────┘     └─────────────────┘
         │No
         ▼
┌─────────────────┐
│ Notify Progress │ ← Client + internal channels
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Trigger Agents  │ ← For next phase
└─────────────────┘
```

**Key Features**:
- Phase order management (1-8 + revision phases)
- Idempotency via phase order comparison
- Quality gate enforcement (loop back on FAIL)
- Client progress updates with time estimates
- Multi-agent triggering per phase

## Data Models

### Project State

```json
{
  "project_id": "proj_abc123_1766551950259",
  "thread_ts": "1766551950.259000",
  "channel_id": "C0A2V1H5W06",
  "user_id": "U123456789",
  "client_brief": "Build a todo app with dark mode",
  "current_phase": "development",
  "status": "active",
  "created_at": "2025-12-25T10:00:00Z",
  "updated_at": "2025-12-25T10:15:00Z"
}
```

### Agent Executor Payload

```json
{
  "agentId": "frontend",
  "projectId": "proj_abc123_1766551950259",
  "task": "Build the complete React application",
  "clientBrief": "Build a todo app with dark mode",
  "phase": "development",
  "threadTs": "1766551950.259000",
  "channelId": "C0A2V1H5W06",
  "isResume": false,
  "isRevision": false
}
```

### Orchestrator Payload

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

## Scaling Considerations

### Current Limitations

- Single VPS for code execution
- Sequential agent execution per project
- Google Sheets as database (rate limits)

### Scaling Strategies

1. **Multiple VPS instances** - Load balance Claude CLI execution
2. **Redis for state** - Replace Google Sheets for high throughput
3. **Queue-based execution** - Decouple agent triggering
4. **Parallel agents** - Run independent agents simultaneously

## Security

### Credential Management

- All secrets stored in n8n credentials
- No hardcoded tokens in workflows
- SSH key authentication recommended

### Input Validation

- Client messages sanitized before processing
- File uploads restricted to allowed types
- Command injection prevented in SSH commands

### Access Control

- Slack channel-based authorization
- Bot only responds in configured channels
- Internal channel for sensitive operations
