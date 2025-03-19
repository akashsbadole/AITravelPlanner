// import nodemailer from 'nodemailer';

// export const sendEmail = async (email: string, itineraryText: string) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'YOUR_EMAIL@gmail.com',
//       pass: 'YOUR_EMAIL_PASSWORD',
//     },
//   });

//   const mailOptions = {
//     from: 'YOUR_EMAIL@gmail.com',
//     to: email,
//     subject: 'Your Itinerary',
//     text: itineraryText,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully!', info.response);
//   } catch (error) {
//     console.error('Failed to send email.', error);
//   }
// };
