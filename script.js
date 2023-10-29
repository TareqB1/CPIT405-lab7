const btnXHR = document.getElementById('xhrsearch');
const btnFetch = document.getElementById('fetchSearch');
const btnFetchAsyncAwait = document.getElementById('fetchAsyncAwaitSearch');

let searchQueryElem = document.getElementById('query');
let searchResults = document.getElementById('searchResults');


const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = '88F8xvTJ1jM-cXEYA_z5Wb_F_7Xml876vg7vFiSh8zE';

btnXHR.addEventListener('click', function () {
    searchResults.innerHTML = '';
    searchUsingXHR(searchQueryElem.value);
});

btnFetch.addEventListener('click', function () {
    searchResults.innerHTML = '';
    searchUsingFetch(searchQueryElem.value);
});
btnFetchAsyncAwait.addEventListener('click', function () {
    searchResults.innerHTML = '';
    searchUsingFetchAsyncAwait(searchQueryElem.value);
});


function searchUsingXHR(query) {
    if (!query || query.trim().length === 0) {
        return;
    }
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            displayResults(JSON.parse(xhr.responseText));
        }
    });
    let params = "client_id=" + API_KEY + "&query=" + query + "&per_page=6";
    xhr.open('GET', API_URL + '?' + params);
    xhr.send();

}


function displayResults(respObject) {
    for (item of respObject.results) {
        let imgElement = document.createElement("img");
        imgElement.src = item.urls.small;
        imgElement.alt = item.alt_description;
        let imageContainer = document.createElement("div");
        imageContainer.appendChild(imgElement);

        // Info 1 -> Title
        if (item.description || item.alt_description) {
            let titleElement = document.createElement("p");
            titleElement.textContent = item.description || item.alt_description;
            imageContainer.appendChild(titleElement);
        }

        // Info 2 -> Created by
        if (item.user && item.user.name) {
            let creatorNameElement = document.createElement("p");
            creatorNameElement.textContent = "Created By: " + item.user.name;
            imageContainer.appendChild(creatorNameElement);
        }

        // Info 3 -> Date
        if (item.created_at) {
            let dateElement = document.createElement("p");
            let date = new Date(item.created_at);
            dateElement.textContent = "Date: " + date.toLocaleDateString();
            imageContainer.appendChild(dateElement);
        }

        searchResults.appendChild(imageContainer);
    }
}



function searchUsingFetch(query) {
    if (!query || query.trim().length === 0) {
        return;
    }
    let params = "client_id=" + API_KEY + "&query=" + query + "&per_page=6";
    fetch(API_URL + '?' + params, { method: "GET" })
        .then((response) => {
            return response.text();
        }).then((text) => {
            displayResults(JSON.parse(text));
        })
        .catch((error) => {
            console.log(error);
        });


}


async function searchUsingFetchAsyncAwait(query) {
    if (!query || query.trim().length === 0) {
        return;
    }
    let params = "client_id=" + API_KEY + "&query=" + query + "&per_page=6";
    let response = await fetch(API_URL + '?' + params, { method: "GET" });
    let data = await response.json();
    displayResults(data);
}



