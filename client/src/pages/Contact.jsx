import React from "react";
import MainLayout from "../layouts/MainLayout";

const Contact = () => {
  return (
    <MainLayout>
      <section className="w-full bg-slate-800 text-white">
        {/* Get in touch section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Get in touch */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Get in touch</h2>
              <p className="text-gray-300">
                We love to hear from you. Our friendly team is always here to
                chat.
              </p>
            </div>

            {/* Chat to us */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-xl font-semibold">Chat to us</h3>
              </div>
              <p className="text-gray-300 mb-2">
                Our friendly team is here to help.
              </p>
              <p className="text-gray-300">support@ankultechnologies.com</p>
            </div>

            {/* Office */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold">Office</h3>
              </div>
              <p className="text-gray-300 mb-2">
                Come say hello at our office.
              </p>
              <p className="text-gray-300">
                Beside Dixon company, Selaqi, Dehradun, uttrakhand, 248197
              </p>
            </div>

            {/* Phone */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <h3 className="text-xl font-semibold">Phone</h3>
              </div>
              <p className="text-gray-300 mb-2">Mon - Fri from 8am to 6pm</p>
              <p className="text-gray-300">+91 9761578329</p>
              <p className="text-gray-300">+91 8273818930</p>
            </div>
          </div>
        </div>

        {/* Contact form section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Reach us for any help</h2>
            <p className="mb-8">
              You can reach us anytime via support@ankultechnologies.com
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email ID"
                  className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <div className="flex">
                  <select className="p-3 rounded-l-md bg-slate-700 border border-r-0 border-slate-600 focus:outline-none focus:border-blue-500">
                    <option>+91</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    className="w-full p-3 rounded-r-md bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Write your Message here"
                  className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
