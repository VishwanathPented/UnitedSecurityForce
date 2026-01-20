import { Card } from 'antd';
import { SafetyCertificateOutlined, RiseOutlined, EyeOutlined } from '@ant-design/icons';

const AboutPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-blue-900 text-white py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-lg text-blue-200">Dedicated to excellence in security and investigation.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        United Security Force is a premier provider of security guard services, private investigation, and facility management solutions.
                        With a team of highly trained professionals and a commitment to integrity, we serve a diverse range of clients from corporate offices to residential complexes.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Our journey began with a mission to redefine safety standards. Today, we are proud to be a trusted partner for hundreds of businesses and individuals,
                        delivering peace of mind through our rigorous operational protocols and client-centric approach.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card className="text-center hover:shadow-md transition-shadow">
                        <SafetyCertificateOutlined className="text-5xl text-blue-600 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                        <p className="text-gray-600">To provide uncompromised security and investigation services that empower our clients to operate with confidence.</p>
                    </Card>
                    <Card className="text-center hover:shadow-md transition-shadow">
                        <EyeOutlined className="text-5xl text-blue-600 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                        <p className="text-gray-600">To be the most respected and reliable security agency, known for our professionalism and rapid response.</p>
                    </Card>
                    <Card className="text-center hover:shadow-md transition-shadow">
                        <RiseOutlined className="text-5xl text-blue-600 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Our Values</h3>
                        <p className="text-gray-600">Integrity, Vigilance, and Excellence are the pillars of our organization.</p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
