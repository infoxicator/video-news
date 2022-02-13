import { navigate } from "gatsby"
import React, { useCallback, useContext } from "react"

const SessionContext = React.createContext()

export const SessionProvider = ({ loginRequired, ...props }) => {
  const [draftSubmission, setDraftSubmission] = React.useState({})

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
    console.log(response)
    const data = await response.json()
    console.log(data)
    setDraftSubmission(data)
    navigate("/draft")
  }

  return (
    <SessionContext.Provider
      value={{
        draftSubmission,
        setDraftSubmission,
        resetDraft,
        fireAITask,
      }}
      {...props}
    />
  )
}

export const useSessions = () => useContext(SessionContext)

export default SessionContext
