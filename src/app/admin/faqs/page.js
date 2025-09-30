export default function FaqsPage() {
  const faqs = [
    { q: "How to order?", a: "Go to products and add to cart." },
    { q: "What is delivery time?", a: "2-3 working days." },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">FAQs</h1>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{faq.q}</h3>
            <p className="text-gray-700">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
