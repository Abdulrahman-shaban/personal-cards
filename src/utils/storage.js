export const getCards = () => {
  const data = localStorage.getItem("cards");
  return data ? JSON.parse(data) : [];
};

export const saveCards = (cards) => {
  localStorage.setItem("cards", JSON.stringify(cards));
};
