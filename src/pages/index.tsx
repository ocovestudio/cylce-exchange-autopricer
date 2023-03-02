import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import SearchBar from '@/components/SearchBar';
import ConditionCheckboxes from '@/components/ConditionCheckboxes';


export default function Home() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState();
  const [checkbox, setCheckbox] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Head>
        <title>AutoPricer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div className="container-results">
          {loading ? <p>Loading...</p> :
          models?.map((model, i) => {
            return (
              <p 
              key={model + i} 
              style={{
                backgroundColor: selectedModel === model ? 'lightblue' : 'white',
                cursor: 'pointer',
                border: '1px solid black',
                borderRadius: '5px',
                padding: '5px'
              }} 
              onClick={() => setSelectedModel(model)}
              >
                {model}
              </p>)
          })}
        </div>
        {selectedModel ? 
          <ConditionCheckboxes 
          setModels={setModels} 
          selectedModel={selectedModel} 
          checkbox={checkbox} 
          setCheckbox={setCheckbox} 
          /> :
          <SearchBar setModels={setModels} setInput={setInput} input={input} setLoading={setLoading} />
        }
      </main>
    </>
  )
}