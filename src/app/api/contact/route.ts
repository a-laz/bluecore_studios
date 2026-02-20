import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, description } = await request.json();

  if (!name || !email || !description) {
    return NextResponse.json(
      { error: "Name, email, and description are required." },
      { status: 400 }
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: "Bluecore Contact Form <contact@bluecorestudio.com>",
      to: "dev@bluecorestudio.com",
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${description}`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
