import prisma from '../db/index';

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
}

module.exports = { getAllUsers }