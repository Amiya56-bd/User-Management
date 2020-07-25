import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {API_URL} from './config';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const App =()=> {

  const [user, setUser] = useState([]);
  const[modal,setModal]=useState(false);
  const[modalData,setModalData]=useState({});
  const [dateTime, setDateTime] = useState(new Date());
  const[fliterData,setfilterData]=useState(null);




  const modalFunc=(data)=>{
     setModal(true)
     setModalData(data.activity_periods)
  }


  const handleDate = selecteddate => {
    setDateTime(selecteddate)
    let newdate=selecteddate.toString().slice(4,8)
    let result = modalData.filter(data => data.start_time.includes(newdate));
    setfilterData(result)
    console.log('result', result)
  };
  
 
  

    useEffect(()=>{
      fetch(`${API_URL}members`).then(res=>res.json()).then(data=>{
        setUser(data);
        console.log('data', data)
      })
        },[]);

  return (
    <>
    <section className="main">
            <div className="box">
              <h3 className="p-2">USER INFO</h3>
            <table className="table table-striped table-dark">
     <thead>
         <tr>
           <th scope="col">SN</th>
           <th scope="col">Name</th>
           <th scope="col">Location</th>
           <th scope="col">Details</th>
         </tr>
     </thead>
    <tbody>
     {
       user.map((data,i)=>{
         return(
          <tr key={i}>
          <th scope="row">{i + 1}</th>
          <td>{data.real_name}</td>
          <td>{data.tz}</td>
          <td><button onClick={()=>modalFunc(data)} className="btn btn-success">Deatils</button></td>
        </tr>
         )
       })
     }
   
    </tbody>
</table>
            </div>
  {
     modal?
     <section className="main" style={{"background":"rgba(0,0,0,0.8)",width:"100%","height":"100vh",
     "position":"absolute","top":"0","left":"0"}}>
       
       
        <div className="modalbox">
          <div className="p-2">
               <span><b>Filter: </b></span>
               <DatePicker
                 selected={dateTime}
                 onChange={handleDate}
                 showYearDropdown
                 scrollableMonthYearDropdown
                 />
          </div>
        <table className="table table-striped table-dark">
     <thead>
         <tr>
           <th scope="col">SN</th>
           <th scope="col">Date </th>
           <th scope="col">starting Time</th>
           <th scope="col">Ending Time</th>
           
         </tr>
     </thead>
    <tbody>
     {
       fliterData?fliterData.map((data,i)=>{
         return(
          <tr key={i}>
          <th scope="row">{i + 1}</th>
          <td>{data.start_time.slice(0,11)}</td>
          <td>{data.start_time.slice(11)}</td>
          <td>{data.end_time.slice(11)}</td>
        </tr>
         )
       })
       :modalData?modalData.map((data,i)=>{
        return(
         <tr key={i}>
         <th scope="row">{i + 1}</th>
         <td>{data.start_time.slice(0,11)}</td>
         <td>{data.start_time.slice(11)}</td>
         <td>{data.end_time.slice(11)}</td>
       </tr>
        )
      }):null
     }
   
    </tbody>
</table>
        </div>
        <button style={{"position":"absolute","top":"5px","right":"5px","color":"white","fontSize":"30px"}} className="btn1" onClick={()=>{
          setModal(false)
          setfilterData(null)
        }}>
            <i className="far fa-times-circle"></i>
           </button>
     </section>
     :null
  }
     </section>
    </>
  );
}

export default App;
