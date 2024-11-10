import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
function Scanner() {

  //this const value will be used for scan resutls laters 
const [scanResult, setScanResult]=useState(null);
// embedd the scanning process in the useEffect so that it fixes the broken reader
// essentially scans once and only after the component has actually loaded

useEffect(()=>{
  // settign up scanner
// id is "reader"
const scanner =new Html5QrcodeScanner('reader',{
  qrbox:{
    width:250,
    height: 250,
  },
  fps:5,
});
scanner.render(success,error);

function success(result){
  scanner.clear();
  setScanResult(result);
}
function error(err){
  console.warn(err);
}
// useEffect takes in a second input that forces useEffect to run again when their values are updated
}, [])

  return (
    <div >
      {/* now you have to utilize the reader from the scanner above to create an element to utilize the scanner */}
    <div id="reader"></div>
    {scanResult
    ?<div>Success!:<a href={scanResult}>{scanResult}</a></div>:<div  id="reader"></div>}
    </div> 
  );
}
export default Scanner;