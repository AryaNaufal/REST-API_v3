import prisma from '../db/index';
const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../user/user.service')

router.get('/', async (req: any, res: any) => {
  const result = await getAllUsers()
  res.send(result)
});

router.get('/:id', async (req: any, res: any) => {
  try {
    const id = req.params.id
    const result = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    res.status(200).send(result)
  } catch {
    res.status(500).send('error')
  }
});

router.post('/add', async (req: any, res: any) => {
  try {
    const { nama, email, password } = req.body
    const result = await prisma.user.create({
      data: {
        nama: nama,
        email: email,
        password: password
      }
    })
    res.status(200).send(result)
  } catch {
    res.status(500).send('error')
  }
})

router.put('/update', async (req: any, res: any) => {
  try {
    const { id, nama, email, password } = req.body
    const result = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        nama: nama,
        email: email,
        password: password
      }
    })
    res.status(200).send(result)
  } catch {
    res.status(500).send('error')
  }
})

router.delete('/delete/:id', async (req: any, res: any) => {
  try {
    const id = req.params.id
    const result = await prisma.user.delete({
      where: {
        id: id
      }
    })
    res.status(200).send(result)
  } catch {
    res.status(500).send('error')
  }
})

module.exports = router;