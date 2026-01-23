import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Footer } from '../components/Footer/Footer'

const Home: NextPage = (props: any) => {
  const { exampleVideo } = props
  const [isFocused, setIsFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleOnFocus = () => {
    setIsFocused(true)
  }

  const handleOnBlur = () => {
    setIsFocused(false)
  }

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      return
    }

    if (searchQuery.includes('youtube.com')) {
      let splitURL = searchQuery.split('com')
      let vidURL = splitURL[1]
      const videoID = vidURL.includes('v=')
        ? vidURL.split('v=')[1].split('&')[0]
        : vidURL.split('/').pop()

      router.push(`/watch?v=${videoID}`)
      return
    }

    if (searchQuery.includes('youtu.be')) {
      let splitURL = searchQuery.split('be/')
      let vidURL = splitURL[1]
      const videoID = vidURL.split('?')[0]

      router.push(`/watch?v=${videoID}`)
      return
    }

    if (searchQuery.includes('twitch.tv')) {
      let splitURL = searchQuery.split('tv')
      let vidURL = splitURL[1]

      router.push(vidURL)
      return
    }

    if (searchQuery.includes('twitch.tv/videos')) {
      let splitURL = searchQuery.split('videos/')
      let vidURL = splitURL[1]

      router.push(`/videos/${vidURL}`)
      return
    }

    router.push('/results?search=' + searchQuery)
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 mt-24">
      <Head>
        <title>Rooble - Watch Videos Without Distractions</title>

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

      <main className="flex w-full flex-col items-center justify-center text-center mt-16">
        <h1 className="text-8xl font-semibold text-white">
          <Link href="/">Rooble</Link>
        </h1>
        <p className="mt-3">
          Watch videos and livestreams without distractions
        </p>

        <form action="" onSubmit={handleOnSubmit}>
          <div className="flex mt-12 mb-16">
            <div
              className={`flex items-center rounded-lg ${isFocused ? 'ring-2 ring-blue-500' : ''}`}
            >
              <input
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                type="text"
                placeholder="Search Videos or Enter URL"
                className="bg-neutral text-xl rounded-l-lg focus:outline-none px-4 h-12 border border-r-0 border-neutral"
                style={{ width: '800px' }}
              />
              <button className="bg-neutral border border-neutral rounded-r-lg px-4 h-12 hover:bg-neutral/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>

        <Link
          href={exampleVideo}
          className="flex pb-52 text-blue-400 hover:text-blue-600 hover:underline"
        >
          Example Video
        </Link>

        <Footer />
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const videoURLs = [
    'watch?v=pp2hqA6r-40',
    'watch?v=taFEj_R_b48',
    'watch?v=VUc1n_NK6gU',
    'watch?v=ryAv7ESrJtQ',
  ]

  const exampleVideo = videoURLs[Math.floor(Math.random() * videoURLs.length)]

  return {
    props: {
      exampleVideo: exampleVideo,
    },
  }
}

export default Home
