import React, { useState } from "react";
import "./Contact.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    // Simulate sending — replace with real email API when ready
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <>
      <PageTitle title="Contact Us" />
      <Navbar />

      <section className="contact-hero">
        <h1>Get In Touch</h1>
        <p>
          Have a question, concern, or feedback? We'd love to hear from you.
        </p>
      </section>

      <div className="contact-wrapper">
        {/* Info Panel */}
        <aside className="contact-info">
          <h2>Contact Info</h2>

          <div className="contact-info-item">
            <EmailIcon className="contact-info-icon" />
            <div>
              <h4>Email</h4>
              <p>admin@test.com</p>
            </div>
          </div>

          <div className="contact-info-item">
            <PhoneIcon className="contact-info-icon" />
            <div>
              <h4>Phone</h4>
              <p>+358 44 123 4567</p>
            </div>
          </div>

          <div className="contact-info-item">
            <LocationOnIcon className="contact-info-icon" />
            <div>
              <h4>Office</h4>
              <p>Helsinki, Finland</p>
            </div>
          </div>

          <div className="contact-hours">
            <h4>Business Hours</h4>
            <p>Mon – Fri: 9:00 AM – 6:00 PM</p>
            <p>Sat – Sun: Closed</p>
          </div>
        </aside>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>

          <div className="contact-form-row">
            <div className="contact-field">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-field">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="contact-field">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="What is this about?"
              value={form.subject}
              onChange={handleChange}
            />
          </div>

          <div className="contact-field">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              value={form.message}
              onChange={handleChange}
              rows={6}
              required
            />
          </div>

          <button
            type="submit"
            className="contact-submit-btn"
            disabled={sending}
          >
            {sending ? (
              "Sending..."
            ) : (
              <>
                Send Message{" "}
                <SendIcon style={{ fontSize: "1rem", marginLeft: "0.4rem" }} />
              </>
            )}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
