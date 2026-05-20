'use client'
import React from 'react'

export default function Spinner({ size = 16, color = 'white' }) {
    return (
        <div
            className={`animate-spin rounded-full border-2 border-current border-t-transparent`}
            style={{
                width: size,
                height: size,
                color: color
            }}
        />
    )
}