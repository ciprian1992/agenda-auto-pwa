export interface ConsumableDto {
  _id: string;
  _creationTimestamp: number;
  beginTimestamp: number;
  expirationTimestamp?: number;
  beginDistance?: number;
  expirationDistance?: number;
  type: string;
  description: string;
  price: number;
}
