import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

  const authHeader = req.headers["authorization"]; // "Bearer xyz"
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1]; // extract token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    // THE MAIN POINT:
    req.user = decoded;  // decoded contains userId

    next();
  });
};
