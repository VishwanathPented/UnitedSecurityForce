'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Drawer, Menu } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { label: 'Home', key: '/' },
        { label: 'About Us', key: '/about' },
        { label: 'Services', key: '/services' },
        { label: 'Gallery', key: '/gallery' },
        { label: 'Clients', key: '/clients' },
        { label: 'Contact', key: '/contact' },
    ];

    const showDrawer = () => setVisible(true);
    const onClose = () => setVisible(false);

    return (
        <nav
            className={`fixed w-full z-[1000] transition-all duration-300 ${scrolled
                ? 'bg-white/90 backdrop-blur-md shadow-md py-2 border-b border-gray-100'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:bg-blue-600 transition-colors">
                            U
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-bold text-lg leading-none tracking-tight transition-colors ${scrolled ? 'text-blue-900' : 'text-white'}`}>
                                UNITED
                            </span>
                            <span className={`font-semibold text-xs tracking-widest uppercase transition-colors ${scrolled ? 'text-gray-500' : 'text-blue-100'}`}>
                                Security Force
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-1 items-center bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
                        {menuItems.map((item) => (
                            <Link
                                key={item.key}
                                href={item.key}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${pathname === item.key
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : scrolled ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button (Desktop) */}
                    <div className="hidden md:block">
                        <Link href="/contact">
                            <Button
                                type="primary"
                                shape="round"
                                size="large"
                                className={`${scrolled ? 'bg-blue-600' : 'bg-blue-500 border-none hover:bg-blue-400'}`}
                            >
                                Get Quote
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            type="text"
                            icon={<MenuOutlined style={{ color: scrolled ? '#1e3a8a' : 'white', fontSize: '24px' }} />}
                            onClick={showDrawer}
                        />
                    </div>
                </div>
            </div>

            <Drawer
                title={<span className="text-blue-900 font-bold">Menu</span>}
                placement="right"
                onClose={onClose}
                open={visible}
                closeIcon={<CloseOutlined style={{ color: '#1e3a8a' }} />}
                styles={{ body: { padding: 0 } }}
            >
                <Menu
                    mode="vertical"
                    selectedKeys={[pathname]}
                    className="border-none text-lg"
                    items={menuItems.map(item => ({
                        key: item.key,
                        label: (
                            <Link href={item.key} onClick={onClose} className="block w-full py-2">
                                {item.label}
                            </Link>
                        ),
                    }))}
                />
                <div className="p-6 mt-4">
                    <Link href="/contact" onClick={onClose}>
                        <Button type="primary" size="large" block className="h-12 text-lg">
                            Get a Free Quote
                        </Button>
                    </Link>
                </div>
            </Drawer>
        </nav>
    );
};

export default Navbar;
