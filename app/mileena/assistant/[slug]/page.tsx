
import React, { use } from 'react';
import Header from '@/components/mileena/Header';
import Footer from '@/components/mileena/Footer';
import AssistantPage from '@/components/mileena/AssistantPage';
import { assistants } from '@/lib/mileena-data';

export default function AssistantRoute({ params }) {
    const unwrappedParams = use(params);
    const { slug } = unwrappedParams;
    const assistant = assistants.find((a) => a.id === slug);

    if (!assistant) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <h1 className="text-2xl">Assistant Not Found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <AssistantPage assistant={assistant} />
            <Footer />
        </div>
    );
}
