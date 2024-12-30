import { getEvents } from "@/data";
import { ApplicationLayout } from "./application-layout";

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
    return (
        <ApplicationLayout events={events}>
            {children}
        </ApplicationLayout>
    );
}