import type { Metadata } from 'next';
import { ListingDetail } from '@/components/listing-detail';
import { byKind } from '@/lib/data';
export function generateStaticParams() { return byKind('repair').map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = byKind('repair').find(value => value.slug === slug); return { title: item?.name || 'Listing' }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <ListingDetail kind="repair" slug={slug} />; }
