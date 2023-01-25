import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).send("Unauthorized");
  }
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
};

export default handler;
