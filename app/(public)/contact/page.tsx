'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { PhoneFilled, MailFilled, EnvironmentFilled, ClockCircleFilled } from '@ant-design/icons';
import axios from 'axios';

const ContactPage = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await axios.post('/api/leads', values);
            message.success('Message sent successfully! We will contact you soon.');
            form.resetFields();
        } catch (error) {
            message.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-blue-900 text-white py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-lg text-blue-200">Get in touch for a free security consultation.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <PhoneFilled className="text-2xl text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-900">Phone</h4>
                                    <p className="text-gray-600">+91 98765 43210</p>
                                    <p className="text-gray-600">+91 12345 67890</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <MailFilled className="text-2xl text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-900">Email</h4>
                                    <p className="text-gray-600">info@unitedsecurityforce.com</p>
                                    <p className="text-gray-600">support@unitedsecurityforce.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <EnvironmentFilled className="text-2xl text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-900">Headquarters</h4>
                                    <p className="text-gray-600">
                                        123 Security Plaza, Main Road,<br />
                                        Tech City, Hyderabad, 500081<br />
                                        India
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-blue-100 p-3 rounded-full mr-4">
                                    <ClockCircleFilled className="text-2xl text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-900">Office Hours</h4>
                                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                                    <p className="text-gray-600">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card className="shadow-lg border-0">
                        <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            size="large"
                        >
                            <Form.Item name="name" label="Your Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                                <Input placeholder="John Doe" />
                            </Form.Item>

                            <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                                <Input placeholder="john@example.com" />
                            </Form.Item>

                            <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                                <Input placeholder="+91 9876543210" />
                            </Form.Item>

                            <Form.Item name="message" label="Message" rules={[{ required: true, message: 'Please enter your message' }]}>
                                <Input.TextArea rows={4} placeholder="How can we help you?" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading} block className="bg-blue-600 h-12">
                                    Send Message
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </div>

            {/* Map Frame (Embed) */}
            <div className="w-full h-96 bg-gray-200">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160407063!2d78.2679585647583!3d17.412153075677054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1710950000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactPage;
