import { Dispatch, SetStateAction, useState } from "react";

type Props = {
    checkbox: String,
    selectedModel: String,
    setModels: Dispatch<SetStateAction<string[]>> | Dispatch<SetStateAction<never[]>>,
    setCheckbox: Dispatch<SetStateAction<string>>,
}

export default function ConditionCheckboxes({setModels, selectedModel, checkbox, setCheckbox}: Props) {
    const conditions = [['Excellent', 'A'], ['Used', 'B'], ['Broken', 'C']];

    function handleSubmit(event: any) {
        event.preventDefault();
        fetch(`/api/response?model=${selectedModel}&condition=${checkbox}`, {
          method: 'GET'
        })
        .then(response => response.json())
        .then((data) => setModels(data.models))
        console.log(selectedModel)
      }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="form">
            <div className='container-checkbox'>
              {conditions.map((condition, i) => (
                <div key={condition[0] + i}>
                  <p>{condition[0]}</p>
                  <input type="checkbox" name={condition[1]} checked={checkbox === condition[1]} onChange={(e) => setCheckbox(e.target.name)}/>
                </div>
              ))}
            </div>
            <input type="submit" value="Submit" />
        </form>
    )
}