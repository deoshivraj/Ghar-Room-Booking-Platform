import React, { useState } from 'react';
import { CONTACT_DETAILS } from '../data/mockData';
import { BrandLogo } from './BrandLogo';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  Check, 
  Instagram, 
  Facebook, 
  MessageCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const ReachUsSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dates: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.replace(/\D/g, '');
    if (phone.length < 7 || phone.length > 15) {
      setFormError('Enter a valid phone number with 7 to 15 digits.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const payload = {
        name: formData.name.trim(),
        email,
        phone: formData.phone.trim(),
        dates: formData.dates.trim() || 'Not specified',
        message: formData.message.trim(),
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Contact form request failed with status ${response.status}`);
      }

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', phone: '', dates: '', message: '' });
      }, 4500);
    } catch (error) {
      console.error('Unable to send contact form submission:', error);
      setFormError('We couldn’t send your message. Please try again shortly or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Container with two columns: The Forest Green Reach Us Card & Quick Contact Inquiry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
        
        {/* The Exact Reach Us Card (Faithfully matched to Aditya_project_adresss_0296dc61.jpeg and page 2 of PDF) */}
        <div className="lg:col-span-6 rounded-3xl md:rounded-[36px] bg-[#364939] text-[#FAF7F2] p-8 sm:p-10 md:p-12 shadow-xl border border-[#485E4C] relative flex flex-col justify-between overflow-hidden">
          
          {/* Subtle Himalayan mountain peak background watermark */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none select-none">
            <svg width="240" height="240" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 21h22L12 2zm0 3.5L18.5 19H5.5L12 5.5z"/>
            </svg>
          </div>

          <div>
            {/* Top Row: Reach Us Title + Verified Green Checkmark Badge (from image Aditya_project_adresss_0296dc61.jpeg) */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#FAF7F2]">
                Reach Us
              </h2>
              {/* Green verification tick from Aditya_project_adresss_0296dc61.jpeg */}
              <div className="w-10 h-10 rounded-full bg-[#34D399]/20 border border-[#34D399]/50 flex items-center justify-center shrink-0">
                <Check className="w-6 h-6 text-[#34D399] stroke-[3]" />
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-[#D4DFD3] font-light leading-relaxed mb-8">
              A peaceful mountain sanctuary in Upper Dharamkot (32°15'05.9"N 76°19'45.1"E). We are happy to help you with arrival directions and trail guidance.
            </p>

            {/* Address with MapPin */}
            <div className="flex items-start gap-4 mb-6 group">
              <div className="w-8 h-8 rounded-full bg-[#465C4A] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#C6A26C]" />
              </div>
              <div className="text-sm sm:text-base text-[#E5ECE4] leading-relaxed">
                <p className="font-medium">{CONTACT_DETAILS.address}</p>
                <p className="text-emerald-300 font-mono text-xs mt-0.5">GPS: 32.251642, 76.329190</p>
              </div>
            </div>

            {/* Phone Numbers with Call links */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#465C4A] flex items-center justify-center shrink-0 mt-0.5">
                <Phone className="w-4 h-4 text-[#C6A26C]" />
              </div>
              <div className="text-sm sm:text-base text-[#E5ECE4] space-y-1 font-mono">
                {CONTACT_DETAILS.phones.map((phone) => (
                  <div key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="hover:text-emerald-300 transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Email with mailto link */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#465C4A] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#C6A26C]" />
              </div>
              <a
                href={`mailto:${CONTACT_DETAILS.email}`}
                className="text-sm sm:text-base text-[#E5ECE4] hover:text-emerald-300 transition-colors font-mono break-all"
              >
                {CONTACT_DETAILS.email}
              </a>
            </div>
          </div>

          {/* Social Icons (Instagram, Facebook, WhatsApp circular buttons matched to image) */}
          <div className="pt-6 border-t border-[#4B634E] flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full border border-white/30 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all transform hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full border border-white/30 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all transform hover:scale-110"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>

            <a
              href={`https://wa.me/${CONTACT_DETAILS.whatsappNumber}?text=${encodeURIComponent('Hi Ghar team, I have an inquiry!')}`}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full border border-white/30 hover:border-white hover:bg-emerald-600 flex items-center justify-center text-white transition-all transform hover:scale-110"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <span className="text-xs text-[#B9C7B8] ml-auto font-light">
              Avg. response: &lt; 15 mins
            </span>
          </div>

        </div>

        {/* Right Column: Direct Traveler Message & Long-Stay / Trek Inquiries Form */}
        <div className="lg:col-span-6 rounded-3xl md:rounded-[36px] bg-[#F6F2E9] border border-[#DDD6C8] p-8 sm:p-10 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#C69255]" />
              <span className="text-xs uppercase tracking-widest text-[#718073] font-semibold">
                QUICK INQUIRY
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#213024] font-normal mb-2">
              Have questions about your stay?
            </h3>
            <p className="text-xs sm:text-sm text-[#5C6A5E] font-light mb-6">
              Ask about remote work desks, seasonal trek weather, Triund guides, or group discounts.
            </p>

            {formSubmitted ? (
              <div role="status" className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center animate-fadeIn my-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-serif text-xl font-bold">Message Sent</h4>
                <p className="text-xs text-emerald-700 mt-1">
                  Thanks! Your inquiry has been sent to our team. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#556358] font-medium mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Roy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C5] text-xs text-[#213024] focus:outline-none focus:border-[#25392B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#556358] font-medium mb-1">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="\+?[0-9\s().-]{7,20}"
                      maxLength={20}
                      title="Enter a valid phone number using 7 to 15 digits."
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormError('');
                        setFormData({ ...formData, phone: e.target.value });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C5] text-xs text-[#213024] focus:outline-none focus:border-[#25392B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#556358] font-medium mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      maxLength={254}
                      placeholder="maya@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormError('');
                        setFormData({ ...formData, email: e.target.value });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C5] text-xs text-[#213024] focus:outline-none focus:border-[#25392B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#556358] font-medium mb-1">
                      Intended Travel Dates
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 5 Nov - 12 Nov"
                      value={formData.dates}
                      onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C5] text-xs text-[#213024] focus:outline-none focus:border-[#25392B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#556358] font-medium mb-1">
                    Your Message / Query
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your trip, work requirements, or trail questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDD5C5] text-xs text-[#213024] focus:outline-none focus:border-[#25392B]"
                  />
                </div>

                {formError && (
                  <p role="alert" className="text-sm text-red-700">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-[#25392B] hover:bg-[#18261C] disabled:opacity-60 disabled:cursor-not-allowed text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message to Host'}</span>
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#DDD6C8] flex items-center justify-between text-[11px] text-[#718073]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#B08044]" /> Front desk active 7:30 AM – 10:30 PM
            </span>
            <span>Direct booking guarantees best rates</span>
          </div>
        </div>

      </div>

      {/* Footer (matched to page 2: "Ghar by the Mountains · Dharamkot" with prayer flags) */}
      <footer className="mt-20 pt-10 border-t border-[#DDD6C8] text-center">
        {/* Decorative mini prayer flags */}
        <div className="flex justify-center mb-4">
          <svg className="w-48 h-5" viewBox="0 0 200 20" fill="none">
            <path d="M 0,5 Q 100,16 200,5" stroke="#B08044" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
            <polygon points="20,5 28,6 24,14" fill="#3B82F6" />
            <polygon points="50,7 58,8 54,16" fill="#F8FAFC" stroke="#DDD" strokeWidth="0.5" />
            <polygon points="80,9 88,10 84,18" fill="#EF4444" />
            <polygon points="110,10 118,10 114,18" fill="#22C55E" />
            <polygon points="140,9 148,8 144,16" fill="#EAB308" />
            <polygon points="170,7 178,6 174,14" fill="#3B82F6" />
          </svg>
        </div>

        {/* Footer Brand Signature */}
        <div className="font-serif italic text-lg sm:text-xl text-[#25392B] font-medium mb-2">
          Ghar by the Mountains · Dharamkot
        </div>

        <p className="text-xs text-[#718173] max-w-md mx-auto mb-6">
          Find Ghar by the Mountains at {CONTACT_DETAILS.address}.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest text-[#5C6B5E] mb-6">
          <a href="#stay" className="hover:text-[#25392B]">Stay</a>
          <a href="#amenities" className="hover:text-[#25392B]">Amenities</a>
          <a href="#explore" className="hover:text-[#25392B]">Explore</a>
          <a href="#find-us" className="hover:text-[#25392B]">Find Us</a>
          <a href="#contact" className="hover:text-[#25392B]">Contact</a>
        </div>

        <div className="text-[11px] text-[#8C9C8E] font-mono">
          © {new Date().getFullYear()} Ghar by the Mountains. Built with peace and pines in Himachal Pradesh.
        </div>
      </footer>
    </section>
  );
};
