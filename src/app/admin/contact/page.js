'use client';
import React, { useEffect, useState } from "react";

export default function AdminContactPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch messages
    useEffect(() => {
        fetchMessages();
    }, []);

    async function fetchMessages() {
        try {
            setError('');
            const res = await fetch("/api/contact-us"); // Remove localhost:3000 for production
            const data = await res.json();
            console.log("API Response:", data);

            if (data.success) {
                setMessages(data.data);
            } else {
                setError(data.error || 'Failed to fetch messages');
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
            setError('Failed to load messages. Please check if the API is working.');
        } finally {
            setLoading(false);
        }
    }


    async function deleteMessage(id) {
        if (!confirm("Are you sure you want to delete this message?")) return;

        try {
            // Use the dynamic route: /api/contact-us/[id]
            const res = await fetch(`/api/contact-us/${id}`, {
                method: "DELETE"
            });

            const data = await res.json();

            if (data.success) {
                setMessages(messages.filter((msg) => msg._id !== id));
                alert("Message deleted successfully");
            } else {
                alert("Failed to delete message: " + data.error);
            }
        } catch (error) {
            console.error("Error deleting message:", error);
            alert("Error deleting message");
        }
    }

    if (loading) return <p className="text-center py-10">Loading messages...</p>;

    if (error) return (
        <div className="p-8">
            <div className="text-red-600 bg-red-50 p-4 rounded mb-4">
                Error: {error}
            </div>
            <button
                onClick={fetchMessages}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
                Retry
            </button>
        </div>
    );

    return (
        <section className="p-8 text-gray-700">
            <h2 className="text-3xl font-bold mb-6">Contact Messages</h2>

            {messages.length === 0 ? (
                <p>No messages found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 border">First Name</th>
                                {/* <th className="p-3 border">Last Name</th> */}
                                <th className="p-3 border">Email</th>
                                <th className="p-3 border">Phone</th>
                                <th className="p-3 border">Message</th>
                                <th className="p-3 border">Date</th>
                                <th className="p-3 border">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((msg) => (
                                <tr key={msg._id} className="hover:bg-gray-50">
                                    <td className="p-3 border">{[msg.firstName, msg.lastName].filter(Boolean).join(" ")}</td>
                                    {/* <td className="p-3 border">{msg.lastName}</td> */}
                                    <td className="p-3 border">{msg.email}</td>
                                    <td className="p-3 border">{msg.phone}</td>
                                    <td className="p-3 border">
                                        <details>
                                            <summary className="cursor-pointer text-orange-600 hover:underline">
                                                View Message
                                            </summary>
                                            <div className="mt-2 max-w-md break-words">
                                                {msg.message}
                                            </div>
                                        </details>
                                    </td>
                                    <td className="p-3 border">{new Date(msg.createdAt).toLocaleString()}</td>
                                    <td className="p-3 border">
                                        <button
                                            onClick={() => deleteMessage(msg._id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}