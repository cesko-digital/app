import { VercelRequest, VercelResponse } from '@vercel/node'
import fetch from 'node-fetch'

const API_KEY = process.env.ECOMAIL_API_KEY || ''
const API_URL = 'https://api2.ecomailapp.cz/lists/2/subscribe'

const INVALID_METHOD_ERROR = 'Cannot GET newsletter API, use POST instead'
const MISSING_EMAIL_ERROR = 'Email is required parameter'
const INVALID_EMAIL_ERROR = 'Invalid email'
const UNEXPECTED_ERROR = 'Unexpected error'
const SUBSCRIPTION_SUCCESS = 'User subscription was successful'

export const EMAIL_REGEX = /^\S+@\S+\.\S+$/

export default async (
  request: VercelRequest,
  response: VercelResponse
): Promise<void> => {
  const { body } = request

  if (request.method !== 'POST') {
    response.status(200).json({ message: INVALID_METHOD_ERROR })
    return
  }

  if (!body || !body.email) {
    response.status(400).json({ message: MISSING_EMAIL_ERROR })
    return
  }

  if (!EMAIL_REGEX.test(body.email)) {
    response.status(400).json({ message: INVALID_EMAIL_ERROR })
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
        'key': API_KEY,
        'Content-Type': 'application/json',
      },
    })

    if (!ecoMailResponse.ok) {
      response.status(500).json({ error: UNEXPECTED_ERROR })
      return
    }

    response.json({
      message: SUBSCRIPTION_SUCCESS,
    })
  } catch (error) {
    response.status(500).json({ error: UNEXPECTED_ERROR })
  }
}
