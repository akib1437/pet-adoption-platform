const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => {
            displayPets(data.pets);
        })
        .catch((error) => console.log(error));
};

// for Modal
const loadDetails = async (petId) => {
    console.log(petId)
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
    const res = await fetch(url)
    const data = await res.json();
    displayDetails(data.petData)
}
const displayDetails = (petData) => {
    console.log(petData)
    const detailsContainer = document.getElementById("modal-content")
    document.getElementById("customModal").showModal();

    detailsContainer.innerHTML = `

          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-out min-w-full">
            <img src="${petData.image}" alt="${petData.pet_name}" class="rounded-lg mb-4">
            <h3 class="text-xl font-bold mb-2 "> ${petData.pet_name}</h3>
            <div class="grid grid-cols-2">
                <p class="text-gray-600 text-sm mb-2">Breed: ${petData.breed || "Not Available"}</p>
                <p class="text-gray-600 text-sm mb-2">Birth: ${petData.date_of_birth || "Not Available"}</p>
                <p class="text-gray-600 text-sm mb-2">Gender: ${petData.gender}</p>
                <p class="text-gray-600 text-sm mb-2">Price: ${petData.price || "Not Available"}</p>
                <p class="text-gray-600 text-sm mb-2">Vaccinated status: ${petData.vaccinated_status || "Not Available"}</p>
            </div>
            <p class="text-gray-600 font-bold mb-2">Details Information</p>
            <p class="text-gray-600 text-sm mb-2">Details Information: ${petData.pet_details || "Not Available"}</p>

          </div>
    `
}
let petsData = []; // Store pets data for sorting

const displayPets = (pets) => {
    const petContainer = document.getElementById("pet-cards");
    petContainer.innerHTML = "";

    petsData = pets;

    if (!pets || pets.length === 0) {
        petContainer.classList.remove("grid");
        petContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
          <img src="images/error.png" /> 
          <h2 class="text-center text-xl font-bold"> No Content Here in this Category </h2> 
        </div>`;
    }
    else {
        petContainer.classList.add("grid");

        pets.forEach((pet) => {
            const showPet = document.createElement("div");
            showPet.innerHTML = `
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-out min-w-full">
            <img src="${pet.image}" alt="${pet.pet_name}" class="rounded-lg mb-4">
            <h3 class="text-xl font-semibold mb-2 "> ${pet.pet_name}</h3>
            <p class="text-gray-600 text-sm mb-2">Breed: ${pet.breed || "Not Available"}</p>
            <p class="text-gray-600 text-sm mb-2">Birth: ${pet.date_of_birth || "Not Available"}</p>
            <p class="text-gray-600 text-sm mb-2">Gender: ${pet.gender}</p>
            <p class="text-gray-600 text-sm mb-2">Price: ${pet.price || "Not Available"}</p>
            <div class="flex justify-around">
              <button id="" class="liked-btn bg-gray-200 px-4 py-2 rounded-md"><i class="fa-regular fa-thumbs-up"></i></button>
              <button onclick= "adoptPet('${pet.petId}', this)" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Adopt</button>
              <button onclick="loadDetails('${pet.petId}')" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Details</button>
            </div>
          </div>`;

            const likeButton = showPet.querySelector('.liked-btn')
            likeButton.addEventListener('click', () => {
                LikedImages.push(pet.image)
                displayLikedImages();
            });
            petContainer.append(showPet);
        });
    }
};
let LikedImages = [];

const displayLikedImages = () => {
    const likedPictureContainer = document.getElementById('liked-photos');
    likedPictureContainer.innerHTML = '';

    LikedImages.forEach((imageSrc) => {
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.alt = 'liked-pet';
        imgElement.className = 'liked-image mb-2';
        likedPictureContainer.appendChild(imgElement);
    });
};

const adoptPet = (petId, button) => {
    // Show the adoption modal and set initial message
    const adoptContent = document.querySelector(".adopt-content");
    const modalBackdrop = document.getElementById("modal-backdrop");

    // Show the backdrop and the modal
    modalBackdrop.classList.remove("hidden");

    adoptContent.innerHTML = `
    <div class="flex flex-col text-center ">
        <img class="w-28 mx-auto" src="https://img.icons8.com/?size=48&id=ZDURYTlMxCmV&format=png" alt="">
        <p class="text-4xl font-bold">Congratulations!</p>
        <p class="text-2xl text-gray-700">Adoption process is starting for your pet.</p>
        <div id="countdown" class=" font-bold text-7xl"></div>
    </div>
        
    `;
    const adoptModal = document.getElementById("adoptModal");
    adoptModal.showModal();

    let countdown = 3; 
    const countdownDiv = document.getElementById("countdown");
    countdownDiv.innerHTML = countdown;

    const interval = setInterval(() => {
        countdown--;
        countdownDiv.innerHTML = countdown;

    
        if (countdown < 0) {
            clearInterval(interval);
            button.disabled = true;
            button.textContent = "Adopted";
            adoptContent.innerHTML = `
                <p class="text-lg">Congratulations!</p>
                <p class="text-lg">You have successfully adopted your pet!</p>
            `;
            setTimeout(() => {
                adoptModal.close();
                modalBackdrop.classList.add("hidden");
            });
        }
    }, 1000);
};
// Sort by Price 
const sortByPrice = () => {

    const sortedPets = petsData.sort((a, b) => {
        const priceA = a.price ? parseFloat(a.price) : 0;
        const priceB = b.price ? parseFloat(b.price) : 0;
        return priceB - priceA; // Descending 
    });

    // Clear current container
    const petContainer = document.getElementById("pet-cards");
    petContainer.innerHTML = '';

    // Append sorted to the container
    sortedPets.forEach(pet => {
        const showPet = document.createElement("div");
        showPet.innerHTML = `
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-out min-w-full">
            <img src="${pet.image}" alt="${pet.pet_name}" class="rounded-lg mb-4">
            <h3 class="text-xl font-semibold mb-2 "> ${pet.pet_name}</h3>
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

        const likeButton = showPet.querySelector('.liked-btn')
        likeButton.addEventListener('click', () => {
            LikedImages.push(pet.image)
            displayLikedImages();
        });
        petContainer.append(showPet);
        petContainer.appendChild(showPet);
    });
};
document.getElementById("sort-price-btn").addEventListener("click", sortByPrice);

loadCategories();


