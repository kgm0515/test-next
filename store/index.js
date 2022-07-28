/*
 * @Description:
 * @Version: 2.0
 * @Autor: 匡光淼
 * @Date: 2022-07-25 16:30:39
 * @LastEditors: 匡光淼
 * @LastEditTime: 2022-07-25 17:17:45
 */
import { createContext, useContext } from 'react'
import useNotify from './notifiy'

export const StoreContext = createContext()

export function StoreProvider(props) {
  const notify = useNotify()
  const storeValue = { notify }

  return <StoreContext.Provider value={storeValue}>{props.children}</StoreContext.Provider>
}

const useStore = (attrName) => {
  const store = useContext(StoreContext)
  return attrName ? store[attrName] : store
}

export default useStore
