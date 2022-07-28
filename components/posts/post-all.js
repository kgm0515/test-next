/*
 * @Description:
 * @Version: 2.0
 * @Autor: 匡光淼
 * @Date: 2022-07-26 07:40:58
 * @LastEditors: 匡光淼
 * @LastEditTime: 2022-07-26 08:25:12
 */
import { Fragment } from 'react'
import PostGrid from './post-grid'

export default function PostAll(props) {
  return (
    <Fragment>
      <section className="post-all">
        <h1>All Posts</h1>
        <PostGrid posts={props.posts} />
      </section>
      <style jsx>{`
        .post-all {
          width: 90%;
          max-width: 60rem;
          margin: var(--size-8) auto;
        }
        .post-all h1 {
          font-size: var(--size-8);
          color: var(--color-grey-800);
          text-align: center;
        }
        @media (min-width: 768px) {
          .post-all h1 {
            font-size: var(--size-16);
          }
        }
      `}</style>
    </Fragment>
  )
}
