import logo from "../assets/logo.png";
import { Link,useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";

const colors = Array(23).fill('#7E89AC');

function Upload({ color ,pourcentage}) {
  const style = {
    backgroundColor: color,
  };
  return (
    <div className="">
          <div className='flex '>
            <div style={style}></div>
         
            {colors.map((bgColor, index) => (
        <div
          key={index}
          className="w-1 h-5 rounded-full bg-[#7E89AC] mr-1"
          style={{ backgroundColor: color || bgColor }}
        ></div>
      ))}

         </div>
         <div className="flex "><p className=' text-white opacity-60  '>{pourcentage}</p></div>
    </div>
  );
}

export default Upload;
