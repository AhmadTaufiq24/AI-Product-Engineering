import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const [jobTitle, setJobTitle] = useState('')
  const [level, setlevel] = useState('Junior')
  const [industry, setIndustry] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')

  async function handleStartResearch() {
    const response = await fetch("http://localhost:4000/research", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobTitle, level, industry, additionalInfo }),
    })

    // response.body?.pipeTo(new WritableStream({
    //   write(chunk) {
    //     console.log(chunk)
    //   }
    // }))

    const data = await response.json()
    console.log(data)
  }
  
  return <div className='max-w-lg space-y-2 py-10'>
    <h1 className='text-center text-lg font-bold'>AI Job Survival</h1>
    <input placeholder='Job Title' onChange={(e) => setJobTitle(e.target.value)} />
    <select onChange={(e) => setlevel(e.target.value)}>
      <option>Junior</option>
      <option>Mid</option>
      <option>Senior</option>
    </select>
    <input placeholder='Industry' onChange={(e) => setIndustry(e.target.value)} />
    <input placeholder='Additional Info' onChange={(e) => setAdditionalInfo(e.target.value)} />
    <button onClick={handleStartResearch}>Start Research</button>
  </div>
}
