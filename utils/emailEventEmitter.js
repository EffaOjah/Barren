const { EventEmitter } = require('events');
const { sendEmail } = require('./resendEmailService');

// Create a single event emitter instance for email notifications
const emailEventEmitter = new EventEmitter();

// Listen for 'sendTicketEmail' events
emailEventEmitter.on('sendTicketEmail', async (emailData) => {
    try {
        const { to, ticket, invoiceUrl, event } = emailData;

        console.log(`[Email Event] Sending ticket email to ${to}...`);

        await sendEmail(to, ticket, invoiceUrl, event);

        console.log(`[Email Event] Successfully sent ticket email to ${to}`);
    } catch (error) {
        // Log error but don't throw - email failures shouldn't affect payment flow
        console.error('[Email Event] Error sending ticket email:', error.message || error);
    }
});

module.exports = emailEventEmitter;
