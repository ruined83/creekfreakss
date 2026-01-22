import React from 'react';
import Header from '@/components/mileena/Header';
import Footer from '@/components/mileena/Footer';
import AssistantPage from '@/components/mileena/AssistantPage';

export default function MileenaAssistantRoute() {
    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <AssistantPage />
            <Footer />
        </div>
    );
}
