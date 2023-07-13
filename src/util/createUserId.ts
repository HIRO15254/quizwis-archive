export const createRandomID = (length: number) => {
  const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return [...Array(length)].map(() => c[Math.floor(Math.random() * c.length)]).join('');
};
