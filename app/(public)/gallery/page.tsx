import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';
import GalleryGrid from '@/components/GalleryGrid';

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
        { _id: '1', title: 'Security Training', imageUrl: '/images/generic-placeholder.png' },
        { _id: '2', title: 'Corporate Event', imageUrl: '/images/generic-placeholder.png' },
        { _id: '3', title: 'Control Room', imageUrl: '/images/generic-placeholder.png' },
        { _id: '4', title: 'Patrol Vehicle', imageUrl: '/images/generic-placeholder.png' },
        { _id: '5', title: 'K9 Unit', imageUrl: '/images/generic-placeholder.png' },
        { _id: '6', title: 'Building Security', imageUrl: '/images/generic-placeholder.png' },
    ];

    const items = dbItems.length > 0 ? dbItems : fallbackItems;

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="relative py-24 bg-slate-900 text-white text-center overflow-hidden">
                <div className="absolute inset-0 bg-blue-900 opacity-90 z-0"></div>
                <div className="absolute inset-0 bg-[url('/images/generic-placeholder.png')] bg-cover bg-center opacity-20"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Our Gallery</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        A glimpse into our world-class operations and dedicated team in action.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <GalleryGrid items={items} />
            </div>
        </div>
    );
}
