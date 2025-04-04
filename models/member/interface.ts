import type { PaginationMetaInterface } from "../interface";

export interface BaseAddressInterface {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

export interface MemberAddressInterface extends BaseAddressInterface {
  address_type: 'Local' | 'Permanent';
}

export interface BaseMemberInterface {
  first_name: string;
  middle_name?: string;
  last_name: string;
  guardian: string;
  relation_with_guardian: 'Father' | 'Mother' | 'Spouse';
  date_of_birth: Date;
  gender: 'Male' | 'Female' | 'Other';
  marital_status: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  email: string;
  mobile: string;
  alternate_number?: string;
  department: string;
  staff_type: 'Superior' | 'Clerk' | 'Contract';
  income: number;
  employment_status: 'Active' | 'Retired' | 'Resigned' | 'Terminated';
}

export interface MemberInterface extends BaseMemberInterface {
  user_id: number;
}

export interface CreateMemberRequestPayloadInterface extends BaseMemberInterface {
  addresses: MemberAddressInterface[];
}

export interface CreateMemberResponsePayloadInterface extends MemberInterface {
  addresses: MemberAddressInterface[];
}

export interface MemberFormInterface extends BaseMemberInterface {
  current: BaseAddressInterface & { [K in keyof BaseAddressInterface]: string | undefined };
  permanent: BaseAddressInterface & { [K in keyof BaseAddressInterface]: string | undefined };
}

export interface ListMemberResponseInterface extends BaseMemberInterface {
  user_id: number;
  addresses: MemberAddressInterface[];
}

export interface ListMemberInterface {
  id: number;
  name: string;
  gender: string
  mobile: string;
  department: string;
  staff: string;
  status: string;
}

export interface MemberModelInterface {
  create(data: CreateMemberRequestPayloadInterface, signal: AbortSignal): Promise<CreateMemberResponsePayloadInterface>;
  list(page: number, records: number, signal: AbortSignal): Promise<{ meta: PaginationMetaInterface, rows: ListMemberInterface[]}>;
}

