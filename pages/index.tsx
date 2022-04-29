import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header'
import Section from '../components/body/section'
import Footer from '../components/footer'
import Section2 from '../components/body/section2'
import Tabs from '../components/tabs'
import Tabs2 from '../components/tabs2'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>NFT Marketplace</title>
        <meta name="description" content="This is a test assessment for Capsule Corp Labs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Section />
      <Section2 />
      <Tabs />
      <Tabs2 collection="ape" />
      <Tabs2 collection="god" />
      <Footer />
    </div>
  )
}

export default Home
