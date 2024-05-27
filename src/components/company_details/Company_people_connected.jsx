import React, { useState } from 'react';

const Company_people_connected = ({ connected_people }) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <>
      <div>
        {/* people connected */}
        <p>People Connected:</p>
        {connected_people.slice(0, showAll ? connected_people.length : 3).map((item) => (
          <div className="grid grid-cols-4 px-4 py-2" key={item.id}>
            <div>
              <img className="rounded-full h-[50px] w-[50px]" src="../../../logo1.png" alt="" />
            </div>
            <div className="col-span-3 my-auto mx-1">
              <p className="text-sm capitalize">{item.name}</p>
              <p className="lowercase font-poppins">{item.email}</p>
            </div>
          </div>
        ))}
        <hr className="my-2 w-3/4 mx-auto" />
        <p onClick={toggleShowAll} className="text-sm text-center font-poppins cursor-pointer">
          {showAll ? 'Show less' : 'Show more'} &gt;
        </p>
      </div>
    </>
  );
};

export default Company_people_connected;
