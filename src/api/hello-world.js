export default async function handler(req, res) {
  if (req.method === `POST`) {
    const body = JSON.parse(req.body)
    res.status(200).send("Hello World")
    return
  }

  res.status(200).send("Hello World")
}