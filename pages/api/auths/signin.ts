import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { body } = req;
  const response = await fetch(`http://localhost:3333/auths/signin`, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  res.json(data);
}
