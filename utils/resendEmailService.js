const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, ticket, invoiceUrl, event) => {
    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [to],
        subject: `Your Ticket for ${event.eventName}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Payment Successful!</h2>
            <p>Thank you for your purchase. Here are your ticket details:</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <h3>${event.eventName}</h3>
                <p><strong>Date:</strong> ${new Date(event.eventDate).toDateString()}</p>
                <p><strong>Time:</strong> ${event.eventTime}</p>
                <p><strong>Venue:</strong> ${event.venue}</p>
                <hr>
                <p><strong>Ticket ID:</strong> ${ticket._id}</p>
            </div>

            <p>You can view and download your invoice here:</p>
            <a href="${invoiceUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Invoice</a>
            
            <p style="margin-top: 20px; font-size: 12px; color: #666;">Please present this email or the attached ticket ID at the venue.</p>
        </div>
        `,
    });
}

module.exports = {
    sendEmail
}