import { Card, Avatar } from 'antd';
import dbConnect from '@/lib/db';
import Client from '@/models/Client';

async function getClients() {
    await dbConnect();
    const clients = await Client.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(clients));
}

export default async function ClientsPage() {
    const clients = await getClients();

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-blue-900 text-white py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Our Clients</h1>
                <p className="text-lg text-blue-200">Trusted by leading organizations.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {clients.map((client: any) => (
                        <div key={client._id} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-24 w-24 relative mb-4 flex items-center justify-center">
                                {client.logoUrl ? (
                                    <img src={client.logoUrl} alt={client.name} className="max-h-full max-w-full object-contain" />
                                ) : (
                                    <Avatar size={64} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>{client.name[0]}</Avatar>
                                )}
                            </div>
                            <h3 className="text-center font-semibold text-gray-800">{client.name}</h3>
                            <span className="text-xs text-gray-500 mt-1">{client.category}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
