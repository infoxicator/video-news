import React from "react"
import { LazyMotion, domMax } from "framer-motion"


export const wrapPageElement = ({ element, props }) => {
  return (
    <LazyMotion strict features={domMax}>
            {element}
    </LazyMotion>
  )
}
