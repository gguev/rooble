import Innertube from 'youtubei.js'

// ADD ERROR HANDLING
export default async function getVideos(query: string) {
  const youtube = await Innertube.create({ gl: 'US' })
  const search = await youtube.search(query, { client: 'YOUTUBE' })
  const videos = search.results || []

  return {
    query,
    videos: JSON.parse(JSON.stringify(videos)),
  }
}
