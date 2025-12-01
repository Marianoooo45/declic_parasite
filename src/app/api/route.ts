import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceLabel, message } = body;

    // 1. Connexion au serveur OVH via les variables Vercel
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true, // Vrai pour le port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Préparation du mail que VOUS allez recevoir
    const mailOptions = {
      from: `"Site Web" <${process.env.EMAIL_USER}>`, // L'expéditeur DOIT être votre mail OVH
      to: process.env.EMAIL_USER, // On envoie le mail à vous-même
      replyTo: email, // Pour pouvoir répondre au client en un clic
      subject: `Nouveau contact : ${name} - ${serviceLabel}`,
      text: `
        Nouvelle demande de contact :
        
        Nom : ${name}
        Email : ${email}
        Téléphone : ${phone}
        Service : ${serviceLabel}
        
        Message :
        ${message}
      `,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2 style="color: #1d4e2b;">Nouvelle demande client</h2>
          <p><strong>Service :</strong> ${serviceLabel}</p>
          <hr />
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Tél :</strong> <a href="tel:${phone}">${phone}</a></p>
          <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <br/>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
            <strong>Message :</strong><br/>
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    };

    // 3. Envoi
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur d'envoi email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message." },
      { status: 500 }
    );
  }
}