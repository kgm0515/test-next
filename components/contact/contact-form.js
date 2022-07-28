import { Fragment, useState, useEffect } from 'react'
import Notification from '../ui/notification'

// 发送请求
async function sendContactData(contactDetail) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactDetail)
  })
  console.log(response, '-----')
  const data = response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }
}

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredName, setEnteredName] = useState('')
  const [enteredMessage, setEnteredMessage] = useState('')
  const [requestStatus, setRequestStatus] = useState() // pending|success|error
  const [requestError, setRequestError] = useState()

  useEffect(() => {
    if (['success', 'error'].includes(requestStatus)) {
      const timer = setTimeout(() => {
        setRequestStatus(null)
        setRequestError(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [requestStatus])

  // 提交表单
  async function sendMessageHandler(event) {
    event.preventDefault()
    setRequestStatus('pending')
    try {
      await sendContactData({ email: enteredEmail, name: enteredName, message: enteredMessage })
      setRequestStatus('success')
      setEnteredEmail('')
      setEnteredName('')
      setEnteredMessage('')
    } catch (error) {
      setRequestError(error.message)
      setRequestStatus('error')
    }
  }

  let notification
  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'You message is on its way'
    }
  } else if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success...',
      message: 'Message sent successfully'
    }
  } else if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error...',
      message: requestError
    }
  }

  return (
    <Fragment>
      <section className="contact-wrap">
        <h2>How can I help you?</h2>
        <form className="contact__form" onSubmit={sendMessageHandler}>
          <div className="contact__controls">
            <div className="contact__control">
              <label htmlFor="email">You Email</label>
              <input type="email" id="email" required value={enteredEmail} onChange={(e) => setEnteredEmail(e.target.value)} />
            </div>
            <div className="contact__control">
              <label htmlFor="name">You Name</label>
              <input type="text" id="name" required value={enteredName} onChange={(e) => setEnteredName(e.target.value)} />
            </div>
          </div>
          <div className="contact__control">
            <label htmlFor="message">You Message</label>
            <textarea id="message" required rows={5} value={enteredMessage} onChange={(e) => setEnteredMessage(e.target.value)} />
          </div>
          <div className="contact__actions">
            <button>Send Message</button>
          </div>
        </form>
        {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      </section>
      <style jsx>{`
        .contact-wrap {
          margin: var(--size-8) auto;
          border-radius: 6px;
          background-color: var(--color-grey-100);
          width: 90%;
          max-width: 50rem;
          padding: var(--size-4);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          font-size: var(--size-6);
        }
        .contact-wrap h1 {
          font-size: var(--size-8);
          margin: var(--size-4) 0;
          text-align: left;
        }
        .contact__form label {
          display: block;
          font-family: 'Oswald', sans-serif;
          font-weight: bold;
          margin: var(--size-2) 0 var(--size-1) 0;
        }
        .contact__form input,
        .contact__form textarea {
          font: inherit;
          padding: var(--size-1);
          border-radius: 4px;
          width: 100%;
          border: 1px solid var(--color-grey-400);
          background-color: var(--color-grey-50);
          resize: none;
        }
        .contact__controls {
          display: flex;
          column-gap: 1rem;
          flex-wrap: wrap;
        }
        .contact__control {
          flex: 1;
          min-width: 10rem;
        }
        .contact__actions {
          margin-top: var(--size-4);
          text-align: right;
        }
        .contact__form button {
          font: inherit;
          cursor: pointer;
          background-color: var(--color-primary-700);
          border: 1px solid var(--color-primary-700);
          padding: var(--size-2) var(--size-4);
          border-radius: 4px;
          color: var(--color-primary-50);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }
        .contact__form button:hover {
          background-color: var(--color-primary-500);
          border-color: var(--color-primary-500);
        }
        @media (min-width: 768px) {
          .contact-wrap h1 {
            font-size: var(--size-16);
            text-align: center;
          }
        }
      `}</style>
    </Fragment>
  )
}
