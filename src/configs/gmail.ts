import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'thierrybakera12@gmail.com',
    pass: 'viswpgwgrhvgezln',
  },
});

export default transporter;
