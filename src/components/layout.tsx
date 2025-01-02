'use client';
import { SessionProvider } from 'next-auth/react'
// import Header from './Header'
// import Toaster from './Toaster'


interface Props {
    children?: React.ReactNode | undefined | JSX.Element | JSX.Element[]
}

export function Layout({ children }: Props) {
    // let pathname = usePathname()
    // let isHomePage = pathname === '/'

    return (
        <SessionProvider>
            {/* <Toaster /> */}
            <div className="flex w-full flex-col">
                {/* <Header /> */}
                <div className="relative mx-auto flex w-full flex-auto justify-center">
                    {children}
                </div>
            </div>
        </SessionProvider>
    )
}
