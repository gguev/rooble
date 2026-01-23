import Link from 'next/link'

export function Footer() {
  return (
    <footer className="flex h-24 w-full items-center justify-evenly">
      <p> Copyright &copy; 2022. Guillermo Guevara</p>
      <div className="flex">
        <Link
          href={'mailto: gguev_@outlook.com'}
          className="flex text-blue-400 hover:text-blue-600 hover:underline"
        >
          Contact
        </Link>
        <div className="mx-3">&middot;</div>
        <Link
          href={'/about'}
          className="flex text-blue-400 hover:text-blue-600 hover:underline"
        >
          About
        </Link>
        <div className="mx-3">&middot;</div>
        <Link
          href={'/features'}
          className="flex text-blue-400 hover:text-blue-600 hover:underline"
        >
          Features
        </Link>
      </div>
      <p>Watch videos without the clutter</p>
    </footer>
  )
}
