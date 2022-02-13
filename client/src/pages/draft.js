import React, { useState } from "react"
import LoadingSpinner from "../components/LoadingSpinner"
import { useSessions } from "../context/session-context"
import { XCircleIcon, VideoCameraIcon } from "@heroicons/react/solid"

export default function Example() {
  const [loading, setLoading] = useState()
  const { draftSubmission, setDraftSubmission } = useSessions()
  if (loading) {
    return <LoadingSpinner text={loading} />
  }

  const removeImgAtIndex = index => {
    const newSubmission = { ...draftSubmission }
    newSubmission.images.splice(index, 1)
    setDraftSubmission(newSubmission)
  }

  const onTextChange = (e,key) => {
    const newSubmission = { ...draftSubmission }
    newSubmission[key] = e.target.value
    setDraftSubmission(newSubmission)
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <button className="absolute top-0 right-0 m-5 bg-indigo-600 text-white px-1 py-1 rounded text-xl flex items-center space-x-1">
            <VideoCameraIcon className="h-5 w-5"/>
            <p>Create Video</p>
        </button>
      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-3xl font-bold text-indigo-400 decoration-indigo-400 underline underline-offset-4 decoration-wavy decoration-6">Review Draft</h1>
        <div className="grid grid-cols-1 space-y-4">
          <div className="flex flex-col text-white">
            <label className="uppercase text-lg">Title:</label>
            <input className="rounded bg-gray-600 text-2xl px-1 py-1" value={draftSubmission.title} onChange={e => onTextChange(e, "title")}/>
            <label className="uppercase text-lg">Summary:</label>
            <textarea className="rounded bg-gray-600 text-2xl px-1 py-1 h-64" value={draftSubmission.aiSummary.split("\n").join("")}  onChange={e => onTextChange(e, "aiSummary")}/>
          </div>
          <div className="flex flex-wrap ">
            {draftSubmission.images && draftSubmission.images.map((imageSrc, index) => (
              <div className="relative mr-2 mb-2">
                <button
                  className="inline-block absolute top-0 right-0 m-2 z-10"
                  onClick={() => removeImgAtIndex(index)}
                >
                  <XCircleIcon className=" text-red-400 h-6 w-6 hover:scale-105 transform" />
                </button>
                <img
                  src={imageSrc}
                  className="w-48 h-72 rounded object-cover relative z-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
