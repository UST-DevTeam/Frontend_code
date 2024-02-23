import React from 'react'

const Button = ({ onClick, name, classes = "", icon }) => {

    let data = [
        ["bg-", "bg-neavycolor"],
        ["w-", "w-full"]
    ]

    let tkn = 1
    let value = ""

    data.map((itm) => {
        if (classes.search(itm[0]) == -1) {
            value = value + " " + itm[1]
        }
    })

    classes = classes + value

    return (


        <button onClick={onClick} className={`${classes} bg-pbutton  flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-onHoverButton transition-colors duration-500`}>
            {name} {icon}
        </button>
    )
}

export default Button