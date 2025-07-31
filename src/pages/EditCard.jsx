import React, { useState, useEffect } from "react";
import { getCards, saveCards } from "../utils/storage";
import { useParams, useNavigate } from "react-router-dom";

function EditCard() {
  const { index } = useParams();
  const navigate = useNavigate();
  const cards = getCards();
  const card = cards[Number(index)]; // 🔁 FIXED: Convert to number

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (!card) {
      alert("Card not found.");
      navigate("/");
    } else {
      setNumber(card.number.replace(/(.{4})/g, "$1 ").trim());
      setName(card.name);
      setExpiry(card.expiry);
      setCvv(card.cvv);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const plainNumber = number.replace(/\s+/g, "");

    if (plainNumber.length < 15 || plainNumber.length > 19) {
      alert("Card number must be between 15 and 19 digits.");
      return;
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiry)) {
      alert("Expiry date must be in MM/YY format and month between 01–12.");
      return;
    }

    const updatedCard = { number: plainNumber, name, expiry, cvv };
    cards[Number(index)] = updatedCard; // 🔁 FIXED: Use Number(index)
    saveCards(cards);
    navigate("/");
  };

  const formatCardNumber = (input) => {
    const digits = input.replace(/\D/g, "").substring(0, 19);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white dark:bg-gray-800 shadow-md rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Edit Credit Card</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Card Number"
          value={number}
          onChange={(e) => setNumber(formatCardNumber(e.target.value))}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Name on Card"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Expiry Date (MM/YY)"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Update Card
        </button>
      </form>
    </div>
  );
}

export default EditCard;
