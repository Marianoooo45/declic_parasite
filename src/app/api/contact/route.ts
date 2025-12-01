import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceLabel, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "ssl0.ovh.net",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    await new Promise((resolve, reject) => {
      transporter.verify(function (error, success) {
        if (error) {
          console.error("Erreur de connexion SMTP:", error);
          reject(error);
        } else {
          console.log("Serveur SMTP prêt");
          resolve(success);
        }
      });
    });

    const mailOptions = {
      from: `"Site Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `[SITE] Nouveau client : ${name}`,
      text: `Nom: ${name}\nTéléphone: ${phone}\nEmail: ${email}\nService: ${serviceLabel}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #1d4e2b; margin-top:0;">Nouvelle demande : ${serviceLabel}</h2>
          <ul style="padding-left: 20px;">
            <li><strong>Nom :</strong> ${name}</li>
            <li><strong>Tél :</strong> <a href="tel:${phone}">${phone}</a></li>
            <li><strong>Email :</strong> <a href="mailto:${email}">${email}</a></li>
          </ul>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <strong>Message :</strong><br/><br/>
            ${message.replace(/\n/g, "<br>")}
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    // CORRECTION ICI : On gère l'erreur sans utiliser ': any'
    console.error("Erreur détaillée d'envoi:", error);
    
    let errorMessage = "Erreur d'envoi";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}