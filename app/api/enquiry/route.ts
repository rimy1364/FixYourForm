import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { twilioClient, whatsappFromNumber, adminWhatsappNumberValue } from '@/lib/twilio';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = {
      first_name: String(body.firstName ?? '').trim(),
      last_name: String(body.lastName ?? '').trim(),
      whatsapp: String(body.whatsapp ?? '').trim(),
      email: String(body.email ?? '').trim(),
      age: Number(body.age ?? 0),
      gender: String(body.gender ?? '').trim(),
      city: String(body.city ?? '').trim(),
      primary_goal: String(body.primaryGoal ?? '').trim(),
      injuries: String(body.injuries ?? '').trim(),
      source: String(body.source ?? '').trim(),
    };

    if (!payload.first_name || !payload.whatsapp || !payload.email || !payload.city || !payload.age) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const { error: insertError } = await supabaseAdmin.from('enquiries').insert([payload]);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    const whatsappMessage = `New enquiry from ${payload.first_name} ${payload.last_name || ''}\n\n` +
      `WhatsApp: ${payload.whatsapp}\n` +
      `Email: ${payload.email}\n` +
      `Age: ${payload.age}\n` +
      `Gender: ${payload.gender || 'N/A'}\n` +
      `City: ${payload.city}\n` +
      `Goal: ${payload.primary_goal || 'N/A'}\n` +
      `Injuries: ${payload.injuries || 'None'}\n` +
      `Source: ${payload.source || 'Unknown'}`;

    await twilioClient.messages.create({
      from: whatsappFromNumber,
      to: adminWhatsappNumberValue,
      body: whatsappMessage,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to process enquiry.' }, { status: 500 });
  }
}
