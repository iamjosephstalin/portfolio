// Development server for local API testing
// This simulates the Vercel serverless function locally
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock API endpoint
app.post('/api/send-email', (req, res) => {
	const { name, email, message } = req.body;

	console.log('\n📧 Contact Form Submission:');
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	console.log(`From: ${name} <${email}>`);
	console.log(`Message: ${message}`);
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

	// Simulate some processing time
	setTimeout(() => {
		res.json({
			success: true,
			message: 'Email sent successfully (logged to console in development)',
			note: 'Configure an email service for production',
			timestamp: new Date().toISOString()
		});
	}, 500);
});

app.listen(PORT, () => {
	console.log(`\n✅ Dev API Server running on http://localhost:${PORT}`);
	console.log(`📬 Contact form endpoint: http://localhost:${PORT}/api/send-email\n`);
});
