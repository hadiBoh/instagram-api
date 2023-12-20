const {sub} = require("date-fns")

const getNewDate = ()=>{
/*     const now = new Date()
    const format = `${now.getFullYear()}${now.getMonth()+1 < 10 ? "0"+now.getMonth()+1 : now.getMonth()+1}${now.getDate()<10 ? "0"+now.getDate() : now.getDate()}`
    return format */
    return sub(new Date() , {minutes:-211}).toISOString()
}

module.exports = {getNewDate}