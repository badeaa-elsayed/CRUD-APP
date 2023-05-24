var productNameInput = document.getElementById('ProductName')
var productPriceInput = document.getElementById('productPrice')
var productCategoryInput = document.getElementById('productCategory')
var productDescInput = document.getElementById('productDesc')
var alarm = document.getElementById('alarm');
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var indexUpdated = 0;

var productContainer = [];

if (localStorage.getItem('product') != null) {
    productContainer = JSON.parse(localStorage.getItem('product'));
    displayProduct(productContainer);
}

function addProduct() {
    if (validate() == true) {

        var product = {
            pName: productNameInput.value,
            pPrice: productPriceInput.value,
            pCategory: productCategoryInput.value,
            pDesc: productDescInput.value
        }

        productContainer.push(product)

        displayProduct(productContainer);
        localStorage.setItem('product', JSON.stringify(productContainer));
        clearForm();
    } else {
        alarm.classList.replace("d-none", "d-block")
    }
}

/// Display Data From Array ////
function displayProduct(arr) {
    var cartoona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <tr>
            <td>${arr[i].pName}</td>
            <td>${arr[i].pPrice}</td>
            <td>${arr[i].pCategory}</td>
            <td>${arr[i].pDesc}</td>
            <td><button onclick='deleteProduct(${i});' class="btn btn-outline-danger btn-sm">Delete</button></td>
            <td><button onclick='setFormForUpdate(${i});' class="btn btn-outline-warning btn-sm">Update</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = cartoona

}

//// Clear Form After click addProduct button ////
function clearForm() {
    productNameInput.value = '';
    productPriceInput.value = '';
    productCategoryInput.value = '';
    productDescInput.value = '';
}

//// Delete Product From Array ////
function deleteProduct(productIndex) {
    productContainer.splice(productIndex, 1);
    localStorage.setItem('product', JSON.stringify(productContainer));
    displayProduct(productContainer);
}

//// Search Product From Array ////
function searchProducts(term) {
    var matchedProducts = [];
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].pName.toLowerCase().includes(term.toLowerCase()) == true) {
            matchedProducts.push(productContainer[i])
        }
    }
    displayProduct(matchedProducts);
}

function setFormForUpdate(index) {
    indexUpdated = index;
    addBtn.classList.replace("d-block", "d-none");
    updateBtn.classList.replace("d-none", "d-block");
    productNameInput.value = productContainer[index].pName;
    productPriceInput.value = productContainer[index].pPrice;
    productCategoryInput.value = productContainer[index].pCategory;
    productDescInput.value = productContainer[index].pDesc;
}



function updateProduct() {
    var product = {
        pName: productNameInput.value,
        pPrice: productPriceInput.value,
        pCategory: productCategoryInput.value,
        pDesc: productDescInput.value
    }
    productContainer.splice(indexUpdated, 1, product);
    localStorage.setItem('product', JSON.stringify(productContainer));
    displayProduct(productContainer);
    clearForm();
    addBtn.classList.replace("d-none", "d-block")
    updateBtn.classList.replace("d-block", "d-none");
}


function validate() {
    var regex = /^[A-Z][a-z]{3,8}$/;
    return regex.test(productNameInput.value);
}