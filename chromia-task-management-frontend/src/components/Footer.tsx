import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bottom-0 right-0 left-0 bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex relative">
              <div className="relative">
                <div
                  className="absolute bg-fuchsia-300 rounded-full w-[13px] h-[13px]"
                  style={{
                    top: "-2px",
                    left: "12px",
                    mixBlendMode: "overlay",
                    opacity: 0.85,
                  }}
                ></div>

                <h1 className="text-4xl font-bold text-pink-400 tracking-wide">
                  Chro<span className="text-white">mia</span>
                </h1>
              </div>
            </div>
            <p className="text-xs mt-2">
              © 2025 ChromaWay. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="/about" className="text-sm hover:text-white">
              About Us
            </Link>
            <Link href="/contact" className="text-sm hover:text-white">
              Contact
            </Link>
            <Link href="/privacy-policy" className="text-sm hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:text-white">
              Terms of Service
            </Link>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
