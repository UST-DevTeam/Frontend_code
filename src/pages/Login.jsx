import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import AuthActions from '../store/actions/auth-actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WithSideImage from '../components/WithSideImage';
import { FaEyeSlash } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { MdEmail } from "react-icons/md";


const Login = () => {

    //password visible functioality
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const toggleEye = () => {
        setShowPassword(!showPassword)
    }


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



    //     <>
    //     <div className='flex md:w-1/2 bg-sideimage' >

    //     </div>
    //     {/* <div className='h-screen w-screen bg-login' style={{ backgroundPosition: "0% 0%", backgroundSize: "cover" }}> */}
    //     <div className='h-screen    sm:w-1/2'>
    //         <div className="flex flex-col h-[100%] justify-center lg:px-4 p-4">
    //             <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //                 <div className="mx-auto font-bold font-kat text-txt-neavy text-4xl text-center font-kat">Amansas</div>
    //                 <h2 className="mt-10 text-center ext-txt-neavy  text-2xl leading-9 tracking-tight font-semibold  font-poppins">Sign in to your account</h2>
    //             </div>


    //         </div>
    //     </div>
    // </>
    return checkauth ? <></> : <><WithSideImage sideImage={"bg-sideimage"} formclass={" h-[60vh]"} labeling={"Login to your account"} form={<div className="mt-10 w-full sm:mx-auto sm:w-full sm:max-w-lg ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="" method="POST">
            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="email" className="block text-sm text-txt-neavy  pl-4 font-medium leading-6 font-poppins  dark:text-darkBg">Email</label>
                </div>
                <div className="mt-2 flex">
                    <input id="username" name="username" type="email" autoComplete="username" {...register("email", { required: "This Field is required" })} className="p-2 block w-full border-b-2 py-1.5 text-black-900 sm:text-sm sm:leading-6 bg-opacity-50 rounded-md  text-black font-poppins outline-none border-gray-400 focus:border-blue-500 shadow-lg focus:shadow-indigo-500/30  rounded-4" />
                    <div className='relative right-5 top-3' >
                        {
                            <>
                                <MdEmail />
                            </>
                        }
                    </div>
                    <p className='text-xs text-red-700 font-poppins'>{errors?.email?.message}</p>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm pl-4 font-medium leading-6 text-txt-neavy font-poppins dark:text-darkBg">Password</label>
                </div>
                <div className="mt-2 flex">
                    <input id="password" onChange={(e) => setPassword(e.target.value)} name={password} type={showPassword ? 'text' : 'password'} autoComplete="current-password" {...register("password", { required: "This Field is required" })} className="p-2 block w-full border-b-2 py-1.5 text-black-900 sm:text-sm sm:leading-6 rounded-md   bg-opacity-50 text-black font-poppins outline-none border-gray-400 focus:border-blue-500 shadow-lg focus:shadow-indigo-500/30" />
                    <div className='relative right-5 top-3 cursor-pointer' onClick={toggleEye}>
                        {
                            (!showPassword) ? (<><FaEyeSlash /></>) : (<><IoEye /></>)
                        }
                    </div>
                    <p className='text-xs text-red-700'>{errors.password?.message}</p>
                </div>
                <button className="btn text-txt-neavy text-sm float-right pt-2">Forgot Password?</button>
            </div>
            <div className='flex w-full pt-6'>
                {/* <button onClick={() => {
                navigate('/register')
            }} type="button" className="flex w-full justify-center rounded-full bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-bg-pbutton hover:animate-pulse buttonAnim border-2 hover:border-2 border-gray-700 hover:border-gray-700">Register</button> */}
                <button type="submit" className="flex w-full justify-center rounded-lg bg-secLine 
                px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline 
                    focus-visible:outline-2  focus-visible:outline-offset-2  buttonAnim border-2 border-gray-200 font-poppins transition
                    duration-1000 ease-in-out hover:bg-gradient-to-r from-blue-200 via-blue-300 to-violet-200 hover:text-black hover:border-black hover:border-2">Sign in</button>
            </div>
        </form>
        <div className="p-0 m-2 flex justify-center items-center">
            {/* <div>
                <p className="text-neavy text-sm">Don't have an account? </p>
            </div> */}
            <div onClick={() => {
                navigate('/register')
            }} >
                {/* <button className="btn text-neavy text-sm ml-2 ">Sign Up</button> */}
            </div>
        </div>
    </div>} /></>




};

export default Login;
