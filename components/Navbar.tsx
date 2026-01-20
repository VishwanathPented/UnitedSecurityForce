'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Drawer, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const pathname = usePathname();

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
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        {/* <img className="h-10 w-auto" src="/logo.png" alt="Company Logo" /> */}
                        <span className="font-bold text-xl tracking-tight text-blue-900">
                            UNITED SECURITY FORCE
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {menuItems.map((item) => (
                            <Link
                                key={item.key}
                                href={item.key}
                                className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${pathname === item.key ? 'text-blue-600' : ''}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
                    </div>
                </div>
            </div>

            <Drawer title="Menu" placement="right" onClose={onClose} open={visible}>
                <Menu
                    mode="vertical"
                    selectedKeys={[pathname]}
                    items={menuItems.map(item => ({
                        key: item.key,
                        label: <Link href={item.key} onClick={onClose}>{item.label}</Link>
                    }))}
                    style={{ borderRight: 0 }}
                />
            </Drawer>
        </nav>
    );
};

export default Navbar;
