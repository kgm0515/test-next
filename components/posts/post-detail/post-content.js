/*
 * @Description:
 * @Version: 2.0
 * @Autor: 匡光淼
 * @Date: 2022-07-26 08:28:30
 * @LastEditors: 匡光淼
 * @LastEditTime: 2022-07-27 09:12:40
 */
import { Fragment } from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
// import rehypeRaw from 'rehype-raw'
import Postheader from './post-header'

export default function PostContent(props) {
  const { post } = props
  const imagePath = `/images/posts/${post.slug}/${post.image}`

  // 自定义组件
  const customComponents = {
    p: (pRaw) => {
      const { node } = pRaw
      if (node.children[0].tagName === 'img') {
        const imgRaw = pRaw.children[0]
        return (
          <div className="image">
            <Image src={`/images/posts/${post.slug}/${imgRaw.props.src}`} alt={imgRaw.props.alt} width={600} height={300} />
          </div>
        )
      }
      return <p>{pRaw.children}</p>
    }
  }

  return (
    <Fragment>
      <article className="post-content">
        <Postheader title={post.title} image={imagePath} />
        {/* <ReactMarkdown components={customComponents} rehypePlugins={[rehypeRaw]}> */}
        <ReactMarkdown components={customComponents}>{post.content}</ReactMarkdown>
      </article>
      <style jsx>{`
        .post-content {
          width: 95%;
          max-width: 60rem;
          margin: var(--size-8) auto;
          font-size: var(--size-5);
          line-height: var(--size-8);
          background-color: var(--color-grey-100);
          border-radius: 6px;
          padding: var(--size-4);
        }
        .post-content p {
          color: var(--color-grey-800);
        }
        .post-content .image {
          margin: var(--size-4) auto;
          width: 100%;
          max-width: 600px;
        }
        @media (min-width: 768px) {
          .post-content {
            padding: var(--size-8);
          }
        }
      `}</style>
    </Fragment>
  )
}
