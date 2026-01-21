'use client';

import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

interface GalleryItem {
    _id: string;
    title: string;
    imageUrl: string;
}

interface GalleryGridProps {
    items: GalleryItem[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ items }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
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
                    styles={{ body: { padding: '1rem', textAlign: 'center' } }}
                >
                    <Meta
                        title={<span className="text-lg font-bold text-gray-800">{item.title}</span>}
                    />
                </Card>
            ))}
        </div>
    );
};

export default GalleryGrid;
