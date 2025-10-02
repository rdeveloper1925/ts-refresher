import { useState } from "react";
import { extractCalendarEvent } from "./ai/structuredOutput";

const AiForm = () =>{
    const [input, setInput] = useState('');

    const getAiResponse = ()=>{
        extractCalendarEvent(input).then(res=>{
            console.log('response', res);
        }).catch(err=>{
            console.error('Error', err);
        })
    }
    return (
        <div>
            <label>Type some text here</label>
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className=""/>
            <button onClick={getAiResponse}>ask ai</button>
        </div>
    );
}

export default AiForm;