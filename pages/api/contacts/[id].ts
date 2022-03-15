import fetch from 'node-fetch';

export default async function handler(req, res) {
  const {
    method,
    body,
    headers: { authorization },
    query,
  } = req;

  if (method === 'DELETE') {
    const response = await fetch(`http://localhost:3333/contacts/${query.id}`, {
      method: 'delete',
      headers: {
        Authorization: authorization,
      },
    });
    const data: any = await response.json();
    const statusCode = data.statusCode;
    res.status(statusCode).json(data);
  }
}
