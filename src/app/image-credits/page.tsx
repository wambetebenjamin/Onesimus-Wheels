import type { Metadata } from 'next';
import Image from 'next/image';
import { PageBanner } from '@/components/page-banner';
export const metadata: Metadata = { title: 'Photo credits' };
const credits = [
  { file: 'cyclist-kenya.jpg', author: 'Bobby Randu', url: 'https://www.pexels.com/photo/man-riding-bicycle-on-street-20818748/', description: 'Cyclist in Mombasa, Kenya' },
  { file: 'cargo-bike-lagos.jpg', author: 'David Iloba', url: 'https://www.pexels.com/photo/man-standing-beside-his-bicycle-11813582/', description: 'Vendor with cargo bicycle in Lagos, Nigeria' },
  { file: 'community-ride.jpg', author: 'Akandwanaho TarzanLyts', url: 'https://www.pexels.com/photo/bikers-on-the-street-10025372/', description: 'Community bike race on a busy street' },
  { file: 'group-ride-africa.jpg', author: 'Valdans Media', url: 'https://www.pexels.com/photo/cyclists-racing-on-dusty-african-road-during-daytime-30316476/', description: 'Cyclists racing on a dusty road in Africa' },
  { file: 'repair-stand-uganda.jpg', author: 'illustrate Digital Ug', url: 'https://www.pexels.com/photo/bicycle-workshop-28100853/', description: 'Mechanic working on a bicycle wheel in Gayaza, Uganda' },
  { file: 'woman-bicycle-uganda.jpg', author: 'Speak Media Uganda', url: 'https://www.pexels.com/photo/african-woman-at-bwindi-women-bicycle-project-34185197/', description: 'Woman with bicycle at Bwindi Women Bicycle Project, Uganda' },
  { file: 'women-bicycle-workshop.jpg', author: 'Speak Media Uganda', url: 'https://www.pexels.com/photo/woman-with-bicycle-at-bwindi-project-workshop-34185193/', description: 'Woman holding a bicycle outside Bwindi Women Bicycle Project workshop, Uganda' },
  { file: 'cyclist-accra.jpg', author: 'Samfren ojo', url: 'https://www.pexels.com/photo/casual-bicycle-ride-in-accra-ghana-30607728/', description: 'Man cycling in Accra, Ghana' },
  { file: 'cyclist-port-harcourt.jpg', author: 'The Storyteller', url: 'https://www.pexels.com/photo/man-riding-bike-in-city-18358890/', description: 'Man riding a bicycle in Port Harcourt, Nigeria' },
  { file: 'cyclist-nigeria.jpg', author: 'Alee Abdullahi (DC__SHOT)', url: 'https://www.pexels.com/photo/african-cyclist-on-rural-road-in-nigeria-35636824/', description: 'Cyclist on a rural road in Gwarzo, Nigeria' },
];
export default function CreditsPage() { return <><PageBanner title="credits" intro="photoNote" /><section className="cycle_section"><div className="container"><div className="row">{credits.map(credit => <div className="col-lg-4 col-sm-6 mb-4" key={credit.file}><article className="box_main_1"><div className="frame"><Image src={`/images/${credit.file}`} alt={credit.description} fill sizes="(max-width: 575px) 100vw, (max-width: 991px) 50vw, 33vw" /></div><div className="padding_15"><h2 className="speed_text">{credit.author}</h2><p className="long_text">{credit.description}</p><a className="text-link" href={credit.url} target="_blank" rel="noopener noreferrer">Pexels<i className="fa fa-external-link" aria-hidden="true" /></a></div></article></div>)}</div><p className="source-note">Pexels license: <a className="text-link" href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">pexels.com/license</a>. Photographs are illustrative and do not imply endorsement.</p></div></section></>; }
