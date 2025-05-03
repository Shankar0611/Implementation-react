import React from 'react'
import useDataFetching from '../Custom-Hooks/useDataFetching'

function DataFetchingUsingCustomHook() {

    const {data, loading, error: fetchError} = useDataFetching('https://dummyjson.com/products')

    if(loading){
      return (
        <div>
          Loading...
        </div>
      )
    }
  
    if(fetchError){
      return (
        <div>
          {fetchError}...
        </div>
      )
    }
  
    return (
      <div>
      <h2>Data fetching using custom hook </h2>
        {data?.products.map((item,index)=>(
          <p>{item.title}</p>
        ))}
      </div>
    )
}

export default DataFetchingUsingCustomHook