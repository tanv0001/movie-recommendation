//search ->basdeurl + "search/movie?api_key"=<KEY>&query=<search words>
//recommended ->baseurl + "movie/" + <movie_id> "recommendations?api_key=" +<KEY> ++ "&language=en=US"
let app = {
    URL: 'http://api.themoviedb.org./3/',
    imgURL: 'http://image.tmdb.org/t/p/w500/',
    init: function () {
        //focus on the text field 
        let input = document.getElementById('search-input');
        input.focus();

        setTimeout(app.addHandlers, 1234);
    },
    addHandlers: function () {
        //add the click listener
        let btn = document.getElementById('search-button');
        let back = document.getElementById('backBtn');
        back.addEventListener('click', app.goBack);
        btn.addEventListener('click', app.runSearch);
        //add a listener for <ENTER>
        document.addEventListener('keypress', function (ev) {
            let char = ev.char || ev.charCode || ev.which;
            let str = String.fromCharCode(char);
            console.log(char, str);
            if (char == 10 || char == 13) {
                //we have enter or return key
                btn.dispatchEvent(new MouseEvent('click'));
            }
        });
    },
    
    goBack: function (){
        console.log("back button is working!");
        let container = document.querySelector('#search-results .content');
        while(container.hasChildNodes()){
            container.removeChild(container.firstChild);
        }
    },
    
    
    runSearch: function (ev) {
        //do the fetch to get the list of movies

        console.log(ev.type);
        ev.preventDefault();
        //let page=1;
        let input = document.getElementById('search-input');
        if (input.value) {
            //code will not run if the value is an empty string
            // let url=app.URL + "search /movie?api_key=" + KEY + "&query=" + input.value;
            //input.value + "&page" + page;
            let url = `${app.URL}search/movie?api_key=${KEY}&query=${input.value}`; //same as above line of url
            fetch(url)

                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    app.showMovies(data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },


    //    <div class="page active" id="search-results">
    //            <section class="title">You have x resultes</section>
    //            <section class="content">
    //                <div class="movie">
    //                    <img src="img/" alt="poster" class="poster">
    //                    <h2 class="movie-title">Movie title</h2>
    //                    <p class="movie-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat necessitatibus ut magni libero, voluptas suscipit labore sit neque quam facilis accusantium magnam alias beatae officiis nihil eaque ratione dolore non.
    //                    </p>
    //                </div>
    //    
    //    
    showMovies: function (movies) {
        let container = document.querySelector('#search-results .content');
        
        while(container.hasChildNodes()){
            container.removeChild(container.firstChild);
        }
        let df = document.createDocumentFragment();

        movies.results.forEach(function (movie) {
            let h2_title = document.createElement('h2');
            h2_title.textContent = movie.title;
            h2_title.classList.add('movie-title');
            let movie_card = document.createElement("div");

            movie_card.classList.add('movie');
            let img = document.createElement('img');
            img.setAttribute('src', app.imgURL + movie.poster_path);
            img.classList.add('poster');
            let p = document.createElement('p');
            p.textContent = movie.overview;
            p.classList.add('movie-desc');

            console.log(p);

            movie_card.appendChild(img);
            movie_card.appendChild(h2_title);
            movie_card.appendChild(p);
            //ad click listener for getting recommended movies
            movie_card.addEventListener("click", app.getRecommended);
            movie_card.setAttribute("data-movie", movie.id);
            df.appendChild(movie_card);

        });
        container.appendChild(df);
    },

    getRecommended: function (recommend) {
        console.log(recommend);
        let movie_id = recommend.currentTarget.getAttribute("data-movie");
        let url = `${app.URL}movie/${movie_id}/recommendations?api_key=${KEY}`;
        console.log("test", url);

        fetch(url)
            .then(response => response.json())
            .then((data) => {
                if (data.results == 0) {
                    alert("oops!Nothing to show");
                } else {
                    let sr = document.querySelector("#search-results .content");
                    sr.innerHTML = "";
                    
                    console.log("test data.results", data.results);

                    app.showMovies(data);
                }
            })
            .catch(err =>
                console.log(err))

    },
};


document.addEventListener('DOMContentLoaded', app.init);
//DOMContentLoaded listener
//get image config info with fetch
//autofocus on text field


//click listener on search butoon


// keypress listener for enter






//both click and enter call search function 

// Do a fetch call to run the search 

// handle the result - build a list of movies

// new movie content has click listener
//click movie to do a fetch call for recommended
//with recommened redsults back
//navigate to recomend page
//build and display the list of movie recommendations
