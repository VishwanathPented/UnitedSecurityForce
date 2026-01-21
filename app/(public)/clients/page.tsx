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
        { _id: '1', name: 'Tech Solutions', category: 'Corporate', logoUrl: 'https://cdn-icons-png.flaticon.com/128/3067/3067175.png' },
        { _id: '2', name: 'Global Logistics', category: 'Industrial', logoUrl: 'https://cdn-icons-png.flaticon.com/128/2828/2828586.png' },
        { _id: '3', name: 'City Hospital', category: 'Healthcare', logoUrl: 'https://cdn-icons-png.flaticon.com/128/2966/2966334.png' },
        { _id: '4', name: 'Grand Hotel', category: 'Hospitality', logoUrl: 'https://cdn-icons-png.flaticon.com/128/201/201623.png' },
        { _id: '5', name: 'EduSystems', category: 'Education', logoUrl: 'https://cdn-icons-png.flaticon.com/128/2436/2436874.png' },
        { _id: '6', name: 'Metro Build', category: 'Construction', logoUrl: 'https://cdn-icons-png.flaticon.com/128/4072/4072307.png' },
        { _id: '7', name: 'Safe Bank', category: 'Banking', logoUrl: 'https://cdn-icons-png.flaticon.com/128/2830/2830284.png' },
        { _id: '8', name: 'Retail Giant', category: 'Retail', logoUrl: 'https://cdn-icons-png.flaticon.com/128/1170/1170678.png' },
        { _id: '9', name: 'Tech Giant', category: 'Technology', logoUrl: 'https://cdn-icons-png.flaticon.com/128/2083/2083213.png' },
        { _id: '10', name: 'Auto Motive', category: 'Automotive', logoUrl: 'https://cdn-icons-png.flaticon.com/128/776/776625.png' },
        { _id: '11', name: 'Beverage Co', category: 'FMCG', logoUrl: 'https://cdn-icons-png.flaticon.com/128/931/931949.png' },
        { _id: '12', name: 'Airline', category: 'Travel', logoUrl: 'https://cdn-icons-png.flaticon.com/128/826/826070.png' }
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
                                    src={client.logoUrl}
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
