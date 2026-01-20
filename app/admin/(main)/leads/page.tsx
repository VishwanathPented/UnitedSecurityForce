'use client';

import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Space, message, Popconfirm } from 'antd';
import { DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

interface Lead {
    _id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: string;
    createdAt: string;
}

const LeadsPage = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/leads');
            setLeads(data);
        } catch (error) {
            message.error('Failed to fetch leads');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const handleMarkRead = async (id: string) => {
        try {
            await axios.put('/api/leads', { _id: id, status: 'read' });
            message.success('Marked as read');
            fetchLeads();
        } catch (error) {
            message.error('Failed to update');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/leads?id=${id}`);
            message.success('Lead deleted');
            fetchLeads();
        } catch (error) {
            message.error('Failed to delete');
        }
    };

    const columns = [
        { title: 'Date', dataIndex: 'createdAt', key: 'date', render: (text: string) => new Date(text).toLocaleDateString() },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Message', dataIndex: 'message', key: 'message', ellipsis: true },
        {
            title: 'Status', dataIndex: 'status', key: 'status', render: (text: string) => (
                <Tag color={text === 'new' ? 'green' : 'default'}>{text.toUpperCase()}</Tag>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Lead) => (
                <Space>
                    {record.status === 'new' && (
                        <Button icon={<CheckCircleOutlined />} onClick={() => handleMarkRead(record._id)} size="small" />
                    )}
                    <Popconfirm title="Delete?" onConfirm={() => handleDelete(record._id)}>
                        <Button icon={<DeleteOutlined />} danger size="small" />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div>
            <h2 style={{ marginBottom: 24 }}>Leads Manager</h2>
            <Table
                columns={columns}
                dataSource={leads}
                rowKey="_id"
                loading={loading}
            />
        </div>
    );
};

export default LeadsPage;
