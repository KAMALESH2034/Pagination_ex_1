
let xhr = new XMLHttpRequest;
xhr.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",true);
xhr.onload = function(){
    if(200<=xhr.status<=300)
    {
            let response = JSON.parse(xhr.responseText);

            // create Html element in DOM

            let paginationBlock = document.createElement("div");
            paginationBlock.style.cssText ="background: #bcecf7; width: 85%; margin: 3% 8%;";
            
            let listContainer = document.createElement("div")
            let list = document.createElement("div");
            list.style.width="100%";
            list.style.display="flex";
            list.style.alignItems="center";
            
            let id = document.createElement("div");
            id.style.cssText = "width:15%;padding:12px 20px;background: #056b82;color: #fff;";
            id.style.fontFamily = "sans-serif"
            id.innerText = "S.No";
            let name = document.createElement("div");
            name.innerText = "NAME";
            name.style.cssText ="width:40%;padding:12px 20px;background: #056b82;color: #fff;";
            name.style.fontFamily="sans-serif"
            let email = document.createElement("div");
            email.innerText = "EMAIL";
            email.style.cssText ="width:45%;padding:12px 20px;background: #056b82;color: #fff;";
            email.style.fontFamily="sans-serif";
            list.append(id,name,email);
            paginationBlock.appendChild(list);                    

                   
   

    // Pagination
    let paginateDataObj = response;
    let numberOfPage = Math.ceil(response.length/10);
    let currentPage = 1;
    paginate(1);
    
    let paginateNo =  document.createElement("div");
    paginateNo.style.cssText = "display:flex;justify-content: center;margin-top: 30px;";
    
    let prev = document.createElement("button");
    prev.style.cssText= "background: #d6d0cb;border: 1px solid #ccc;padding: 5px 10px;cursor:pointer;border-radius: 10px 0px 0px 10px;"
    prev.innerText = "Prev";
    let middle = document.createElement("div");
    let next = document.createElement("button");
    next.style.cssText= "background: #d6d0cb;border: 1px solid #ccc;padding: 5px 10px;cursor:pointer;border-radius: 0px 10px 10px 0px;"
    next.innerText = "Nxt";

    function setActiveButton(pageNum) {
            let buttons = middle.querySelectorAll('button');
            buttons.forEach(function(button) {
                button.classList.remove('active');
            });
            
            let activeButton = middle.querySelector('button:nth-child(' + pageNum + ')');
            activeButton.classList.add('active');
    }

    
    for(i=1;i<=numberOfPage;i++){
        let btn = document.createElement("button");
        btn.style.cssText= "background: white;border: 1px solid #ccc;padding: 5px 10px;cursor:pointer;"
        btn.innerText = i;
        btn.addEventListener("click",(function(pageNum) {
            return function() {
                paginate(pageNum);
                setActiveButton(pageNum);
            };
        })(i));
        middle.appendChild(btn);

    }


    next.addEventListener("click",function(){
        if(currentPage < numberOfPage){
            currentPage++;
            paginate(currentPage);
            setActiveButton(currentPage);
        }
        
    });


    prev.addEventListener("click", function(){
        if(currentPage > 1) {
            currentPage--;
            paginate(currentPage);
            setActiveButton(currentPage);
        }
    });

     
    function paginate(pageNumber) {
        
        currentPage = pageNumber;
        listContainer.innerHTML = '';
        let startIndex = (pageNumber - 1)*10;
        let endIndex = startIndex + 10;
        let paginateData = paginateDataObj.slice(startIndex,endIndex);
       
        for(i=0;i<paginateData.length;i++){
        
        let listItems = document.createElement("div");
        listItems.style.cssText = "width:100%;display:flex;align-items:center;border-bottom:1px solid #031a03;"
        
        let id = document.createElement("div");
        id.style.cssText = "width:15%;padding:10px 20px;";   
        id.style.fontFamily="sans-serif";         
        let name = document.createElement("div");            
        name.style.cssText ="width:40%;padding:10px 20px;";
        name.style.fontFamily="sans-serif";
        let email = document.createElement("div");            
        email.style.cssText ="width:45%;padding:10px 20px;";
        email.style.fontFamily="sans-serif";
        id.innerText = paginateData[i].id;
        name.innerText = paginateData[i].name;
        email.innerText = paginateData[i].email;
        listItems.append(id,name,email);
        listContainer.appendChild(listItems);                 

        }
    }

    paginationBlock.appendChild(listContainer);
    document.body.appendChild(paginationBlock);
    document.body.appendChild(paginateNo);
    paginateNo.append(prev,middle,next);
    setActiveButton(currentPage);
    }
    else{
        console.log("The Response is Failed")
    }
}
xhr.onerror = function(){
    console.log("Error");
}
xhr.send();
