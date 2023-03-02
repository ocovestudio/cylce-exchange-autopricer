import { Dispatch, SetStateAction, useState } from "react";

type Props = {
    input: String,
    setModels: Dispatch<SetStateAction<string[]>> | Dispatch<SetStateAction<never[]>>;
    setInput: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({setModels, input, setInput}: Props) {
    function handleSubmit(event: any) {
        event.preventDefault();
        fetch(`/api/response?model=${input}`, {
          method: 'GET'
        })
        .then(response => response.json())
        .then((data) => setModels(data.models))
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