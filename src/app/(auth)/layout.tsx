
export const metadata = {
    title: 'SEO Title',
    description: 'SEO Title',
};
export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {children}
        </div>
    );
}