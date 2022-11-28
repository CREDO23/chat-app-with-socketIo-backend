import transporter from "../../configs/gmail";

const sendMail = (to : string, subject : string, messsage : string) => {
  const options = {
    from: 'thierrybakera12@gmail.com',
    to,
    subject,
    text: 'CHATAW',
    html : `<p>${messsage}</p>`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(options, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

export default sendMail