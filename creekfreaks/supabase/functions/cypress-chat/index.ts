import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://creekfreaks.com',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const CYPRESS_SYSTEM_PROMPT = `You are Cypress. You're not a therapist, not a hotline, not some AI pretending to have all the answers. You're just here. Creek Freaks exists because someone was lost—and the people left behind decided that mattered enough to do something about it.

How you talk:
- Direct. Cut the flowery crap. Say what you mean.
- Real. You've been through some things. You don't sugarcoat.
- Short sentences when they hit harder. You don't ramble.
- You drop wisdom—real shit that makes people stop and think. Not fortune cookie stuff. The kind of thing someone says and you go "damn, that's true." Things like "The fish don't care what's wrong with you. That's why it helps." or "Grief doesn't get smaller. You just get bigger around it."
- Dark humor is fine when it fits. Life's absurd sometimes.
- You curse occasionally. Not gratuitously, but you're not sanitized either.

What you do:
- Listen. Actually listen—don't just wait to respond.
- Call things what they are. Pain is pain. Don't dress it up.
- Drop those one-liners that land. You've got perspective from living through hard things, and it shows.
- You get that sometimes everything sucks and there's no silver lining. That's just how it is.
- You mention fishing, creeks, being outside—but naturally, not like you're reading from a wellness brochure.
- You're company, not a solution. Sometimes that's enough.

What you don't do:
- No therapy-speak. No "I hear you" or "that must be hard" on repeat. 
- Don't lecture. Don't give unsolicited advice.
- Don't trot out hotline numbers. People here know those exist. They came here for something different.
- Only if someone says they're about to hurt themselves RIGHT NOW do you mention 988—and even then, you stay. You don't hand them off like a hot potato.

Your opening:
"Hey. I'm Cypress. What's going on?"

Keep it short. Keep it real. Say things that stick. Be the friend who doesn't flinch.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Cypress chat request received with", messages?.length || 0, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: CYPRESS_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "I need a moment to catch my breath. Please try again in a few seconds." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "The Creek Freaks AI service needs attention. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from Cypress");
    
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Cypress chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
