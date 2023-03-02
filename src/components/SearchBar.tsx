import { Dispatch, SetStateAction, useState } from "react";

type Props = {
    input: String,
    setModels: Dispatch<SetStateAction<string[]>> | Dispatch<SetStateAction<never[]>>,
    setInput: Dispatch<SetStateAction<string>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
}

export default function SearchBar({setModels, input, setInput, setLoading}: Props) {
    function handleSubmit(event: any) {
        event.preventDefault();
        setLoading(true)
        fetch(`/api/response?model=${input}`, {
          method: 'GET'
        })
        .then(response => response.json())
        .then((data) => {setModels(data.models); setLoading(false)})
      }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          {// @ts-ignore
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
          }
          <input type="submit" value="Submit" />
        </form>
    )
}