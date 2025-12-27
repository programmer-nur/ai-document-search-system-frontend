import type { Metadata } from "next";
import { LoginForm } from "./components";

export const metadata: Metadata = {
  title: "Sign In - AI Document Search & Q&A System",
  description:
    "Sign in to your account to access AI-powered document search and question answering. Access your workspace, documents, and AI-powered search features.",
  keywords: [
    "sign in",
    "login",
    "document search login",
    "AI document search sign in",
    "workspace login",
    "account access",
  ],
  openGraph: {
    title: "Sign In - AI Document Search & Q&A System",
    description:
      "Sign in to your account to access AI-powered document search and question answering features.",
    type: "website",
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
