import { AuthModel } from "~/models/auth/model";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      auth: AuthModel
    },
  };
});
