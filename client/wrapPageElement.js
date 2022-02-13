import React from "react"
import { LazyMotion, domMax } from "framer-motion"
import { SessionProvider } from "./src/context/session-context"

export const wrapPageElement = ({ element, props }) => {
  return (
    <LazyMotion strict features={domMax}>
      <SessionProvider>{element}</SessionProvider>
    </LazyMotion>
  )
}
