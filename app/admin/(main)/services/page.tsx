'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Drawer, Form, Input, InputNumber, Switch, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

interface Service {
    _id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    isVisible: boolean;
    order: number;
}

const ServicesPage = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [form] = Form.useForm();

    const fetchServices = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/services');
            setServices(data);
        } catch (error) {
            message.error('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleAddObj = () => {
        setEditingService(null);
        form.resetFields();
        setDrawerVisible(true);
    };

    const handleEditObj = (record: Service) => {
        setEditingService(record);
        form.setFieldsValue(record);
        setDrawerVisible(true);
    };

    const handleDeleteObj = async (id: string) => {
        try {
            await axios.delete(`/api/services?id=${id}`);
            message.success('Service deleted');
            fetchServices();
        } catch (error) {
            message.error('Failed to delete service');
        }
    };

    const onFinish = async (values: any) => {
        try {
            if (editingService) {
                await axios.put('/api/services', { ...values, _id: editingService._id });
                message.success('Service updated');
            } else {
                await axios.post('/api/services', values);
                message.success('Service created');
            }
            setDrawerVisible(false);
            fetchServices();
        } catch (error) {
            message.error('Operation failed');
        }
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Order',
            dataIndex: 'order',
            key: 'order',
            sorter: (a: Service, b: Service) => a.order - b.order,
        },
        {
            title: 'Visible',
            dataIndex: 'isVisible',
            key: 'isVisible',
            render: (text: boolean) => (text ? 'Yes' : 'No'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Service) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEditObj(record)} />
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteObj(record._id)}>
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Services Manager</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddObj}>
                    Add Service
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={services}
                rowKey="_id"
                loading={loading}
            />

            <Drawer
                title={editingService ? "Edit Service" : "New Service"}
                width={500}
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ isVisible: true, order: 0 }}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter title' }]}
                    >
                        <Input onChange={(e) => {
                            if (!editingService) {
                                form.setFieldsValue({ slug: e.target.value.toLowerCase().replace(/ /g, '-') });
                            }
                        }} />
                    </Form.Item>

                    <Form.Item
                        name="slug"
                        label="Slug"
                        rules={[{ required: true, message: 'Please enter slug' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Image URL"
                    >
                        <Input placeholder="https://..." />
                    </Form.Item>

                    <Form.Item
                        name="order"
                        label="Sort Order"
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="isVisible"
                        label="Visible"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            {editingService ? "Update" : "Create"}
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};

export default ServicesPage;
