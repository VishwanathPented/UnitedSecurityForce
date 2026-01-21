import { Card } from 'antd';
import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';

async function getGallery() {
    try {
        await dbConnect();
        const items = await Gallery.find({}).sort({ createdAt: -1 }).lean();
        if (!items || items.length === 0) return [];
        return JSON.parse(JSON.stringify(items));
    } catch (error) {
        console.error("Error fetching gallery:", error);
        return [];
    }
}

export default async function GalleryPage() {
    const dbItems = await getGallery();

    const fallbackItems = [
        { _id: '1', title: 'Security Training', imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop' },
        { _id: '2', title: 'Corporate Event', imageUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=2573&auto=format&fit=crop' },
        { _id: '3', title: 'Control Room', imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop' },
        { _id: '4', title: 'Patrol Vehicle', imageUrl: 'https://images.unsplash.com/photo-1625218731307-2a621be1461f?q=80&w=2670&auto=format&fit=crop' },
        { _id: '5', title: 'K9 Unit', imageUrl: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2670&auto=format&fit=crop' },
        { _id: '6', title: 'Building Security', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop' },
    ];

    const items = dbItems.length > 0 ? dbItems : fallbackItems;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="relative py-24 bg-slate-900 text-white text-center overflow-hidden">
                <div className="absolute inset-0 bg-blue-900 opacity-90 z-0"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=2573&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Our Gallery</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        A glimpse into our world-class operations and dedicated team in action.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item: any) => (
                        <Card
                            key={item._id}
                            hoverable
                            className="rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border-0 group"
                            cover={
                                <div className="h-72 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10" />
                                    <img alt={item.title} src={item.imageUrl} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                            }
                            }
                    styles={{ body: { padding: '1rem', textAlign: 'center' } }}
                        >
                    <Card.Meta
                        title={<span className="text-lg font-bold text-gray-800">{item.title}</span>}
                    />
                </Card>
                    ))}
            </div>
        </div>
        </div >
    );
}
