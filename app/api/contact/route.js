// api/contact.js

import nodemailer from 'nodemailer';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { first_name, last_name, company, phone, email, content, agreeTerms } = req.body;

  // Validez les données (ajoutez vos propres validations)

  // Configurez le service de messagerie (utilisez votre propre service et informations)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_MDP,
    },
  });

  // Options pour le courriel
  const mailOptions = {
    from: 'votre_adresse_email@gmail.com',
    to: 'destination@example.com',
    subject: 'Nouveau message de contact',
    html: `<p>Nom: ${first_name} ${last_name}</p>
           <p>Entreprise: ${company}</p>
           <p>Téléphone: ${phone}</p>
           <p>Email: ${email}</p>
           <p>Message: ${content}</p>
           <p>Accepte les conditions: ${agreeTerms ? 'Oui' : 'Non'}</p>`,
  };

  try {
    // Envoyer le courriel
    await transporter.sendMail(mailOptions);

    // Réponse réussie
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}

export default handler;
