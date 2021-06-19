const dateTime =()=>{
    let date = new Date();      
    let time = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2); 
    return time;
}
export default dateTime;