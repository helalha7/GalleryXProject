'use client';

import { ThemeProvider } from 'next-themes';
import { Playfair_Display, Raleway } from 'next/font/google';
import '../styles/globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen overflow-x-hidden antialiased transition-colors duration-300 ${playfair.variable} ${raleway.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // ✅ Ensures it starts in dark mode
          enableSystem={false}
          storageKey="galleryx-theme"
        >
          <div className="min-h-screen flex flex-col bg-[#f9fafb] text-[#111827] dark:bg-gray-900 dark:text-white">
            <main className="relative z-10">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
