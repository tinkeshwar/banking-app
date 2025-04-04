import type { AlertMetaInterface, PaginationMetaInterface } from "~/models/interface";
import type { ListMemberInterface, MemberFormInterface } from "~/models/member/interface";
import { memberPostPayloadMapper } from "~/models/member/mapper";

interface MemberState {
  loading: boolean;
  abort: AbortController | null;
  members: ListMemberInterface[];
  meta: PaginationMetaInterface
  error: string | null;
  alert: AlertMetaInterface
}

export const useMemberStore = defineStore('member-store', {
  state: (): MemberState => ({
    loading: false,
    abort: null,
    members: [] as ListMemberInterface[],
    error: null,
    meta: {} as PaginationMetaInterface,
    alert: {
      title: '',
      description: '',
      icon: 'material-symbols:info-i-rounded',
      color: '',
      duration: 5000
    } as AlertMetaInterface
  }),
  actions: {
    async create(data: MemberFormInterface): Promise<void> {
      this.loading = true;
      this.abort = new AbortController();
      const { $member } = useNuxtApp() as any;
      try {
        const mappedPayload = memberPostPayloadMapper(data);
        await $member.create(mappedPayload, this.abort.signal);
        this.setAlert('Hurray!', 'Member created successfully', 'success');
      } catch (error: any) {
        this.setAlert('Oh snap!', error.message, 'error');
        this.error = error as string;
      }
      this.loading = false;
    },

    async list(page: number = 1, records: number = 10): Promise<void> {
      this.loading = true;
      this.abort = new AbortController();
      const { $member } = useNuxtApp() as any;
      try {
        const { rows, meta } = await $member.list(page, records);
        this.members = rows;
        this.meta = meta;
        this.setAlert('Hurray!', 'Member loaded successfully.', 'success');
      } catch (error: any) {
        this.setAlert('Oh snap!', error.message, 'error');
        this.error = error as string;
      }
      this.loading = false;
    },

    setAlert (title: string, description: string, type: 'error'|'success') {
      this.alert = {
        ...this.alert,
        title,
        description,
        color: type
      }
    },

    resetStore () {
      this.loading = false;
      this.abort = null;
      this.error = null;
      this.members = [];
    }
  }
})