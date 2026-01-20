import Link from 'next/link';
import { FacebookFilled, InstagramFilled, PhoneFilled, MailFilled, EnvironmentFilled } from '@ant-design/icons';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">United Security Force</h3>
                        <p className="text-slate-400 mb-4">
                            Providing top-tier security, detective, and facility management services. Your safety is our priority.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white hover:text-blue-400 text-2xl"><FacebookFilled /></a>
                            <a href="#" className="text-white hover:text-pink-400 text-2xl"><InstagramFilled /></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-slate-400 hover:text-white">About Us</Link></li>
                            <li><Link href="/services" className="text-slate-400 hover:text-white">Our Services</Link></li>
                            <li><Link href="/gallery" className="text-slate-400 hover:text-white">Gallery</Link></li>
                            <li><Link href="/contact" className="text-slate-400 hover:text-white">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <ul className="space-y-3 text-slate-400">
                            <li className="flex items-center gap-2"><PhoneFilled /> <span>+91 98765 43210</span></li>
                            <li className="flex items-center gap-2"><MailFilled /> <span>info@unitedsecurityforce.com</span></li>
                            <li className="flex items-start gap-2"><EnvironmentFilled className="mt-1" /> <span>123 Security Plaza, Main Road, City, India</span></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 text-center text-slate-500">
                    <p>&copy; {new Date().getFullYear()} United Security Force. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
