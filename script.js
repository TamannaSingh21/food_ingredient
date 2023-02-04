let searchBtn = document.getElementById("search-icon");
let searchRes = document.getElementById("search-results");
searchBtn.addEventListener("click", function () {
  let searchPara = document.getElementById("search-bar").value;
  console.log(searchPara);
  const ajax = new XMLHttpRequest();
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchPara}`;
  console.log(url);
  ajax.open("GET", url, true);
  ajax.onreadystatechange = function () {
    if (this.status === 200 && this.readyState === 4) {
      console.log(this.responseText);
      let data = JSON.parse(this.responseText);
      let objectCount = Object.keys(data.meals).length;
      let count = 1;
      let temp = 0;
      searchRes.innerHTML = "";
      for (let i = 0; i < objectCount; i++) {
        if (i % 2 == 0) {
          searchRes.innerHTML += `<div class="row" id="card-${count}"></div>`;
          temp = count;
          count++;
          document.getElementById(
            `card-${temp}`
          ).innerHTML += `<div class="col-sm-12 col-md-6">
                    <div class="card mt-5" style="width: 100%;">
                    <div class="card mt-5 shadow-lg" style="width: 100%;">
                        <img src="${data.meals[i].strMealThumb}" class="card-img-top" alt="Food Pic">
                        <div class="card-body mb-3">
                          <h3 class="card-title text-center">${data.meals[i].strMeal}</h3>
                          <div class="text-center mt-5" class="btn">
                          <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModalCenter">
                          Get Recipe
                        </button>
                        
                        
                        </div>
                          
                        </div>
                    </div>
                </div>`;
        } else {
          document.getElementById(
            `card-${temp}`
          ).innerHTML += `<div class="col-sm-12 col-md-6">
                    <div class="card mt-5" style="width: 100%;">
                    <div class="card mt-5 shadow-lg" style="width: 100%;">
                        <img src="${data.meals[i].strMealThumb}" class="card-img-top" alt="Food Pic">
                        <div class="card-body mb-3">
                          <h3 class="card-title text-center">${data.meals[i].strMeal}</h3>
                          <div class="text-center mt-5" class="btn">
                          <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModalCenter">
                          Get Recipe
                        </button>
                          </div>
                        </div>
                    </div>
                </div>`;
        }
      }
      for (let i = 0; i < objectCount; i++) {
        searchRes
          .querySelectorAll("button")
          [i].addEventListener("click", function () {
            searchRes.innerHTML += `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                      <div class="modal-content text-center">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLongTitle">${data.meals[i].strCategory}</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <p>${data.meals[i].strInstructions}</p>
                        </div>
                        <div class="yt-link text-center mt-3">
                            <a href="${data.meals[i].strYoutube}" target="_blank" class="text-center mt-3">Watch the YouTube Video</a>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>`;
          });
      }
    }
  };
  ajax.send();
});