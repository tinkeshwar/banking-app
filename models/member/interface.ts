import type { PaginationMetaInterface } from "~/models/interface";

export enum RelationType { FATHER = 'Father', MOTHER = 'Mother', SPOUSE = 'Spouse' }
export enum EmploymentStatus { ACTIVE = 'Active', RETIRED = 'Retired', RESIGNED = 'Resigned', TERMINATED = 'Terminated' }
export enum AddressType { LOCAL = 'Local', CURRENT = 'Current', PERMANENT = 'Permanent' }
export enum Gender { MALE = 'Male', FEMALE = 'Female', OTHER = 'Other' }
export enum MaritalStatus { SINGLE = 'Single', MARRIED = 'Married', DIVORCED = 'Divorced', WIDOWED = 'Widowed' }
export enum StaffType { SUPERIOR = 'Superior', CLERK = 'Clerk', CONTRACT = 'Contract' }
export interface BaseAddressInterface {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

export interface MemberAddressInterface extends BaseAddressInterface {
  address_type: AddressType;
}

export interface BaseMemberInterface {
  first_name: string;
  middle_name?: string;
  last_name: string;
  guardian: string;
  relation_with_guardian: RelationType;
  date_of_birth: Date;
  gender: Gender;
  marital_status: MaritalStatus;
  email: string;
  mobile: string;
  alternate_number?: string;
  department: string;
  staff_type: StaffType;
  income: number;
  employment_status: EmploymentStatus;
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

