import { NowRequest, NowResponse } from '@vercel/node'
import fetch from 'node-fetch'

const API_KEY = process.env.ECOMAIL_API_KEY || ''
const API_URL = 'https://api2.ecomailapp.cz/lists/2/subscribe'

const MISSING_EMAIL_ERROR = 'Email is required parameter'
const UNEXPECTED_ERROR = 'Unexpected error'
const SUBSCRIPTION_SUCCESS = 'User subscription was successful'

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  const { body } = request

  if (!body || !body.email) {
    response.status(404).send(MISSING_EMAIL_ERROR)
    return
  }

  const subscriptionData = JSON.stringify({
    subscriber_data: {
      email: body.email,
      tags: ['web-subscribe-form'],
    },
  })

  try {
    const ecoMailResponse = await fetch(API_URL, {
      method: 'POST',
      body: subscriptionData,
      headers: {
        key: API_KEY,
        'Content-Type': 'application/json',
      },
    })

    if (!ecoMailResponse.ok) {
      const resData = await ecoMailResponse.json()
      response.status(500).json({ error: resData.message })
      return
    }

    response.json({
      message: SUBSCRIPTION_SUCCESS,
    })
  } catch (error) {
    response.status(500).json({ error: UNEXPECTED_ERROR })
  }
}
