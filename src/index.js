// write your code here 
document.addEventListener("DOMContentLoaded", initialise)

function initialise () {
    displayImages()
    showRamen()
    addRamen()
    document.getElementById("delete-ramen").addEventListener("click", deleteRamen)
}

function displayImages () {
    let menu = document.getElementById("ramen-menu")
    menu.innerHTML=""
    fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(json => {
        for (const item of json) {
            let img = document.createElement("img")
            img.src = item.image
            img.id = `${item.id}`
            menu.append(img)
            img.addEventListener("click", function(event) {
                let ramenId = event.target.id
                showRamen(ramenId)
            })
        }
    })
}

function showRamen (ramenId=1) {
    fetch(`http://localhost:3000/ramens/${ramenId}`)
        .then(res => res.json())
        .then(json => {
            let image = document.getElementsByClassName("detail-image")[0]
            image.src = json.image
            let name = document.getElementsByClassName("name")[0]
            name.textContent = json.name
            let restaurant = document.getElementsByClassName("restaurant")[0]
            restaurant.textContent = json.restaurant
            let rating = document.getElementById("rating-display")
            rating.textContent = json.rating
            let comment = document.getElementById("comment-display")
            comment.textContent = json.comment
        }
    )
}

function addRamen () {
    document.getElementById("new-ramen").addEventListener("submit", function (event) {
        event.preventDefault()
        let new_name = document.getElementById("new-name").value;
        let new_restaurant = document.getElementById("new-restaurant").value;
        let new_image = document.getElementById("new-image").value;
        let new_rating = document.getElementById("new-rating").value;
        let new_comment = document.getElementById("new-comment").value;
        fetch("http://localhost:3000/ramens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                name: new_name,
                restaurant: new_restaurant,
                image: new_image,
                rating: new_rating,
                comment: new_comment
            }),
        })
        displayImages()
        document.getElementById("new-ramen").reset()
    })    
}

function deleteRamen () {
    ramenDisplayed=document.getElementsByClassName("name")[0].innerHTML
    fetch("http://localhost:3000/ramens")
    .then(res => res.json())
    .then(json => {
        for (const item of json) {
            if (item.name == ramenDisplayed) {
                fetch(`http://localhost:3000/ramens/${item.id}`, {
                    method: "DELETE"
                })
                .then(res => {
                    res.json()
                    displayImages()
                })
            } else {
                null
            }
            }
        })
    }

    