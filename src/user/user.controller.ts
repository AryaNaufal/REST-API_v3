const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../user/user.service')

router.get('/', async (req: any, res: any) => {
  try {
    const result = await getAllUsers()
    res.status(200).send(result)
  } catch (err: any) {
    res.status(400).send(err.message)
  }
});

router.get('/:id', async (req: any, res: any) => {
  try {
    const userId = req.params.id
    const result = await getUserById(userId)
    res.status(200).send(result)
  } catch (err: any) {
    res.status(400).send(err.message)
  }
});

router.post('/add', async (req: any, res: any) => {
  try {
    const result = await createUser(req.body)
    res.status(200).send(result)
  } catch (err: any) {
    res.status(400).send(err.message)
  }
})

router.put('/update/:id', async (req: any, res: any) => {
  const userId = req.params.id
  const userData = req.body
  if (!(
    userData.hasOwnProperty('nama') &&
    userData.hasOwnProperty('email') &&
    userData.hasOwnProperty('password')
  )) {
    return res.status(400).send('Invalid user data')
  }
  const result = await updateUser(userId, userData)
  res.status(200).send(result)
})

router.patch('/update/:id', async (req: any, res: any) => {
  try {
    const userId = req.params.id
    const userData = req.body
    const result = await updateUser(userId, userData)
    res.status(200).send(result)
  } catch (err: any) {
    res.status(400).send(err.message)
  }
})

router.delete('/delete/:id', async (req: any, res: any) => {
  try {
    const userId = req.params.id
    await deleteUser(userId)
    res.status(200).send('User deleted successfully')
  } catch (err: any) {
    res.status(400).send(err.message)
  }
})

module.exports = router;