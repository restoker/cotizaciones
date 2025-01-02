// import { getEvents } from '@/data'
import { Layout } from '@/components/layout'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import type React from 'react'
import { Toaster } from 'sonner'
// import { ApplicationLayout } from './dashboard/application-layout'

export const metadata: Metadata = {
  title: {
    template: '%s - Catalyst',
    default: 'Catalyst',
  },
  description: '',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // let events = await getEvents()

  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <Toaster />
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
