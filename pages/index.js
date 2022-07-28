/*
 * @Description:
 * @Version: 2.0
 * @Autor: 匡光淼
 * @Date: 2022-07-19 08:06:23
 * @LastEditors: 匡光淼
 * @LastEditTime: 2022-07-28 08:48:36
 */
import Head from 'next/head'
import { Fragment } from 'react'
import Hero from '../components/home-page/hero'
import FeaturedPosts from '../components/home-page/featured-posts'
import { getFeaturedPosts } from '../lib/posts-util'

export default function HomePage(props) {
  const { posts } = props
  return (
    <Fragment>
      <Head>
        <title>Kgm&apos; Blog</title>
        <meta name="description" content="I post about programming and web development" />
      </Head>
      <div className="home-page">
        <Hero />
        <FeaturedPosts posts={posts} />
      </div>
    </Fragment>
  )
}

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts()
  return {
    props: {
      posts: featuredPosts
    }
  }
}
