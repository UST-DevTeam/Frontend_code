import React from 'react'

const CstmButton = ({ child , classes = "" }) => {

    // classes=classes+

    return (
        <div className={classes+" py-2 px-2 flex justify-center"}>
            {child}
        </div>
    )
}

export default CstmButton