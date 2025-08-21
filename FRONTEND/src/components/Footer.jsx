import React from 'react';
import { assets, footer_data } from '../assets/assets';
const Footer = () => {
  return (
    <div className="px-6 d:px-16 lg:px-24 xl:px-32 bg-[#5044E5]/20">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        {/* Logo & Description */}
        <div>
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
          <p className="max-w-80 mt-6">
            An AI-powered blog app that streamlines writing with smart suggestions, auto-categorization, and real-time grammar and content optimization.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Copyright */}
      <p className="text-center text-sm md:text-base text-gray-500 py-4">
        © 2025 QuickBlog — Made with ❤️ by Ravi Kumar Yadav. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;