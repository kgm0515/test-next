/*
 * @Description:
 * @Version: 2.0
 * @Autor: 匡光淼
 * @Date: 2022-07-26 07:33:14
 * @LastEditors: 匡光淼
 * @LastEditTime: 2022-07-26 07:35:47
 */
import Link from 'next/link'
import { Fragment } from 'react'
import Logo from './logo'
export default function MainNavigation() {
  return (
    <Fragment>
      <header className="common-header">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <nav>
          <ul>
            <li>
              <Link href="/posts">
                <a>Posts</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <style jsx>{`
        .common-header {
          width: 100%;
          height: 6rem;
          background-color: var(--color-grey-900);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10%;
        }
        .common-header ul {
          list-style: none;
          display: flex;
          align-items: baseline;
          margin: 0;
          padding: 0;
        }
        .common-header li {
          margin: 0 var(--size-4);
        }
        .common-header a {
          color: var(--color-grey-100);
          font-size: var(--size-4);
        }
        .common-header a:hover,
        .common-header a:active,
        .common-header a.active {
          color: var(--color-grey-200);
        }
        @media (min-width: 768px) {
          .common-header ul {
            gap: 0.5rem;
          }
          .common-header a {
            font-size: var(--size-5);
          }
        }
      `}</style>
    </Fragment>
  )
}
