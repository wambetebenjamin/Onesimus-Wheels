import type { Metadata } from 'next';
import { PageBanner } from '@/components/page-banner';
import { Directory } from '@/components/directory';
export const metadata: Metadata = { title: 'Bicycle repair directory' };
export default async function RepairPage({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const { city } = await searchParams;
  return <><PageBanner title="repairTitle" intro="repairIntro" image="/images/repair-stand-uganda.jpg" /><section className="cycle_section"><div className="container"><Directory kind="repair" initialCity={city} /></div></section></>;
}
