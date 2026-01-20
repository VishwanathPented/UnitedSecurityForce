'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Modal, message, Empty, Row, Col, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

interface GalleryItem {
    _id: string;
    title: string;
    imageUrl: string;
    category: string;
}

const GalleryPage = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const [titleInput, setTitleInput] = useState('');

    const fetchGallery = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/gallery');
            setItems(data);
        } catch (error) {
            message.error('Failed to fetch gallery');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleCreate = async () => {
        if (!urlInput) return message.error('Image URL is required');
        try {
            await axios.post('/api/gallery', { imageUrl: urlInput, title: titleInput });
            message.success('Image added');
            setModalVisible(false);
            setUrlInput('');
            setTitleInput('');
            fetchGallery();
        } catch (error) {
            message.error('Failed to add image');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/gallery?id=${id}`);
            message.success('Image deleted');
            fetchGallery();
        } catch (error) {
            message.error('Failed to delete');
        }
    };

    return (
        <div>
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Gallery Manager</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
                    Add Image
                </Button>
            </div>

            {loading ? <p>Loading...</p> : items.length === 0 ? <Empty /> : (
                <Row gutter={[16, 16]}>
                    {items.map(item => (
                        <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
                            <Card
                                cover={<img alt={item.title} src={item.imageUrl} style={{ height: 200, objectFit: 'cover' }} />}
                                actions={[
                                    <Popconfirm key="delete" title="Delete?" onConfirm={() => handleDelete(item._id)}>
                                        <DeleteOutlined key="delete" style={{ color: 'red' }} />
                                    </Popconfirm>
                                ]}
                            >
                                <Card.Meta title={item.title || "Untitled"} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            <Modal
                title="Add Image"
                open={modalVisible}
                onOk={handleCreate}
                onCancel={() => setModalVisible(false)}
            >
                <Input placeholder="Image URL" value={urlInput} onChange={e => setUrlInput(e.target.value)} style={{ marginBottom: 12 }} />
                <Input placeholder="Title (Optional)" value={titleInput} onChange={e => setTitleInput(e.target.value)} />
            </Modal>
        </div>
    );
};

export default GalleryPage;
