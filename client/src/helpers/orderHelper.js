export const runOrder = (list, order) => {
  switch (order) {
    case "recent":
      return [...list].sort((a, b) => new Date(b.create_date) - new Date(a.create_date));
    case "oldest":
      return [...list].sort((a, b) => new Date(a.create_date) - new Date(b.create_date));
    case "price_asc":
      return [...list].sort((a, b) => a.price - b.price);
    case "price_desc":
      return [...list].sort((a, b) => b.price - a.price);
    default:
      return list;
  }
};