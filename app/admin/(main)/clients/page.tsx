'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Drawer, Form, Input, Switch, message, Popconfirm, Avatar } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

interface Client {
    _id: string;
    name: string;
    logoUrl: string;
    category: string;
    isActive: boolean;
}

const ClientsPage = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [form] = Form.useForm();

    const fetchClients = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/clients');
            setClients(data);
        } catch (error) {
            message.error('Failed to fetch clients');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleAddObj = () => {
        setEditingClient(null);
        form.resetFields();
        setDrawerVisible(true);
    };

    const handleEditObj = (record: Client) => {
        setEditingClient(record);
        form.setFieldsValue(record);
        setDrawerVisible(true);
    };

    const handleDeleteObj = async (id: string) => {
        try {
            await axios.delete(`/api/clients?id=${id}`);
            message.success('Client deleted');
            fetchClients();
        } catch (error) {
            message.error('Failed to delete client');
        }
    };

    const onFinish = async (values: any) => {
        try {
            if (editingClient) {
                await axios.put('/api/clients', { ...values, _id: editingClient._id });
                message.success('Client updated');
            } else {
                await axios.post('/api/clients', values);
                message.success('Client created');
            }
            setDrawerVisible(false);
            fetchClients();
        } catch (error) {
            message.error('Operation failed');
        }
    };

    const columns = [
        {
            title: 'Logo',
            dataIndex: 'logoUrl',
            key: 'logo',
            render: (url: string) => <Avatar src={url} shape="square" size="large" />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Active',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text: boolean) => (text ? 'Yes' : 'No'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Client) => (
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
                <h2>Clients Manager</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddObj}>
                    Add Client
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={clients}
                rowKey="_id"
                loading={loading}
            />

            <Drawer
                title={editingClient ? "Edit Client" : "New Client"}
                width={400}
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ isActive: true }}
                >
                    <Form.Item
                        name="name"
                        label="Client Name"
                        rules={[{ required: true, message: 'Please enter name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="logoUrl"
                        label="Logo URL"
                    >
                        <Input placeholder="https://..." />
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                    >
                        <Input placeholder="e.g. Corporate, Retail" />
                    </Form.Item>

                    <Form.Item
                        name="isActive"
                        label="Active Status"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            {editingClient ? "Update" : "Create"}
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
};

export default ClientsPage;
