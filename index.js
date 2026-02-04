import TelegramBot from "node-telegram-bot-api";

console.log("🤖 Bot Telegram avviato");

// ===== TOKEN =====
const TOKEN = process.env.TELEGRAM_TOKEN;

if (!TOKEN) {
  console.error("❌ TELEGRAM_TOKEN mancante");
  process.exit(1);
}

// ===== AVVIO BOT =====
const bot = new TelegramBot(TOKEN, { polling: true });

// ===== LINK (CAMBIALI TU) =====
const LISTINO_URL = "https://example.com/listino";
const ORDINI_URL = "https://example.com/modulo-ordini";
const ASTE_URL = "https://example.com/modulo-aste";

// ===== /start =====
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || "utente";

  bot.sendMessage(
    chatId,
    `👋 *Benvenuto ${name}!*

Con questo bot puoi:
• consultare il *listino digitale*
• inviare *ordinazioni*
• partecipare alle *aste*

Usa i bottoni qui sotto oppure il comando /aste.`,
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📋 Listino digitale", url: LISTINO_URL }
          ],
          [
            { text: "🛒 Modulo ordinazioni", url: ORDINI_URL }
          ]
        ]
      }
    }
  );
});

// ===== /aste =====
bot.onText(/\/aste/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    `🏷️ *Modulo Aste*

Clicca il bottone qui sotto per partecipare alle aste 👇`,
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "⚖️ Vai al modulo aste", url: ASTE_URL }
          ]
        ]
      }
    }
  );
});

// ===== Messaggi normali (opzionale) =====
bot.on("message", (msg) => {
  if (!msg.text) return;
  if (msg.text.startsWith("/")) return;

  bot.sendMessage(
    msg.chat.id,
    "ℹ️ Usa /start per vedere le opzioni disponibili."
  );
});
