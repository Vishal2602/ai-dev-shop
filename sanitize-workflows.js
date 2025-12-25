// Script to sanitize workflows and save them for GitHub
const fs = require('fs');

function sanitizeWorkflow(workflow, name) {
  // Deep clone
  const clean = JSON.parse(JSON.stringify(workflow));
  
  // Remove sensitive fields
  delete clean.id;
  delete clean.versionId;
  delete clean.activeVersionId;
  delete clean.versionCounter;
  delete clean.triggerCount;
  delete clean.shared;
  delete clean.tags;
  delete clean.activeVersion;
  delete clean.staticData;
  delete clean.meta;
  delete clean.pinData;
  delete clean.updatedAt;
  delete clean.createdAt;
  delete clean.isArchived;
  
  // Set to inactive by default
  clean.active = false;
  
  // Remove credential IDs but keep structure
  if (clean.nodes) {
    clean.nodes.forEach(node => {
      if (node.credentials) {
        Object.keys(node.credentials).forEach(key => {
          node.credentials[key] = {
            id: "YOUR_CREDENTIAL_ID",
            name: node.credentials[key].name || key
          };
        });
      }
      // Remove webhook IDs
      delete node.webhookId;
      
      // Replace hardcoded channel IDs with placeholders
      if (node.parameters) {
        const params = JSON.stringify(node.parameters);
        const replaced = params
          .replace(/C0A2V1H5W06/g, 'YOUR_CLIENT_CHANNEL_ID')
          .replace(/C0A3RBZJCKS/g, 'YOUR_INTERNAL_CHANNEL_ID')
          .replace(/1ENLzIEmiIEPmYBF1vDdiiGjR4kSJqjsAr6XM7TwtTU8/g, 'YOUR_GOOGLE_SHEETS_ID');
        node.parameters = JSON.parse(replaced);
      }
    });
  }
  
  return clean;
}

// Workflow data (simplified - in real use, would load from files)
const workflows = {
  'client-intake': require('./client-intake-raw.json'),
  'agent-executor': require('./agent-executor-raw.json'),
  'project-orchestrator': require('./project-orchestrator-raw.json')
};

Object.entries(workflows).forEach(([name, wf]) => {
  const clean = sanitizeWorkflow(wf, name);
  fs.writeFileSync(
    `./workflows/${name}.json`,
    JSON.stringify(clean, null, 2)
  );
  console.log(`Saved: workflows/${name}.json`);
});
