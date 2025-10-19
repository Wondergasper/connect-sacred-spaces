import { z } from "zod";

// User registration schema
export const registerSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }).max(50),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }).max(50),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  denomination: z.string().min(1, { message: "Please select a denomination" }),
  branch: z.string().min(1, { message: "Please select a branch" }),
  role: z.string().min(1, { message: "Please select a role" }),
  location: z.string().min(2, { message: "Please enter a location" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// User login schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Profile update schema
export const profileSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }).max(50),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }).max(50),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters" }).optional(),
});

// Group creation schema
export const groupSchema = z.object({
  name: z.string().min(3, { message: "Group name must be at least 3 characters" }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }).max(500),
  category: z.string().min(1, { message: "Please select a category" }),
  privacy: z.enum(["public", "private"], { message: "Please select privacy level" }),
});

// Event creation schema
export const eventSchema = z.object({
  title: z.string().min(5, { message: "Event title must be at least 5 characters" }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }).max(1000),
  date: z.string().min(1, { message: "Please select a date" }),
  time: z.string().min(1, { message: "Please select a time" }),
  location: z.string().min(5, { message: "Location must be at least 5 characters" }),
});

// Donation schema
export const donationSchema = z.object({
  amount: z.number().min(1, { message: "Amount must be at least $1" }),
  category: z.string().min(1, { message: "Please select a donation category" }),
  paymentMethod: z.string().min(1, { message: "Please select a payment method" }),
  cardNumber: z.string().min(16, { message: "Card number must be 16 digits" }),
  expiryDate: z.string().min(5, { message: "Please enter a valid expiry date" }),
  cvv: z.string().min(3, { message: "CVV must be 3 digits" }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type GroupFormData = z.infer<typeof groupSchema>;
export type EventFormData = z.infer<typeof eventSchema>;
export type DonationFormData = z.infer<typeof donationSchema>;