import Link from 'next/link';
import { Card, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';

async function getServices() {
    await dbConnect();
    const services = await Service.find({ isVisible: true }).sort({ order: 1 }).lean();
    return JSON.parse(JSON.stringify(services));
}

export default async function ServicesPage() {
    const services = await getServices();

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-blue-900 text-white py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Our Services</h1>
                <p className="text-lg text-blue-200">Comprehensive security solutions tailored for you.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service: any) => (
                        <Link href={`/services/${service.slug}`} key={service._id} className="group">
                            <Card
                                hoverable
                                className="h-full"
                                cover={
                                    <div className="h-56 bg-gray-200 w-full overflow-hidden">
                                        {service.image ? (
                                            <img alt={service.title} src={service.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                        )}
                                    </div>
                                }
                            >
                                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                                <p className="text-gray-500 line-clamp-3 mb-4">{service.description}</p>
                                <Button type="primary" ghost>Read More</Button>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
