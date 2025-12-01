import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const REQUIRED_FIELDS = ["name", "email", "phone", "message"] as const;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1) Validation basique côté serveur (toujours utile)
    for (const field of REQUIRED_FIELDS) {
      if (!body[field] || typeof body[field] !== "string") {
        return NextResponse.json(
          { error: `Champ manquant ou invalide : ${field}` },
          { status: 400 },
        );
      }
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
    ) {
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

    // 2) Config SMTP OVH (variables d'environnement)
    const transporter = nodemailer.createTransport({
      host: process.env.OVH_SMTP_HOST, // ex: "ssl0.ovh.net"
      port: Number(process.env.OVH_SMTP_PORT) || 465,
      secure: true, // true pour 465, false pour 587
      auth: {
        user: process.env.OVH_SMTP_USER, // ton email complet OVH
        pass: process.env.OVH_SMTP_PASS, // ton mot de passe
      },
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
      <h2>Nouvelle demande de contact - Déclic Parasite</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Téléphone :</strong> ${phone}</p>
      <p><strong>Service :</strong> ${serviceLabel || service || "Non précisé"}</p>
      <hr />
      <p><strong>Message :</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;

    // 3) Envoi du mail
    await transporter.sendMail({
      from: `"Déclic Parasite" <${process.env.OVH_SMTP_USER}>`,
      to: process.env.CONTACT_TO || process.env.OVH_SMTP_USER, // destinataire final
      replyTo: email, // tu peux répondre directement au client
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("contact-api-error", error);
    return NextResponse.json(
      {
        error:
          "Impossible d'envoyer le message pour le moment. Essayez l'email direct ou le téléphone.",
      },
      { status: 500 },
    );
  }
}
