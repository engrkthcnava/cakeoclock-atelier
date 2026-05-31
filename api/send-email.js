// api/send-email.js
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Only allow POST requests from your drawer submission
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { customerEmail, customerName, totalItems, totalAmount } = req.body;

  // 1. Configure your secure SMTP transport engine (e.g., Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Kept safe in environment variables
      pass: process.env.EMAIL_PASS, // Your App Password, not your raw login pass
    },
  });

  try {
    // 2. Draft the email layout receipt going to your CUSTOMER
    const customerMailOptions = {
      from: `"Cake o' Clock Atelier" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: `Your Cake o' Clock Atelier Pastry Reservation is Confirmed! 🥮`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #8B5A2B;">Hi ${customerName},</h2>
          <p>Thank you for reserving your artisanal batches with us! We are officially prepping your order in our kitchen workstation.</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <h3>Order Summary:</h3>
          <p><strong>Total Items:</strong> ${totalItems}</p>
          <p><strong>Estimated Total:</strong> ₱${totalAmount}</p>
          <hr style="border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 0.9rem; color: #666;">Please head over to your pick-up spot on your designated date. See you soon!</p>
        </div>
      `,
    };

    // 3. Draft the layout alert going to YOU (The Owner)
    const ownerMailOptions = {
      from: `"Cake o' Clock Atelier System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sends directly back to your inbox
      subject: `🚨 New Pastry Reservation Received! - ${customerName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #d9534f;">New Order Alert!</h2>
          <p><strong>Customer Name:</strong> ${customerName}</p>
          <p><strong>Contact Email:</strong> ${customerEmail}</p>
          <p><strong>Items Ordered:</strong> ${totalItems}</p>
          <p><strong>Total Bill Calculation:</strong> ₱${totalAmount}</p>
          <p>Check your Supabase Admin Dashboard to manage this batch task production queue.</p>
        </div>
      `,
    };

    // 4. Fire off both emails concurrently
    await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(ownerMailOptions)
    ]);

    return res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Email pipeline error:', error);
    return res.status(500).json({ error: 'Failed to dispatch notification logs' });
  }
}