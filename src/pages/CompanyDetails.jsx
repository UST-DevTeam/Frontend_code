



import React, { useEffect } from 'react';
import { useForm } from "react-hook-form"
// import AuthActions from '../store/actions/auth-actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';



const CompanyDetails = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    let checkauth;
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {

        dispatch(AuthActions.signIn(data, () => {
            navigate('/')
        }))
    }

    useEffect(() => {
        checkauth = localStorage.getItem("auth")

        console.log(checkauth == "true", "checkauthcheckauthcheckafauth")
        if (checkauth == "true") {
            navigate('/')
        }
    }, [checkauth])



    const companyTypes = [
        "Information Technology",
        "Automobile",
        "Telecommunications",
        "Textiles",
        "Chemicals",
        "Pharmaceuticals",
        "Biotechnology",
        "Steel",
        "Cement",
        "Oil and Gas",
        "Power",
        "Renewable Energy",
        "Tourism",
        "Hospitality",
        "Banking and Finance",
        "Insurance",
        "Real Estate",
        "Retail",
        "Healthcare",
        "Education",
        "Agriculture",
        "Food Processing",
        "Mining",
        "Media and Entertainment",
        "Construction",
        "Aerospace",
        "Defense",
        "Electronics",
        "E-commerce",
        "Logistics",
        "Fast Moving Consumer Goods (FMCG)",
        "Pharmaceuticals",
        "Automotive",
        "Information Technology Enabled Services (ITES)",
        "Telecom",
        "Chemical",
        "Biotechnology",
        "Research and Development",
        "Textile and Garments",
        "Automobile Manufacturing",
        "Banking",
        "Financial Services",
        "Insurance",
        "Healthcare Services",
        "Pharmaceuticals",
        "Oil and Gas",
        "Power",
        "Renewable Energy",
        "Mining",
        "Metals",
        "Construction",
        "Real Estate",
        "Infrastructure",
        "Information Technology",
        "Business Process Outsourcing (BPO)",
        "Knowledge Process Outsourcing (KPO)",
        "Retail",
        "E-commerce",
        "Consumer Electronics",
        "Aerospace",
        "Defense",
        "Research and Development",
        "Media and Entertainment",
        "Film Industry",
        "Television Industry",
        "Music Industry",
        "Print Media",
        "Online Media",
        "Logistics",
        "Transportation",
        "Automotive Components",
        "Pharmaceuticals",
        "Healthcare Equipment",
        "Education and Training",
        "Research and Development",
        "Food Processing",
        "Beverages",
        "Tobacco",
        "Chemicals",
        "Petrochemicals",
        "Fertilizers",
        "Agrochemicals",
        "Cement",
        "Metals",
        "Mining",
        "Textiles",
        "Apparel",
        "Footwear",
        "Gems and Jewelry",
        "Handicrafts",
        "Toys and Games",
        "Leather",
        "Furniture",
        "Ceramics",
        "Glass",
        "Paper",
        "Printing and Publishing",
        "Rubber",
        "Plastics",
        "Wood and Wood Products",
        "Renewable Energy",
        "Solar Energy",
        "Wind Energy",
        "Hydropower",
        "Bioenergy",
        "Nuclear Energy"
    ];

    return checkauth ? <></> :
        <>

            {/* <div className='h-screen w-screen bg-login' style={{ backgroundPosition: "0% 0%", backgroundSize: "cover" }}> */}
            <div className='h-screen w-screen bg-cover'>
                <div className="flex flex-col h-[100%] justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h1 className='font-bold text-center text-white text-5xl font-kat'>Amansas</h1>
                        <h2 className="mt-10 text-center text-white text-2xl leading-9 tracking-tight font-poppins">Enter Your Company Details</h2>
                    </div>

                    <div className="mt-10 w-full sm:mx-auto sm:w-full sm:max-w-lg">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="" method="POST">
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="text" className="block text-md text-white font-medium leading-6 font-poppins">Company Name</label>
                                </div>
                                <div className="mt-2">
                                    <input id="username" name="username" type="email" autoComplete="username" {...register("email", { required: "This Field is required" })} className="p-2 block w-full border-b-2 py-1.5 text-white-900 sm:text-sm sm:leading-6 bg-[#000000] bg-opacity-50 text-white font-poppins outline-none border-gray-400 focus:border-blue-500 shadow-lg focus:shadow-indigo-500/30" />
                                    <p className='text-xs text-red-700'>{errors?.username?.message}</p>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between" >
                                    <label htmlFor="companyType" className="block text-md font-medium leading-6 text-white py-3 font-poppins">Select Company Type:</label>
                                </div>
                                <select id="companyType" className="p-2 block w-full border-b-2 py-1.5 text-white-900 sm:text-sm sm:leading-6 bg-[#000000] bg-opacity-50 text-white font-poppins outline-none border-gray-400 focus:border-blue-500 shadow-lg focus:shadow-indigo-500/30">
                                    {companyTypes.map((type, index) => (
                                        <option className='font-poppins' key={index} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex gap-6 pt-5'>
                                <button type="submit" className="flex w-full justify-center rounded-full bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 bg-pbutton focus-visible:outline-offset-2  buttonAnim border-2 border-gray-700 font-poppins hover:bg-blue-700 transition duration-1000 ease-in-out">Submit Details</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

};

export default CompanyDetails;