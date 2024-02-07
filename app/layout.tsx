import './globals.css'
import type { Metadata } from 'next'
import { Inter, Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { SocketProvider } from '@/components/providers/socket-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { ModalProvider } from '@/components/providers/modal-provider'

const font = Open_Sans({ subsets: ['latin'] })

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VideoPlattform',
  description: 'Perfect Solution for paid Video Courses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(
          font.className,
          "bg-white dark:bg-[#313338]"
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-theme"
          >
          
          <ConfettiProvider />
            <ToastProvider />
              {children}
          </ThemeProvider>
        </body>
      </html>
      </ClerkProvider>
  )
}
