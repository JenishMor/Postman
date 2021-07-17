console.log('This is project 6');
//This is all about project 6 in which project we discuss about get request and post request
//This is project in which we can throw get and post request

//utility function:
//create new div and store params in it
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let paramCount = 0;

let jsonBox = document.getElementById('requestJsonBox');
let paramBox = document.getElementById('parameterBox');

paramBox.style.display = 'none';

//When user click on json then json display 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    paramBox.style.display = 'none';
    jsonBox.style.display = 'block';
})

//When user click on parameter then parameter box display
let paramRadio = document.getElementById('paramRadio');
paramRadio.addEventListener('click', () => {
    paramBox.style.display = 'block';
    jsonBox.style.display = 'none';
})

//If the user clickes on + then add more parameters:
let add = document.getElementById('addParam');
add.addEventListener('click', () => {
    console.log('You clicked +');
    let params = document.getElementById('params');
    // let str = '';
    let str = `<div class="form-row">
                <label for="url" class="col-sm-2 col-form-label">Prameter ${paramCount + 2} </label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${paramCount + 2}" placeholder="Enter key of parameter ${paramCount + 2}">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterValue${paramCount + 2}" placeholder="Enter value of parameter ${paramCount + 2}">
                </div>
                <button id="addParam" class="btn btn-primary deleteParam">-</button>
            </div>`;

    // Add new param to the dom
    let paramElement = getElementFromString(str);
    params.appendChild(paramElement);
    // console.log(paramCount);

    //For delete param
    let dltParam = document.getElementsByClassName('deleteParam');
    for (const item of dltParam) {
        item.addEventListener('click', (e) => {
            // console.log('You deleted param', item);
            e.target.parentElement.remove();
        })
    }
    paramCount++;
})

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    console.log('You clicked on submit');
    // let responceJson = document.getElementById('responceJson');
    let responsePre = document.getElementById('responsePre');
    // responceJson.innerHTML = "Please wait.... Fetching your responce.....";
    responsePre.innerHTML = "Please wait.... Fetching your responce.....";

    //Fetching all the value user have enterd:

    let url = document.getElementById('urlBox').value;
    let requestType = document.querySelector("input[name='request']:checked").value;
    let contentType = document.querySelector("input[name='content']:checked").value;

    console.log(contentType);

    if (contentType == 'Params') {
        data = {};
        for (let i = 0; i < paramCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('jsonContent').value;
    }

    // console.log('URL: ', url);
    // console.log('Request type: ', requestType);
    // console.log('content type: ', contentType);
    // console.log('Data: ', data);

    //If the request type is get throw get request:
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responceJson').value = text;
                responsePre.innerHTML = text;
                Prism.highlightAll();
            });
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                // document.getElementById('responceJson').value = text;
                responsePre.innerHTML = text;
                Prism.highlightAll();
            });
    }
})
