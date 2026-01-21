import { Card, Avatar } from 'antd';
import dbConnect from '@/lib/db';
import Client from '@/models/Client';

async function getClients() {
    try {
        await dbConnect();
        const clients = await Client.find({ isActive: true }).sort({ createdAt: -1 }).lean();
        if (!clients || clients.length === 0) return [];
        return JSON.parse(JSON.stringify(clients));
    } catch (error) {
        console.error("Error fetching clients:", error);
        return [];
    }
}

export default async function ClientsPage() {
    const dbClients = await getClients();

    const fallbackClients = [
        { _id: '1', name: 'Tech Solutions', category: 'Corporate', logoUrl: 'https://logo.clearbit.com/oracle.com' },
        { _id: '2', name: 'Global Logistics', category: 'Industrial', logoUrl: 'https://logo.clearbit.com/fedex.com' },
        { _id: '3', name: 'City Hospital', category: 'Healthcare', logoUrl: 'https://logo.clearbit.com/mayoclinic.org' },
        { _id: '4', name: 'Grand Hotel', category: 'Hospitality', logoUrl: 'https://logo.clearbit.com/marriott.com' },
        { _id: '5', name: 'EduSystems', category: 'Education', logoUrl: 'https://logo.clearbit.com/harvard.edu' },
        { _id: '6', name: 'Metro Build', category: 'Construction', logoUrl: 'https://logo.clearbit.com/cat.com' },
        { _id: '7', name: 'Safe Bank', category: 'Banking', logoUrl: 'https://logo.clearbit.com/chase.com' },
        { _id: '8', name: 'Retail Giant', category: 'Retail', logoUrl: 'https://logo.clearbit.com/walmart.com' },
        { _id: '9', name: 'Tech Giant', category: 'Technology', logoUrl: 'https://logo.clearbit.com/ibm.com' },
        { _id: '10', name: 'Auto Motive', category: 'Automotive', logoUrl: 'https://logo.clearbit.com/ford.com' },
        { _id: '11', name: 'Beverage Co', category: 'FMCG', logoUrl: 'https://logo.clearbit.com/coca-cola.com' },
        { _id: '12', name: 'Airline', category: 'Travel', logoUrl: 'https://logo.clearbit.com/delta.com' }
    ];

    const clients = dbClients.length > 0 ? dbClients : fallbackClients;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="relative py-24 bg-slate-900 text-white text-center overflow-hidden">
                <div className="absolute inset-0 bg-blue-900 opacity-90 z-0"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Our Trusted Clients</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Partnering with leading organizations to build a safer tomorrow.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {clients.map((client: any) => (
                        <div key={client._id} className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                            <div className="h-20 w-20 relative mb-4 flex items-center justify-center">
                                <img
                                    src={client.logoUrl || `https://ui-avatars.com/api/?name=${client.name}&background=e6f7ff&color=1890ff&size=128`}
                                    alt={client.name}
                                    className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                            <h3 className="text-center font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{client.name}</h3>
                            <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">{client.category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
