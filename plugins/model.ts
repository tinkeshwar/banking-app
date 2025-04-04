import { AuthModel } from "~/models/auth/model";
import { MemberModel } from "~/models/member/model";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      auth: AuthModel,
      member: MemberModel
    },
  };
});
