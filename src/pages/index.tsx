import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [bikes, setBikes] = useState([])

  useEffect(() => {
    fetch('/api/response')
    .then(response => response.json())
    .then((data) => setBikes(data.models))
  }, []);

  return (
    <>
      <Head>
        <title>AutoPricer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        {bikes.map((bikes, i) => (
          <p key={bikes + i}>{bikes}</p>
        ))}
      </main>
    </>
  )
}