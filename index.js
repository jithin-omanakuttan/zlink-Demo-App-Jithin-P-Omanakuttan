const api_url =  "https://randomuser.me/api/";
userdata=[];             //array for storing the data of randomly generated users
stopfetchingdata= false;
allowmanualfetch= false;


async function getapi(url) {             //fetching data from api
 
    const response =await fetch(url);
    var data =await response.json();
    userdata.push(data.results[0])
    debugger
    show(data);
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function onManuallyFetch(){
    debugger
    allowmanualfetch= true;
    stopfetchingdata= false;
    getapi(api_url);
}
function onStopAutomaticFetch(){
    stopfetchingdata= true;
}
function onClearData(){
    stopfetchingdata= true;
    userdata=[];
    show(userdata);
 
   
}
function getcount(userdata){                //calculating count
count=0;
malecount=0;
femalecount=0;
for(let k of userdata){
    if( k.dob.age>50){
        count++;
    }
    if(k.gender=="male")
    {
        malecount++;
    }
    if(k.gender=="female")
    {
        femalecount++;
    }
}
document.getElementById("count").innerText= count;
document.getElementById("Male").innerText= malecount;
document.getElementById("Female").innerText= femalecount;
}
getapi(api_url)

function show(data) {
  
    let tab =   ``;  



    for (let r of userdata) {
        tab+= ` <div class="card text-center" style="width: 18rem;margin:2rem"> <img class="card-img-top" id="thumb_img" src=`+r.picture.large+`
        
          <h5 class="card-title text-center">`+ r.name.title+ r.name.first+r.name.last +`</h5>
          <p class="card-text text-center">`+r.gender+`</p>
  
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Age: `+r.dob.age+`</li>
          <li class="list-group-item">Email:`+r.email+`</li>
          <li class="list-group-item">Phone:`+r.phone+`</li>
        </ul> </div>
       `
 
  
     }

    document.getElementById("databody").innerHTML = tab;
    getcount(userdata);
 if(stopfetchingdata==false&&allowmanualfetch==false)
 {
    loadapi(api_url);
 }
    
}

async function loadapi(url) {
    await timeout(5000);
   const response = await fetch(url);
   var data = await response.json();
   userdata.push(data.results[0])
   debugger
   show(data);
}