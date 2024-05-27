import React from 'react'
import InvestmentCard from '../../components/InvestmentCard'

const InvestmentTransaction = () => {
    return (
        <div>
            {/* heading section */}
            <div className="hidden sm:grid sm:grid-cols-6 sm:pt-8 sm:mx-4 sm:text-sm md:text-md lg:text-lg sm:font-bold sm:font-poppins text-[#003260] ">
                <div className="text-center">

                </div>
                <div className="text-center">
                    Business
                </div>
                <div className="text-center">
                    Investment
                </div>
                <div className="text-center">
                    Share issue Date
                </div>
                <div className="text-center">
                    Type
                </div>
                <div className="text-center">
                    Status
                </div>
            </div>
            {/* card section */}
            <InvestmentCard src="../../../logo1.png" business="Puresport" investment="$20.26" date="13/04/2023" type="EIS" status="Submission in Review" />
            <InvestmentCard src="../../../logo1.png" business="Puresport" investment="$20.26" date="13/04/2023" type="EIS" status="Submission in Review" />
            <InvestmentCard src="../../../logo1.png" business="Puresport" investment="$20.26" date="13/04/2023" type="EIS" status="Submission in Review" />
            <InvestmentCard src="../../../logo1.png" business="Puresport" investment="$20.26" date="13/04/2023" type="EIS" status="Submission in Review" />
        </div>
    )
}

export default InvestmentTransaction
