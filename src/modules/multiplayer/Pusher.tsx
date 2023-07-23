

import { Channel } from 'pusher-js'
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
  channel: Channel | undefined
  setChannel: (channel: Channel) => void
  joinId: number
  startId: number
  setStartId: (id: number) => void
  setJoinId: (id: number) => void
  userId: number
  setUserId: (id: number) => void
}
export const PusherContext =  createContext<null |PusherContextType>(null)