// EVENT LISTENERS

$('.card-container').on( 'click', '.delete', function() {
  removeFromDOM(this);
  removeFromLocalStorage(this); 
});

function putIntoStorage(object) {
  var stringifiedObject = JSON.stringify(object);
  localStorage.setItem(object['id'], stringifiedObject);
}


// At the end, try to dry up pull something from storage


// add two event listeners for 'enter button' functionality
// come back later - getting an error message for this:

// $('.card-container').keypress('article h2', function(event) {
//   if (event.keyCode === 13) {
//     event.preventDefault();
//     updateTitle();
//   }
// });

// function updateTitle() {
//   var cardID = $(this).closest('article').attr('id');
//   var pullCardID = localStorage.getItem(cardID);
//   var parsedCardId = JSON.parse(pullCardID);
//   parsedCardId.title = $(this).text();
//   putIntoStorage(parsedCardId);
// }


$('.card-container').on('blur', 'article h2', function () {
  var cardID = $(this).closest('article').attr('id');
  var pullCardID = localStorage.getItem(cardID);
  var parsedCardId = JSON.parse(pullCardID);
  parsedCardId.title = $(this).text();
  putIntoStorage(parsedCardId);
});

$('.card-container').on('blur', 'article p', function() {
  var cardID = $(this).closest('article').attr('id');
  var pullCardID = localStorage.getItem(cardID);
  var parsedCardId = JSON.parse(pullCardID);
  parsedCardId.body = $(this).text();
  putIntoStorage(parsedCardId);
});

// try to make a 'get local id' function before we pull for

// function testTest(x) {
//   var cardQuality = $(x).closest('article');
//   var cardID = $(cardQuality).attr('id');
//   var pullCardID = localStorage.getItem(cardID);
//   var parsedCardId = JSON.parse(pullCardID);
//   console.log(parsedCardId)
//   return parsedCardId;
//   }

// come back to experiment with making these shorter

$('.card-container').on('click', '.upvote', function() {
  var cardQuality = $(this).closest('article');
  var cardID = $(cardQuality).attr('id');
  var pullCardID = localStorage.getItem(cardID);
  var parsedCardId = JSON.parse(pullCardID);
  var qualityDisplay = $(this).siblings('h3').find('.qualityValue');
  var qualityArray = ['none','low', 'normal', 'high', 'critical'];
  if (parsedCardId.counter === 4) {
    $(this).attr('disabled', true);
  } else {
    parsedCardId.counter++;
    qualityDisplay.text(qualityArray[parsedCardId.counter]);
  };
  putIntoStorage(parsedCardId);
});


$('.card-container').on('click', '.downvote', function() {
  var cardQuality = $(this).closest('article');
  var cardID = $(cardQuality).attr('id');
  var pullCardID = localStorage.getItem(cardID);
  var parsedCardId = JSON.parse(pullCardID);
  var qualityDisplay = $(this).siblings('h3').find('.qualityValue');
  var qualityArray = ['none','low', 'normal', 'high', 'critical'];
  if (parsedCardId.counter === 0) {
    $(this).attr('disabled', true);
  } else {
    parsedCardId.counter--;
    qualityDisplay.text(qualityArray[parsedCardId.counter]);
  };
  putIntoStorage(parsedCardId);   
});

$(document).ready(function() {
  for (var i in localStorage) {
    displayIdea(i);
  }
});

$('#title-input').focus();

$('.save-btn').on('click', function(event) {
  event.preventDefault();
  saveCard();
  });

$('#title-input').on('keyup', function () {
  if ($('#title-input').val() ==='') {
    disableButton();
  } else {
    enableButton()
  }
});

// rename to filter?

$('#search').on('keyup', function() {
  searchTitle();
  searchBody();
});

// FUNCTIONS

// Lets pass in an object instead

function createIdea(title, body, id, quality) {
  $('.card-container').prepend(
    `<article class="container" id ="${id}">
      <h2 contenteditable="true">${title}</h2>
      <div class="circle delete"></div>
      <p contenteditable="true">${body}</p>
      <h3>quality: <span class="qualityValue">${quality}</span></h3>
      <div class="circle upvote"> </div>
      <div class="circle downvote"> </div>
      <hr>
    </article>`)
}

function clearInput() {
  $('#description-input').val('');
  $('#title-input').val('');
  $('#title-input').focus();
}

// DRY up 135 - 138, by passing in an object

function displayIdea(id) {
  var getArray = localStorage.getItem(id);
  var retreivedArray = JSON.parse(getArray);
  var title = retreivedArray.title;
  var body = retreivedArray.body;
  var id = retreivedArray.id;
  var quality = retreivedArray.quality;
  createIdea(title, body, id, quality);
}

function disableButton() {
  $('.save-btn').attr('disabled', true);
}

function enableButton() {
  $('.save-btn').attr('disabled', false);
}

// pull the if/else out into it's own function

function saveCard() {
  storeIdea();
  clearInput();
  };

// DRY up with an || statement

function searchTitle() {
 var $searchValue = $('#search').val().toLowerCase();
 var $cardsTitle = $('article h2');
 $.each($cardsTitle, function(index, value){
  var $cardsLowerCase = $(value).text().toLowerCase();
  if ($cardsLowerCase.includes($searchValue) === true) {
  var cardShow = $(value).parent('article');
  cardShow.show();
  } 
  else {
    var cardShow = $(value).parent('article');
    cardShow.hide();
    }
 })
}

// DRY up with an || statement

function searchBody() {
 var $searchValue = $('#search').val().toLowerCase();
 var $cardsBody = $('article p');
 $.each($cardsBody, function(index, value) {
  var $cardsLowerCase = $(value).text().toLowerCase();
  if ($cardsLowerCase.includes($searchValue) === true) {
  var cardShow = $(value).parent('article');
  cardShow.show();
  } 
  else {
    var cardShow = $(value).parent('article');
    cardShow.hide();
    }
  })
}

function storeIdea() {
  var $title = $('#title-input').val();
  var $body = $('#description-input').val();
  var $id = Date.now();
  var $quality = 'normal';
  var storeCard = new StoreCard($title, $body, $id, $quality);
  var stringified = JSON.stringify(storeCard);
  localStorage.setItem($id, stringified);
  displayIdea($id);
}

function StoreCard(title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.quality = quality;
  this.counter = 2;
}

function removeFromLocalStorage(event) {
  var cardToDel = $(event).closest('article');
  var cardID = $(cardToDel).attr('id');
  localStorage.removeItem(cardID)
}

function removeFromDOM(event) {
  var cardToDel = $(event).closest('article');
  cardToDel.remove();
}
