# FixYourForm Vercel App

This project hosts the enquiry form on Vercel, saves submissions to Supabase, and sends a WhatsApp notification to `+91 9092430052`.

## What it includes

- A modern Next.js app with the original enquiry form design
- A server-side API route for form submissions
- Supabase storage of every enquiry
- WhatsApp alert delivery via Twilio

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a Supabase project and add a table named `enquiries` with this schema:

   ```sql
   create table enquiries (
     id uuid primary key default gen_random_uuid(),
     first_name text not null,
     last_name text,
     whatsapp text not null,
     email text not null,
     age int,
     gender text,
     city text not null,
     primary_goal text,
     injuries text,
     source text,
     created_at timestamptz not null default now()
   );
   ```

3. Create these environment variables in Vercel (and locally if needed):

   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_WHATSAPP_FROM` (example: `whatsapp:+14155238886`)
   - `ADMIN_WHATSAPP_NUMBER` (use `whatsapp:+919092430052`)

4. Deploy to Vercel using the GitHub repo connection.

## Local development

```bash
npm run dev
```

## Notes

- Use the Supabase service role key only in server-side environment variables.
- `TWILIO_WHATSAPP_FROM` must be a valid WhatsApp sender configured in Twilio.
