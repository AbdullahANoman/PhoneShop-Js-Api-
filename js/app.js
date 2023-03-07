const loadingData = async(searchText,limit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data =  await res.json();
    displayLoadingData(data.data,limit);
}

const displayLoadingData = (phones,limit)=>{
   
    const showAll = document.getElementById('show-all');
    if(limit && phones.length>5){
        phones =phones.slice(0,6);
        showAll.classList.remove('d-none')
    }
    else{
       showAll.classList.add('d-none')
        
    }
    
    const container = document.getElementById('phones-container')
    container.innerHTML = ``

    const noFoundMessage = document.getElementById('no-found-message');
    if(phones.length == 0){
        noFoundMessage.classList.remove('d-none')
    }
    else{
        noFoundMessage.classList.add('d-none')
    }
    phones.forEach(phone =>{
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
     
                  <div class="card">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="displayModal('${phone.slug}')"> Show Details</button>
                    </div>
                  </div>
              
        `
        container.appendChild(div);
    })
    loader(false)
}
const displayModal = async(id) =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayModalData(data.data);
}
const displayModalData = data =>{
    const modalTittle = document.getElementById('exampleModalLabel');
    modalTittle.innerHTML = `
    ${data.name}
    `
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <img src="${data.image}" class="card-img-top" alt="...">
    <p class="fw-bold"> Description : </p> <br>
    <p> Release Date : ${data.releaseDate} </p>
    <p> Storage : ${data.mainFeatures.storage} </p>

    `
}
document.getElementById('search-field').addEventListener('keypress',function(e){
    if(e.key == 'Enter'){
        processSearch(10);
    }
})
document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
    showAll.classList.add('d-none')
})
const processSearch = (limit) =>{
    loader(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    loadingData(searchText,limit);
}
document.getElementById('search-btn').addEventListener('click',function(){
    processSearch(10);
})

const loader = isLoading =>{
    const load = document.getElementById('loader');
    if(isLoading== true){
        load.classList.remove('d-none')
    }
    else{
        load.classList.add('d-none')
    }
} 

// loadingData();