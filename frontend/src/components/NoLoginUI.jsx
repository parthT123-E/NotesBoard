import React from 'react'
import { ZapIcon } from 'lucide-react'
const NoLoginUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <ZapIcon className="size-10 text-primary" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Login to NotesBoard.</h3>
            <p className="text-base-content mb-1">
              Click the register/login button to start using the app.
            </p>
            <p className="text-sm text-base-content/70">
              Thank you!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoLoginUI