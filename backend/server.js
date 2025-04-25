import express from "express";
import cors from "cors";
import players from "./data/players.js";
import curiosidades from "./data/curiosidades.js";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let lineupAtivo = false;
let historico = [];

app.post("/api/message", (req, res) => {
  const userMessage = req.body.message.toLowerCase().trim();
  historico.push(userMessage);
  let botResponse = "";

  const saudacoes = [
    "👋 Olá, Furioso! Bora saber mais da FURIA?",
    "🔥 Seja bem-vindo ao território da Pantera!",
    "🎯 Chegou no QG da FURIA! Manda um comando aí!",
  ];

  if (
    userMessage === "oi" ||
    userMessage === "olá" ||
    userMessage === "inicio" ||
    userMessage === "menu"
  ) {
    lineupAtivo = false;
    const saudacao = saudacoes[Math.floor(Math.random() * saudacoes.length)];
    botResponse = `${saudacao}

Aqui estão algumas opções:
- Digite **lineup** para ver a escalação atual.
- Digite **títulos** para conhecer nossas conquistas.
- Digite **curiosidade** para saber algo interessante sobre o time.
- Digite **agenda** para ver os próximos jogos.
- Digite **comandos** ou **ajuda** para ver mais opcoes que voce pode perguntar.
`;
  } else if (userMessage === "comandos" || userMessage === "ajuda") {
    botResponse = `📋 Comandos disponíveis:
- lineup
- [nome do jogador]
- títulos
- curiosidade
- coach
- sede
- ranking
- camisa
- símbolo
- redes
- história
- histórico`;
  } else if (userMessage === "lineup") {
    lineupAtivo = true;
    botResponse = `📋 Lineup atual da FURIA:
- KSCERATO
- yuurih
- YEKINDAR
- MOLODОY
- FalleN

💬 Digite o nome de um dos jogadores para saber mais sobre ele.`;
  } else if (lineupAtivo && players[userMessage]) {
    botResponse = players[userMessage];
  } else if (
    userMessage.includes("títulos") ||
    userMessage.includes("titulos")
  ) {
    lineupAtivo = false;
    botResponse =
      "🏆 Conquistas da FURIA: Campeã do CBCS, ESL Pro League NA e participação em diversos Majors.";
  } else if (
    userMessage.includes("curiosidade") ||
    userMessage.includes("curiosidades")
  ) {
    lineupAtivo = false;
    const randomIndex = Math.floor(Math.random() * curiosidades.length);
    botResponse = curiosidades[randomIndex];
  } else if (
    userMessage.includes("coach") ||
    userMessage.includes("treinador")
  ) {
    lineupAtivo = false;
    botResponse =
      "🧢 O coach da FURIA é o guerri, que lidera a equipe desde 2017 com muita disciplina e leitura tática.";
  } else if (
    userMessage.includes("sede") ||
    userMessage.includes("estrutura") ||
    userMessage.includes("ct")
  ) {
    lineupAtivo = false;
    botResponse =
      "🏢 A FURIA possui um centro de performance em Miami, nos Estados Unidos, com estrutura de ponta para treino e bem-estar dos jogadores.";
  } else if (userMessage.includes("ranking")) {
    lineupAtivo = false;
    botResponse =
      "📈 Atualmente a FURIA está no top 15 do ranking mundial de CS:GO, segundo a HLTV (dados fictícios).";
  } else if (
    userMessage.includes("camisa") ||
    userMessage.includes("uniforme")
  ) {
    lineupAtivo = false;
    botResponse =
      "👕 A camisa da FURIA é preta com a icônica pantera no peito — símbolo de força, elegância e identidade.";
  } else if (
    userMessage.includes("simbolo") ||
    userMessage.includes("símbolo") ||
    userMessage.includes("pantera")
  ) {
    lineupAtivo = false;
    botResponse =
      "🐾 A pantera da FURIA representa agressividade silenciosa, estratégia e força mental.";
  } else if (userMessage.includes("redes") || userMessage.includes("social")) {
    lineupAtivo = false;
    botResponse = `🌐 Redes sociais da FURIA:
- Instagram: @furia
- Twitter: @FURIA
- YouTube: youtube.com/furia
- Site oficial: https://www.furia.gg`;
  } else if (
    userMessage.includes("história") ||
    userMessage.includes("fundação")
  ) {
    lineupAtivo = false;
    botResponse =
      "📚 A FURIA foi fundada em agosto de 2017 por Jaime Pádua e André Akkari, com o objetivo de elevar o nível dos e-sports brasileiros ao cenário internacional.";
  } else if (userMessage === "historico" || userMessage === "histórico") {
    botResponse = "🗂️ Seu histórico:\n" + historico.join("\n");
  } else {
    lineupAtivo = false;
    botResponse =
      "🤔 Furioso, não entendi sua mensagem. Digite **menu** para ver as opções disponíveis.";
  }

  res.json({ reply: botResponse });
});

app.listen(port, () => {
  console.log(`🔥 Servidor da FURIA rodando em http://localhost:${port}`);
});
