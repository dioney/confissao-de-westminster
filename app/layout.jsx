import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Confissão de Fé de Westminster',
  description: 'Navegue pela Confissão de Fé de Westminster, Breve Catecismo e Catecismo Maior',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 