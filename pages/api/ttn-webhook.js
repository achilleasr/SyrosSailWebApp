export default async (req, res) => {
  if (req.method === 'POST') {
      console.log(req.body);
      res.status(200).json({ success: true });
  } else {
      res.status(405).end();
  }
}