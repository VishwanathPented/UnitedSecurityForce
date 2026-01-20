'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Popconfirm, Tag } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

interface User {
    _id: string;
    username: string;
    role: string;
}

const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/users');
            setUsers(data);
        } catch (error) {
            message.error('Failed to fetch users or unauthorized');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreate = async (values: any) => {
        try {
            await axios.post('/api/users', values);
            message.success('User created');
            setModalVisible(false);
            form.resetFields();
            fetchUsers();
        } catch (error: any) {
            message.error(error.response?.data?.error || 'Failed to create');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/users?id=${id}`);
            message.success('User deleted');
            fetchUsers();
        } catch (error) {
            message.error('Failed to delete');
        }
    };

    const columns = [
        { title: 'Username', dataIndex: 'username', key: 'username' },
        { title: 'Role', dataIndex: 'role', key: 'role', render: (text: string) => <Tag color={text === 'admin' ? 'blue' : 'green'}>{text.toUpperCase()}</Tag> },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: User) => (
                <Popconfirm title="Delete user?" onConfirm={() => handleDelete(record._id)}>
                    <Button icon={<DeleteOutlined />} danger size="small" disabled={record.username === 'admin'} />
                </Popconfirm>
            )
        }
    ];

    return (
        <div>
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>User Management</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
                    Add User
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={users}
                rowKey="_id"
                loading={loading}
            />

            <Modal
                title="Create User"
                open={modalVisible}
                onOk={() => form.submit()}
                onCancel={() => setModalVisible(false)}
            >
                <Form form={form} layout="vertical" onFinish={handleCreate} initialValues={{ role: 'editor' }}>
                    <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="editor">Editor</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UsersPage;
