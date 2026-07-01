import { createServiceClient } from "@/lib/supabase";

/** Package and gallery images must be in a public bucket for homepage display. */
export async function ensurePublicStorageBucket(): Promise<string> {
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || "package-images";
  const supabase = createServiceClient();

  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    throw new Error(`Failed to list storage buckets: ${listError.message}`);
  }

  const existing = buckets?.find((b) => b.name === bucket);

  if (!existing) {
    const { error } = await supabase.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024,
    });
    if (error) {
      throw new Error(`Failed to create storage bucket "${bucket}": ${error.message}`);
    }
    return bucket;
  }

  if (!existing.public) {
    const { error } = await supabase.storage.updateBucket(bucket, { public: true });
    if (error) {
      throw new Error(`Failed to make storage bucket "${bucket}" public: ${error.message}`);
    }
  }

  return bucket;
}
