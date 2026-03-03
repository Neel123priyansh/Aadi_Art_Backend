import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { email, reason } = req.body;

  if (!email || !reason) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.COMPANY_EMAIL,
      to: process.env.COMPANY_EMAIL,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Inquiry</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Reason:</strong> ${reason}</p>
      `,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email failed" });
  }
});
9
app.listen(5000, () => {
  console.log("Server running on port 5000");
});