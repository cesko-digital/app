import { NowRequest, NowResponse } from '@vercel/node'
import fetch from 'node-fetch'

const API_KEY = process.env.ECOMAIL_API_KEY || ''
const API_URL = 'https://api2.ecomailapp.cz/lists/2/subscribe'

export default async (request: NowRequest, response: NowResponse) => {
  const body = request.body

  if (!body || !body.email) {
    response.status(404).send('Email is missing')
    return
  }

  const data = JSON.stringify({
    subscriber_data: {
      email: body.email,
      tags: ['web-subscribe-form'],
    },
  })

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: data,
      headers: {
        key: API_KEY,
        'Content-Type': 'application/json',
      },
    })

    // error from ecomail
    if (!res.ok) {
      const resData = await res.json()
      response.status(500).json({ error: resData.message })
      console.error('[HTTP ERROR]', resData.message)
      return
    }

    // ok
    response.json({
      message: 'User subscription was successfull',
    })
  } catch (error) {
    // network error
    response.status(500).json({ error: 'Unexpected error' })
    console.error(error)
  }
}
