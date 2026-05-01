import "./globals.css";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snippet Manager",
  description: "Manage your code snippets efficiently",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      {children}
      </body>
      </html>
  );
}