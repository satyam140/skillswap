// Get wallet data
export const getWallet = () => {
  return JSON.parse(localStorage.getItem("wallet")) || {};
};

// Save wallet data
export const saveWallet = (wallet) => {
  localStorage.setItem("wallet", JSON.stringify(wallet));
};

// Give points to user
export const earnPoints = (username, points) => {
  const wallet = getWallet();
  wallet[username] = (wallet[username] || 0) + points;
  saveWallet(wallet);
};

// Deduct points
export const spendPoints = (username, points) => {
  const wallet = getWallet();

  if ((wallet[username] || 0) < points) return false;

  wallet[username] -= points;
  saveWallet(wallet);
  return true;
};