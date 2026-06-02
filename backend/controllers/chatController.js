const kb = require('../data/kb.json');

/**
 * POST /api/chat
 * Body: { message: string }
 * Returns: { reply: string }
 */
function handleChat(req, res) {
  const { message } = req.body;

  // Validate input
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ reply: 'Please send a valid message.' });
  }

  const reply = getResponseFromKB(message.trim());
  return res.json({ reply });
}

function getResponseFromKB(query) {
  const lowerQuery = query.toLowerCase();

  // ── Quick intents ─────────────────────────────────
  if (['hi', 'hello', 'hey'].some(w => lowerQuery.includes(w))) {
    return "Hello! How can I help you today? You can ask me about our services, clinic hours, or how to book an appointment.";
  }

  if (['hour', 'time', 'open', 'timing', 'schedule'].some(w => lowerQuery.includes(w))) {
    const h = kb.clinic.hours;
    return `Our clinic hours are:\n⏰ Morning: ${h.morning}\n⏰ Evening: ${h.evening}`;
  }

  if (['contact', 'call', 'phone', 'number'].some(w => lowerQuery.includes(w))) {
    return `You can reach us at ${kb.clinic.phone} or email us at ${kb.clinic.email}. We are located at ${kb.clinic.address}.`;
  }

  if (['location', 'address', 'where', 'directions', 'map'].some(w => lowerQuery.includes(w))) {
    return `We are located at ${kb.clinic.address}. You can find a map on our Contact page.`;
  }

  // ── Search FAQs ───────────────────────────────────
  for (const faq of kb.faqs) {
    if (faq.keywords.some(kw => lowerQuery.includes(kw))) {
      return faq.answer;
    }
  }

  // ── Search Services ───────────────────────────────
  for (const service of kb.services) {
    if (service.keywords.some(kw => lowerQuery.includes(kw))) {
      return `We offer ${service.name}. ${service.detail}\nDuration: ${service.duration}.`;
    }
  }

  // ── Default fallback ──────────────────────────────
  return `Thank you for your message! Our team will get back to you shortly, or you can call us directly at ${kb.clinic.phone} for immediate assistance.`;
}

module.exports = { handleChat };
