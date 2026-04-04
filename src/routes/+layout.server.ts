import type { LayoutServerLoad } from "./$types";
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from "sveltekit-superforms/adapters";
import { FormSchema } from "$lib/components/contact/contact-schema";

// export const ssr = false

export const load: LayoutServerLoad = async () => {
  return {
    form: await superValidate(zod4(FormSchema))
  };
};
