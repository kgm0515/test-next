/*
 * @Description:
 * @Version: 2.0
 * @Autor: 匡光淼
 * @Date: 2022-07-26 07:33:15
 * @LastEditors: 匡光淼
 * @LastEditTime: 2022-07-28 08:49:58
 */
import Head from 'next/head'
import { Fragment } from 'react'
import PostContent from '../../components/posts/post-detail/post-content'
import { getPostData, getPostsFiles } from '../../lib/posts-util'

export default function PostDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const { params } = context
  const { slug } = params
  const postData = getPostData(slug)
  return {
    props: { post: postData },
    revalidate: 600
  }
}

export async function getStaticPaths() {
  const list = getPostsFiles()
  const paths = list.map((slug) => {
    return { params: { slug: slug.replace(/\.md$/, '') } }
  })
  return {
    paths,
    fallback: false
  }
}
