import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "../../lib/serverAuth";

import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (currentPassword === newPassword) {
      throw new Error("Same password. Please use a new one!");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("");
    }

    const storedPassword = await bcrypt.compare(
      currentPassword,
      currentUser.hashedPassword ?? ""
    );

    if (!storedPassword) {
      throw new Error("Password don't match");
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 12);
    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        hashedPassword: newHashedPassword,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
