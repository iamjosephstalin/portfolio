// Vercel Serverless Function to send emails
// This endpoint handles POST requests with contact form data

export default async function handler(req, res) {
	// Only allow POST requests
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const { name, email, message } = req.body;

		// Validate required fields
		if (!name || !email || !message) {
			return res.status(400).json({ 
				error: 'Missing required fields: name, email, and message are required' 
			});
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: 'Invalid email format' });
		}

		// Email configuration
		// TODO: Replace with your actual email
		const toEmail = process.env.RECIPIENT_EMAIL || 'mm93joe@gmail.com';
		const emailSubject = `Portfolio Contact Form: ${name}`;

		// Email content
		const emailBody = `
Name: ${name}
Email: ${email}
Message: ${message}

---
This email was sent from your portfolio contact form.
		`;

		// Option 1: Using Resend (recommended for production)
		// Uncomment and configure this if using Resend
		/*
		if (process.env.RESEND_API_KEY) {
			const { default: resend } = await import('@resend/node');
			const resendClient = new resend(process.env.RESEND_API_KEY);
			
			const result = await resendClient.emails.send({
				from: 'Portfolio <onboarding@resend.dev>',
				to: toEmail,
				subject: emailSubject,
				text: emailBody,
				html: emailBody.replace(/\n/g, '<br>'),
				replyTo: email,
			});

			return res.status(200).json({ 
				success: true, 
				message: 'Email sent successfully',
				id: result.id 
			});
		}
		*/

		// Option 2: Using Nodemailer (for SMTP)
		// Check if SMTP credentials are configured
		if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
			try {
				const nodemailer = await import('nodemailer');
				const defaultNodemailer = nodemailer.default || nodemailer;
				
				const transporter = defaultNodemailer.createTransport({
					host: process.env.SMTP_HOST,
					port: parseInt(process.env.SMTP_PORT) || 587,
					secure: process.env.SMTP_PORT === '465',
					auth: {
						user: process.env.SMTP_USER,
						pass: process.env.SMTP_PASS,
					},
					// Add timeout to prevent hanging
					connectionTimeout: 10000,
					greetingTimeout: 10000,
				});

				console.log('Attempting to send email via SMTP...');
				console.log('SMTP Host:', process.env.SMTP_HOST);
				console.log('SMTP Port:', process.env.SMTP_PORT || 587);
				console.log('To Email:', toEmail);

				const info = await transporter.sendMail({
					from: process.env.SMTP_USER,
					to: toEmail,
					subject: emailSubject,
					text: emailBody,
					html: emailBody.replace(/\n/g, '<br>'),
					replyTo: email,
				});

				console.log('✅ Email sent successfully! Message ID:', info.messageId);

				return res.status(200).json({ 
					success: true, 
					message: 'Email sent successfully',
					messageId: info.messageId
				});
			} catch (smtpError) {
				console.error('❌ SMTP Error:', smtpError);
				return res.status(500).json({ 
					error: 'Failed to send email via SMTP', 
					details: smtpError.message 
				});
			}
		}
		

		// For development/testing: Log the email to console
		console.log('📧 Contact Form Submission:');
		console.log('To:', toEmail);
		console.log('From:', email);
		console.log('Subject:', emailSubject);
		console.log('Body:', emailBody);

		// Return success response
		return res.status(200).json({ 
			success: true, 
			message: 'Email sent successfully (logged to console in development)',
			note: 'Configure an email service for production'
		});

	} catch (error) {
		console.error('Error sending email:', error);
		return res.status(500).json({ 
			error: 'Failed to send email', 
			details: error.message 
		});
	}
}
