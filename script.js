const userContainer = document.getElementById('userContainer');
const reloadBtn = document.getElementById('reloadBtn');

async function fetchUsers() {
    showSkeletons(6); // Show 6 skeletons while loading
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        userContainer.innerHTML = `<p class="error">Failed to fetch data: ${error.message}</p>`;
    }
}

function displayUsers(users) {
    userContainer.innerHTML = "";
    users.forEach(user => {
        const card = document.createElement('div');
        card.classList.add('user-card');
        card.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        `;
        userContainer.appendChild(card);
    });
}

function showSkeletons(count) {
    userContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
        const skeletonCard = document.createElement('div');
        skeletonCard.classList.add('skeleton-card');
        skeletonCard.innerHTML = `
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
        `;
        userContainer.appendChild(skeletonCard);
    }
}

reloadBtn.addEventListener('click', fetchUsers);

// Fetch data on first load
fetchUsers();
