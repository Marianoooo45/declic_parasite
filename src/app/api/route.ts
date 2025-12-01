import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceLabel, message } = body;

    // Vérification des champs
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Configuration OVH pour le port 587 (Plus fiable sur Vercel)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // ssl0.ovh.net
      port: Number(process.env.EMAIL_PORT), // 587
      secure: false, // Important pour le port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: "SSLv3", // Aide à la compatibilité OVH
      },
    });

    const mailOptions = {
      from: `"Formulaire Site" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Nouveau Prospect : ${name} - ${serviceLabel}`,
      text: `Nom: ${name}\nTéléphone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #1d4e2b;">Nouvelle demande : ${serviceLabel}</h2>
          <p><strong>👤 Nom :</strong> ${name}</p>
          <p><strong>📞 Téléphone :</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>📧 Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <br/>
          <div style="background: #f9f9f9; padding: 15px; border-left: 5px solid #dbb341;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur SMTP:", error); // Ceci apparaîtra dans les logs Vercel si ça plante
    return NextResponse.json(
      { error: "Erreur lors de l'envoi." },
      { status: 500 }
    );
  }
}