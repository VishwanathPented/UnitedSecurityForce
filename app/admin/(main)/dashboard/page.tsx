'use client';

import React from 'react';
import { Card, Col, Row, Statistic, Typography, Table, Tag } from 'antd';
import { ShopOutlined, TeamOutlined, PictureOutlined, MessageOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Mock data (replace with API calls later)
const stats = [
    { title: 'Total Services', value: 12, icon: <ShopOutlined />, color: '#1890ff' },
    { title: 'Total Clients', value: 24, icon: <TeamOutlined />, color: '#52c41a' },
    { title: 'Gallery Images', value: 48, icon: <PictureOutlined />, color: '#faad14' },
    { title: 'Unread Leads', value: 5, icon: <MessageOutlined />, color: '#f5222d' },
];

const recentActivity = [
    { key: '1', action: 'New Lead', details: 'John Doe sent a message', time: '10 mins ago' },
    { key: '2', action: 'Service Updated', details: 'Updated "Security Guard" service', time: '1 hour ago' },
    { key: '3', action: 'Login', details: 'Admin logged in', time: '2 mins ago' },
];

const DashboardPage = () => {
    return (
        <div>
            <Title level={2} style={{ marginBottom: 24 }}>Dashboard</Title>

            <Row gutter={16} style={{ marginBottom: 24 }}>
                {stats.map((stat, index) => (
                    <Col xs={24} sm={12} md={6} key={index}>
                        <Card bordered={false} hoverable>
                            <Statistic
                                title={stat.title}
                                value={stat.value}
                                prefix={<span style={{ color: stat.color, marginRight: 8 }}>{stat.icon}</span>}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card title="Recent Activity" bordered={false}>
                <Table
                    dataSource={recentActivity}
                    pagination={false}
                    columns={[
                        { title: 'Action', dataIndex: 'action', key: 'action', render: (text) => <Tag color="blue">{text}</Tag> },
                        { title: 'Details', dataIndex: 'details', key: 'details' },
                        { title: 'Time', dataIndex: 'time', key: 'time', render: (text) => <span style={{ color: '#888' }}>{text}</span> },
                    ]}
                />
            </Card>
        </div>
    );
};

export default DashboardPage;
