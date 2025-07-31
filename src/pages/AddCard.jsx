import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCards, saveCards } from "../utils/storage";

function AddCard() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();

  const formatCardNumber = (val) =>
    val.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();

  const handleSubmit = (e) => {
    e.preventDefault();

    const plainNumber = number.replace(/\s/g, "");

    if (!/^[0-9]{15,19}$/.test(plainNumber)) {
      alert("Card number must be 15–19 digits.");
      return;
    }

    if (!/^[0-9]{3,4}$/.test(cvv)) {
      alert("CVV must be 3 or 4 digits.");
      return;
    }

    const [mm, yy] = expiry.split("/").map(Number);
    if (!mm || !yy || mm > 12 || mm < 1) {
      alert("Invalid expiry format (MM/YY).");
      return;
    }

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
      alert("Expiry date is in the past.");
      return;
    }

    const cards = getCards();
    const duplicate = cards.some((card) => card.number === plainNumber);
    if (duplicate) {
      alert("This card number already exists.");
      return;
    }

    cards.push({ number: plainNumber, name, expiry, cvv });
    saveCards(cards);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
      <input
        type="text"
        placeholder="Card Number"
        value={number}
        onChange={(e) => setNumber(formatCardNumber(e.target.value))}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Cardholder Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Expiry (MM/YY)"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add Card
      </button>
    </form>
  );
}

export default AddCard;
