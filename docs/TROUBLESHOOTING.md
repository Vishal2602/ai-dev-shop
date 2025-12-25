# Troubleshooting Guide

Common issues and solutions for AI Dev Shop.

## Quick Diagnosis

```bash
# Check n8n workflows are active
curl https://your-n8n-instance/webhook/agent-executor -X POST

# Test SSH connection to VPS
ssh aidevshop@your-vps "claude --version"

# Verify Claude CLI authentication
ssh aidevshop@your-vps "claude -p 'Say hello'"
```

## Common Issues

### 1. Bot Not Responding in Slack

**Symptoms:**
- Messages in #client-portal get no response
- No workflow executions in n8n

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| Workflow inactive | Activate Client Intake workflow in n8n |
| Wrong channel ID | Update `YOUR_CLIENT_CHANNEL_ID` in workflow |
| Bot not in channel | Invite bot to #client-portal |
| Slack events not configured | Check Event Subscriptions in Slack app settings |

**Debug Steps:**
1. Check n8n execution logs for Client Intake
2. Verify Slack Event Subscriptions URL responds with 200
3. Test webhook manually: `curl -X POST your-webhook-url`

---

### 2. Infinite Loop / Bot Responding to Itself

**Symptoms:**
- Same message posted repeatedly
- Workflow executes hundreds of times
- Maya responds to her own messages

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| Bot ID not filtered | Check "Filter Bot Messages" node conditions |
| Message_changed events | Add subtype check in Parse Message code |
| App ID leaking through | Add app_id to bot detection |

**The Parse Message node should check:**
```javascript
const isBotMessage = hasBotId || hasAppId || isBotSubtype || hasBotProfile || hasN8nSignature;
if (isBotMessage) return []; // Stop workflow
```

---

### 3. Claude CLI Timeout

**Symptoms:**
- Agent response truncated
- "Task completed" fallback message appears
- Exit code 124 in logs

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| Timeout too short | Increase `timeoutSeconds` in Build Agent Prompt |
| Claude API slow | Check Anthropic status page |
| Complex prompt | Simplify task instructions |

**Recommended Timeouts:**
```javascript
const timeoutSeconds = {
  'intake': 120,      // 2 min
  'planning': 360,    // 6 min
  'design': 360,      // 6 min
  'development': 1200, // 20 min
  'review': 420,      // 7 min
  'testing': 420,     // 7 min
  'deployment': 720,  // 12 min
  'delivery': 180     // 3 min
};
```

---

### 4. Duplicate Phase Transitions

**Symptoms:**
- Same "Phase X → Y" notification posted twice
- Multiple agents triggered for same phase
- Project jumps phases erratically

**Cause:** Race condition when multiple agents complete simultaneously.

**Solution:** The idempotency check in Orchestrator should prevent this:
```javascript
// SKIP if already past expected phase
if (actualOrder >= nextOrder) {
  console.log('SKIP: Duplicate transition detected!');
  return [];
}
```

**Verify:** Check that "Check Idempotency" node exists and is connected.

---

### 5. Thread Replies Not Working

**Symptoms:**
- New threads created instead of replies
- Client messages create new projects
- `thread_ts` is empty or undefined

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| Precision loss | Prefix thread_ts with apostrophe in Sheets |
| Wrong field | Use `messageTs` for new messages, `threadTs` for replies |
| Type coercion | Always use `String(threadTs)` |

**Fix in Generate New Project:**
```javascript
thread_ts: "'" + threadTs  // Force text format in Sheets
```

---

### 6. Inconsistent Project Names

**Symptoms:**
- Different agents call the project different names
- "Todo App" vs "TaskMaster" vs "Task Manager"
- Confusion in deliverables

**Cause:** Agents not reading existing documentation.

**Solution:** Shared context instructions:
```
=== CRITICAL: PROJECT CONSISTENCY ===
BEFORE you start, READ these files:
- PROJECT_PLAN.md - Contains the official project name
- ARCHITECTURE.md - Contains technical decisions
- DESIGN.md - Contains design system

You MUST use the SAME project name as previous agents.
```

---

### 7. Deployment Fails

**Symptoms:**
- No Vercel URL in delivery
- GitHub repo not created
- DEPLOYMENT.md missing or empty

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| GitHub CLI not authenticated | Run `gh auth login` on VPS |
| Vercel CLI not authenticated | Run `vercel login` on VPS |
| Build errors | Check project's `npm run build` locally |
| Rate limits | Wait and retry, or check API quotas |

**Test Deployment Manually:**
```bash
cd /home/aidevshop/ai-dev-shop-projects/proj_xxx
npm install
npm run build
gh repo create test-repo --public --source=. --push
vercel --prod
```

---

### 8. Project Stuck in Phase

**Symptoms:**
- Project stays in "development" forever
- No progress after agent completes
- Orchestrator not triggered

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| Agent didn't advance | Check `shouldAdvancePhase` flag |
| Webhook failed | Verify orchestrator webhook URL |
| Error in agent | Check for SSH/Claude errors |

**Debug:**
1. Check Agent Executor logs
2. Look for "Trigger Orchestrator" node execution
3. Verify Orchestrator webhook is reachable

---

### 9. Quality Gate Not Working

**Symptoms:**
- Review says "FAIL" but project continues
- No loop back to development
- `reviewFailed` always false

**Cause:** REVIEW_STATUS not detected in response.

**Solution:** Check Parse Response detection patterns:
```javascript
const reviewFailPatterns = [
  /REVIEW_STATUS:\s*FAIL/i,
  /REVIEW_STATUS:FAIL/i,
  /\*\*REVIEW_STATUS:\s*FAIL\*\*/i
];
const reviewFailed = reviewFailPatterns.some(p => p.test(response));
```

---

### 10. Google Sheets Not Updating

**Symptoms:**
- Projects sheet stays empty
- Phase doesn't update
- "No matching row" errors

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| Wrong sheet name | Verify sheet is exactly "Projects" |
| OAuth expired | Reconnect Google Sheets credential |
| Column mismatch | Check column names match workflow |

**Required Columns:**
```
project_id | thread_ts | channel_id | user_id | client_brief | current_phase | status | created_at | updated_at
```

---

## Debug Checklist

When something breaks:

- [ ] Check n8n execution logs
- [ ] Verify all 3 workflows are active
- [ ] Test SSH connection to VPS
- [ ] Verify Claude CLI works: `claude -p "test"`
- [ ] Check Google Sheets has correct data
- [ ] Look at Slack for error notifications in #dev-team-internal
- [ ] Review project status in Google Sheets
- [ ] Check VPS disk space and resources

## Getting Help

1. Check execution logs in n8n (detailed error messages)
2. Look at #dev-team-internal for error notifications
3. Review this troubleshooting guide
4. Open an issue on GitHub with:
   - Error message
   - Workflow execution ID
   - Steps to reproduce
