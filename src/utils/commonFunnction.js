export function moreinfo(text, len) {
    let resultString = "";
    for (let i = 0; i <= len; i++) {
        resultString += text[i];
    }
    return resultString;
}


export function getAccessType(valName){

    let permission=JSON.parse(localStorage.getItem("permission")) || {}
    console.log(valName,permission?.pmpermission,"getTypegetType")
    if(permission?.pmpermission.findIndex(prev=>prev.moduleName==valName)!=-1){

        let getType=permission?.pmpermission[permission?.pmpermission.findIndex(prev=>prev.moduleName==valName)]["accessType"]

        console.log(getType,valName,"getTypegetType")
        if(getType=="H"){
            return "invisible"
        }
        if(getType=="R"){
            return "disabled"
        }
        if(getType=="W"){
            return "visible"
        }
    }else{
        return {}
    }

}

export function objectToQueryString(obj) {
    const queryString = Object.keys(obj)
        .filter(key => obj[key] !== "" && obj[key] !== "select")
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
        .join('&');
    return queryString;
}

export function objectToArray(obj) {
    const queryString = Object.keys(obj)
        .filter(key => obj[key] !== "" && obj[key] !== "select")
        .map(key => encodeURIComponent(obj[key]));
    return queryString;
}


export function labelToValue(itew){
    return itew.replace(' ', "").toLowerCase()

}

export function parseTwoDigit(text){
    const myNumber = parseFloat(text);

    console.log(myNumber,"myNumbermyNumbermyNumbermyNumber")
    const roundedNumber = myNumber.toFixed(2);
    return roundedNumber;


}





