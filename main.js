(async () => {
  try {
    const {
      makeWASocket: _0x2bf3dc,
      useMultiFileAuthState: _0x323730,
      delay: _0x261c93,
      DisconnectReason: _0x2ec702
    } = await import("@whiskeysockets/baileys");
    const _0x4f32d2 = await import('fs');
    const _0x4f0b08 = (await import("pino"))["default"];
    const _0x3d2dee = (await import("readline")).createInterface({
      'input': process.stdin,
      'output': process.stdout
    });
    const { default: chalk } = await import("chalk");

    const _0x50c5f2 = _0x18f685 => new Promise(_0x247002 => _0x3d2dee.question(_0x18f685, _0x247002));

    // ✅ नया ASCII LOGO और DETAILS SECTION
    const _0x2f2bfd = () => {
      console.clear();
      const logo_lines = [
        ("/$$      /$$ /$$$$$$$        /$$$$$$$  /$$$$$$$  /$$$$$$ /$$   /$$  /$$$$$$  /$$$$$$$$      ", chalk.cyan),
        ("| $$$    /$$$| $$__  $$      | $$__  $$| $$__  $$|_  $$_/| $$$ | $$ /$$__  $$| $$_____/      ", chalk.cyan),
        ("| $$$$  /$$$$| $$  \\ $$      | $$  \\ $$| $$  \\ $$  | $$  | $$$$| $$| $$  \\__/| $$            ", chalk.cyan),
        ("| $$ $$/$$ $$| $$$$$$$/      | $$$$$$$/| $$$$$$$/  | $$  | $$ $$ $$| $$      | $$$$$         ", chalk.cyan),
        ("| $$  $$$| $$| $$__  $$      | $$____/ | $$__  $$  | $$  | $$  $$$$| $$      | $$__/         ", chalk.cyan),
        ("| $$\\  $ | $$| $$  \\ $$      | $$      | $$  \\ $$  | $$  | $$\\  $$$| $$    $$| $$            ", chalk.cyan),
        ("| $$ \\/  | $$| $$  | $$      | $$      | $$  | $$ /$$$$$$| $$ \\  $$|  $$$$$$/| $$$$$$$$      ", chalk.cyan),
        ("|__/     |__/|__/  |__/      |__/      |__/  |__/|______/|__/  \\__/ \\______/ |________/      ", chalk.cyan),
        ("                                                                                             ", chalk.cyan),
        ("         ╭───────────────────────── < ~ COUNTRY ~  > ─────────────────────────╮", chalk.cyan),
        ("         │   【•】 YOUR COUNTRY  ➤ INDIA                                      │", chalk.yellow),
        ("         │   【•】 YOUR REGION   ➤ BIHAR                                      │", chalk.yellow),
        ("         │   【•】 YOUR CITY     ➤ PATNA                                      │", chalk.yellow),
        ("         ╰────────────────────────────< ~ COUNTRY ~  >────────────────────────╯", chalk.cyan),
        ("╔═════════════════════════════════════════════════════════════════════════════════════╗", chalk.yellow),
        ("║  NAME       : BROKEN-PRINCE        GOD ABBUS                     RAKHNA             ║", chalk.cyan),
        ("║  RULLEX     : PATNA ON FIRE         KARNE PE                     SAB GOD            ║", chalk.green),
        ("║  FORM 🏠    : BIHAR-PATNA           APPEARED                     ABBUS MANA         ║", chalk.cyan),
        ("║  BRAND      : MULTI CONVO WP          HATA DIYA                    HAI BILKUL       ║", chalk.green),
        ("║  GitHub     : BROKEN PRINCE         JAAEGA YE                    KOI BHI HO        ║", chalk.cyan),
        ("║  WHATSAP    : +917543864229         BAAT YWAD                   GOD ABBUS NO       ║", chalk.green),
        ("╚═════════════════════════════════════════════════════════════════════════════════════╝", chalk.yellow),
      ];
      logo_lines.forEach(line => {
        console.log(typeof line === "string" ? line : line[1](line[0]));
      });
    };

    let _0x36441e = null;
    let _0x4e7136 = null;
    let _0x36f57b = null;
    let _0x15801a = null;

    const {
      state: _0x8ddf0a,
      saveCreds: _0x48dc66
    } = await _0x323730("./auth_info");

    async function _0x16e29b(_0x2a37a4) {
      while (true) {
        for (const _0x22ef8c of _0x4e7136) {
          try {
            const _0x507034 = new Date().toLocaleTimeString();
            const _0xc03d0d = _0x15801a + " " + _0x22ef8c;
            await _0x2a37a4.sendMessage(_0x36441e + "@c.us", { 'text': _0xc03d0d });

            console.log(chalk.cyan("【Target Number】=> ") + _0x36441e);
            console.log(chalk.green("【Time】=> ") + _0x507034);
            console.log(chalk.yellow("【Message】=> ") + _0xc03d0d);
            console.log(chalk.magenta("〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓【 MESSAGE SENT 】〓〓〓〓〓〓〓〓〓〓〓〓〓"));

            await _0x261c93(_0x36f57b * 1000);
          } catch (_0x37ac9b) {
            console.log(chalk.red("Error sending message: " + _0x37ac9b.message + ". Retrying..."));
            await _0x261c93(5000);
          }
        }
      }
    }

    const _0x15b26c = async () => {
      const _0x4e4e27 = _0x2bf3dc({
        'logger': _0x4f0b08({ 'level': "silent" }),
        'auth': _0x8ddf0a
      });

      if (!_0x4e4e27.authState.creds.registered) {
        _0x2f2bfd();
        const _0x5e2a1a = await _0x50c5f2(chalk.green("[√] Enter Your Phone Number => "));
        const _0xcf705f = await _0x4e4e27.requestPairingCode(_0x5e2a1a);
        _0x2f2bfd();
        console.log(chalk.cyan("[√] Your Pairing Code Is => ") + _0xcf705f);
      }

      _0x4e4e27.ev.on("connection.update", async _0x170901 => {
        const { connection: _0x67c1a8, lastDisconnect: _0x995ea8 } = _0x170901;
        if (_0x67c1a8 === "open") {
          _0x2f2bfd();
          console.log(chalk.green("[Your WhatsApp Login ✓]"));

          if (!_0x36441e || !_0x4e7136 || !_0x36f57b || !_0x15801a) {
            _0x36441e = await _0x50c5f2(chalk.green("[√] 【Enter Target Number】 ===> "));
            const _0x2adf8c = await _0x50c5f2(chalk.cyan("[+] 【Enter Message File Path】 ===> "));
            _0x4e7136 = _0x4f32d2.readFileSync(_0x2adf8c, "utf-8").split("\n").filter(Boolean);
            _0x15801a = await _0x50c5f2(chalk.green("[√] 【Enter Hater Name】===> "));
            _0x36f57b = await _0x50c5f2(chalk.yellow("[√] 【Enter Message Delay (sec)】===> "));

            console.log(chalk.cyan("All Details Are Filled Correctly"));
            _0x2f2bfd();
            console.log(chalk.magenta("Now Start Message Sending......."));
            await _0x16e29b(_0x4e4e27);
          }
        }

        if (_0x67c1a8 === "close" && _0x995ea8?.["error"]) {
          const _0x341612 = _0x995ea8.error?.["output"]?.["statusCode"] !== _0x2ec702.loggedOut;
          if (_0x341612) {
            console.log("Network issue, retrying in 5 seconds...");
            setTimeout(_0x15b26c, 5000);
          } else {
            console.log("Connection closed. Please restart the script.");
          }
        }
      });

      _0x4e4e27.ev.on("creds.update", _0x48dc66);
    };

    await _0x15b26c();

    process.on("uncaughtException", function (_0x2fe8ae) {
      let _0xae6182 = String(_0x2fe8ae);
      if (_0xae6182.includes("Socket connection timeout") || _0xae6182.includes("rate-overlimit")) {
        return;
      }
      console.log("Caught exception: ", _0x2fe8ae);
    });
  } catch (_0x3892c6) {
    console.error("Error importing modules:", _0x3892c6);
  }
})();
