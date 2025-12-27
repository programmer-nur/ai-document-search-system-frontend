import type { Metadata } from "next";
import { RegisterForm } from "./components";

export const metadata: Metadata = {
  title: "Sign Up - AI Document Search & Q&A System",
  description:
    "Create your account and workspace to get started with AI-powered document search. Create workspace, set up admin user, and start searching your documents instantly.",
  keywords: [
    "sign up",
    "register",
    "create account",
    "document search signup",
    "AI document search registration",
    "workspace creation",
  ],
  openGraph: {
    title: "Sign Up - AI Document Search & Q&A System",
    description:
      "Create your account and workspace to get started with AI-powered document search and question answering.",
    type: "website",
  },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
