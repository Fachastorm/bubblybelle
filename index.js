  // function validateForm() {
  // var name =  document.getElementById('name').value;
  // if (name == "") {
  //     document.getElementById('status').innerHTML = "Name cannot be empty";
  //     return false;
  // }
  // var email =  document.getElementById('email').value;
  // if (email == "") {
  //     document.getElementById('status').innerHTML = "Email cannot be empty";
  //     return false;
  // } else {
  //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //     if(!re.test(email)){
  //         document.getElementById('status').innerHTML = "Email format invalid";
  //         return false;
  //     }
  // }
  // var subject =  document.getElementById('subject').value;
  // if (subject == "") {
  //     document.getElementById('status').innerHTML = "Subject cannot be empty";
  //     return false;
  // }
  // var message =  document.getElementById('message').value;
  // if (message == "") {
  //     document.getElementById('status').innerHTML = "Message cannot be empty";
  //     return false;
  // }
  // document.getElementById('status').innerHTML = "Sending...";
  // document.getElementById('contact-form').submit();

  // }


//Toggle Highlight 
$(document).ready(function(){ 
  $('.card-body').on('click', function(){
    $('div.active').removeClass('active');
    $(this).toggleClass('active');
  });
  });


//Cart
const shoppingCart = (function() {

  cart = [];
  
  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
  
  // Save cart
  function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
    // Load cart
  function loadCart() {
    cart = JSON.parse(localStorage.getItem('shoppingCart'));
  }
  if (localStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  const obj = {};

  obj.addItemToCart = function(name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    let shipping = 10.99;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count + shipping;
    }
     return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  return obj;
})();


// Add item
$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();

  console.log(name)
  console.log(price)
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for(var i in cartArray) {
    output += 
    ` <li class="list-group-item d-flex justify-content-between lh-condensed">
    <div>
      <h6 class="my-0 productName" data-name=${cartArray[i].name}>${cartArray[i].name}</h6>
      <small class="text-muted">Quantity: ${cartArray[i].count} </small>
    </div>
    <span class="text-muted price">${cartArray[i].price}</span>
    <i class="fas fa-times removeItem" data-name="${cartArray[i].name}"></i>
    </li>
  `
  }
  $('.items').html(output);
  $('.total').html('$' + shoppingCart.totalCart());
  $('.totalCount').html(shoppingCart.totalCount());
}

// Delete item button

$('.items').on("click", ".removeItem", function() {
  console.log($(this).data)
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


displayCart();
