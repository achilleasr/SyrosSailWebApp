export default async (req,res) => {
  // handle the TTN webhook here
  // you can access the webhook data in the `req.body` object
  console.log(req.body);

  // const body2 = (await buffer(req)).toString();
  // const data = JSON.parse(body2);

  // console.log(data);

  // send a response to TTN to acknowledge receipt of the webhook
  res.status(200).send('Webhook received');
}