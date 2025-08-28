import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { GlobalProvider } from '@/context/GlobalContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'TeamVault - Modern Team Communication',
  description: 'A modern, beautiful chat application for teams',
  keywords: ['chat', 'communication', 'team', 'collaboration'],
  authors: [{ name: 'TeamVault Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen">
        <GlobalProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </GlobalProvider>
      </body>
    </html>
  )
}