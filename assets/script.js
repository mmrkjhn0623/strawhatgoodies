function openNav() {
  document.getElementById("mobile-nav").style.width = "320px";
}
          
function closeNav() {
  document.getElementById("mobile-nav").style.width = "0%";
}
Shopify.queryParams = {};

  // Preserve existing query parameters
  if (location.search.length) {
    var params = location.search.substr(1).split('&');

    for (var i = 0; i < params.length; i++) {
      var keyValue = params[i].split('=');

      if (keyValue.length) {
        Shopify.queryParams[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
      }
    }
  }

  function changeDisplayType(displaytype){
    if(displaytype == 'prod-list'){
      document.getElementById("prod-view").classList.remove('prod-grid');
      document.getElementById("prod-view").classList.add('prod-list'); 
      localStorage.setItem("displaytype", "prod-list");
    }
    else{
      document.getElementById("prod-view").classList.remove('prod-list');
      document.getElementById("prod-view").classList.add('prod-grid');
      localStorage.setItem("displaytype", "prod-grid");
    }
  }
  function addParameterToURL(paramName, paramValue) {
    var url = new URL(window.location);
    var searchParams = url.searchParams;
    searchParams.set(paramName, paramValue);
    
    // Update the URL without a full page reload
    window.history.pushState({}, '', url);
  }

  document.addEventListener('DOMContentLoaded', function() {
    
    var url = new URL(window.location.href);
    var newsletteradded = url.searchParams.get('customer_posted');
    var contactposted = url.searchParams.get('contact_posted');
    if(newsletteradded == 'true'){
      document.querySelector('h3.newsletter-added').style.display = 'block';
      window.location.href = '#newsletter_form';
    }
    if(contactposted == 'true'){
      document.getElementById('contact_form').style.display = 'none';
      document.getElementById('contact-submitted').style.display = 'block';
    }
    
    var displaytype = url.searchParams.get('displaytype');

    if(!localStorage.getItem("displaytype")){
      localStorage.setItem("displaytype", "prod-grid");
    }
    
    if(localStorage.getItem("displaytype") == 'prod-list'){
      document.getElementById("prod-view").classList.remove('prod-grid');
      document.getElementById("prod-view").classList.add('prod-list'); 
    }
    else{
      document.getElementById("prod-view").classList.remove('prod-list');
      document.getElementById("prod-view").classList.add('prod-grid');
    }

    document.getElementById('shop-breadcrumb').innerHTML = document.querySelector('ul.header-nav a.active').innerHTML;
    
});
 
function QuickViewItem(product_id){
    document.getElementById(product_id+'qvc').style.zIndex = '9999';
    document.getElementById(product_id+'qvc').style.transition = '0.3s opacity';
    document.getElementById(product_id+'qvc').style.opacity = '1.0';
}
function CloseQV(product_id){
  document.getElementById(product_id+'qvc').style.opacity = '0.0';
  document.getElementById(product_id+'qvc').style.transition = '0.0s opacity';
  document.getElementById(product_id+'qvc').style.zIndex = '-999';
}
function SelectProdImage(product_id, image_url){
  document.getElementById(product_id + 'mainqvimg').src = image_url;
}

function AddtoCartAjax() {
  const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');
  addToCartForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      fetch('/cart/add', {
        method: "post",
        body: new FormData(form),
      }).then(response => {
        PopupMessage('Product added to your cart');
        UpdateItemCount()
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  });
}
function PopupMessage(message){
  document.getElementById('popupmessage').innerHTML = message;
  document.getElementById('atc-success').style.zIndex = '999';
  document.getElementById('atc-success').style.transition = '0.2s opacity';
  document.getElementById('atc-success').style.opacity = '1.0'; 
}
function ClosePopup(){
  document.getElementById('atc-success').style.opacity = '0.0'; 
  document.getElementById('atc-success').style.transition = '0.0s opacity';
  document.getElementById('atc-success').style.zIndex = '-999';
}
function UpdateItemCount(){
  fetch("/cart.json")
  .then((res) => res.json())
  .then((cart) => {
    document.getElementById("cart-item-count").textContent = cart.item_count;
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
}
