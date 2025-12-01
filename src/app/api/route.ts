import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // On récupère les infos envoyées par votre formulaire
    const { name, email, phone, serviceLabel, message } = body;

    // Sécurité : Vérifier que tout est là
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    // Configuration de la connexion à OVH
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // ssl0.ovh.net
      port: Number(process.env.EMAIL_PORT), // 465
      secure: true, // Vrai pour le port 465
      auth: {
        user: process.env.EMAIL_USER, // votre email contact@...
        pass: process.env.EMAIL_PASS, // votre mot de passe
      },
    });

    // Configuration du mail que VOUS allez recevoir
    const mailOptions = {
      from: `"Site Web" <${process.env.EMAIL_USER}>`, // L'expéditeur doit être votre mail OVH
      to: process.env.EMAIL_USER, // Vous vous l'envoyez à vous-même
      replyTo: email, // Pour répondre au client en un clic
      subject: `Nouveau prospect : ${name} - ${serviceLabel}`,
      text: `
        Nouvelle demande de : ${name}
        Téléphone : ${phone}
        Email : ${email}
        Service : ${serviceLabel}

        Message :
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
          <div style="background-color: #1d4e2b; color: white; padding: 15px; border-radius: 5px 5px 0 0;">
            <h2 style="margin: 0;">Nouvelle demande de devis</h2>
          </div>
          <div style="border: 1px solid #ddd; padding: 20px; border-radius: 0 0 5px 5px;">
            <p><strong>Service :</strong> <span style="color: #dbb341; font-weight: bold;">${serviceLabel}</span></p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
            
            <h3 style="margin-top: 0;">Coordonnées du client :</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 5px;">👤 <strong>Nom :</strong> ${name}</li>
              <li style="margin-bottom: 5px;">📞 <strong>Tél :</strong> <a href="tel:${phone}" style="color: #1d4e2b; font-weight: bold;">${phone}</a></li>
              <li style="margin-bottom: 5px;">📧 <strong>Email :</strong> <a href="mailto:${email}" style="color: #1d4e2b;">${email}</a></li>
            </ul>

            <h3>Message :</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #1d4e2b; border-radius: 4px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>
      `,
    };

    // Envoi du mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Erreur d'envoi email:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'envoi." },
      { status: 500 }
    );
  }
}