import type { Metadata } from 'next';
import { ListingDetail } from '@/components/listing-detail';
import { byKind } from '@/lib/data';
export function generateStaticParams() { return byKind('library').map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = byKind('library').find(value => value.slug === slug); return { title: item?.name || 'Listing' }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <ListingDetail kind="library" slug={slug} />; }
