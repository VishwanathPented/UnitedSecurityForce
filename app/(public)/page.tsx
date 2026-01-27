import Link from 'next/link';
import { Button, Card, Carousel } from 'antd';
import {
  ArrowRightOutlined,
  SafetyCertificateFilled,
  TeamOutlined,
  FieldTimeOutlined,
  CheckCircleFilled,
  StarFilled
} from '@ant-design/icons';
import dbConnect from '@/lib/db';
import Service from '@/models/Service';
import Image from 'next/image';

async function getServices() {
  try {
    await dbConnect();
    const services = await Service.find({ isVisible: true }).sort({ order: 1 }).limit(3).lean();
    if (!services || services.length === 0) return [];
    return JSON.parse(JSON.stringify(services));
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function Home() {
  const dbServices = await getServices();

  // Fallback services if DB is empty for demo purposes
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
      description: 'State-of-the-art CCTV monitoring and alarm systems ensuring 24/7 protection. Remote viewing and instant alerts included.',
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2670&auto=format&fit=crop'
    },
    {
      _id: '3',
      title: 'Corporate Security',
      slug: 'corporate-security',
      description: 'Tailored security solutions for corporate offices, including access control, front-desk security, and risk assessment.',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop'
    }
  ];

  const services = dbServices.length > 0 ? dbServices : fallbackServices;

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-slate-900/80 to-slate-900/70 z-10" />
          <img
            src="/images/hero-bg.png"
            alt="Security Background"
            className="w-full h-full object-cover animate-[scale_20s_ease-in-out_infinite_alternate]"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-300 font-medium text-sm mb-6 animate-[fadeIn_1s_ease-out]">
            Trusted by 500+ Businesses
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight drop-shadow-lg animate-[slideUp_0.8s_ease-out]">
            Uncompromised <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Security Solutions</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed drop-shadow-md animate-[slideUp_1s_ease-out_0.2s_both]">
            Protecting what matters most with elite personnel, advanced technology, and unwavering dedication.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-[slideUp_1.2s_ease-out_0.4s_both]">
            <Link href="/contact">
              <Button type="primary" size="large" shape="round" className="h-14 px-10 text-lg font-bold shadow-blue-900/50 shadow-lg border-2 border-transparent hover:border-blue-400 !bg-blue-600">
                Get Secured Now
              </Button>
            </Link>
            <Link href="/services">
              <Button size="large" shape="round" className="h-14 px-10 text-lg font-bold !text-white !border-white/30 !bg-white/5 backdrop-blur-sm hover:!bg-white/20">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-12 relative z-10 -mt-8 mx-4 md:mx-12 rounded-2xl shadow-2xl overflow-hidden glass">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 text-center">
          {[
            { label: 'Years Experience', value: '15+' },
            { label: 'Security Officers', value: '1200+' },
            { label: 'Sites Secured', value: '500+' },
            { label: 'Client Satisfaction', value: '99%' },
          ].map((stat, i) => (
            <div key={i} className="text-blue-900">
              <div className="text-3xl md:text-5xl font-black mb-1">{stat.value}</div>
              <div className="text-sm md:text-base font-semibold uppercase tracking-wider opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Our Expertise</h2>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Comprehensive Security</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              We combine human expertise with cutting-edge technology to deliver rigorous protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service: any, index: number) => (
              <Link href={`/services/${service.slug}`} key={service._id} className="group relative block h-full">
                <div className="absolute inset-0 bg-blue-600 rounded-2xl transform translate-x-3 translate-y-3 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                <Card
                  hoverable
                  bordered={false}
                  className="h-full shadow-lg rounded-2xl overflow-hidden relative z-10 transition-all duration-300 group-hover:-translate-y-1"
                  cover={
                    <div className="h-64 relative overflow-hidden">
                      <div className="absolute inset-0 bg-blue-900/40 z-10 group-hover:bg-blue-900/20 transition-colors duration-300" />
                      <img
                        alt={service.title}
                        src={service.image}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  }
                  styles={{ body: { padding: '2rem' } }}
                >
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                    {service.title}
                    <ArrowRightOutlined className="-rotate-45 group-hover:rotate-0 transition-transform duration-300 text-gray-300 group-hover:text-blue-600" />
                  </h3>
                  <p className="text-gray-500 line-clamp-3 text-base leading-relaxed mb-6">
                    {service.description || 'Professional services to meet your requirements with highest standards.'}
                  </p>
                  <span className="text-sm font-bold text-blue-600 uppercase tracking-widest group-hover:underline">Read More</span>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/services">
              <Button size="large" shape="round" className="h-12 px-8 font-semibold">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="order-2 lg:order-1 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-100 rounded-full blur-3xl opacity-60"></div>

              <div className="relative z-10 bg-white p-2 rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2670&auto=format&fit=crop"
                  alt="Security Team"
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute -bottom-8 -left-8 bg-blue-600 text-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                  <div className="flex items-center gap-4 mb-2">
                    <SafetyCertificateFilled className="text-3xl text-amber-400" />
                    <div className="font-bold text-lg">ISO Certified</div>
                  </div>
                  <p className="text-blue-100 text-sm">Recognized for meeting international standards in security management.</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Why Us?</h2>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Not Just Guards. <br />Partners in Safety.</h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                We bring years of experience and a dedication to excellence. Our team is trained to handle critical situations with professionalism, rapid response, and absolute discretion.
              </p>

              <div className="space-y-8">
                {[
                  { icon: SafetyCertificateFilled, title: 'Certified Professionals', desc: 'Fully licensed, background-checked, and rigorously trained personnel.' },
                  { icon: TeamOutlined, title: 'Dedicated Support', desc: '24/7 command center monitoring and customer support agents.' },
                  { icon: FieldTimeOutlined, title: 'Rapid Response', desc: 'Industry-leading response times to alarms and emergencies.' }
                ].map((feature, i) => (
                  <div key={i} className="flex items-start group p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-default">
                    <div className="bg-blue-50 p-3 rounded-lg mr-5 group-hover:bg-blue-100 transition-colors">
                      <feature.icon className="text-3xl text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1 text-gray-900">{feature.title}</h4>
                      <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials / Trust */}
      <section className="py-20 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Trusted by Industry Leaders</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {[
              'https://logo.clearbit.com/google.com',
              'https://logo.clearbit.com/microsoft.com',
              'https://logo.clearbit.com/spotify.com',
              'https://logo.clearbit.com/amazon.com',
              'https://logo.clearbit.com/airbnb.com'
            ].map((logo, i) => (
              <div key={i} className="h-12 w-auto transition-transform hover:scale-110">
                <img src={logo} alt="Partner Logo" className="h-full w-auto object-contain brightness-0 invert" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 bg-blue-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/80"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to secure your premises?</h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Don't wait for an incident to happen. Get a comprehensive security audit today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact">
              <Button size="large" className="h-14 px-12 text-blue-700 border-white bg-white hover:!bg-blue-50 hover:!text-blue-800 text-lg font-bold rounded-full shadow-2xl">
                Contact Us Now
              </Button>
            </Link>
            <Link href="tel:+919876543210">
              <Button ghost size="large" className="h-14 px-12 text-white border-white hover:!text-blue-200 hover:!border-blue-200 text-lg font-bold rounded-full">
                Call +91 98765 43210
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
