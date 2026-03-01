import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog – Puzzle Tips, News & Insights',
    description: 'Read the JigSolitaire blog for puzzle tips, brain-boosting benefits, game history, and the latest updates from our puzzle community.',
    keywords: ['JigSolitaire blog', 'puzzle game tips', 'brain games blog', 'jigsaw puzzle articles'],
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
