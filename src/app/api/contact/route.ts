import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error("[API Contact] Erreur lecture JSON body");
      return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
    }

    console.log("[API Contact] Données reçues clés :", Object.keys(body));

    // --- 1) Extraction avec valeurs par défaut ---
    const name = body.fullName || body.name || "Client (Inconnu)";
    const email = body.email || "";
    const phone = body.phone || "";
    const message = body.message || "";
    const address = body.address || "Non précisée";
    const serviceLabel = body.serviceLabel || body.service || "Intervention";

    // --- 2) Validation (plus bavarde) ---
    if (!email || !message) {
      const errorMsg = `Email (${!!email}) ou Message (${!!message}) manquant.`;
      console.error("[API Contact] " + errorMsg);
      // On continue quand même pour tester si le reste marche, ou on renvoie une 400 précise
      return NextResponse.json(
        { error: errorMsg },
        { status: 400 }
      );
    }

    // --- 3) Configuration Email ---
    const host = process.env.EMAIL_HOST;
    const port = Number(process.env.EMAIL_PORT || "465");
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!host || !user || !pass) {
      console.error("[API Contact] Variables EMAIL_* manquantes.");
      return NextResponse.json({ error: "Config email manquante sur le serveur (Vercel)." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized: false }
    });

    const subject = `Demande de devis - ${serviceLabel}`;

    const text = `Nom : ${name}\nEmail : ${email}\nTéléphone : ${phone}\nAdresse : ${address}\nService : ${serviceLabel}\n\nMessage :\n${message}`;

    const html = `
      <h2>Nouvelle demande - Déclic Parasites</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Téléphone :</strong> ${phone}</p>
      <p><strong>Adresse :</strong> ${address}</p>
      <p><strong>Service :</strong> ${serviceLabel}</p>
      <hr />
      <p><strong>Message :</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;

    // --- 4) Envoi Email ---
    await transporter.sendMail({
      from: `"Déclic Parasites" <${user}>`,
      to: user,
      replyTo: email,
      subject,
      text,
      html,
    });

    // --- 5) Notification Discord ---
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Déclic Parasites",
            avatar_url: "https://declicparasites.fr/favicon.ico",
            embeds: [
              {
                title: "📬 Nouvelle demande de devis",
                color: 0x00ff6a,
                fields: [
                  { name: "Nom", value: String(name), inline: true },
                  { name: "Téléphone", value: String(phone), inline: true },
                  { name: "Email", value: String(email), inline: false },
                  { name: "Adresse", value: String(address), inline: false },
                  { name: "Service", value: String(serviceLabel) },
                  { name: "Message", value: String(message).slice(0, 1024) },
                ],
                footer: { text: `Le ${new Date().toLocaleString("fr-FR")}` },
              },
            ],
          }),
        });
      } catch (e) {
        console.error("Erreur Discord", e);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err: any) {
    console.error("[API Contact] Erreur globale :", err);
    return NextResponse.json({ error: err?.message || "Erreur" }, { status: 500 });
  }
}
