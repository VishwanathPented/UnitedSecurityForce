import Link from 'next/link';
import { Button, Card } from 'antd';
import { ArrowRightOutlined, SafetyCertificateFilled, TeamOutlined, FieldTimeOutlined } from '@ant-design/icons';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';

async function getServices() {
  await dbConnect();
  // Fetch top 3 services
  const services = await Service.find({ isVisible: true }).sort({ order: 1 }).limit(3).lean();
  return JSON.parse(JSON.stringify(services));
}

export default async function Home() {
  const services = await getServices();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Elite Security & <span className="text-blue-500">Facility Services</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-300 mb-10">
            Professional protection, detective services, and manpower solutions tailored to your needs. Trust United Security Force for peace of mind.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button type="primary" size="large" shape="round" className="bg-blue-600 border-blue-600 h-12 px-8 text-lg hover:!bg-blue-500">
                Get a Quote
              </Button>
            </Link>
            <Link href="/services">
              <Button size="large" shape="round" ghost className="h-12 px-8 text-lg !text-white border-white hover:!border-blue-400 hover:!text-blue-400">
                Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Our Core Services</h2>
            <p className="text-lg text-gray-600">Comprehensive solutions for every security challenge.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service: any) => (
              <Link href={`/services/${service.slug}`} key={service._id} className="group">
                <Card
                  hoverable
                  className="h-full shadow-sm hover:shadow-md transition-shadow"
                  cover={
                    <div className="h-48 bg-gray-200 w-full overflow-hidden">
                      {service.image ? (
                        <img alt={service.title} src={service.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                      )}
                    </div>
                  }
                >
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-500 line-clamp-3">{service.description || 'Professional services to meet your requirements.'}</p>
                  <div className="mt-4 flex items-center text-blue-600 font-medium">
                    Learn More <ArrowRightOutlined className="ml-2" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="large">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose United Security Force?</h2>
              <p className="text-lg text-gray-600 mb-8">
                We bring years of experience and a dedication to excellence. Our team is trained to handle critical situations with professionalism and care.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <SafetyCertificateFilled className="text-4xl text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Certified Professionals</h4>
                    <p className="text-gray-600">Fully licensed and trained security personnel.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TeamOutlined className="text-4xl text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Dedicated Support</h4>
                    <p className="text-gray-600">24/7 monitoring and customer support available.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FieldTimeOutlined className="text-4xl text-blue-600 mr-4 mt-1" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Proven Track Record</h4>
                    <p className="text-gray-600">Years of successful service delivery across industries.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2670&auto=format&fit=crop"
                alt="Security Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to secure your premises?</h2>
          <p className="text-xl text-blue-100 mb-8">Contact us today for a free consultation and customized security plan.</p>
          <Link href="/contact">
            <Button size="large" className="h-12 px-8 text-blue-600 border-white hover:!bg-gray-100 hover:!text-blue-700">
              Contact Us Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
