import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Title from "./Title";

const ContactUs = () => {
  const formRef = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          alert("Failed to send message");
          console.error(error);
        }
      );
  };

  return (
    <div className="min-h-screen bg-[#efeedd] px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10">
      <Title title="Contact Us" />

      <div className="max-w-2xl mx-auto mt-8">
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 border border-[#d4c5a0]"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-[#6b5b3a] font-semibold mb-2 text-sm uppercase">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[#6b5b3a] font-semibold mb-2 text-sm uppercase">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[#6b5b3a] font-semibold mb-2 text-sm uppercase">
                Message
              </label>
              <textarea
                name="message"
                required
                rows="5"
                placeholder="Write your message here..."
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Hidden fields for template */}
            <input type="hidden" name="title" value="Contact Us" />
            <input
              type="hidden"
              name="time"
              value={new Date().toLocaleString()}
            />

            <button
              type="submit"
              className="w-full bg-[#8b7355] text-white py-3 rounded-lg"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
