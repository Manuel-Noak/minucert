export type PaystackCreateTransactionDto = {
  amount: number;
  email: string;
  callback_url: string;
  metadata: PaystackMetadata;
};

export type PaystackMetadata = {
  customer_id: number;
  course_id: number;
  callback_url: string;
  custom_fields: PaystackMetadataCustomFields[];
};

export type PaystackMetadataCustomFields = {
  display_name: string;
  variable_name: string;
  value: string | number;
};

export type PaystackInitializeTransactionResponseDto = {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

export type PaystackVerifyTransactionResponseDto = {
  status: boolean;
  message: string;
  data: {
    id: string;
    domain: string;
    status: string;
    reference: string;
    amount: number;
  };
};
