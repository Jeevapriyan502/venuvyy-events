/**
 * One-time script to create admin user in Supabase Auth.
 * Run: npm run setup:admin
 */
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@venuvyyevents.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Venuvyy@2026";

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
  });

  if (error) {
    if (error.message.includes("already been registered")) {
      console.log("Admin user already exists.");
      console.log(`\nLogin at: http://localhost:3000/admin/login`);
      console.log(`Email:    ${ADMIN_EMAIL}`);
      console.log(`Password: (use your existing password or reset in Supabase Auth)`);
      return;
    }
    console.error("Error:", error.message);
    process.exit(1);
  }

  console.log("Admin user created successfully!");
  console.log(`\nLogin at: http://localhost:3000/admin/login`);
  console.log(`Email:    ${ADMIN_EMAIL}`);
  console.log(`Password: ${ADMIN_PASSWORD}`);
  console.log("\nChange your password after first login in Supabase Dashboard → Authentication → Users");
}

main();
