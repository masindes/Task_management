import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-900 to-green-500 text-white py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="text-center md:text-left">
            <h3 className="text-md font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="hover:text-black transition duration-300 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tasks"
                  className="hover:text-black transition duration-300 text-sm"
                >
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-black transition duration-300 text-sm"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          
          <div className="text-center">
            <h3 className="text-md font-semibold mb-3">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a
                href="https://github.com/masindes"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition duration-300"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/m-sylvester-9bb732251/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition duration-300"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition duration-300"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          
          <div className="text-center md:text-right">
            <h3 className="text-md font-semibold mb-3">Contact Us</h3>
            <p className="mb-1 text-sm">Email: info@pesira.io</p>
            <p className="text-sm">Phone: +254 113 601598</p>
          </div>
        </div>

        <div className="mt-6 border-t border-white pt-4 text-center">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;