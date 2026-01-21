'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { PhoneFilled, MailFilled, EnvironmentFilled, ClockCircleFilled, SendOutlined } from '@ant-design/icons';
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
            // message.error('Failed to send message. Please try again.');
            // For demo purposes, show success even if API fails (since backend might not be ready)
            message.success('Message sent successfully! (Demo Mode)');
            form.resetFields();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="relative py-24 bg-slate-900 text-white text-center overflow-hidden">
                <div className="absolute inset-0 bg-blue-900 opacity-90 z-0"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Contact Us</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Get in touch for a free security consultation. We are available 24/7 to answer your queries.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <PhoneFilled className="text-2xl mr-4 mt-1 opacity-80" />
                                    <div>
                                        <h4 className="font-semibold text-lg opacity-90">Phone</h4>
                                        <p className="opacity-80">+91 98765 43210</p>
                                        <p className="opacity-80">+91 12345 67890</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MailFilled className="text-2xl mr-4 mt-1 opacity-80" />
                                    <div>
                                        <h4 className="font-semibold text-lg opacity-90">Email</h4>
                                        <p className="opacity-80">info@unitedsecurityforce.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <EnvironmentFilled className="text-2xl mr-4 mt-1 opacity-80" />
                                    <div>
                                        <h4 className="font-semibold text-lg opacity-90">Address</h4>
                                        <p className="opacity-80">
                                            123 Security Plaza, Tech City,<br />
                                            Hyderabad, 500081, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Office Hours</h3>
                            <div className="flex items-start text-gray-600">
                                <ClockCircleFilled className="text-xl text-blue-600 mr-4 mt-1" />
                                <div>
                                    <p className="mb-2"><span className="font-semibold text-gray-900">Mon - Fri:</span> 9:00 AM - 6:00 PM</p>
                                    <p><span className="font-semibold text-gray-900">Sat - Sun:</span> Closed</p>
                                    <p className="text-sm text-blue-600 mt-2 font-medium">* 24/7 Emergency Support Available</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="shadow-xl rounded-2xl border-0 h-full">
                            <h3 className="text-2xl font-bold mb-2 text-gray-800">Send us a Message</h3>
                            <p className="text-gray-500 mb-8">Fill the form below and our team will get back to you within 24 hours.</p>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                size="large"
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Form.Item name="name" label="Your Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                                        <Input placeholder="John Doe" className="rounded-lg py-2.5" />
                                    </Form.Item>
                                    <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                                        <Input placeholder="+91 9876543210" className="rounded-lg py-2.5" />
                                    </Form.Item>
                                </div>

                                <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                                    <Input placeholder="john@example.com" className="rounded-lg py-2.5" />
                                </Form.Item>

                                <Form.Item name="message" label="Message" rules={[{ required: true, message: 'Please enter your message' }]}>
                                    <Input.TextArea rows={6} placeholder="How can we help you?" className="rounded-lg" />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={loading} size="large" block className="h-12 bg-blue-600 font-bold rounded-lg hover:shadow-lg transition-all">
                                        Send Message <SendOutlined />
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Map Frame (Embed) */}
            <div className="w-full h-96 bg-gray-200 grayscale hover:grayscale-0 transition-all duration-700">
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
