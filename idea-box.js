// EVENT LISTENERS
$('#title-input').focus();

$('.save-btn').on('click', saveCard);

$('#title-input').on('keyup', toggleSaveButton);

$('.card-container').on( 'click', '.delete', deleteCard);

$('.card-container').on('blur', 'article h2', saveTitle);

$('.card-container').on('blur', 'article p', saveBody);

$(document).ready(function() {
  for (var i in localStorage) {
    displayIdea(i);
  }
});

// FUNCTIONS

function pullFromStorage(id) {
  var pullCardID = localStorage.getItem(id);
  var parsedCardId = JSON.parse(pullCardID);
  return parsedCardId; 
}

function saveTitle() {
  var cardID = $(this).closest('article').attr('id');
  var parsedCardId = pullFromStorage(cardID);
  parsedCardId.title = $(this).text();
  putIntoStorage(parsedCardId);
}

function saveBody() {
  var cardID = $(this).closest('article').attr('id');
  var parsedCardId = pullFromStorage(cardID);
  parsedCardId.body = $(this).text();
  putIntoStorage(parsedCardId);
}

function toggleSaveButton() {
  if ($('#title-input').val() ==='') {
    disableButton();
  } else {
    enableButton();
  }; 
};

function createIdea(object) {
  $('.card-container').prepend(
    `<article class="container" id ="${object.id}">
      <button class="delete"></button>
      <h2 contenteditable="true">${object.title}</h2>
      <p contenteditable="true">${object.body}</p>
      <button class="upvote"></button>
      <button class="downvote"></button>
      <h3>quality: <span class="qualityValue">${object.quality}</span></h3>
      <hr>
    </article>`)
}

function clearInput() {
  $('#description-input').val('');
  $('#title-input').val('');
  $('#title-input').focus();
}

function displayIdea(id) {
  var getArray = localStorage.getItem(id);
  var retreivedArray = JSON.parse(getArray);
  var object = {
    title: retreivedArray.title,
    body: retreivedArray.body,
    id: retreivedArray.id,
    quality: retreivedArray.quality
  }
  createIdea(object);
}
function deleteCard() {
  removeFromDOM(this);
  removeFromLocalStorage(this); 
}

function putIntoStorage(object) {
  var stringifiedObject = JSON.stringify(object);
  localStorage.setItem(object['id'], stringifiedObject);
}

function disableButton() {
  $('.save-btn').attr('disabled', true);
}

function enableButton() {
  $('.save-btn').attr('disabled', false);
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

function saveCard() {
  storeIdea();
  clearInput();
  };


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


//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------



// DRY up with an || statement
// make these one function ----------------------
// these cancel each other out --------------
// rename to filter?
$('#search').on('keyup', search);

// $('#search').on('keyup', function() {
//   searchBody();
// });
// ------------------------------------------

function pullFromStorage(id) {
  var pullCardID = localStorage.getItem(id);
  var parsedCardId = JSON.parse(pullCardID);
  return parsedCardId; 
}

function search() {
 var filteredText = $(this).val().toUpperCase();
   for (var i = 0; i < localStorage.length; i++) {
    var parsedObject = pullFromStorage(localStorage.key(i));
    if (parsedObject['title'].toUpperCase().includes(filteredText) || parsedObject['body'].toUpperCase().includes(filteredText)) {
      $(`#${parsedObject['id']}`).css( "display", "block" );
    } else {
      $(`#${parsedObject['id']}`).css( "display", "none");
    }
  }
};

// come back to experiment with making these shorter
// QUALITY DOES NOT PERSIST, REVERTS TO NORMAL. ARRAY DOES PERSIST.

$('.card-container').on('click', '.upvote', function() {
  var cardQuality = $(this).closest('article');
  var cardID = $(cardQuality).attr('id');
  var parsedCardId = pullFromStorage(cardID)

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
  var parsedCardId = pullFromStorage(cardID)

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


//------------------------------

// add two event listeners for 'enter button' functionality -------

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

// -----------------------------------------------------------------