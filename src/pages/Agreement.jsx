import React, { useEffect } from 'react'
import Button from "../components/Button";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ALERTS } from '../store/reducers/component-reducer';
import { useDispatch, useSelector } from 'react-redux';
import AuthActions from '../store/actions/auth-actions';
function Agreement() {
    const { uid } = useParams();
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    let agreementText = useSelector((state) => {
        return state?.auth?.agreementText || {}
    })
    const handleIAgreeButtonClick = () => {
        if (isChecked) {
            // Perform rendering logic for kycrejiter button
            let msgdata = {
                show: true,
                icon: "success",
                buttons: [
                ],
                type: 1,
                text: "Profile Created Successfully"
            }
            dispatch(ALERTS(msgdata))
            navigate('/login')
        } else {
            console.log('You need to check the checkbox first');
        }
    };


    const handleIBackButtonClick = () => {
        navigate(-1)
    }


    useEffect(() => {
        dispatch(AuthActions.getAgreement(uid))
    }, [])

    return (
        <div className='h-screen w-screen' >
            <div className="flex justify-between mx-20 sticky bg-white top-0 z-10 h-30 pb-5 ">
                <h1 className='font-bold text-center text-txt-neavy text-5xl mt-10'>PMIS</h1>
                <h2 className=" text-2xl font-bold pt-5 tracking-tight text-txt-neavy mt-10">{agreementText?.roleName} User Agreement</h2>
            </div>
            <p className=' text-txt-neavy px-20 mt-4 overflow-y-scroll h-[700px] w-full text-justify scrollbar-thin scrollbar-thumb-gray-300 '>
            <div className={'break-all'} dangerouslySetInnerHTML={{ __html: agreementText?.htmlData }}></div>
            </p>
            <div class="flex justify-end mt-4 pb-5 gap-6 px-20 sticky bottom-4 " >
                <input id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="mt-2 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleCheckboxChange}
                />
                <div className="w-auto ">
                    <div className='flex gap-1 whitespace-nowrap'>
                    <Button onClick={handleIAgreeButtonClick} name="I Agree" disabled={!isChecked} />
                    <Button onClick={handleIBackButtonClick} name="Back" />
                    </div>
                </div>
            </div>

        </div>

    )
}



export default Agreement

