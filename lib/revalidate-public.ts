import { revalidatePath } from "next/cache";

/** Bust cached homepage sections after admin content changes. */
export function revalidatePublicPages() {
  revalidatePath("/", "layout");
}
