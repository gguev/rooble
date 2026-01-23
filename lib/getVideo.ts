import Innertube from 'youtubei.js'

// ADD ERROR HANDLING
export default async function getVideo(id: string) {
  const youtube = await Innertube.create({ gl: 'US' })
  const video = await youtube.getBasicInfo(id)

  return JSON.parse(JSON.stringify(video))
}
