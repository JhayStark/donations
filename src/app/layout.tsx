import type { Metadata } from 'next';
import { EB_Garamond } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Donations',
  description: 'Donations web application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'h-screen bg-background font-sans antialiased  bg-gray-800 text-white',
          garamond.variable
        )}
      >
        <main className='  h-full px-5 p-5 lg:p-10'>
          <div className='z-10 max-w-6xl h-full w-full mx-auto'>{children}</div>
          <Toaster />
        </main>
      </body>
    </html>
  );
}
