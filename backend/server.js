const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/message", (req, res) => {
  const userMessage = req.body.message.toLowerCase().trim();
  let botResponse = "";

  if (
    userMessage === "oi" ||
    userMessage === "olá" ||
    userMessage === "inicio" ||
    userMessage === "menu"
  ) {
    botResponse = `👋 Ola, Furioso! Seja bem-vindo ao Chatbot da FURIA! A maior e melhor organizacao de e-sports do Brasil, aqui estão algumas opções que você pode explorar para conhecer mais sobre nos no CS-GO! :
    
- Digite **lineup** para ver a escalação atual.
- Digite **títulos** para conhecer nossas conquistas.
- Digite **curiosidade** para saber algo interessante sobre o time.
- Digite **agenda** para ver os próximos jogos.`;
  } else if (userMessage.includes("lineup")) {
    botResponse =
      "📋 Lineup atual: KSCERATO, yuurih, YEKINDAR, molodoy e FalleN. Caso queira saber mais sobre algum dos jogadores digite o nome dele.";
  } else if (
    userMessage.includes("títulos") ||
    userMessage.includes("titulos")
  ) {
    botResponse =
      "🏆 Conquistas da FURIA: Campeã do CBCS, ESL Pro League NA e participação em diversos Majors.";
  } else if (userMessage.includes("curiosidade")) {
    botResponse =
      "💡 Curiosidade: A FURIA foi fundada em 2017 e rapidamente se tornou uma das principais e maiores equipes de CS:GO do Brasil.";
  } else if (userMessage.includes("agenda") || userMessage.includes("jogos")) {
    botResponse =
      "📅 Próximos jogos: \n- 25/04: FURIA vs. Team X \n- 28/04: FURIA vs. Team Y";
  } else {
    botResponse =
      "Furioso nao entendi sua mensagem. Por favor, digite **menu** para ver as opções disponíveis.";
  }

  res.json({ reply: botResponse });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
