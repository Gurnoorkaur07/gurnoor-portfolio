const button=document.getElementById("btn");
async function fetchFood(text){
    const appid="77137962";
    const appkey="ac5ab7484171a09502e54e51c7c189ab";
    const base_url=""
}
button.addEventListener("click",(e)=>{
    const text=document.getElementById("text").value.trim();
    e.preventDefault();
    console.log(text);
})