import Head from 'next/head'
import Link from 'next/link'
import { GetServerSidePropsContext, NextPage } from 'next/types'
import { Footer } from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import getVideos from '../lib/getVideos'

const ResultsPage: NextPage = (props: any) => {
  const { query, videos } = props.results

  return (
    <div>
      <Head>
        <title>{`Results for "${query}" - Rooble`}</title>

        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </Head>

      <Header />

      <div className="px-52 mt-8">
        <h1 className="text-5xl text-white mb-8">{`Results for "${query}"`}</h1>
        {videos && videos.length > 0 ? (
          videos.map((video: any, index: number) => {
            const videoId = video.id || video.video_id
            const title = video.title?.text || video.title || 'Untitled'
            const channelName =
              video.channel?.name?.text ||
              video.channel?.name ||
              video.author?.name?.text ||
              video.author?.name ||
              'Unknown Channel'
            const published =
              video.metadata?.published?.text ||
              video.metadata?.published ||
              video.published?.text ||
              video.published ||
              'Unknown date'

            return (
              <div className="py-6" key={videoId || `video-${index}`}>
                <h1 className="text-4xl pb-3 text-blue-400 hover:text-blue-600 hover:underline">
                  <Link
                    href={`/watch?v=${videoId}`}
                  >
                    {title}
                  </Link>
                </h1>
                <h1>
                  {channelName} - {published}
                </h1>
              </div>
            )
          })
        ) : (
          <p className="text-white">No videos found</p>
        )}
      </div>
      <Footer />
    </div>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { search: query } = ctx.query

  const res = await getVideos(query as string)

  return {
    props: {
      results: {
        query,
        videos: res.videos,
      },
    },
  }
}

export default ResultsPage
