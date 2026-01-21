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
            console.error(error);
            message.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/80 z-10" />
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 animate-[scale_20s_ease-in-out_infinite_alternate]"
                />

                <div className="relative z-20 text-center px-4 animate-[slideUp_0.8s_ease-out]">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 font-medium text-sm mb-6">
                        24/7 Support Available
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 drop-shadow-xl">
                        Get in Touch
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
                        Ready to secure your world? Contact us for a free consultation.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-30 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Info Card */}
                        <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-2xl animate-[slideUp_1s_ease-out_0.2s_both]">
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                Contact Info
                                <div className="h-1 flex-grow bg-blue-400/30 rounded-full" />
                            </h3>
                            <div className="space-y-8">
                                {[
                                    { icon: PhoneFilled, title: 'Phone', lines: ['+91 98765 43210', '+91 12345 67890'] },
                                    { icon: MailFilled, title: 'Email', lines: ['info@unitedsecurityforce.com', 'support@unitedsecurityforce.com'] },
                                    { icon: EnvironmentFilled, title: 'Headquarters', lines: ['123 Security Plaza, Tech City,', 'Hyderabad, 500081, India'] }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start group">
                                        <div className="bg-white/10 p-3 rounded-xl mr-4 group-hover:bg-white/20 transition-colors">
                                            <item.icon className="text-2xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                                            {item.lines.map((line, j) => (
                                                <p key={j} className="text-blue-100 leading-relaxed">{line}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hours Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 animate-[slideUp_1s_ease-out_0.4s_both]">
                            <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                                <ClockCircleFilled className="text-blue-600" /> Office Hours
                            </h3>
                            <div className="space-y-3 text-gray-600">
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="font-semibold">Mon - Fri</span>
                                    <span>9:00 AM - 6:00 PM</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-2">
                                    <span className="font-semibold">Saturday</span>
                                    <span>10:00 AM - 4:00 PM</span>
                                </div>
                                <div className="flex justify-between text-red-500">
                                    <span className="font-semibold">Sunday</span>
                                    <span>Closed</span>
                                </div>
                            </div>
                            <div className="mt-6 bg-blue-50 p-4 rounded-xl text-blue-800 text-sm font-semibold text-center">
                                * Emergency Support Available 24/7
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card
                            className="h-full shadow-2xl rounded-3xl border-0 overflow-hidden animate-[slideUp_1s_ease-out_0.3s_both]"
                            styles={{ body: { padding: '3rem' } }}
                        >
                            <div className="mb-8">
                                <h3 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h3>
                                <p className="text-gray-500 text-lg">We typically reply within 24 hours.</p>
                            </div>

                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                size="large"
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Form.Item name="name" label={<span className="font-semibold text-gray-700">Full Name</span>} rules={[{ required: true, message: 'Required' }]}>
                                        <Input placeholder="John Doe" className="bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-colors py-3 rounded-xl" />
                                    </Form.Item>
                                    <Form.Item name="phone" label={<span className="font-semibold text-gray-700">Phone Number</span>} rules={[{ required: true, message: 'Required' }]}>
                                        <Input placeholder="+91 90000 00000" className="bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-colors py-3 rounded-xl" />
                                    </Form.Item>
                                </div>

                                <Form.Item name="email" label={<span className="font-semibold text-gray-700">Email Address</span>} rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
                                    <Input placeholder="name@company.com" className="bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-colors py-3 rounded-xl" />
                                </Form.Item>

                                <Form.Item name="message" label={<span className="font-semibold text-gray-700">Your Message</span>} rules={[{ required: true, message: 'Please write a message' }]}>
                                    <Input.TextArea rows={6} placeholder="Tell us about your security needs..." className="bg-gray-50 border-gray-200 hover:bg-white focus:bg-white transition-colors rounded-xl" />
                                </Form.Item>

                                <Form.Item className="pt-4">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        loading={loading}
                                        size="large"
                                        block
                                        className="h-14 text-lg font-bold rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-none shadow-lg shadow-blue-500/30"
                                    >
                                        Send Message <SendOutlined className="ml-2" />
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="relative h-[500px] w-full bg-gray-100">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160407063!2d78.2679585647583!3d17.412153075677054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1710950000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

export default ContactPage;
