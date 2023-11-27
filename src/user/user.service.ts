import prisma from '../db/index';

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  if (!users) {
    throw Error('Users not found')
  }
  return users;
}

const getUserById = async (id: any) => {
  const users = await prisma.user.findUnique({
    where: {
      id: id
    }
  })
  if (id !== users?.id) {
    throw Error('User not found')
  }
  return users
}

const createUser = async (newUserData: any) => {
  const { nama, email, password } = newUserData
  const users = await prisma.user.create({
    data: {
      nama: nama,
      email: email,
      password: password
    }
  })
  if (!users) {
    throw Error('User not created')
  }
  return users
}

const updateUser = async (id: any, updateUser: any) => {
  await getUserById(id)
  const users = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      nama: updateUser.nama,
      email: updateUser.email,
      password: updateUser.password
    }
  })

  return users
}

const deleteUser = async (id: any) => {
  await getUserById(id)
  await prisma.user.delete({
    where: {
      id: id
    }
  })
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser }