import { useState } from 'react';
import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';
import { PrimaryLayout } from '@/layouts';
import { FiMail, FiPhone, FiMapPin, FiPackage, FiRefreshCw, FiHelpCircle, FiSend, FiMessageSquare } from 'react-icons/fi';

const ContactPage: NextPageWithLayout = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'order-inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert('Thank you! We have received your message.');
      setForm({ name: '', email: '', subject: 'order-inquiry', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero / Header Section */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-16 max-w-6xl text-center">
          <span className="text-violet-600 font-semibold tracking-wider uppercase text-sm">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mt-3 mb-6">We're Here to Help</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Whether you have a question about sizing, order status, or just want to say hello, our team is ready to assist you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Side: Contact Form (Takes 2 columns) */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-violet-50 rounded-full text-violet-600">
                  <FiMessageSquare size={24} />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900">Send a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-neutral-700">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-neutral-700">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-neutral-700">Topic</label>
                  <div className="relative">
                    <select 
                      id="subject" 
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all appearance-none"
                      value={form.subject}
                      onChange={(e) => setForm({...form, subject: e.target.value})}
                    >
                      <option value="order-inquiry">Order Inquiry</option>
                      <option value="sizing-help">Sizing Help</option>
                      <option value="returns">Returns & Exchange</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-neutral-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-neutral-700">Message</label>
                  <textarea 
                    id="message" 
                    rows={6}
                    required
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all resize-none"
                    placeholder="How can we help you today?"
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-neutral-800 text-white font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-neutral-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : <><FiSend /> Send Message</>}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side: Info & Cards */}
          <div className="space-y-6">
            
            {/* Contact Info Card (Dark Theme) */}
            <div className="bg-neutral-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-violet-600 rounded-full opacity-20 blur-xl"></div>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <FiMail className="mt-1 text-violet-400" size={20} />
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Email Us</p>
                    <a href="mailto:support@shopsphere.com" className="font-medium hover:text-violet-300 transition">support@shopsphere.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FiPhone className="mt-1 text-violet-400" size={20} />
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Call Us</p>
                    <a href="tel:+18001234567" className="font-medium hover:text-violet-300 transition">+1 (800) 123-4567</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FiMapPin className="mt-1 text-violet-400" size={20} />
                  <div>
                    <p className="text-sm text-neutral-400 mb-1">Headquarters</p>
                    <p className="font-medium">123 Fashion Ave, Suite 400<br/>New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid gap-4">
              <button className="group flex items-center p-5 bg-white rounded-xl border border-neutral-100 hover:border-violet-200 hover:shadow-md transition-all text-left w-full">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <FiPackage size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">Track Order</h4>
                  <p className="text-sm text-neutral-500 mt-0.5">Check shipment status</p>
                </div>
              </button>

              <button className="group flex items-center p-5 bg-white rounded-xl border border-neutral-100 hover:border-violet-200 hover:shadow-md transition-all text-left w-full">
                <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-100 transition-colors">
                  <FiRefreshCw size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-neutral-900 group-hover:text-green-600 transition-colors">Returns</h4>
                  <p className="text-sm text-neutral-500 mt-0.5">Start a return or exchange</p>
                </div>
              </button>

              <button className="group flex items-center p-5 bg-white rounded-xl border border-neutral-100 hover:border-violet-200 hover:shadow-md transition-all text-left w-full">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100 transition-colors">
                  <FiHelpCircle size={24} />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-neutral-900 group-hover:text-purple-600 transition-colors">FAQs</h4>
                  <p className="text-sm text-neutral-500 mt-0.5">Find answers instantly</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ContactPage.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout seo={{ title: 'Contact Us', description: 'Get in touch with our support team' }}>{page}</PrimaryLayout>;
};

export default ContactPage;