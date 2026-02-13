import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: 'vX'})
const EVENT_QUERY = `*[
    _type == "event" 
    && defined(headline) 
    && defined(venue) 
    && !defined(details)]{
      _id, 
      headline->{ name }, 
      venue->{ name }
}`

type EventDocument = {
  _id: string
  headline: {name: string}
  venue: {name: string}
}

async function run() {
  const events = await client.fetch<EventDocument[]>(EVENT_QUERY)

  for (const event of events) {
    try {
      console.log('Processing:', event._id)

      const res = await client.agent.action.generate({
        schemaId: '_.schemas.default',
        documentId: event._id,
        instruction:
          'Create a short description of what attendees can expect when they come to this event. The headline artist is "$headline" and the venue is "$venue".',
        instructionParams: {
          headline: event.headline?.name,
          venue: event.venue?.name,
        },
        target: [{ path: ['details'] }],
      })

      console.log(
        `Wrote description for ${event._id}:`,
        res.details?.[0]?.children?.[0]?.text
      )
    } catch (err) {
      console.error(`Error processing ${event._id}:`, err)
    }
  }
}


run()