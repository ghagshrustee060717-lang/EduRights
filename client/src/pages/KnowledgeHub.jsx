import { useState } from "react";

const faqs = [
  { q: "What is my Right to Education?", a: "Every child has the right to go to school and learn." },
  { q: "What is my Right to Be Heard?", a: "You can share your opinion on things that affect you, and adults should listen." },
  { q: "What is my Right to Safety?", a: "Every child has the right to be protected from harm, at home, school, and online." },
];

function KnowledgeHub() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Knowledge Hub</h2>
      {faqs.map((item, i) => (
        <div key={i} className="rounded-xl bg-white shadow p-4 mb-3">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="font-semibold text-left w-full"
          >
            {item.q}
          </button>
          {openIndex === i && <p className="mt-2 text-gray-600">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}

export default KnowledgeHub;