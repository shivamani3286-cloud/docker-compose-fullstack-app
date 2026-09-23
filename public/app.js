const form = document.getElementById("message-form");
const messagesEl = document.getElementById("messages");
const statusEl = document.getElementById("status");
const errorEl = document.getElementById("error");

async function checkHealth() {
  try {
    const response = await fetch("/health");
    const data = await response.json();
    statusEl.textContent = data.database === "connected"
      ? "● Database connected"
      : "● Database unavailable";
    statusEl.className = `status ${data.database === "connected" ? "ok" : "bad"}`;
  } catch {
    statusEl.textContent = "● Application unavailable";
    statusEl.className = "status bad";
  }
}

async function loadMessages() {
  const response = await fetch("/api/messages");
  const messages = await response.json();

  if (!messages.length) {
    messagesEl.innerHTML = "<p class='muted'>No messages yet. Add the first one.</p>";
    return;
  }

  messagesEl.innerHTML = messages.map((item) => `
    <article class="message">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <small>${new Date(item.createdAt).toLocaleString()}</small>
      </div>
      <p>${escapeHtml(item.message)}</p>
    </article>
  `).join("");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorEl.textContent = "";

  const payload = {
    name: document.getElementById("name").value,
    message: document.getElementById("message").value
  };

  const response = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const data = await response.json();
    errorEl.textContent = data.error || "Something went wrong.";
    return;
  }

  form.reset();
  await loadMessages();
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

checkHealth();
loadMessages();
setInterval(checkHealth, 30000);
