import nodemailer from 'nodemailer';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "admin@swerve.lt",
      pass: "synx ykij zdgo afgn",
    },
  });

  console.log(body)

  const mailOptions = {
    from: `Team Applications <admin@swerve.lt>`,
    to: "rokas.kirdulis@gmail.com", // Team selection email
    subject: `New Team Application from ${body.name}`,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 20px 0;
            }
            .content {
                padding: 20px;
            }
            .content h1 {
                color: #333333;
            }
            .content p {
                color: #666666;
                line-height: 1.6;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #aaaaaa;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Team Application</h2>
            </div>
            <div class="content">
                <p><strong>Full Name:</strong> ${body.name}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Phone Number:</strong> ${body.phone}</p>
                <p><strong>About the Candidate:</strong></p>
                <p>${body.about}</p>
                <p><strong>Motivation for Joining:</strong></p>
                <p>${body.motivation}</p>
            </div>
            <div class="footer">
                &copy; 2025 Team Selection Committee
            </div>
        </div>
    </body>
    </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    return { success: false, error };
  }
});
