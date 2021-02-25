const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
fetch(imgUrl).then(res => res.json()).then(parsedRes => {
    parsedRes.message.forEach((dog) => {
        addDogImage(dog);
    })
})

function addDogImage(url) {

    const dogImgContainer = document.getElementById("dog-image-container");

    const newImg = document.createElement('img');

    newImg.src = url

    dogImgContainer.append(newImg);

}

const breedUrl = 'https://dog.ceo/api/breeds/list/all'
fetch(breedUrl).then(res => res.json()).then(parsedRes => {
    
    const info = parsedRes.message

    filteredBreedList(info)
    
    const breeds = document.getElementById('dog-breeds').querySelectorAll('li');
    dynamicDropdown(breeds);
    document.getElementById('breed-dropdown').addEventListener('change', function(event) {
        filteredBreedList(info, event.target.value);
        console.log(breeds);
    })
})

function filteredBreedList(obj, letter="All") {
    clearBreedsList()
    for (const breed in obj) {
        if (obj[breed].length > 0) {
            obj[breed].forEach(sub => {
                name = `${sub} ${breed}`
                if (letter === "All") {
                    addDogBreed(name)
                } else {
                    if (sub[0] === letter) {
                        addDogBreed(name)
                    }
                }
            })
        }
    }
}

function clearBreedsList() {
    const breedsList = document.getElementById('dog-breeds')
    breedsList.querySelectorAll('li').forEach(item => {
        breedsList.removeChild(item);
    })
}

function addDogBreed(url) {
    const dogBreedList = document.getElementById("dog-breeds");

    const newBreed = document.createElement('li');

    newBreed.addEventListener('click', function(event) {
        event.target.style.color = "purple"
    })

    newBreed.innerText = url

    dogBreedList.append(newBreed);

}

function dynamicDropdown(arr) {
    
    function newOption(letter) {
        const newOp = document.createElement('option')

        newOp.innerText = letter;
        newOp.setAttribute('value', letter);

        document.getElementById("breed-dropdown").append(newOp);
    }

    const newArr = []

    arr.forEach(i => {
        if(!newArr.includes(i.innerText[0])){
            newArr.push(i.innerText[0]);
        }
    })

    newArr.sort()

    newArr.forEach(letter => {
        newOption(letter);
    })

}
