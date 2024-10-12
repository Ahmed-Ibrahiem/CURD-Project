// get total
// create product
// show products
// repeat the product
// search 
// delete product
// delete products
// update products
// check inputs 


let title = document.getElementById('title');
let price = document.getElementById('price');
let taxis = document.getElementById('taxis');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');
let submit = document.getElementById('submit');
let mode = 'create'
let index;
let searchMode = 'title';
let searchTitle = document.getElementById('searchtitle')
let searchCategory= document.getElementById('searchCategory')


// get total

function getTotal(){

    if (price.value != ''){
        let result = (+price.value + +taxis.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }else{
        total.innerHTML = '';
        total.style.background = 'rgb(184, 0, 0)';
    }

}


// ============================================
// create products

let datapro;
if (localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}

submit.onclick = function (){

    let newpro = {
        title:title.value ,
        price:price.value,
        taxis: taxis.value,
        ads: ads.value,
        discount: discount.value,
        total:total.innerHTML,
        category:category.value
    }

    if (title.value !=''&&
        price.value !=''&&
        category.value !=''&&
        count.value <100
    ){
        if(mode === 'create'){
            if (count.value > 0 ){
                for(let i = 0 ; i < count.value ; i++ ){
                    datapro.push(newpro);
                }
            }else{
                datapro.push(newpro);
            }
        }else{
            datapro[index] = newpro ;
            mode = 'create';
            count.style.display = 'block';
            submit.innerHTML = 'create';
            
        }
        cleardata(); 
    }else{

    }
    
    localStorage.setItem('product' , JSON.stringify(datapro));
    getTotal();
    showdata()
    
}

// ============================================
// delete data

function cleardata(){
    title.value = '';
    price.value = '';
    taxis.value = '';
    ads.value = '';
    discount.value = '';
    total.value = '';
    category.value = '';
    count.value = '';
}
// ============================================
// show data

function showdata(){
    let tabel = '';

    for(let i = 0 ; i < datapro.length ; i++){
            tabel += `
                <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxis}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updata(${i})">update</button></td>
                    <td><button onclick="deletedata(${i})">delete</button></td>
                </tr>
            `
            
    }   

    if (datapro.length != []){
        document.getElementById('delete').innerHTML = `<button onclick="deletaAllData()">Delete All ${datapro.length}</button>`
    }else{
        document.getElementById('delete').innerHTML = ''
    }
        document.getElementById('tbody').innerHTML = tabel;
        
}
showdata()

// ====================================================================
// delete data

function deletedata(i){
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro) ;
    showdata();
}

// ====================================================================
//  update data
function updata(i){

    title.value = datapro[i].title;
    price.value = datapro[i].price;
    ads.value = datapro[i].ads;
    taxis.value = datapro[i].taxis;
    discount.value = datapro[i].discount;
    total.value = datapro[i].total;
    category.value = datapro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mode = 'update';
    index = i
    getTotal()
    scroll({
        top:0,
        behavior:'smooth',
    })
    

}

// ======================================================================
// delete all date

function deletaAllData(){
    localStorage.clear();
    datapro = []
    showdata();
}

//=======================================================================
// search product


function searchBox(id){

    
    if (id === 'searchtitle'){
        searchMode = 'title';
    }else{
        searchMode = 'Category'
    }

    search.placeholder = `search by ${searchMode}`
    search.focus();
    search.value = '';
    showdata()
}

search.onkeyup = function(){

    let tabel = '';
    for(let i = 0 ; i< datapro.length ; i++){
        if (searchMode == 'title'){
            
                if(datapro[i].title.includes(search.value)){
                    tabel += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxis}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updata(${i})">update</button></td>
                        <td><button onclick="deletedata(${i})">delete</button></td>
                    </tr>
                `;
                document.getElementById('tbody').innerHTML = tabel;

                }
            
        } 
        else{
            
                if(datapro[i].category.includes(search.value)){
                    tabel += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxis}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updata(${i})">update</button></td>
                        <td><button onclick="deletedata(${i})">delete</button></td>
                    </tr>
                `;
                document.getElementById('tbody').innerHTML = tabel;

                }
            }

    }
    

}
// =======================================================================
// check inputs



