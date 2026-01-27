import { Card } from 'antd';
import { SafetyCertificateOutlined, RiseOutlined, EyeOutlined, CheckCircleFilled } from '@ant-design/icons';
import Image from 'next/image';

const AboutPage = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <div className="relative py-24 bg-slate-900 text-white text-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/about-hero.png')] bg-cover bg-center opacity-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-6">About United Security Force</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Setting the standard for excellence in security, investigation, and facility management since 2010.
                    </p>
                </div>
            </div>

            {/* Who We Are */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Who We Are</h2>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">More Than Just Security</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            United Security Force is a premier provider of security guard services, private investigation, and facility management solutions.
                            With a team of highly trained professionals and a commitment to integrity, we serve a diverse range of clients from corporate offices to residential complexes.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            Our journey began with a mission to redefine safety standards. Today, we are proud to be a trusted partner for hundreds of businesses and individuals,
                            delivering peace of mind through our rigorous operational protocols and client-centric approach.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {['ISO 9001 Certified', '24/7 Operating Centre', 'Pan-India Presence', 'Vetted Personnel'].map((item, i) => (
                                <div key={i} className="flex items-center text-gray-700 font-medium">
                                    <CheckCircleFilled className="text-green-500 mr-2" /> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute top-4 left-4 w-full h-full bg-blue-100 rounded-2xl -z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1577962917302-cd874c4e3169?q=80&w=2532&auto=format&fit=crop"
                            alt="Security Meeting"
                            className="rounded-2xl shadow-xl w-full"
                        />
                    </div>
                </div>

                {/* Values Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: SafetyCertificateOutlined, title: 'Our Mission', desc: 'To provide uncompromised security and investigation services that empower our clients to operate with confidence.' },
                        { icon: EyeOutlined, title: 'Our Vision', desc: 'To be the most respected and reliable security agency, known for our professionalism and rapid response.' },
                        { icon: RiseOutlined, title: 'Our Values', desc: 'Integrity, Vigilance, and Excellence are the pillars of our organization. We never cut corners when it comes to safety.' }
                    ].map((item, i) => (
                        <div key={i} className="bg-gray-50 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-gray-100 hover:shadow-lg hover:border-blue-100 group">
                            <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                                <item.icon className="text-3xl text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
