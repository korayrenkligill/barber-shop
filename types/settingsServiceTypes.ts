export interface OpeningHours {
  open: string;
  close: string;
  closed?: boolean;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export interface Settings {
  businessName: string;
  address: string;
  email: string;
  phone: string;
  openingHours: {
    monday: OpeningHours;
    tuesday: OpeningHours;
    wednesday: OpeningHours;
    thursday: OpeningHours;
    friday: OpeningHours;
    saturday: OpeningHours;
    sunday: OpeningHours;
  };
  socialMedia?: SocialMedia;
  createdAt?: Date;
  updatedAt?: Date;
}
