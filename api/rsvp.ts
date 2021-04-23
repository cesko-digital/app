import { VercelRequest, VercelResponse } from '@vercel/node'
import Airtable from 'airtable'

interface Event {
  Name: string | undefined
  Attendees: string[] | undefined
  Emails: string | undefined
}

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<void> => {
  // Only GET or POST supported
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(501).send('Not implemented')
    return
  }

  const apiToken = process.env.RSVP_API_KEY
  if (!apiToken) {
    res.status(500).send('Airtable API key not found in env.')
    return
  }

  const table = new Airtable({ apiKey: apiToken }).base('apppZX1QC3fl1RTBM')(
    'RSVP'
  )

  // GET: return event details
  if (req.method === 'GET') {
    const eventId = req.query.eventId
    if (!eventId || Array.isArray(eventId)) {
      res.status(400).send("Required 'eventId' argument missing.")
      return
    }
    const event = (await table.find(eventId)) as Airtable.Record<Event>
    const fields = {
      name: event.fields.Name,
    }
    // We don’t use res.json() here intentionally to get pretty printing
    const out = JSON.stringify(fields, null, 2)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(out)
    return
  }

  // POST: Update RSVP
  try {
    const userId = req.body.userId
    if (!userId) {
      res.status(400).send("Required 'userId' argument missing.")
      return
    }
    const eventId = req.body.eventId
    if (!eventId) {
      res.status(400).send("Required 'eventId' argument missing.")
      return
    }

    if (validateEmail(userId)) {
      // Insert email into database
      const event = (await table.find(eventId)) as Airtable.Record<Event>
      const emails = (event.fields['Emails'] || '').split('|')
      if (!emails.includes(userId)) {
        await table.update(eventId, {
          Emails: emails.concat([userId]).join('|'),
        })
      }
    } else {
      // Insert userId into atendees

      // TBD: Is this a race condition? It probably is:
      // https://community.airtable.com/t/append-linked-record-using-api/39420
      // Would the window for trouble be smaller if we wrote to the User database
      // instead of events?
      const event = (await table.find(eventId)) as Airtable.Record<Event>
      const attendees = event.fields['Attendees'] || []
      if (!attendees.includes(userId)) {
        await table.update(eventId, {
          Attendees: attendees.concat([userId]),
        })
      }
    }
    res.status(200).send('Díky, budeme se těšit!')
  } catch (e) {
    // TBD: Remove error logging before production deployment
    res.status(500).send(`Error: ${e}`)
  }
}

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
