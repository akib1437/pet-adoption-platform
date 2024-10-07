const loadPetsByCategory = (category) => {
    const url = `https://openapi.programming-hero.com/api/peddy/category/${category.toLowerCase()}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            displayPetsByCategory(data.data);
        })
        .catch((error) => console.log(error));
};

const displayPetsByCategory = (pets) => {
    handleLoading(pets);
    const petContainer = document.getElementById("pet-cards");
    petContainer.innerHTML = "";

    if (!pets || pets.length === 0) {
        petContainer.classList.remove("grid");
        petContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
          <img src="images/error.webp"/> 
          <h2 class="text-center text-xl font-bold">No Content Here in this Category</h2>
        </div>`;
    } else {
        petContainer.classList.add("grid");

        pets.forEach((pet) => {
            const showPet = document.createElement("div");
            showPet.innerHTML = `
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-out min-w-full">
            <img src="${pet.image}" alt="${pet.pet_name}" class="rounded-lg mb-4">
            <h3 class="text-xl font-semibold mb-2 ">${pet.pet_name}</h3>
            <p class="text-gray-600 text-sm mb-2">Breed: ${pet.breed || "Not Available"}</p>
            <p class="text-gray-600 text-sm mb-2">Birth: ${pet.date_of_birth || "Not Available"}</p>
            <p class="text-gray-600 text-sm mb-2">Gender: ${pet.gender}</p>
            <p class="text-gray-600 text-sm mb-2 price">Price: ${pet.price || "Not Available"}</p>
            <div class="flex justify-around">
              <button class="liked-btn bg-gray-200 px-4 py-2 rounded-md"><i class="fa-regular fa-thumbs-up"></i></button>
              <button onclick= "adoptPet('${pet.petId}', this)" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Adopt</button>
              <button onclick="loadDetails('${pet.petId}')" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Details</button>
            </div> 
          </div>`; 
 
            const likeButton = showPet.querySelector('.liked-btn');
            likeButton.addEventListener('click', () => {
                if (!LikedImages.includes(pet.image)) { // Avoid duplicating liked images
                    LikedImages.push(pet.image);
                }
                displayLikedImages();
            });

            petContainer.append(showPet);
        });
    }
};


// for loader
const handleLoading = (pets) => {
    const petContainer = document.getElementById("pet-cards");
    const loader = document.getElementById("loader");
    const likedPictureContainer = document.getElementById("liked-photos");
    const likedContainer = document.getElementById("liked-container");

    // loader
    loader.style.display = "flex";
    // hide
    petContainer.style.display = "none"; 
    likedPictureContainer.style.display = "none"; 
    likedContainer.style.display = "none"; 

    setTimeout(() => {
        if (!pets || pets.length === 0) {
            petContainer.classList.remove("grid");
            loader.style.display = "none"; 
            petContainer.style.display = "block"; 
            likedPictureContainer.style.display = "grid"; 
            likedContainer.style.display = "grid";
        } else {
            // Add grid 
            petContainer.classList.add("grid");
            loader.style.display = "none"; // Hide the loader
            petContainer.style.display = "grid"; 
            likedPictureContainer.style.display = "grid"; 
            likedContainer.style.display = "grid"; 
        }
    }, 2000);
};

const setActiveButton = (activeBtnId) => {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach((button) => {
        if (button.id === activeBtnId) {
            button.classList.add('bg-secondary-bg');
            
        }
        else {
            button.classList.remove('bg-secondary-bg');
        }
    });
}
const sortButton = document.getElementById("sort-price-btn");

document.getElementById("dogs-btn").addEventListener("click", () => {
    document.getElementById("loader").style.display = "flex";
    loadPetsByCategory("dog")
    setActiveButton("dogs-btn")
    sortButton.disabled = true;
});
document.getElementById("cats-btn").addEventListener("click", () => {
    document.getElementById("loader").style.display = "flex";
    loadPetsByCategory("cat")
    setActiveButton("cats-btn")
    sortButton.disabled = true;
});
document.getElementById("rabbits-btn").addEventListener("click", () => {
    document.getElementById("loader").style.display = "flex";
    loadPetsByCategory("rabbit")
    setActiveButton("rabbits-btn")
    sortButton.disabled = true;
});
document.getElementById("birds-btn").addEventListener("click", () => {
    document.getElementById("loader").style.display = "flex";
    loadPetsByCategory("bird")
    setActiveButton("birds-btn")
    sortButton.disabled = true;
});
