/* eslint-disable @typescript-eslint/no-explicit-any */
import { VercelRequest, VercelResponse } from '@vercel/node'
import Airtable from 'airtable'

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<void> => {
  // Only GET supported
  if (req.method !== 'GET') {
    res.status(501).send('Not implemented')
    return
  }

  const apiToken = process.env.AIRTABLE_API_KEY
  if (!apiToken) {
    res.status(500).send('Airtable API key not found in env.')
    return
  }

  const table = new Airtable({ apiKey: apiToken }).base('appkn1DkvgVI5jpME')(
    'Projects'
  )

  try {
    const records = await table.select({ view: 'Grid view' }).all()
    const sanitize = (obj: any) => {
      const out: any = {}
      for (const key of whitelistedProps) {
        out[key] = obj[key]
      }
      return out
    }
    const out = JSON.stringify(
      records.map((p) => sanitize(p.fields)),
      null,
      2
    )
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(out)
  } catch (e) {
    res.status(500).send(`Sorry, this didn’t work, pull requests welcome :)`)
  }
}

const whitelistedProps = [
  'csName',
  'csSlug',
  'enName',
  'enSlug',
  'csTagline',
  'enTagline',
  'logoUrl',
  'coverUrl',
  'csDescription',
  'enDescription',
  'csContributeText',
  'enContributeText',
  'url',
  'trelloUrl',
  'slackChannelUrl',
  'githubUrl',
  'slackChannelName',
]
