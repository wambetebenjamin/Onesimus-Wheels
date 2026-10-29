export type Locale = "en" | "sw" | "fr";
export type Localized = Record<Locale, string>;
export type ListingKind = "repair" | "library" | "group";
export type CityId = "nairobi" | "kampala" | "kigali" | "accra" | "lagos" | "cape-town";

export interface City {
  id: CityId;
  name: string;
  country: Localized;
  note: Localized;
  image: string;
  imageAlt: Localized;
}

export interface Listing {
  slug: string;
  kind: ListingKind;
  name: string;
  city: CityId;
  area: Localized;
  summary: Localized;
  detail: Localized;
  specialties: string[];
  sourceUrl: string;
  sourceLabel: string;
  contactUrl?: string;
  image: string;
  imageAlt: Localized;
  status: "listed" | "confirm" | "pilot";
  rideNote?: Localized;
}
