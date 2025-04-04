import type { AxiosError } from "axios";
import type { Model, PaginationMetaInterface } from "~/models/interface";
import type { CreateMemberRequestPayloadInterface, CreateMemberResponsePayloadInterface, ListMemberInterface, MemberModelInterface } from "~/models/member/interface";
import { memberListMapper } from "~/models/member/mapper";

export const create = async (
  data: CreateMemberRequestPayloadInterface,
  signal: AbortSignal
): Promise<CreateMemberResponsePayloadInterface> => {
  try {
    const { $api } = useNuxtApp() as any;
    const response = await $api.post('/api/member', data, { signal });
    return response.data;
  } catch (error) {
    const typedError = error as AxiosError;
    throw typedError?.response?.data as string || 'Internal server error';
  }
};

export const list = async (page: number, records: number, signal: AbortSignal): Promise<{ meta: PaginationMetaInterface, rows: ListMemberInterface[]}> => {
  try {
    const { $api } = useNuxtApp() as any;
    const response = await $api.get(`/api/member?page=${page}&records=${records}`, { signal });
    return { ...response.data, rows: memberListMapper(response.data.rows)};
  } catch (error) {
    const typedError = error as AxiosError;
    throw typedError?.response?.data as string || 'Internal server error';
  }
};

export const MemberModel: Model<MemberModelInterface> = {
  create,
  list
};
