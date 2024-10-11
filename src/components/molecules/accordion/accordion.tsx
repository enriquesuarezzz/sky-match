'use client'
import React, { ReactNode, useState, useRef } from 'react'

interface AccordionProps {
  items: {
    title: string
    content: ReactNode
  }[]
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null) // State to track the index of the currently open item
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]) // Ref to store references to content div elements

  // Function to handle click on accordion item
  const handleItemClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index) // Toggle open/close state of clicked item
  }

  // Function to get the height of the content based on its scrollHeight
  const getContentHeight = (index: number) => {
    const content = contentRefs.current[index]
    return content ? content.scrollHeight : 0 // Return scrollHeight of content element or 0 if content is null
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-md border border-gray-200">
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            className="flex w-full items-center justify-between p-4 text-left"
            onClick={() => handleItemClick(index)} // Call handleItemClick function on button click
          >
            <span>{item.title}</span>
            <span>{openIndex === index ? '-' : '+'}</span>{' '}
            {/* Show '-' if item is open, '+' if closed */}
          </button>
          <div
            ref={(el) => {
              contentRefs.current[index] = el // Store reference to content element in contentRefs
            }}
            className={`transition-max-height overflow-hidden duration-300 ease-out`}
            style={{
              maxHeight:
                openIndex === index ? `${getContentHeight(index)}px` : '0px', // Set maxHeight based on open/close state
            }}
          >
            <div className="bg-gray-100 p-1">{item.content}</div>{' '}
            {/* Render content of the accordion item */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Accordion
