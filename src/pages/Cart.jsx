
import React from 'react';
import { Link } from 'react-router-dom';
import Comancarts from '../components/Comancarts';
import Linechart from '../components/Linechart';
import Columnchart from '../components/Columnchart';
import Areabarchart from '../components/Areabarchart';
import Doublelinechart from '../components/Doublelinechart';

// import { IoStar } from 'react-icons/io5';

const Cart = () => {
  let data = [
    {
      label: "Today Money",
      value: "$53k",
      img_src: "/myuser.png",
      background: "from-gray-600 to-cyan-600 ",
      // classes: "bg-gradient-to-r from-yellow-200 to-green-300 ",
      classes: "bg-gray-200",
    },
    {
      label: "Today's Users",
      value: "218",
      img_src: "/Blogs.png",
      background: "from-blue-600 to-red-600",
      // classes: "bg-gradient-to-r from-blue-300 to-yellow-600 ",
      classes: "bg-gray-200",
    },
    {
      label: "Appointment",
      value: "318",
      img_src: "/Appointment.png",
      background: "from-yellow-600 to-green-600",
      // classes: "bg-gradient-to-r from-purple-500 to-pink-200 ",
      classes: "bg-gray-200",

    }

  ]
  return (
    <>
      <div className=''>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

          {/* Left Column */}
          <div className="md:col-span-1 p-4">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
               
              {data.map((itm) => {
                return <Comancarts label={itm.label} value={itm.value} background={itm.background} img_src={itm.img_src} classes={itm.classes} ></Comancarts>
              })}

            </div>
          </div>
        </div>


        <div class="grid grid-cols-6 gap-10 p-4 ">
          <div class="col-span-3">
            <Linechart data={[0, 10, 65, 2, 50, 5, 45, 30, 75]} />
          </div>
          <div class="col-span-3"><Columnchart /></div>
        </div>
        <div class="grid grid-cols-6 gap-10 p-4">
          <div class="col-span-3">
            <Areabarchart />
          </div>
          <div class="col-span-3"> <Doublelinechart /></div>
        </div>
      </div>
    </>
  );
}

export default Cart;
