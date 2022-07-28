/*
 * @Description:
 * @Version: 2.0
 * @Autor: 匡光淼
 * @Date: 2022-07-26 07:33:14
 * @LastEditors: 匡光淼
 * @LastEditTime: 2022-07-28 08:54:52
 */
import { Fragment } from 'react'
import ReactDOM from 'react-dom'

function Notification(props) {
  const { title, message, status } = props

  let statusClasses = ''

  if (status === 'success') {
    statusClasses = 'success'
  } else if (status === 'error') {
    statusClasses = 'error'
  }

  return ReactDOM.createPortal(
    <div className={`notificatio ${statusClasses ? ' ' + statusClasses : ''}`}>
      <h2>{title}</h2>
      <p>{message}</p>
      <style jsx>{`
        .notification {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--color-grey-100);
          background-color: var(--color-grey-800);
          padding: 0 var(--size-8);
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
          position: fixed;
          height: 5rem;
          bottom: 0;
          width: 100%;
          left: 0;
          border-top-right-radius: 0;
          border-top-left-radius: 0;
        }
        .notification h2 {
          font-size: var(--size-6);
          margin: 0;
        }
        .notification p {
          margin: 0;
        }
        .success {
          background-color: var(--color-success-500);
          color: var(--color-grey-800);
        }
        .error {
          background-color: var(--color-error-500);
        }
        @media (min-width: 768px) {
          .notification {
            width: 40rem;
            left: calc(50% - 20rem);
            border-top-right-radius: 6px;
            border-top-left-radius: 6px;
          }
        }
      `}</style>
    </div>,
    document.getElementById('notifications')
  )
}

export default Notification
