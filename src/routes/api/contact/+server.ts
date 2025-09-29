import { RESEND_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { FormSchema } from '$lib/components/DockMenu/contact/contact-schema.js';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.json();

		// Validate with your schema
		const validationResult = FormSchema.safeParse(formData);

		if (!validationResult.success) {
			return json(
				{ error: 'Invalid form data', issues: validationResult.error.issues },
				{ status: 400 }
			);
		}

		const { name, email, subject, message } = validationResult.data;

		// Send email
		const result = await resend.emails.send({
			from: 'Contact Form <contact@cheezecake.dev>',
			to: ['anabel.pmoraes@gmail.com'],
			subject: `Contact Form: ${subject}`,
			html: `
				<h3>New Contact Form Submission</h3>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Subject:</strong> ${subject}</p>
				<p><strong>Message:</strong></p>
				<p>${message.replace(/\n/g, '<br>')}</p>
			`,
			replyTo: email
		});

		if (result.error) {
			console.error('Resend error:', result.error);
			return json(
				{ error: 'Failed to send email' },
				{ status: 500 }
			);
		}

		return json({ success: true, message: 'Email sent successfully!' });

	} catch (error) {
		console.error('Server error:', error);
		return json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
};
