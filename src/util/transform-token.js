import jwt from 'jsonwebtoken';

export default token => {
  return jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) return false;
    return decoded;
  });
};
