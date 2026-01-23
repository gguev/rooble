import Link from 'next/link'
import router from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'

function Header() {
  const [isFocused, setIsFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleOnFocus = () => {
    setIsFocused(true)
  }

  const handleOnBlur = () => {
    setIsFocused(false)
  }

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (searchQuery.includes('youtube.com')) {
      let splitURL = searchQuery.split('com')
      let vidURL = splitURL[1]
      const videoID = vidURL.includes('v=')
        ? vidURL.split('v=')[1].split('&')[0]
        : vidURL.split('/').pop()

      router.push(
        `/watch?v=${videoID}`,
      )
      return
    }

    if (searchQuery.includes('youtu.be')) {
      let splitURL = searchQuery.split('be/')
      let vidURL = splitURL[1]
      const videoID = vidURL.split('?')[0]

      router.push(
        `/watch?v=${videoID}`,
      )
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
    <div className="navbar px-52 mt-2">
      <div className="flex-1">
        <Link
          href={'/'}
          className="hover:shadow-white normal-case text-3xl text-white font-normal"
        >
          Rooble
        </Link>
      </div>

      <form action="" onSubmit={handleOnSubmit}>
        <div className="flex-none">
          <div
            className={`flex items-center rounded-lg bg-white ${isFocused ? 'ring-2 ring-blue-500' : ''}`}
          >
            <input
              type="text"
              placeholder="Search or Enter URL"
              style={{ width: '360px' }}
              className="bg-white text-gray-700 rounded-l-lg focus:outline-none px-3 h-8 border border-r-0 border-white"
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />
            <button className="bg-black border border-white rounded-r-lg px-3 h-8 hover:bg-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
    </div>
  )
}

export default Header
