import { getEvents } from "@/data";
import { ApplicationLayout } from "./application-layout";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export const metadata = {
    title: 'SEO Title',
    description: 'SEO Title',
};
export default async function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    let events = await getEvents();

    const sesssion = await auth();

    if (!sesssion?.user) redirect('/')
    return (
        <ApplicationLayout events={events}>
            {children}
        </ApplicationLayout>
    );
}