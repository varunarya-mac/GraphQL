import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from './db/dao/users.js';

const secret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

export const authMiddleware = expressjwt({
  algorithms: ['HS256'],
  credentialsRequired: false,
  secret,
});

export async function handleLogin(req, res) {
  const { email, password } = req.body;
  
  const user = await getUserByEmail(email);

  if (!user || user[0].password !== password) {
    res.sendStatus(401);
  } else {
    const claims = { sub: user[0].id, email: user[0].email };
    const token = jwt.sign(claims, secret);
    res.json({ token });  
  }
}
