import Link from 'next/link';
import { Card, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';

async function getServices() {
    try {
        await dbConnect();
        const services = await Service.find({ isVisible: true }).sort({ order: 1 }).lean();
        if (!services || services.length === 0) return [];
        return JSON.parse(JSON.stringify(services));
    } catch (error) {
        console.error("Error fetching services:", error);
        return [];
    }
}

export default async function ServicesPage() {
    const dbServices = await getServices();

    const fallbackServices = [
        {
            _id: '1',
            title: 'Manned Guarding',
            slug: 'manned-guarding',
            description: 'Professional security personnel for your business, event, or residential property. Our guards are vigorously trained and vetted.',
            image: '/images/manned-guarding.png'
        },
        {
            _id: '2',
            title: 'Electronic Surveillance',
            slug: 'electronic-surveillance',
            description: 'State-of-the-art CCTV monitoring and alarm systems ensuring 24/7 protection.',
            image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2670&auto=format&fit=crop'
        },
        {
            _id: '3',
            title: 'Corporate Security',
            slug: 'corporate-security',
            description: 'Tailored security solutions for corporate offices, including access control, front-desk security, and risk assessment.',
            image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop'
        },
        {
            _id: '4',
            title: 'Event Security',
            slug: 'event-security',
            description: 'Crowd control and VIP protection for events of all sizes.',
            image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2669&auto=format&fit=crop'
        },
        {
            _id: '5',
            title: 'Private Investigation',
            slug: 'private-investigation',
            description: 'Discreet and thorough investigation services for personal and corporate cases.',
            image: 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?q=80&w=2647&auto=format&fit=crop'
        },
        {
            _id: '6',
            title: 'Facility Management',
            slug: 'facility-management',
            description: 'Complete facility maintenance including housekeeping and technical support.',
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2670&auto=format&fit=crop'
        }
    ];

    const services = dbServices.length > 0 ? dbServices : fallbackServices;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="relative py-24 bg-slate-900 text-white text-center overflow-hidden">
                <div className="absolute inset-0 bg-blue-900 opacity-90 z-0"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Our Services</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Comprehensive, custom-tailored security solutions designed to meet the unique challenges of your environment.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service: any) => (
                        <Link href={`/services/${service.slug}`} key={service._id} className="group block">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col hover:-translate-y-1">
                                <div className="h-48 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                                    <img
                                        alt={service.title}
                                        src={service.image || 'https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?q=80&w=2670&auto=format&fit=crop'}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                                    <p className="text-gray-500 line-clamp-3 mb-6 flex-grow leading-relaxed">
                                        {service.description || 'Professional security services.'}
                                    </p>
                                    <div className="mt-auto">
                                        <span className="inline-flex items-center text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                                            Learn More <ArrowRightOutlined className="ml-2" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
