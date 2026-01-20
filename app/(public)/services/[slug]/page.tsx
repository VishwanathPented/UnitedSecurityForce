import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import Link from 'next/link';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getService(slug: string) {
    await dbConnect();
    const service = await Service.findOne({ slug, isVisible: true }).lean();
    if (!service) return null;
    return JSON.parse(JSON.stringify(service));
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const service = await getService(slug);

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen pb-16">
            <div className="bg-slate-900 text-white py-12 px-4 shadow-md">
                <div className="max-w-7xl mx-auto">
                    <Link href="/services" className="text-slate-300 hover:text-white mb-4 inline-flex items-center">
                        <ArrowLeftOutlined className="mr-2" /> Back to Services
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold mt-2">{service.title}</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 mt-12 bg-white rounded-lg p-8 border border-gray-100">
                {service.image && (
                    <div className="rounded-xl overflow-hidden mb-8 h-96 w-full relative">
                        <img
                            src={service.image}
                            alt={service.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="prose max-w-none text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                    {service.description}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                    <h3 className="text-2xl font-bold mb-4">Interested in this service?</h3>
                    <Link href="/contact">
                        <Button type="primary" size="large" className="px-8 h-12 text-lg">Contact Us Today</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
