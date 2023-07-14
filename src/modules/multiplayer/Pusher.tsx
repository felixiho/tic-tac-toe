

import Pusher from 'pusher-js/types/src/core/pusher'
import {createContext} from 'react'

export type PusherContextType =  {
  pusher: Pusher
  code: string
  setCode: (code: string) => void
  startName: string
  setStartName: (name: string) => void
  joinName: string
  setJoinName: (name: string) => void
}
export const PusherContext =  createContext<null |PusherContextType>(null)