import React from 'react'

const Company_profile_section = ({ company_links, rating, votes, logo_url }) => {
  return (
    <>
      <div className='my-10'>
        {/* logo section */}
        <img className='w-5/6 d-block m-auto' src={logo_url} alt="" />
      </div>
      <div>
        {/* link Section */}
        <div className='grid grid-cols-5 px-4 my-10'>
          {/* links */}
          <a href={company_links.portfolio} target='_blank' rel="noreferrer" className="flex bg-secLine items-center justify-center w-10 h-10 p-1.5 mr-2 rounded-full shadow-md transition duration-200">
            <img src="../../link.png" alt="link" className="w-10 h-10 object-contain text-gray-600 hover:text-gray-800" />
          </a>
          <a href={company_links.twitter} target='_blank' rel="noreferrer" className="flex bg-secLine items-center justify-center w-10 h-10 p-1.5 mr-2 rounded-full shadow-md transition duration-200">
            <img src='../../twitter-white.png' alt="twitter" className="w-10 h-10 object-contain text-gray-600 hover:text-gray-800" />
          </a>
          <a href={company_links.linkedin} target='_blank' rel="noreferrer" className="flex bg-secLine items-center justify-center w-10 h-10 p-1.5 mr-2 rounded-full shadow-md transition duration-200">
            <img src='../../linkedin-white.png' alt="linkedin" className="w-10 h-10 object-contain text-gray-600 hover:text-gray-800" />
          </a>
          <a href={company_links.facebook} target='_blank' rel="noreferrer" className="flex bg-secLine items-center justify-center w-10 h-10 p-1.5 mr-2 rounded-full shadow-md transition duration-200">
            <img src='../../facebook-white.png' alt="facebook" className="w-10 h-10 object-contain text-gray-600 hover:text-gray-800" />
          </a>
          <a href={company_links.google} target='_blank' rel="noreferrer" className="flex bg-secLine items-center justify-center w-10 h-10 p-1.5 mr-2 rounded-full shadow-md transition duration-200">
            <img src='../../Google-white.png' alt="google" className="w-10 h-10 object-contain text-gray-600 hover:text-gray-800" />
          </a>
        </div>
      </div>
      <div>
        {/* rating section */}
        <div className="grid grid-cols-3 my-10">
          <div className='m-auto'>
            <img className='w-[50px]' src="../../../star_icon.png" alt="" />
          </div>
          <div className="text-2xl my-auto ">
            {rating}/10
          </div>
          <div className="my-auto">
            <p className="text-white text-center bg-secLine px-2 py-4 rounded-sm text-sm w-3/4">
              {votes} Votes
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Company_profile_section
