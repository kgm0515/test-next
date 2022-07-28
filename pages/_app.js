/*
 * @Description:
 * @Version: 2.0
 * @Autor: 匡光淼
 * @Date: 2022-07-19 08:06:23
 * @LastEditors: 匡光淼
 * @LastEditTime: 2022-07-28 19:44:10
 */
import Head from 'next/head'
import { Fragment } from 'react'
import Layout from '../components/layout/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Next App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  )
}

export default MyApp
