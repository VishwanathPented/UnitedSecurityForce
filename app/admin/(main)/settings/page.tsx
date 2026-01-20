'use client';

import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';

const SettingsPage = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get('/api/settings');
                form.setFieldsValue(data);
            } catch (error) {
                message.error('Failed to load settings');
            }
        };
        fetchSettings();
    }, [form]);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await axios.post('/api/settings', values);
            message.success('Settings saved');
        } catch (error) {
            message.error('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Website Settings" bordered={false}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item label="Company Name" name="companyName">
                    <Input />
                </Form.Item>

                <Form.Item label="Phone Number" name="phone">
                    <Input />
                </Form.Item>

                <Form.Item label="Email Address" name="email">
                    <Input />
                </Form.Item>

                <Form.Item label="Address" name="address">
                    <Input.TextArea rows={2} />
                </Form.Item>

                <Form.Item label="Facebook URL" name="facebook">
                    <Input />
                </Form.Item>

                <Form.Item label="Instagram URL" name="instagram">
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default SettingsPage;
