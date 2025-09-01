export type Customer = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string;
  email: string;
  address: string | null;
  createdOn: Date;
  lastModifiedOn: Date;
};

export type Certification = {
  id: number;
  providerId: number;
  courseId: number;
  price: number;
  currencyCode: string;
  title: string;
  createdOn: Date;
  lastModifiedOn: Date;
};

export type CertificationOrder = {
  id: number;
  customerId: number;
  certificationId: number;
  status: string;
  reference: string;
  createdOn: Date;
  lastModifiedOn: Date;
};

export type CertificationPurchaseTransaction = {
  id: number;
  certificationOrderId: number;
  amount: number;
  status: TransactionStatus;
  paymentGatewayStatus: string;
  transactionReference: string;
  paymentId: string;
  paymentGateway: string;
  responseBody: string;
  createdOn: Date;
  lastModifiedOn: Date;
};

export enum TransactionStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  PARTIALLY_COMPLETED = "PARTIALLY_COMPLETED",
  FAILED = "FAILED",
}
