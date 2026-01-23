import { get } from 'http'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import 'plyr-react/plyr.css'
import Header from '../components/Header/Header'
import getVideo from '../lib/getVideo'

const Plyr = dynamic(() => import('plyr-react').then((mod) => mod.default), {
  ssr: false,
})

const WatchPage = (props: { videoID: string; title: string }) => {
  const { videoID, title } = props

  return (
    <div>
      <Head>
        <title>{title} - Rooble</title>

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

      <div className="px-52 mt-2 mb-3">
        <div className="rounded-lg overflow-hidden">
          <Plyr
            source={{
              type: 'video',
              sources: [{ src: videoID, provider: 'youtube' }],
            }}
          />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx: { query: { v: any } }) {
  const { v: videoID } = ctx.query

  const vid = await getVideo(videoID)

  return {
    props: {
      videoID,
      title: vid.basic_info.title,
    },
  }
}

export default WatchPage
