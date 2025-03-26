import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/utility/SectionHeader";
import { useLocation } from "react-router-dom";

const ContactUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
    });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    terms: false,
  });

  const { pathname } = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, terms: e.target.checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Process form submission (currently just logging)
    const postedMessage = {
      ...formData,
      timestamp: new Date().getTime(),
    };
    console.table(postedMessage);

    // Simulate form submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        terms: false,
      });
    }, 1000);
  };

  return (
    <section id="contact" className={`bg-gray-50 pt-16 pb-16 md:pb-28 px-6 lg:px-8 ${pathname === "/contact" ? "mt-24" : ""}`}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Get In Touch"
          title="Contact Us"
          description="Just send us your questions or concerns by starting a message from the contact form and we will give you the help you need."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="overflow-hidden shadow-xl rounded-xl h-96 lg:h-auto" data-aos="fade-right">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57903.025838424466!2d91.8198359917187!3d24.900058346901524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375054d3d270329f%3A0xf58ef93431f67382!2sSylhet!5e0!3m2!1sen!2sbd!4v1742975931016!5m2!1sen!2sbd"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full rounded-xl border-0"
            />
          </div>

          <div className="glass-card p-8" data-aos="fade-left">
            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                ></textarea>
              </div>

              <div className="flex items-start">
                <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleCheckboxChange} required className="mt-1 mr-2" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I accept all terms and conditions.
                </label>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary-600 text-white" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
