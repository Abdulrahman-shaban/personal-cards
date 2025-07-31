import React, { useState } from "react";
import { getCards, saveCards } from "../utils/storage";
import { Link } from "react-router-dom";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

function Home() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [cvvInput, setCvvInput] = useState("");
  const cards = getCards();

  const handleDeleteConfirm = () => {
    const card = cards[selectedIndex];
    if (cvvInput !== card.cvv) {
      alert("Incorrect CVV. Cannot delete card.");
      return;
    }

    const updated = [...cards];
    updated.splice(selectedIndex, 1);
    saveCards(updated);
    setSelectedIndex(null);
    window.location.reload();
  };

  function getCardStatus(expiry) {
    const [month, year] = expiry.split("/").map(Number);
    const now = new Date();
    const expiryDate = new Date(`20${year}`, month);
    return now > expiryDate ? "Expired" : "Active";
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4 px-4">
      {cards.map((card, index) => (
        <div key={index} className="p-4 bg-white dark:bg-gray-800 shadow rounded">
          <p><strong>Card:</strong> {card.number.replace(/(.{4})/g, "$1 ").trim()}</p>
          <p><strong>Name:</strong> {card.name}</p>
          <p><strong>Expiry:</strong> {card.expiry}</p>
          <p><strong>CVV:</strong> ***</p>
          <div className="mt-2 flex gap-4">
            <Link to={`/edit/${index}`} className="text-blue-600 hover:underline">Edit</Link>
            <button
              onClick={() => {
                setSelectedIndex(index);
                setCvvInput("");
              }}
              className="text-red-600 hover:underline mb-1"
            >
              Delete
            </button>
            
          </div>
            <p>
            {" "}
            <span
              className={`font-semibold ${
                getCardStatus(card.expiry) === "Expired"
                  ? "text-red-600 bg-red-100 rounded px-2 "
                  : "text-green-600 bg-green-100 rounded px-2 "
              }`}
            >
              {getCardStatus(card.expiry)}
            </span>
          </p>
        </div>
      ))}
      {cards.length === 0 && (
        <p className="text-center text-gray-500">No cards found. Click "Add Card" to get started.</p>
      )}
      {selectedIndex !== null && (
        <DeleteConfirmModal
          cvvInput={cvvInput}
          setCvvInput={setCvvInput}
          onClose={() => setSelectedIndex(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}

export default Home;
