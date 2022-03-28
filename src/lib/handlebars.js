/* para cambiar la fecha legibles de mysql  */
const {format} = require('timeago.js');

const helpers ={};

helpers.timeago = (timestamp)=>{
    return format(timestamp);
};

module.exports = helpers;