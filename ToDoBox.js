// EVENT LISTENERS

$('#title-input').focus();

$(document).ready(reloadCards);

$('#filter').on('keyup', filter);

$('.save-btn').on('click', saveCard);

$('.reset-button').on('click', reloadCards);

$('#title-input').on('keyup', toggleSaveButton);

$('.card-container').on('blur', 'article p', saveBody);

$('.card-container').on('click', '.delete', deleteCard);

$('.importance-button').on('click', filterByImportance);

$('.show-more-button').on('click', toggleShowMoreCards);

$('.card-container').on('blur', 'article h2', saveTitle);

$('.card-container').on('click', '.upvote, .downvote', toggleQuality);

// FUNCTIONS

function changeQuality(event, parsedCardId, qualityDisplay, qualityArray) {
  if (event.target.classList.contains('upvote') && parsedCardId.counter === 4) {
    parsedCardId.counter = 4;
  } else if (event.target.classList.contains('upvote')) {
    parsedCardId.counter++;
    qualityDisplay.text(qualityArray[parsedCardId.counter]);
  } else if (event.target.classList.contains('downvote') && parsedCardId.counter === 0) {
    parsedCardId.counter = 0;
  } else {
    parsedCardId.counter--;
    qualityDisplay.text(qualityArray[parsedCardId.counter]);
  };
};

function clearInput() {
  $('#description-input').val('');
  $('#title-input').val('');
  $('#title-input').focus();
};

function createCard(object) {
  $('.card-container').prepend(
    `<article class="container" id ="${object.id}">
      <button class="delete"></button>
      <h2 contenteditable="true">${object.title}</h2>
      <p contenteditable="true">${object.body}</p>
      <button class="upvote"></button>
      <button class="downvote"></button>
      <h3>importance: <span class="quality-value">${object.qualityArray[object.counter]}</span></h3>
      <hr>
    </article>`);
};

function deleteCard() {
  removeFromDom(this);
  removeFromLocalStorage(this);
  reloadCards(); 
};

function disableButton() {
  $('.save-btn').attr('disabled', true);
};

function displayCard(id) {
  var getArray = localStorage.getItem(id);
  var retrievedArray = JSON.parse(getArray);
  var object = {
    title: retrievedArray.title,
    body: retrievedArray.body,
    id: retrievedArray.id,
    qualityArray: ['none','low', 'normal', 'high', 'critical'],
    counter: retrievedArray.counter
  };
  createCard(object);
};

function enableButton() {
  $('.save-btn').attr('disabled', false);
};

function filter() {
  if ($(this).val()) {
    $('article').remove();
    hideShowMoreButton();
    $('.importance-button').removeClass('selected');
    loadAllCards();
    var filteredText = $(this).val().toUpperCase();
    for (var i = 0; i < localStorage.length; i++) {
      var parsedObject = pullFromStorage(localStorage.key(i));
      if (parsedObject['title'].toUpperCase().includes(filteredText) || parsedObject['body'].toUpperCase().includes(filteredText)) {
        $(`#${parsedObject['id']}`).css('display', 'block');
      } else {
        $(`#${parsedObject['id']}`).css('display', 'none');
      };
    };
  } else {
    reloadCards();
  };
};

function filterByImportance() {
  event.preventDefault();
  $('article').remove();
  hideShowMoreButton();
  loadAllCards();
  $('#filter').val('');
  $('.importance-button').removeClass('selected');
  for (var i = 0; i < localStorage.length; i++) {
    var parsedObject = pullFromStorage(localStorage.key(i));
    if (parsedObject.counter === parseInt(this.id)) {
      $(`#${parsedObject['id']}`).css('display', 'block');
    } else {
      $(`#${parsedObject['id']}`).css('display', 'none');
    };
  };
  $(this).addClass('selected');
};

function loadFirstTen() {
  for (var i = (localStorage.length - 10); i < (localStorage.length); i++) {
    displayCard(localStorage.key(i));
  };
};

function loadAllCards() {
  for (var i = 0; i < localStorage.length; i++) {
    displayCard(localStorage.key(i));
  };
};

function hideShowMoreButton() {
  $('.show-more-button').css('display', 'none');
};

function revealShowMoreButton() {
  $('.show-more-button').css('display', 'block');
  $('.show-more-button').text('Show more...');
};

function pullFromStorage(id) {
  var pullCardID = localStorage.getItem(id);
  var parsedCardId = JSON.parse(pullCardID);
  return parsedCardId; 
};

function putIntoStorage(object) {
  var stringifiedObject = JSON.stringify(object);
  localStorage.setItem(object['id'], stringifiedObject);
};

function reloadCards() {
  $('article').remove();
  if (localStorage.length > 10) {
    revealShowMoreButton();
    loadFirstTen();
  } else {
    hideShowMoreButton();
    loadAllCards();
  };
};

function removeFromDom(event) {
  var cardToDel = $(event).closest('article');
  cardToDel.remove();
};

function removeFromLocalStorage(event) {
  var cardToDel = $(event).closest('article');
  var cardID = $(cardToDel).attr('id');
  localStorage.removeItem(cardID);
};

function saveBody() {
  var cardID = $(this).closest('article').attr('id');
  var parsedCardId = pullFromStorage(cardID);
  parsedCardId.body = $(this).text();
  putIntoStorage(parsedCardId);
};

function saveCard() {
  storeCard();
  clearInput();
  disableButton();
  reloadCards();
  };

function saveTitle() {
  var cardID = $(this).closest('article').attr('id');
  var parsedCardId = pullFromStorage(cardID);
  parsedCardId.title = $(this).text();
  putIntoStorage(parsedCardId);
};

function StoreCard(title, body, id, quality, counter = 2) {
  this.title = title;
  this.body = body;
  this.id = id;
  this.quality = quality;
  this.counter = counter;
  this.completed = false;
};

function storeCard() {
  var $title = $('#title-input').val();
  var $body = $('#description-input').val();
  var $id = Date.now();
  var $quality = 'normal';
  var storeCard = new StoreCard($title, $body, $id, $quality);
  var stringified = JSON.stringify(storeCard);
  localStorage.setItem($id, stringified);
  displayCard($id);
};

function toggleSaveButton() {
  if ($('#title-input').val() === '') {
    disableButton();
  } else {
    enableButton();
  }; 
};

function toggleShowMoreCards() {
  $('article').remove();
  if ($('.show-more-button').text() === 'Show more...') {
    loadAllCards();
    $('.show-more-button').text('Show less...');
  } else {
    loadFirstTen();
    $('.show-more-button').text('Show more...');
  };
};

function toggleQuality() {
  var cardQuality = $(this).closest('article');
  var cardID = $(cardQuality).attr('id');
  var parsedCardId = pullFromStorage(cardID);
  var qualityDisplay = $(this).siblings('h3').find('.quality-value');
  var qualityArray = ['none','low', 'normal', 'high', 'critical'];
  changeQuality(event, parsedCardId, qualityDisplay, qualityArray);
  putIntoStorage(parsedCardId);
};

// INCOMPLETE FUNCTIONALITY FOR SHOW COMPLETED CARDS

// $('.card-container').on('click', '.complete', markCardAsComplete);

// function markCardAsComplete() {
//   var completedTask = $(this).closest('article');
//   console.log('complete button hit')
//   var cardID = $(completedTask).attr('id');
//   var parsedCardId = pullFromStorage(cardID);
//   parsedCardId.completed = true;
//   console.log(parsedCardId);
//   completedTask.addClass('completed');
//   putIntoStorage(parsedCardId);
// };

// function filterIncomplete() {
//   var objectArray = []
//     for (var i = 0; i < localStorage.length; i++) {
//       objectArray.push(pullFromStorage(localStorage.key(i)));
//       var incompleteTasks = objectArray.filter(function(value) {
//       return value['completed'] === false;
//     });
//   };
// }