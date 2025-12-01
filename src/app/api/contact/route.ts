import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const REQUIRED_FIELDS = ["name", "email", "phone", "message"] as const;

// GET juste pour tester dans le navigateur que la route existe
export async function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // --- 1) Validation basique ---
    for (const field of REQUIRED_FIELDS) {
      if (!body[field] || typeof body[field] !== "string") {
        return NextResponse.json(
          { error: `Champ manquant ou invalide : ${field}` },
          { status: 400 },
        );
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 },
      );
    }

    const {
      name,
      email,
      phone,
      message,
      service,
      serviceLabel,
    } = body;

    // --- 2) Récup des variables Vercel ---
    const host = process.env.EMAIL_HOST;
    const port = Number(process.env.EMAIL_PORT || "465");
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!host || !user || !pass) {
      console.error("EMAIL_* env vars manquantes", {
        host: !!host,
        user: !!user,
        pass: !!pass,
      });
      return NextResponse.json(
        { error: "Config email serveur incomplète (EMAIL_*)." },
        { status: 500 },
      );
    }

    // --- 3) Transporter Nodemailer (Node.js runtime) ---
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true si 465, false si 587
      auth: { user, pass },
    });

    const subject = `Demande de devis - ${
      serviceLabel || service || "Intervention nuisibles"
    }`;

    const text = [
      `Nom : ${name}`,
      `Email : ${email}`,
      `Téléphone : ${phone}`,
      `Service : ${serviceLabel || service || "Non précisé"}`,
      "",
      "Message :",
      message,
    ].join("\n");

    const html = `
      <h2>Nouvelle demande de contact - Déclic Parasites</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Téléphone :</strong> ${phone}</p>
      <p><strong>Service :</strong> ${serviceLabel || service || "Non précisé"}</p>
      <hr />
      <p><strong>Message :</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;

    // --- 4) Envoi réel de l’email ---
    await transporter.sendMail({
      from: `"Déclic Parasites" <${user}>`, // expéditeur = ton compte OVH
      to: user,                             // destinataire = toi
      replyTo: email,                       // pour répondre au client
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("contact-api-error", err);
    return NextResponse.json(
      {
        error:
          "Impossible d'envoyer le message pour le moment. Essayez l'email direct ou le téléphone.",
      },
      { status: 500 },
    );
  }
}
