import { Card } from 'antd';
import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';

async function getGallery() {
    await dbConnect();
    const items = await Gallery.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(items));
}

export default async function GalleryPage() {
    const items = await getGallery();

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-blue-900 text-white py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Gallery</h1>
                <p className="text-lg text-blue-200">A glimpse into our operations and team.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((item: any) => (
                        <Card key={item._id} hoverable cover={
                            <img alt={item.title} src={item.imageUrl} className="h-64 object-cover" />
                        }>
                            <Card.Meta title={item.title} />
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
