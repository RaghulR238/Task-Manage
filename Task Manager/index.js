let task=[{
    category:"Work",
    sub:"Meeting",
    d1:0,
    d2:10,
    d3:50,
    task1:"Client Meeting"
},{
    category:"Work",
    sub:"Business visit",
    d1:0,
    d2:30,
    d3:1,
    task1:"Vendor"
},{
    category:"Personal Work",
    sub:"Party",
    d1:0,
    d2:20,
    d3:0,
    task1:"Club"
},{
    category:"Personal Work",
    sub:"Playing",
    d1:0,
    d2:10,
    d3:10,
    task1:"Ground"
}];

let sub=document.getElementById("sub");
let duration=document.getElementById("duration");
let work=document.getElementById("work");
let cat=document.getElementById("category");
let checkbox=document.getElementById("checkbox");
let update=document.getElementById("update");

let input_sub=document.getElementById("input_sub");
let input_hr=document.getElementById("input_hr");
let input_min=document.getElementById("input_min");
let input_sec=document.getElementById("input_sec");
let input_work=document.getElementById("input_work");
let input_cat=document.getElementById("drop");

let add_new=document.getElementById("add_new");
let schedule_task=document.getElementById("schedule_task");
let start_new =document.getElementById("start_new");

schedule_task.addEventListener("click",()=>{
    start_new.textContent="Update Task";

})
let i=-1;
add_new.addEventListener("click",()=>
{
    if(i==-1)
    {
        task.push({category:input_cat.value,sub:input_sub.value,task1:input_work.value,d1:input_hr.value,d2:input_min.value,d3:input_sec.value});
        console.log(task);
        cal(task);
    }
    else{
        task.splice(i,1);
        task.push({category:input_cat.value,sub:input_sub.value,task1:input_work.value,d1:input_hr.value,d2:input_min.value,d3:input_sec.value});
        console.log("IUnin"+task)
        cal(task);
    }
})

function cal(ta) {
   
    i=-1;
    cat.innerHTML = "";
    work.innerHTML = "";
    duration.innerHTML = "";
    sub.innerHTML = "";
    checkbox.innerHTML="";
    update.innerHTML="";
    
    ta.map((t,index) => 
    {
        let timer_var=true;
        let count1 = t.d1;
        let count2 = t.d2;
        let count3 = t.d3;

        let c = document.createElement("p");
        c.textContent = t.category;
        cat.appendChild(c);

        let s = document.createElement("p");
        s.textContent = t.sub;
        sub.appendChild(s);

        let d = document.createElement("p");
        duration.appendChild(d); 

        let w = document.createElement("p");
        w.textContent = t.task1;
        work.appendChild(w);

        let ch=document.createElement("input");
        ch.type="checkbox";

        ch.addEventListener("click",()=>
        {
            
            
            if(timer_var==true)
            {
                console.log(timer_var);
                timer_var=!timer_var;
                d.textContent = count1 + ":" + count2 + ":" + count3;
                d.style.background="green";
                clearInterval(timer);
            }
            else
            {
                d.style.background="none";
                timer_var=!timer_var;
                start_timer();
            }
        })

        ch.style.margin="12px"
        checkbox.appendChild(ch);
        checkbox.appendChild(document.createElement("br"));

        let up=document.createElement("input");
        up.type="checkbox";

        let selectedIndex=0;
        if(t.category!="Work")
        selectedIndex=1;

        up.addEventListener("click",()=>
        {
            document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
                if (checkbox !== up) {
                    checkbox.checked = false;
                }
            });
        input_sub.value=t.sub;
        input_cat.selectedIndex=selectedIndex;
        input_hr.value=t.d1;
        input_min.value=t.d2;
        input_sec.value=t.d3;
        input_work.value=t.task1;
        i=index;
        })
        up.style.margin="12px";
        update.appendChild(up);
        update.appendChild(document.createElement("br"));

        let timer;
        function start_timer()
        {
        timer = setInterval(() => {
            if (count3 != 0) count3--;
            if (count1 == 0 && count2 == 0 && count3 == 0) {
                d.textContent = count1 + ":" + count2 + ":" + count3;
                d.style.background="red";
                ch.disabled=true; 
                clearInterval(timer);
            } else {
                if (count3 == 0 && count2 == 0) {
                    count1--;
                    count2 = 59;
                    count3 = 59;
                } else if (count3 == 0) {
                    count2--;
                    count3 = 59;
                }
                d.textContent = count1 + ":" + count2 + ":" + count3;
            }
        }, 1000);
    }
   
        start_timer();
    
    });
    
}


cal(task);


let filteredOutput;
let filter=document.getElementById("filter");
let start_filter=document.getElementById("start_filter");

start_filter.addEventListener("click",()=>{
if(filter.value=="")
{
    cal(task);
}
else
{

    filteredOutput=task.filter((a)=>a.category==filter.value)
    console.log(filteredOutput);
    cal(filteredOutput);
}
})


let username=localStorage.getItem("username");
console.log(username)
let user=document.getElementById("u");
let user1=document.createElement("h2");
user1.textContent=username;
user.appendChild(user1);


