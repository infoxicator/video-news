import { navigate } from "gatsby"
import React, { useCallback, useContext } from "react"

const SessionContext = React.createContext()

export const SessionProvider = ({ loginRequired, ...props }) => {
  
    const [draftSubmission, setDraftSubmission] = React.useState({})
    const [finalURL, setFinalURL] = React.useState("")

  const resetDraft = useCallback(() => {
    setDraftSubmission({})
  }, [setDraftSubmission])

  const fireAITask = async url => {
    const response = await fetch("https://news-api.onrender.com/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleUrl: url,
      }),
    })
    const data = await response.json()
    setDraftSubmission(data)
    navigate("/draft")
  }

  const fireVideoTask = async () => {
    const response = await fetch("https://video-news.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...draftSubmission
      }),
    })
    const data = await response.json()
    setFinalURL(data.url)
    navigate("/review")
  }

  return (
    <SessionContext.Provider
      value={{
        draftSubmission,
        setDraftSubmission,
        resetDraft,
        fireAITask,
        fireVideoTask,
        finalURL
      }}
      {...props}
    />
  )
}

export const useSessions = () => useContext(SessionContext)

export default SessionContext