export type EventCardData = {
  id: string; 
  value: string;
  image_prompt: string;
  title: {
    ru: string;
    en: string;
  };
  imageUrl: string;
  description: {
    ru: string;
    en: string;
  };
  subText?: {
    ru: string;
    en: string;
  };
  buttonText?: {
    ru: string;
    en: string;
  };
  startDate: string | Date;
  endDate: string | Date;
};
