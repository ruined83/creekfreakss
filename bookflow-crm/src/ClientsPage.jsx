import React, { useState } from 'react';
import { Search, Plus, Mail, Phone, Calendar, X, Eye } from 'lucide-react';

function ClientsPage() {
    const [showClientModal, setShowClientModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const clients = [
        {
            id: 1,
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            phone: '(555) 123-4567',
            bookings: 8,
            totalSpent: '$1,240',
            lastVisit: 'Dec 20, 2025',
            status: 'Active',
            notes: 'Prefers morning appointments'
        },
        {
            id: 2,
            name: 'Michael Chen',
            email: 'michael@example.com',
            phone: '(555) 234-5678',
            bookings: 5,
            totalSpent: '$750',
            lastVisit: 'Dec 18, 2025',
            status: 'Active',
            notes: 'Interested in follow-up services'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            email: 'emily@example.com',
            phone: '(555) 345-6789',
            bookings: 12,
            totalSpent: '$2,100',
            lastVisit: 'Dec 22, 2025',
            status: 'Active',
            notes: 'VIP client - priority scheduling'
        },
        {
            id: 4,
            name: 'David Kim',
            email: 'david@example.com',
            phone: '(555) 456-7890',
            bookings: 3,
            totalSpent: '$450',
            lastVisit: 'Nov 15, 2025',
            status: 'Inactive',
            notes: 'Has not booked in over a month'
        },
        {
            id: 5,
            name: 'Lisa Wang',
            email: 'lisa@example.com',
            phone: '(555) 567-8901',
            bookings: 6,
            totalSpent: '$900',
            lastVisit: 'Dec 21, 2025',
            status: 'Active',
            notes: 'Referred by Sarah Johnson'
        },
    ];

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
    );

    const handleViewClient = (client) => {
        setSelectedClient(client);
        setShowClientModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
                    <p className="text-gray-600 mt-1">{clients.length} total clients</p>
                </div>
                <button
                    onClick={() => { setSelectedClient(null); setShowClientModal(true); }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus size={20} />
                    Add Client
                </button>
            </div>

            {/* Search & Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search clients by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
            </div>

            {/* Clients Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Name</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Contact</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Bookings</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Total Spent</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Last Visit</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.map((client) => (
                                <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                    <td className="py-3 px-4">
                                        <div className="font-medium text-gray-900">{client.name}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Mail size={14} />
                                                {client.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Phone size={14} />
                                                {client.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-900">{client.bookings}</td>
                                    <td className="py-3 px-4 font-medium text-gray-900">{client.totalSpent}</td>
                                    <td className="py-3 px-4 text-gray-600">{client.lastVisit}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${client.status === 'Active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {client.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => handleViewClient(client)}
                                            className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition"
                                        >
                                            <Eye size={16} />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Client Detail Modal */}
            {showClientModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">
                                {selectedClient ? 'Client Details' : 'Add New Client'}
                            </h3>
                            <button onClick={() => setShowClientModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X size={20} />
                            </button>
                        </div>

                        {selectedClient ? (
                            <div className="space-y-6">
                                {/* Client Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <p className="text-gray-900 font-medium">{selectedClient.name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${selectedClient.status === 'Active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {selectedClient.status}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <p className="text-gray-900">{selectedClient.email}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <p className="text-gray-900">{selectedClient.phone}</p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-sm text-blue-600 mb-1">Total Bookings</p>
                                        <p className="text-2xl font-bold text-blue-900">{selectedClient.bookings}</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-sm text-green-600 mb-1">Total Spent</p>
                                        <p className="text-2xl font-bold text-green-900">{selectedClient.totalSpent}</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <p className="text-sm text-purple-600 mb-1">Last Visit</p>
                                        <p className="text-sm font-bold text-purple-900">{selectedClient.lastVisit}</p>
                                    </div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedClient.notes}</p>
                                </div>

                                {/* Booking History */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Recent Bookings</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">Consultation</p>
                                                <p className="text-sm text-gray-600">Dec 20, 2025 at 10:00 AM</p>
                                            </div>
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                                Completed
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">Follow-up</p>
                                                <p className="text-sm text-gray-600">Dec 15, 2025 at 2:00 PM</p>
                                            </div>
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                                Completed
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                        <Calendar size={18} className="inline mr-2" />
                                        Book Appointment
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                                        Edit Client
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                    <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                                    <textarea rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={() => setShowClientModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                                        Cancel
                                    </button>
                                    <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                        Add Client
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ClientsPage;
