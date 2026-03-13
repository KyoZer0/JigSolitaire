import type { Metadata } from 'next';
import BlogIndexClient from './BlogIndexClient';

export const metadata: Metadata = {
    title: 'JigSolitaire Blog – Puzzle Tips, Research, and Guides',
    description: 'Browse the JigSolitaire blog for long-form articles on puzzle strategy, focus, family play, cognitive science, and game history.',
    keywords: ['JigSolitaire blog', 'puzzle strategy blog', 'brain games articles', 'jigsaw puzzle guides'],
    alternates: {
        canonical: '/blog',
    },
};

export default function BlogPage() {
    return <BlogIndexClient />;
}
