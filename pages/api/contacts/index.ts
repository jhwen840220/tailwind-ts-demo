import fetch from 'node-fetch';

export default async function handler(req, res) {
  const {
    method,
    body,
    headers: { authorization },
  } = req;
  if (method === 'GET') {
    const response = await fetch(`http://localhost:3333/contacts`);
    const data = await response.json();
    res.json(data);
  }

  if (method === 'POST') {
    const response = await fetch(`http://localhost:3333/contacts`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
    });
    const data = await response.json();

    res.status(data.statusCode).json(data);
  }
}
