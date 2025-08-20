import React from 'react'

interface CardProps {
    addedDate: string;
    title: string;
    body: string;
    tags?: string[];
  }

const Card = ({ addedDate, title, body, tags = [] }: CardProps) => {
  return (
    <div className='bg-whitepure p-6 rounded-lg flex items-center justify-center'>
        <div className='flex flex-col'>
            <p>{addedDate}</p>
            <p>{title}</p>
            <p>{body}</p>
            
            {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-accentlight text-black text-sm px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
            
        </div>
        </div>
  )
}

export default Card