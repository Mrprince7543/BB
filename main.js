(async () => {
  try {
    const {
      makeWASocket,
      useMultiFileAuthState,
      delay,
      DisconnectReason
    } = await import("@whiskeysockets/baileys");
    const fs = await import("fs");
    const { default: pino } = await import("pino");
    const readline = (await import("readline")).createInterface({
      input: process.stdin,
      output: process.stdout
    });
    const { default: chalk } = await import("chalk");

    const ask = q => new Promise(r => readline.question(q, r));

    // ✅ LOGO + DETAILS
    const logo_lines = [
      { text: "/$$      /$$ /$$$$$$$        /$$$$$$$  /$$$$$$$  /$$$$$$ /$$   /$$  /$$$$$$  /$$$$$$$$      ", color: chalk.cyan },
      { text: "| $$$    /$$$| $$__  $$      | $$__  $$| $$__  $$|_  $$_/| $$$ | $$ /$$__  $$| $$_____/      ", color: chalk.cyan },
      { text: "| $$$$  /$$$$| $$  \\ $$      | $$  \\ $$| $$  \\ $$  | $$  | $$$$| $$| $$  \\__/| $$            ", color: chalk.cyan },
      { text: "| $$ $$/$$ $$| $$$$$$$/      | $$$$$$$/| $$$$$$$/  | $$  | $$ $$ $$| $$      | $$$$$         ", color: chalk.cyan },
      { text: "| $$  $$$| $$| $$__  $$      | $$____/ | $$__  $$  | $$  | $$  $$$$| $$      | $$__/         ", color: chalk.cyan },
      { text: "| $$\\  $ | $$| $$  \\ $$      | $$      | $$  \\ $$  | $$  | $$\\  $$$| $$    $$| $$            ", color: chalk.cyan },
      { text: "| $$ \\/  | $$| $$  | $$      | $$      | $$  | $$ /$$$$$$| $$ \\  $$|  $$$$$$/| $$$$$$$$      ", color: chalk.cyan },
      { text: "|__/     |__/|__/  |__/      |__/      |__/  |__/|______/|__/  \\__/ \\______/ |________/      ", color: chalk.cyan },
      { text: "                                                                                             ", color: chalk.cyan },
      { text: "         ╭───────────────────────── < ~ COUNTRY ~  > ─────────────────────────╮", color: chalk.cyan },
      { text: "         │   【•】 YOUR COUNTRY  ➤ INDIA                                      │", color: chalk.yellow },
      { text: "         │   【•】 YOUR REGION   ➤ BIHAR                                      │", color: chalk.yellow },
      { text: "         │   【•】 YOUR CITY     ➤ PATNA                                      │", color: chalk.yellow },
      { text: "         ╰────────────────────────────< ~ COUNTRY ~  >────────────────────────╯", color: chalk.cyan },
      { text: "╔═════════════════════════════════════════════════════════════════════════════════════╗", color: chalk.yellow },
      { text: "║  NAME       : BROKEN-PRINCE        GOD ABBUS                     RAKHNA             ║", color: chalk.cyan },
      { text: "║  RULLEX     : PATNA ON FIRE         KARNE PE                     SAB GOD            ║", color: chalk.green },
      { text: "║  FORM 🏠    : BIHAR-PATNA           APPEARED                     ABBUS MANA         ║", color: chalk.cyan },
      { text: "║  BRAND      : MULTI CONVO WP          HATA DIYA                    HAI BILKUL       ║", color: chalk.green },
      { text: "║  GitHub     : BROKEN PRINCE         JAAEGA YE                    KOI BHI HO        ║", color: chalk.cyan },
      { text: "║  WHATSAP    : +917543864229         BAAT YWAD                   GOD ABBUS NO       ║", color: chalk.green },
      { text: "╚═════════════════════════════════════════════════════════════════════════════════════╝", color: chalk.yellow },
    ];

    const banner = () => {
      console.clear();
      logo_lines.forEach(line => console.log(line.color(line.text)));
    };

    let targetJid = null;
    let messages = null;
    let delaySec = null;
    let haterName = null;

    const { state, saveCreds } = await useMultiFileAuthState("./auth_info");

    async function startMessaging(sock) {
      while (true) {
        for (const msg of messages) {
          try {
            const now = new Date().toLocaleTimeString();
            const finalMsg = haterName + " " + msg;

            await sock.sendMessage(targetJid, { text: finalMsg });

            console.log(chalk.cyan("【Target】=> ") + targetJid);
            console.log(chalk.green("【Time】=> ") + now);
            console.log(chalk.yellow("【Message】=> ") + finalMsg);
            console.log(chalk.magenta("〓〓〓〓〓〓〓〓〓 MESSAGE SENT 〓〓〓〓〓〓〓〓〓"));

            await delay(delaySec * 1000);
          } catch (e) {
            console.log(chalk.red("Error sending message: " + e.message + ". Retrying..."));
            await delay(5000);
          }
        }
      }
    }

    const connect = async () => {
      const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        auth: state
      });

      if (!sock.authState.creds.registered) {
        banner();
        const phone = await ask(chalk.green("[√] Enter Your Phone Number => "));
        const code = await sock.requestPairingCode(phone);
        banner();
        console.log(chalk.cyan("[√] Your Pairing Code Is => ") + code);
      }

      sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
        if (connection === "open") {
          banner();
          console.log(chalk.green("[✓] WhatsApp Connected!"));

          // ✅ OPTION SELECTION
          console.log(chalk.cyan("\nChoose Messaging Mode:"));
          console.log(chalk.yellow("1. Inbox (Single Number)"));
          console.log(chalk.yellow("2. Group (Choose from Joined Groups)"));
          const choice = await ask(chalk.green("Enter Option (1 or 2): "));

          if (choice === "1") {
            // ✅ Inbox Mode
            targetJid = (await ask(chalk.green("[√] 【Enter Target Number】 ===> "))) + "@s.whatsapp.net";
          } else if (choice === "2") {
            // ✅ Group Mode
            const groupList = await sock.groupFetchAllParticipating();
            const groupArray = Object.values(groupList);

            console.log(chalk.cyan("\nYour Groups:"));
            groupArray.forEach((g, i) => {
              console.log(chalk.yellow(`${i + 1}. ${g.subject} (${g.id})`));
            });

            const gIndex = await ask(chalk.green("[√] 【Enter Group Number】 ===> "));
            targetJid = groupArray[parseInt(gIndex) - 1].id;
          } else {
            console.log(chalk.red("Invalid Option! Exiting..."));
            process.exit(0);
          }

          // ✅ Common Inputs
          const filePath = await ask(chalk.cyan("[+] 【Enter Message File Path】 ===> "));
          messages = fs.readFileSync(filePath, "utf-8").split("\n").filter(Boolean);
          haterName = await ask(chalk.green("[√] 【Enter Hater Name】===> "));
          delaySec = await ask(chalk.yellow("[√] 【Enter Message Delay (sec)】===> "));

          banner();
          console.log(chalk.magenta("Now Start Message Sending......."));
          await startMessaging(sock);
        }

        if (connection === "close" && lastDisconnect?.error) {
          const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
          if (shouldReconnect) {
            console.log("Network issue, retrying in 5 seconds...");
            setTimeout(connect, 5000);
          } else {
            console.log("Connection closed. Please restart the script.");
          }
        }
      });

      sock.ev.on("creds.update", saveCreds);
    };

    await connect();

    process.on("uncaughtException", err => {
      let msg = String(err);
      if (msg.includes("Socket connection timeout") || msg.includes("rate-overlimit")) return;
      console.log("Caught exception: ", err);
    });
  } catch (err) {
    console.error("Error importing modules:", err);
  }
})();
