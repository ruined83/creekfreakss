import React from 'react';
import Header from '@/components/mileena/Header';
import Hero from '@/components/mileena/Hero';
import AssistantList from '@/components/mileena/AssistantList';
import Categories from '@/components/mileena/Categories';
import Footer from '@/components/mileena/Footer';

export default function MileenaPage() {
    return (
        <div className="min-h-screen bg-[#0a0005] text-white">
            <Header />
            <Hero />
            <AssistantList />
            <Categories />
            <Footer />
        </div>
    );
}
