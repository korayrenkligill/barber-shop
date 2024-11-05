export type ServiceModelType = "additional" | "main";

export interface ServiceType {
  _id: string;
  name: string;
  duration: number;
  price: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  serviceType?: ServiceModelType;
  __v: number;
}
