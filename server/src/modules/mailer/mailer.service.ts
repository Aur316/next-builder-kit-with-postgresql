import nodemailer from 'nodemailer'

// generate ethereal account for testing : https://ethereal.email/create
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const mailService = {
  async sendMail({
    to,
    subject,
    html,
  }: {
    to: string
    subject: string
    html: string
  }) {
    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to,
      subject,
      html,
    })

    return info
  },
}
