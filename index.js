const bp = require("body-parser");
const express = require("express");
let lastchatId = 0;
// console.log(require("express"));
app = express();
botApi = require("node-telegram-bot-api");
const token = "5223586700:AAGov0UtIOv6xSzDPHZqxGQ4x9iM18QD8NI";
const bot = new botApi(token, { polling: true });
bot.on("polling_error", console.log);

messagesSoFar = [];
app.use(express.static("public"));
lmao = bot.getUpdates();
app.use(bp.text());

setIntervals = [];

bot.onText(/(.+)/, (msg, match) => {
  lastchatId = msg.chat.id;
  const chatId = msg.chat.id;
  console.log(setIntervals.length);
  // bot.sendMessage(chatId, "ELLO MEN");
  if (setIntervals.length == 0) {
    setIntervals.push(
      new setInterval(async () => {
        console.log(await lmao);
      }, 500)
    );
  }
  console.log(match);
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  console.log(chatId);

  //console.log(chatId);
  const resp = match[0]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  if (messagesSoFar.length > 10) {
    messagesSoFar.splice(0, 1);
  }
  messagesSoFar.push(match[0]);
  console.log(match[0]);

  console.log(messagesSoFar);
  // bot.sendMessage(chatId, "i dont care");
});
// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;
//   console.log(chatId);

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, "Received your message");
// });

app.post("/sendMsg", async (req, res) => {
  // lmaodobre = await req.body;

  bot.sendMessage(lastchatId, await req.body.replace(/"/g, ""));
  res.send(200);
});
app.get("/gibmsg", (req, res) => {
  res.send(JSON.stringify(messagesSoFar));
});
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
