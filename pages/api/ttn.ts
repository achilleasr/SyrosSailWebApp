import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        console.log(req.body);
        res.status(200).json({ message: 'Success' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}

export default handler;