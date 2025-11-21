import Image from 'next/image'
import React from 'react'

/**
 * Loading component with animated spinner
 * @returns {JSX.Element} Loading spinner component
 */
export default function loading() {
    return (
        <div className="w-[96vw] sm:w-[98vw] h-screen flex items-center justify-center bg-background">
            <h1>Loading...</h1>
        </div>
    )
}
