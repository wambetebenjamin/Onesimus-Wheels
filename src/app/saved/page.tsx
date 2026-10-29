import type { Metadata } from 'next';
import { PageBanner } from '@/components/page-banner';
import { SavedList } from '@/components/saved-list';
export const metadata: Metadata = { title: 'Saved places and groups', robots: { index: false, follow: false } };
export default function SavedPage() { return <><PageBanner title="savedTitle" intro="savedIntro" /><section className="cycle_section"><div className="container"><SavedList /></div></section></>; }
