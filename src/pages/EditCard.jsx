import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCards, saveCards } from "../utils/storage";

function EditCard() {
  const { index } = useParams();
  const navigate = useNavigate();
  const cards = getCards();
  const card = cards[index];

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (card) {
      setNumber(card.number.replace(/(.{4})/g, "$1 ").trim());
      setName(card.name);
      setExpiry(card.expiry);
      setCvv(card.cvv);
    }
  }, [card]);

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
    const now = new Date();
    const thisYear = now.getFullYear() % 100;
    const thisMonth = now.getMonth() + 1;
    if (yy < thisYear || (yy === thisYear && mm < thisMonth)) {
      alert("Expiry date is in the past.");
      return;
    }

    const updated = [...cards];
    updated[index] = { number: plainNumber, name, expiry, cvv };
    saveCards(updated);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
      <input type="text" value={number} onChange={(e) => {
        const val = e.target.value.replace(/\D/g, "").slice(0, 19);
        setNumber(val.replace(/(.{4})/g, "$1 ").trim());
      }} placeholder="Card Number" className="w-full p-2 border rounded" />

      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Cardholder Name" className="w-full p-2 border rounded" />

      <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="Expiry (MM/YY)" className="w-full p-2 border rounded" />

      <input type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="CVV" className="w-full p-2 border rounded" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
    </form>
  );
}

export default EditCard;
