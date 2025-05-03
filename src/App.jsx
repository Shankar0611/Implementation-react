import React, { useState } from "react";
import "./App.css"

function App(){

  const [dropData, setDropData] = useState("virtual");
  return(
    <div>
    <p>Welcome Shankar 🙏</p>
    <p><strong>virtual</strong> - To Virtualization using Tanstack virtual</p>
    <p><strong>fetch</strong> - To Fetch data using custom hook</p>
    </div>
  )
}

export default App;
