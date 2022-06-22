import Head from "next/head"
import { APP_NAME } from "stores/game/constants"

const MetaData = () => {
    return (
      <>
        <Head key="unique">
            
            {/* <!-- HTML Meta Tags --> */}
            <title>{APP_NAME} - A daily word game</title>
            <meta name="description" content="Guess the hidden word in 6 tries. A new puzzle is availableeach day." />

            {/* <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content="https://wordlether.vercel.app/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Wordle - A daily word game" />
            <meta property="og:description" content="Guess the hidden word in 6 tries. A new puzzle isavailable each day." />
            <meta property="og:image" content="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Wordle_196_example.svg/1200px-Wordle_196_example.svg.png" />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="https://wordlether.vercel.app/" />
            <meta property="twitter:url" content="https://wordlether.vercel.app/" />
            <meta name="twitter:title" content="Wordle - A daily word game" />
            <meta name="twitter:description" content="Guess the hidden word in 6 tries. A new puzzle isavailable each day." />
            <meta name="twitter:image" content="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Wordle_196_example.svg/1200px-Wordle_196_example.svg.png" />      
        </Head>
    </>
  )
}

export default MetaData