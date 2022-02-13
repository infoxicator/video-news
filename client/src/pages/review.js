import React, { useState } from "react"
import LoadingSpinner from "../components/LoadingSpinner"
import { useSessions } from "../context/session-context"
import { XCircleIcon, VideoCameraIcon } from "@heroicons/react/solid"

export default function Example() {
  const { draftSubmission, finalURL } = useSessions()

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-3xl font-bold text-indigo-400 decoration-indigo-400 underline underline-offset-4 decoration-wavy decoration-6">
          Review Video
        </h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <video src={finalURL} controls className="rounded" />
            <a
              className="bg-indigo-600 text-white text-xl px-2 py-1 rounded"
              target="_blank"
              rel="noopener noreferrer"
              download={`my-story.mp4`}
              href={finalURL}
            >
              Download
            </a>
          </div>
          <div className="flex flex-col text-white">
            <label className="uppercase text-lg">Title:</label>
            <p className="rounded bg-gray-600 text-2xl px-1 py-1">
              {draftSubmission.title}
            </p>
            <label className="uppercase text-lg">Summary:</label>
            <p className="rounded bg-gray-600 text-2xl px-1 py-1">
              {draftSubmission?.aiSummary?.split("\n").join("")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
