let transactions = [];

document.getElementById("add-btn").addEventListener("click", async () => {
  const date = document.getElementById("date").value;
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  let category = document.getElementById("category").value;

  if (!category) {
    category = await aiCategorize(desc);
  }

  const transaction = { date, desc, category, amount };
  transactions.push(transaction);
  renderTransactions();

  const insight = await aiSpendingInsights(transactions);
  document.getElementById("ai-summary").innerText = insight;
});

document.getElementById("chat-btn").addEventListener("click", async () => {
  const question = document.getElementById("chat-input").value;
  const answer = await aiChat(question, transactions);
  document.getElementById("chat-response").innerText = answer;
});

function renderTransactions() {
  const tbody = document.getElementById("transaction-list");
  tbody.innerHTML = "";
  transactions.forEach(t => {
    const row = `<tr><td>${t.date}</td><td>${t.desc}</td><td>${t.category}</td><td>₹${t.amount}</td></tr>`;
    tbody.innerHTML += row;
  });
}
