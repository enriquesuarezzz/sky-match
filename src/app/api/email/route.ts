import { type NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export async function POST(request: NextRequest) {
  const { email, name, message, surname, phone } = await request.json()

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_DESTINY_EMAIL,
    subject: `¡Tienes una consulta en SkyMatch!`,
    text: `Has recibido un nuevo mensaje de:\n\nName: ${name} ${surname}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <div style="background-color: #002efb; color: #ffffff; padding: 20px 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Nuevo Mensaje</h1>
          </div>
          <div style="padding: 20px 30px; color: #333333;">
            <h2 style="color: #002efb;">Detalles</h2>
            <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name} ${surname}</p>
            <p style="margin: 10px 0;"><strong>Teléfono:</strong> ${phone}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <h2 style="color: #002efb; margin-top: 20px;">Mensaje</h2>
            <p style="margin: 10px 0; background-color: #f9f9f9; padding: 15px; border-left: 4px solid #002efb;">${message}</p>
          </div>
          <div style="background-color: #f4f4f4; padding: 10px 30px; text-align: center; color: #777777;">
            <p style="margin: 0;">Esto es un mensaje automático generado por el formulario de contacto</p>
            <p style="margin: 5px 0;">No responder a este mensaje</p>
          </div>
          <div style="background-color: #002efb; color: #ffffff; padding: 10px 30px; text-align: center;">
            <p style="margin: 0;">&copy; 2024 SkyMatch</p>
          </div>
        </div>
      </div>
    `,
  }

  const email_sent = false

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent')
        } else {
          reject(err.message)
        }
      })
    })

  try {
    await sendMailPromise()
    return NextResponse.json({ email_sent })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ err })
  }
}
