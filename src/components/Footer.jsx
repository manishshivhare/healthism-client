import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Classes", link: "/classes" },
    { name: "Membership", link: "/contact" },
    { name: "About Us", link: "/about" },
  ];

  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black  text-gray-400 border-t border-gray-500">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-100 mb-4">
              <img
                src="https://res.cloudinary.com/dzbuyze8t/image/upload/v1738736280/vtmphojr7qkmjsvc5t5i.png"
                alt="Healthism"
                className="h-12 w-auto"
              />
            </h3>
            <p className="text-base leading-relaxed">
              Transform your life with our state-of-the-art facilities and
              expert trainers. Join our fitness community today and achieve your
              health goals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-100 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className="text-sm hover:text-orange-500 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} />
                <span className="text-sm">
                  <a
                    href="https://maps.app.goo.gl/T7gphPz4wo5VQKcu8"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    First Floor, Skyline Plaza-3, Golf City, Sector B Ansal API,
                    Lucknow
                  </a>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} />
                <a href="tel:8187906088">
                  <span className="text-sm">+91-8187906088</span>
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} />
                <a href="mailto:healthism24x7@gmail.com">
                  <span className="text-sm">healthism24x7@gmail.com</span>
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock size={18} />
                <span className="text-sm">Mon-Sun: 24 X 7</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/healthism"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/healthism24x7/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://twitter.com/healthism"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500 transition-colors duration-200"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} Healthism Gym. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;