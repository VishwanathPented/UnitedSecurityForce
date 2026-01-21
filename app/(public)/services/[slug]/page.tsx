import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import Link from 'next/link';
import { Button } from 'antd';
import { ArrowLeftOutlined, CheckCircleFilled } from '@ant-design/icons';

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getService(slug: string) {
    try {
        await dbConnect();
        const service = await Service.findOne({ slug, isVisible: true }).lean();
        if (service) return JSON.parse(JSON.stringify(service));
    } catch (error) {
        console.error("Error fetching service:", error);
    }

    // Fallback data matching the Home/Services page fallback data
    const fallbackServices = [
        {
            _id: '1',
            title: 'Manned Guarding',
            slug: 'manned-guarding',
            description: `Our Manned Guarding service provides professional, highly trained security personnel to protect your premises, assets, and people.

          We understand that every client has unique security needs. That's why we offer tailored solutions including:

          • Static Guarding: Specialists stationed at entry points or critical areas.
          • Mobile Patrols: Roving security to cover large areas.
          • Reception Security: Blending customer service with vigilance.

          All our guards undergo rigorous background checks and intensive training in conflict resolution, emergency response, and first aid.`,
            image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2670&auto=format&fit=crop'
        },
        {
            _id: '2',
            title: 'Electronic Surveillance',
            slug: 'electronic-surveillance',
            description: `Stay one step ahead with our state-of-the-art Electronic Surveillance systems. We provide comprehensive monitoring solutions that ensure 24/7 protection.

          Our services include:
          • HD CCTV Installation & Monitoring
          • Motion Sensors & Alarm Systems
          • Remote Access Control
          • Integration with Mobile Devices for Real-time Alerts

          Whether it's a residential complex or a large industrial facility, our technology ensures nothing goes unnoticed.`,
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop'
        },
        {
            _id: '3',
            title: 'Corporate Security',
            slug: 'corporate-security',
            description: `Protect your business assets, employees, and reputation with our Corporate Security solutions. We specialize in securing corporate environments against both physical and digital threats.

          Key features:
          • Access Control Management
          • Visitor Management Systems
          • Executive Protection
          • Risk Assessment & Security Audits

          We help you create a safe, productive environment where business can thrive without disruption.`,
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop'
        },
        {
            _id: '4',
            title: 'Event Security',
            slug: 'event-security',
            description: 'Crowd control and VIP protection for events of all sizes. We ensure safety without compromising the guest experience.',
            image: 'https://images.unsplash.com/photo-1510511233900-1982d69181de?q=80&w=2367&auto=format&fit=crop'
        },
        {
            _id: '5',
            title: 'Private Investigation',
            slug: 'private-investigation',
            description: 'Discreet and thorough investigation services for personalized cases. Our licensed investigators handle every case with confidentiality and precision.',
            image: 'https://images.unsplash.com/photo-1606627680164-893bd5757d5c?q=80&w=2670&auto=format&fit=crop'
        },
        {
            _id: '6',
            title: 'Facility Management',
            slug: 'facility-management',
            description: 'Complete facility maintenance including housekeeping, technical support, and waste management. One partner for all your facility needs.',
            image: 'https://images.unsplash.com/photo-1581578731117-104f8a3d46a8?q=80&w=2727&auto=format&fit=crop'
        }
    ];

    return fallbackServices.find(s => s.slug === slug) || null;
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Hero Header */}
            <div className="relative h-[400px] w-full bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/60 z-10" />
                {service.image && (
                    <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                )}
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{service.title}</h1>
                    <div className="w-24 h-1 bg-blue-400 rounded-full mb-6"></div>
                    <Link href="/services">
                        <span className="text-white/80 hover:text-white flex items-center gap-2 cursor-pointer transition-colors backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/20 hover:bg-black/40">
                            <ArrowLeftOutlined /> Back to All Services
                        </span>
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Service Overview</h2>
                            <div className="prose max-w-none text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                                {service.description}
                            </div>

                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['24/7 Availability', 'Licensed Personnel', 'Custom Solutions', 'Rapid Deployment'].map((tag, i) => (
                                    <div key={i} className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
                                        <CheckCircleFilled className="text-green-500 mr-3" /> {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / CTA */}
                    <div className="lg:w-1/3 space-y-6">
                        <div className="bg-blue-600 text-white rounded-2xl shadow-xl p-8 sticky top-24">
                            <h3 className="text-2xl font-bold mb-4">Need this service?</h3>
                            <p className="text-blue-100 mb-8 text-lg">
                                Contact us today for a customized quote tailored to your specific requirements.
                            </p>
                            <Link href="/contact">
                                <Button size="large" block className="h-14 bg-white text-blue-800 font-bold border-none hover:!bg-blue-50 text-lg rounded-xl">
                                    Get a Quote Now
                                </Button>
                            </Link>
                            <div className="mt-6 pt-6 border-t border-blue-500/50 text-center">
                                <p className="text-sm text-blue-200 uppercase tracking-widest mb-1">Call Us Directly</p>
                                <a href="tel:+919876543210" className="text-2xl font-bold hover:text-white transition-colors block">
                                    +91 987 654 3210
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
