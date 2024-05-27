import React from 'react'

const InvestmentCard = ({ src, business, investment, date, type, status }) => {
    return (
        <>
            <div className="py-2 sm:py-0 sm:grid  sm:grid-cols-6 border-secLine border-b-2 rounded-lg mx-6 my-8 gap-1 font-poppins box-border shadow-lg">
                <div className="flex justify-center text-center sm:w-2/3 h-[100px] sm:h-full py-2 sm:py-0">
                    <img className='rounded-md' src={src} alt="" />
                </div>
                <div className="text-center sm:flex sm:justify-center sm:items-center text-lg sm:text-sm md:text-md lg:text-xl  xl:text-xl">
                    <div className="grid grid-cols-2 sm:block ">
                        <div className="block sm:hidden font-bold font-poppins">
                            Business
                        </div>
                        <div>
                            {business}
                        </div>
                    </div>
                    <hr className='sm:none my-2' />
                </div>
                <div className="text-center sm:flex sm:justify-center sm:items-center text-lg sm:text-sm md:text-md lg:text-xl  xl:text-xl">
                    <div className="grid grid-cols-2 sm:block ">
                        <div className="block sm:hidden font-bold font-poppins">
                            Investment
                        </div>
                        <div>
                            {investment}
                        </div>
                    </div>
                    <hr className='sm:none my-2' />
                </div>
                <div className="text-center sm:flex sm:justify-center sm:items-center text-lg sm:text-sm md:text-md lg:text-xl  xl:text-xl">
                    <div className="grid grid-cols-2 sm:block ">
                        <div className="block sm:hidden font-bold font-poppins">
                            Share issue Date
                        </div>
                        <div className='my-auto' >
                            {date}
                        </div>
                    </div>
                    <hr className='sm:none my-2' />
                </div>
                <div className="text-center sm:flex sm:justify-center sm:items-center text-lg sm:text-sm md:text-md lg:text-xl  xl:text-xl">
                    <div className="grid grid-cols-2 sm:block ">
                        <div className="block sm:hidden font-bold font-poppins">
                            Type
                        </div>
                        <div className="bg-[#363636] text-white mx-auto sm:py-2 sm:px-6 w-[100px] sm:w-full rounded-md">
                            {type}
                        </div>
                    </div>
                    <hr className='sm:none my-2' />
                </div>
                <div className="text-center sm:flex sm:justify-center sm:items-center text-lg sm:text-sm md:text-md lg:text-xl  xl:text-xl">
                    <div className="grid grid-cols-2 sm:block ">
                        <div className="block sm:hidden font-bold font-poppins my-auto">
                            Status
                        </div>
                        <div>
                            {status}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvestmentCard
