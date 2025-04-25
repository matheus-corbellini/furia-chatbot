document.addEventListener("DOMContentLoaded", () => {
  const entrarBtn = document.getElementById("entrar-chat");
  const novoChatBtn = document.getElementById("novo-chat");
  const telaInicial = document.getElementById("tela-inicial");
  const chat = document.getElementById("chat");
  const abrirMenuBtn = document.getElementById("abrir-menu");

  entrarBtn.addEventListener("click", () => {
    telaInicial.style.display = "none";
    chat.style.display = "flex";
    messagesDiv.innerHTML = "";
    appendMessage(
      "FURIA Bot",
      "👋 Olá, Furioso! Digite ou clique <strong>menu</strong> para ver o que posso te mostrar sobre o time."
    );
  });

  novoChatBtn.addEventListener("click", () => {
    messagesDiv.innerHTML = "";
    appendMessage(
      "FURIA Bot",
      "👋 Olá, Furioso! Digite ou clique <strong>menu</strong> para ver o que posso te mostrar sobre o time."
    );
  });

  abrirMenuBtn.addEventListener("click", () => {
    showMenuOptions();
  });
});

const messagesDiv = document.getElementById("messages");
const input = document.getElementById("input");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  appendMessage("Você", text);
  input.value = "";

  if (text.toLowerCase() === "menu") {
    showMenuOptions();
    return;
  }

  const typingMessage = document.createElement("div");
  typingMessage.classList.add("message", "bot");
  typingMessage.innerHTML = "<strong>FURIA Bot:</strong> <em>digitando...</em>";
  messagesDiv.appendChild(typingMessage);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  setTimeout(() => {
    fetch("http://localhost:3001/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        typingMessage.remove();
        appendMessage("FURIA Bot", data.reply);
      })
      .catch(() => {
        typingMessage.remove();
        appendMessage("FURIA Bot", "Erro ao conectar com o servidor.");
      });
  }, 1000);
}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message");
  msg.classList.add(sender === "Você" ? "user" : "bot");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendMessageWithText(text) {
  const typingMessage = document.createElement("div");
  typingMessage.classList.add("message", "bot");
  typingMessage.innerHTML = "<strong>FURIA Bot:</strong> <em>digitando...</em>";
  messagesDiv.appendChild(typingMessage);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  setTimeout(() => {
    fetch("http://localhost:3001/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    })
      .then((res) => res.json())
      .then((data) => {
        typingMessage.remove();
        appendMessage("FURIA Bot", data.reply);
      })
      .catch(() => {
        typingMessage.remove();
        appendMessage("FURIA Bot", "Erro ao conectar com o servidor.");
      });
  }, 1000);
}

function showMenuOptions() {
  const options = [
    { label: "Lineup", icon: "🧑‍💻" },
    { label: "Títulos", icon: "🏆" },
    { label: "Curiosidades", icon: "💡" },
    { label: "Outras opções", icon: "🧭" },
  ];

  const container = document.createElement("div");
  container.classList.add("message", "bot");
  container.innerHTML = `<strong>FURIA Bot:</strong> Escolha uma opção abaixo:<br>`;

  options.forEach(({ label, icon }) => {
    const btn = document.createElement("button");
    btn.textContent = `${icon} ${label}`;
    btn.classList.add("menu-option");

    btn.onclick = () => {
      appendMessage("Você", label.toLowerCase());

      if (label === "Outras opções") {
        container.remove();
        showAllOptions();
      } else {
        sendMessageWithText(label.toLowerCase());
        container.remove();
      }
    };

    container.appendChild(btn);
  });

  messagesDiv.appendChild(container);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showAllOptions() {
  const fullReply = `
      <strong>FURIA Bot:</strong> Aqui estão todas as opções disponíveis:
      <ul>
        <li><strong>Lineup</strong> – Nosso elenco atual!</li>
        <li><strong>Títulos</strong> – Conquistas da FURIA!</li>
        <li><strong>Curiosidade</strong> – Fatos interessantes sobre nossa organização!</li>
        <li><strong>Coach</strong> – Quem é o técnico?</li>
        <li><strong>Sede</strong> – Onde fica a nossa organização?</li>
        <li><strong>Ranking</strong> – Posição atual no ranking mundial!</li>
      </ul>
    `;

  const msg = document.createElement("div");
  msg.classList.add("message", "bot");
  msg.innerHTML = fullReply;
  messagesDiv.appendChild(msg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
