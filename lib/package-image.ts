import { createServiceClient } from "@/lib/supabase";
import { ensurePublicStorageBucket } from "@/lib/storage-bucket";

export async function uploadPackageImage(file: File, label: string): Promise<string> {
  const bucket = await ensurePublicStorageBucket();
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `packages/${Date.now()}-${label.replace(/\s+/g, "-").toLowerCase()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = createServiceClient();
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, { contentType: file.type, upsert: false });

  if (uploadError) {
    throw new Error(
      `Image upload failed: ${uploadError.message}. Create bucket "${bucket}" in Supabase Storage.`
    );
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return urlData.publicUrl;
}

export async function uploadCustomerEventImage(file: File, label: string): Promise<string> {
  const bucket = await ensurePublicStorageBucket();
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `customer-events/${Date.now()}-${label.replace(/\s+/g, "-").toLowerCase()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = createServiceClient();
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, { contentType: file.type, upsert: false });

  if (uploadError) {
    throw new Error(
      `Image upload failed: ${uploadError.message}. Create bucket "${bucket}" in Supabase Storage.`
    );
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return urlData.publicUrl;
}

export async function uploadGalleryImage(file: File, label: string): Promise<string> {
  const bucket = await ensurePublicStorageBucket();
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `gallery/${Date.now()}-${label.replace(/\s+/g, "-").toLowerCase()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const supabase = createServiceClient();
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, { contentType: file.type, upsert: false });

  if (uploadError) {
    throw new Error(
      `Image upload failed: ${uploadError.message}. Create bucket "${bucket}" in Supabase Storage.`
    );
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return urlData.publicUrl;
}
