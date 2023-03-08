export class Home {
    constructor (){
        this.defaultApi();
        this.fetchApi ();
    }
    async defaultApi (){
        let loading = document.querySelector('.loading') ;
        loading.classList.remove("d-none");
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '00a22af51bmsh3d6ce6b623b57b1p174fcejsnc8c058b0457b',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=mmorpg`, options)
        const response = await  api.json(); 
        this.displayData(response); 
        loading.classList.add("d-none");
    }
    
    async fetchApi (){
        
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '00a22af51bmsh3d6ce6b623b57b1p174fcejsnc8c058b0457b',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        
        let item = document.querySelectorAll('.nav-item .nav-link')
        
        for (let i = 0; i < item.length; i++) {
            item[i].addEventListener('click' , async (eventInfo)=>{
            let category = eventInfo.target.getAttribute('value') ;
            
            document.querySelector('.menu .active').classList.remove("active");
            eventInfo.target.classList.add("active");

            let loading = document.querySelector('.loading') ;
            loading.classList.remove("d-none");

            const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options)
            const response = await  api.json(); 
            this.displayData(response);
            loading.classList.add("d-none");
            })
        }
    }

    displayData (response){
        let temp = `` ;
        for (let j = 0; j < response.length; j++) {
            temp +=`
            <div class=" col-12  col-md-4  col-xxl-3  my-3 col" data-id="${response[j].id}" >
            <div class="card-box ">
            <div class="card border-0 m-3 " >
                <img src="${response[j].thumbnail}" class="card-img-top" alt="...">
                <div class="card-body p-0 text-center">
                <div class="d-flex justify-content-between mt-3">
                    <h5 class="card-title text-white text-dark ">${response[j].title}</h5>
                    <button class="btn text-bg-primary btn-sm fw-bold">Free</button>
                </div>
                <p class="card-text ">${response[j].short_description.split(" ").splice(0,7)}</p>
                </div>
            </div>
            <div class="card-footer px-3 py-2 d-flex justify-content-between border-top">
                <span class="badge">${response[j].genre}</span>
                <span class="badge">${response[j].platform}</span>
            </div>
            </div>
        </div>
            `
            document.querySelector('.home .row').innerHTML = temp ;
            let col=document.querySelectorAll(".col")
            for (let i = 0; i < col.length; i++) {
                col[i].addEventListener("click", (e) => {
                this.getDetails(response[i].id) ;
            })
            }
    }
}

    async getDetails (id){
        let loading = document.querySelector('.loading') ;
        loading.classList.remove("d-none");

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '00a22af51bmsh3d6ce6b623b57b1p174fcejsnc8c058b0457b',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
            const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
            const responseDetails = await api.json(); 
            
            let details =  document.querySelector ('.details') ;
            let home =  document.querySelector ('.home') ;
            details.classList.replace("d-none", "d-block");
            home.classList.replace("d-block", "d-none");
            this.displayDetails(responseDetails);
            document.querySelector('.btn-close').addEventListener('click' , ()=>{
                details.classList.replace("d-block", "d-none");
                home.classList.replace("d-none", "d-block");
                loading.classList.add("d-none");
                
            })
    }

    displayDetails(responseDetails){
     let temp =`` ;
     console.log(responseDetails) ;
     console.log("responseDetails") ;
        temp += `
        <div class="col-md-4">
          <img class="w-100" src="${responseDetails.thumbnail}" alt="image details">
        </div>
        <div class="col-md-8">
          <h3> Title:${responseDetails.title} </h3>
          <p>Category: <span class="badge text-bg-info"  > ${responseDetails.genre} </span> </p>
          <p>Platform: <span class="badge text-bg-info"  > ${responseDetails.platform} </span> </p>
          <p>Status: <span class="badge text-bg-info"  > ${responseDetails.status} </span> </p>
          <p class="small">
          ${responseDetails.description}
          </p>
          <a href="${responseDetails.game_url}" class="btn btn-outline-warning " target="_blank" >Show Game </a>
        </div>
        `
        document.querySelector('#detailsContent').innerHTML = temp ;
        
    }
    
}
