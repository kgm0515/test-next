/*
 * @Description:
 * @Version: 2.0
 * @Autor: 匡光淼
 * @Date: 2022-07-25 16:43:46
 * @LastEditors: 匡光淼
 * @LastEditTime: 2022-07-25 21:00:54
 */
import { useState } from 'react'

/**
 * 通知消息
 * @returns
 */
export default function useNotify() {
  const [notify, setNotify] = useState()
  // 隐藏通知
  const hideNotify = () => {
    setNotify(null)
  }
  /**
   * 显示通知
   * @param {*} param0
   * {
   *  title<String>: 标题
   *  message<String>: 消息
   *  status<String: 'info|success|warning|error|loading'>: 状态
   *  duration<Number>: 持续时间
   * }
   */
  const showNotify = ({ title = '', message = '', status = '', duration = 1500 }) => {
    setNotify({ title, message, status, duration })
  }
  const info = (message = 'info', duration) => {
    showNotify({ title: '', message, status: 'info', duration })
  }
  const success = (message = 'success', duration) => {
    showNotify({ title: '', message, status: 'success', duration })
  }
  const warning = (message = 'warning', duration) => {
    showNotify({ title: '', message, status: 'warning', duration })
  }
  const error = (message = 'error', duration) => {
    showNotify({ title: '', message, status: 'error', duration })
  }
  const loading = (message = 'loading...', duration = 1000 * 60 * 60) => {
    showNotify({ title: '', message, status: 'loading', duration })
  }
  return {
    notify,
    hideNotify,
    showNotify,
    info,
    success,
    warning,
    error,
    loading
  }
}
