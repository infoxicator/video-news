import React, { useState } from "react"
import LoadingSpinner from "../components/LoadingSpinner"
import Logo from "../components/Logo"
import { useSessions } from "../context/session-context"

const options = ["12-18", "18-24", "24-30", "30+"]

function isValidHttpUrl(string) {
  let url

  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  return url.protocol === "http:" || url.protocol === "https:"
}

export default function Example() {
  const [articleURL, setArticleURL] = useState("https://walthamforestecho.co.uk/photography-mauro-arena#article")
  const { fireAITask } = useSessions()
  const [selected, setSelected] = useState(0)
  const [loading, setLoading] = useState()

  const onSelect = option => {
    if (typeof option === "number") {
      setSelected(option)
    }
  }
  const onSubmit = e => {
    setLoading("Performing AI Magic...")
    //validate is url
    try {
      if (isValidHttpUrl(articleURL)) {
        console.log("valid url")
        console.log(articleURL)
        fireAITask(articleURL, options[selected])
      }
    } catch (e) {
      console.log(e)
      setLoading(null)
    }
  }

  if (loading) {
    return <LoadingSpinner text={loading} />
  }
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <div className="flex items-center space-x-1 text-indigo-400">
            <Logo/>
            <h2 className="mt-2 text-5xl	">
              <a
                href="#"
                className="hover:text-indigo-500 text-3xl font-bold text-indigo-400 decoration-indigo-400 underline underline-offset-4 decoration-wavy decoration-6"
              >
                TL;DR Stories
              </a>
            </h2>
          </div>

          <div className="shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className=" font-bold sr-only">
                Article URL
              </label>
              <input
                value={articleURL}
                onChange={e => setArticleURL(e.target.value)}
                required
                className="rounded-md text-4xl relative w-full px-4 py-3 text-gray-900 border-4 focus:border-blue-600 focus:z-10 focus:outline-none"
                placeholder="Article URL"
              />
            </div>
            <div className="flex items-center space-x-3">
              <p className="text-2xl">Target audience</p>
              <select
                onChange={e => onSelect(parseInt(e.target.value))}
                class="border-4 rounded-lg text-gray-800 py-2 pl-5  md:pr-16  focus:outline-none appearance-none md:text-2xl"
              >
                <option selected disabled hidden>
                  Please Select
                </option>
                {options.map((option, index) => (
                  <option value={index}>{option}</option>
                ))}
              </select>
              <p className="text-2xl">year olds.</p>
            </div>
          </div>
          <div>
            <button
              onClick={onSubmit}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
