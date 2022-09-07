import React, { useState, useEffect } from "react";
import "./Exchange.css";
import axios from 'axios'

function Exchange() {
  const [currency, setCurrency] = useState([]);
  const [ind1,setInd1] = useState("")
  const [ind2,setInd2] = useState("")
  const [result,setResult] = useState("")
  const [value,setValue] = useState(0)

  useEffect(() => {
    axios.get("https://api.exchangerate.host/latest")
    .then(resp=> setCurrency(resp.data.rates))
  }, []);

    let x = Object.keys(currency)

  useEffect(()=>{
    handleConvert()
  },[ind2])


    const handleChange = ()=>
    {
      let temp = ind1
      setInd1(ind2)
      setInd2(temp)
    }


    const handleConvert = ()=>
    {
      let byDollar = value/currency[ind1]
      setResult(byDollar*currency[ind2])
    }

  return (
    <div className="exchange">
      <div className="currency">
        <div className="curr">
          <select onChange={(e)=> setInd1(e.target.value)} value={ind1} className="form-select" aria-label="Default select example">
            <option selected disabled>Select Currency</option>
            {
              x&&x.map(e=>
                {
                  return(
                    <option value={e}>{e}</option>
                  )
                })
            }
          </select>
        </div>
        <i onClick={()=> handleChange()} className="fa-solid fa-arrow-right-arrow-left"></i>
        
        <div className="curr">
          <select onChange={(e)=> setInd2(e.target.value)} value={ind2} className="form-select" aria-label="Default select example">
            <option selected disabled>Select Currency</option>
            {
              x&&x.map(e=>
                {
                  return(
                    <option value={e}>{e}</option>
                  )
                })
            }
          </select>
        </div>
      </div>
      <div className="amount">
        <p className='title'>Amount</p>
        <div className="input">
          <input onChange={(e)=> setValue(e.target.value)} value={value} type="text"/>
          <p className='reverse' onClick={handleConvert}><i class="fa-regular fa-arrows-rotate"></i></p>
        </div>
        <p className='result'>{!isNaN(result)&&result} {ind2}</p>
      </div>

      <ul className="static-currency">
        <li>
          <div className="left">
        <i className="fa-solid xc fa-dollar-sign"></i>
            Dollar
        </div>
        <p className='price'>{currency.USD}</p>
        </li>
        <li>
          <div className="left">
        <i className="fa-solid xc fa-euro-sign"></i>
            Euro
        </div>
        <p className='price'>{currency.EUR}</p>
        </li>
        <li>
          <div className="left">
        <i className="fa-solid xc fa-turkish-lira-sign"></i>
            TL
        </div>
        <p className='price'>{currency.TRY}</p>
        </li>
        <li>
          <div className="left">
        <i className="fa-solid xc fa-ruble-sign"></i>
            Rubl
        </div>
        <p className='price'>{currency.RUB}</p>
        </li>
      </ul>
    </div>
  );
}

export default Exchange;
