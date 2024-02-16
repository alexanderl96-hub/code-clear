import React from "react";
import ReactStars from "react-rating-stars-component"
import SecondStars from "../Pages/SecondStars";
import FinalLogo from "../Assets/icons/FinalLogo.png";


export default function Results({ result, handleErrorClick }) {
  const todo = result.length
  let total = (Math.round(todo * 10)  / 10 )
  let cuenta = `${100 - (total * 5) / 10}` 

  const ratingChanged = () => { 
    let rest = 0
    if(cuenta === 100){ rest = 5 }
    else if(cuenta <= 99.5 && cuenta > 90){ rest = 4.5 }
    else if(cuenta <= 90 && cuenta > 80){ rest = 4.0 }
    else if(cuenta <= 80 && cuenta > 70){ rest = 3.5 }
    else if(cuenta <= 70 && cuenta > 60){ rest = 3.0 }
    else if(cuenta <= 60 && cuenta > 50){ rest = 2.5 }
    else if(cuenta <= 50 && cuenta > 40){ rest = 2.0 }
    else if(cuenta <= 40 && cuenta > 30){ rest = 1.5 }
    else if(cuenta <= 30 && cuenta > 20){ rest = 1.0 }
    else if(cuenta <= 20 && cuenta > 10){ rest = 0.5 }
    else if(cuenta <= 10 ){ rest = 0.0 }
    return rest
  }; 
  
 
  const rest = ratingChanged()
  const direct = ratingChanged()

  const prueba = ()=>{
    let level = '';
    if(rest <= 5 ){ level = "Great Job"}
    if(rest <= 4.5  && rest > 3.5 ){ level = "Good"}
    if(rest <= 3.5 && rest > 2.5 ){ level = "Fair"}
    if(rest <= 2.5 && rest > 1.5 ){ level = "Poor"}
    if(rest <= 1.5 && rest > 0.5 ){ level = "Warning"}
    if(rest <= 0.5 ){ level = "Alert"}
    if (cuenta < 0 ){level = "Error"} 
    console.log(level)
    return level
  }
console.log(rest, 'rest')
console.log(direct, 'rest')
console.log(cuenta, 'cuenta')

 return (
    <div className="Results">
      { result[0] === "Please submit your code" 
      ? 
      (
        <div>
        <h2>Results</h2>
        <div style={{ marginTop: "20vh" }}>
           <h3>Please submit your code</h3>
           <h3>in the code editor</h3>
           <div className='logoType'>
             <img src={FinalLogo} alt="logo" style={{marginBottom: '20px', marginLeft: '37%', width: '200px'}} />
           </div>
        </div>
        </div>
      ) :
      result.length === 0 
      
      ? (

        <div>
          <h2>Results</h2>
          <div style={{ marginTop: "20vh" }}>
          <div className="secondStars">
            <SecondStars  />
          </div>  
             <h2 style={{color:  '#28f728'}}> 100% </h2>         
             <h3>Congrats! You have no errors.</h3>
             <h3>You are a great coder!</h3>
          </div>
        </div>

      ) : (

        <div>
          <h2>Results</h2>
          <div className="starts" >
              <ReactStars 
              count={5}
              value={rest}
              color='gray'
              edit={false}
              size={35}
              isHalf={true}
              onChange={direct}
              /> 
            
              <h6 style={{fontSize: '22px', marginTop: '4px', padding: '8px', marginLeft: '10px'}}>{cuenta < 0 ? `${0}` : cuenta } %</h6>
               <h6 style={{fontSize: '22px',marginTop: '8px', padding: '4px'}} className= {prueba() === 'Great Job' ? "green-text" : null} >{prueba() === 'Great Job' ? "Great Job" : null}</h6>
               <h6 style={{fontSize: '22px',marginTop: '8px', padding: '4px'}} className= {prueba() === 'Good' ? "green-yelow-text" : null} >{prueba() === 'Good' ? "Good" : null}</h6>
               <h6 style={{fontSize: '22px',marginTop: '8px', padding: '4px'}} className= {prueba() === 'Fair' ? "yelow-text" : null} >{prueba() === 'Fair' ? "Fair" : null}</h6>
               <h6 style={{fontSize: '22px',marginTop: '8px', padding: '4px'}} className= {prueba() === 'Poor' ? "orange-text" : null} >{prueba() === 'Poor' ? "Poor" : null}</h6>
               <h6 style={{fontSize: '22px',marginTop: '8px', padding: '4px'}} className= {prueba() === 'Warning' ? "red-text" : null} >{prueba() === 'Warning' ? "Warning" : null}</h6>
               <h6 style={{fontSize: '22px',marginTop: '8px', padding: '4px'}}  >{prueba() === 'Alert' ? "Alert, to many errors  😳" : null}</h6>
               <h6 style={{fontSize: '22px',marginTop: '8px', padding: '4px'}}  >{prueba() === 'Error' ? <p>This web do not wanna handle this amount of Error</p>  : null}</h6>
          </div>

          <div className="enside">
            <ol>
              {result
                ? result.map((item, id) => {
                    return (
                    <li key={id}
                    data-column={item.column} 
                    data-line={item.line} 
                    data-end-line={item.endLine}
                    data-end-column={item.endColumn}
                    onClick={handleErrorClick}
                    >
                        <span>{item.message}</span>
                        {item.endColumn ? (
                          <span>Line {item.line}, &nbsp; columns {item.column} - {item.endColumn}</span>
                          ) : (
                          <span>Line {item.line}, &nbsp; column {item.column}</span>
                        )}
                        <br />
                        <span>Severity level of {item.severity}</span>
                    </li>
                    );
                  })
                : null}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}