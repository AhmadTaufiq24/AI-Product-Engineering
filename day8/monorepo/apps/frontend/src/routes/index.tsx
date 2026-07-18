import { createFileRoute } from '@tanstack/react-router'
import { api } from '#/utils/api'
import { useChat } from '@anvia/react'
import { useState } from 'react'



export const Route = createFileRoute('/')({
  component: Home, loader: async () => {
    const res = await api.research.$get()
    const data = await res.json()
    return data
  },
})

function Home() {
  const [input, setInput] = useState("")
  
  const { send, messages } = useChat({
    endpoint: 'http://localhost:8000/chat',
  });
  
  return (
    <div className='h-screen flex flex-col max-w-2xl mx-auto py-4'>
      <div className="flex-1">
        <div>
          {messages.map((message, messageIndex) => (
            <div key={message.id ?? messageIndex}>
              {message.parts.map((p, partIndex) =>
                p.type === "text" ? (
                  <div
                    key={partIndex}
                    className={message.role === "user" ? "text-right" : "text-left"}
                  >
                    {p.text}
                  </div>
                ) : null
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className='border p-4 border-gray-200 rounded-lg'>
        <input
          onChange={(e) => setInput(e.target.value)}
          className='block outline-none w-full' />
        <button
          className='bg-black text-white font-semibold rounded-full px-4 py-2'
          onClick={() => {
            send(input);
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
      
