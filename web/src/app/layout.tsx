import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Time series metrics App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} >

      {/*Flash of Unstyled Content: https://github.com/ant-design/ant-design/issues/40285*/}
      <AntdRegistry>
        {children}
      </AntdRegistry>
        </body>
    </html>
  )
}
