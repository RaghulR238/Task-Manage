let login_name = document.getElementById("login_name");
let login_password = document.getElementById("login_password");
let submit = document.getElementById("submit");

let signUp_name = document.getElementById("signUp_name");
let signUp_password = document.getElementById("signUp_password");
let content=document.getElementById("content");
let output=document.getElementById("output");

submit.addEventListener("click", async(e) => {
  e.preventDefault();
  let data=await login();
  content.style.display="none";
  
let out=document.createElement("p");

if(data!="Invalid user")
{

  localStorage.setItem('username',data.name);
  window.location.href="./index.html";
}

else
{
  out.textContent=data;
  output.style.color="red";
}
  output.appendChild(out);
  console.log(data);
});

let json_data;

async function fetch_json()
{
  json_data=await fetch("./user.json")
    .then((res) => {
      return res.json(); 
    })

    json_data=json_data.user;
    console.log(json_data);
}

function login()
{
  return new Promise((res,rej)=>
  {
    let user=json_data.find((f)=>f.name==login_name.value&&f.password==login_password.value);
    if(user)
    {
      res(user);
    }
    else
    {
      res("Invalid user");
    }
  })
}

fetch_json();

