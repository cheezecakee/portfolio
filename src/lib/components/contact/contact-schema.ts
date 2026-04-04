import { z } from "zod/v4";

export const Subjects = {
  General: "General Inquiry",
  Collaboration: "Collaboration",
  JobOpportunity: "Job Opportunity",
  ProjectDiscussion: "Project Discussion",
  Other: "Other",
} as const

export const FormSchema = z.object({
	name: z
		.string()
		.min(1, 'Name is required')
		.min(2, 'Name must be at least 2 characters')
		.max(100, 'Name must be less than 100 characters'),
	email: z.email({ message: "Please select an email to display" }),
	subject: z.enum(Subjects),
	message: z
		.string()
		.min(1, 'Message is required')
		.min(10, 'Message must be at least 10 characters')
		.max(1000, 'Message must be less than 1000 characters')
});
 
export type FormSchema = z.infer<typeof FormSchema>;
