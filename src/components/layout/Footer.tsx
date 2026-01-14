import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center border border-primary-foreground/20">
                <span className="font-bold text-lg font-display">B</span>
              </div>
              <span className="font-display font-bold text-xl">Bells Pay</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              The official digital payment platform for Bells University of Technology students.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <a href="#features" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#faq" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">
                  Report an Issue
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Bells University of Technology</li>
              <li>Ota, Ogun State, Nigeria</li>
              <li className="pt-2">
                <a href="mailto:support@bellspay.edu.ng" className="hover:text-primary-foreground transition-colors">
                  support@bellspay.edu.ng
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Bells Pay. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
