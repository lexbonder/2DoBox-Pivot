$(document).ready(function() {
  for (var i in localStorage) {
    displayIdea(i);
  }
 });

$('#title-input').focus();

$('.save-btn').on('click', function(e) {
  e.preventDefault();
  storeIdea();
  clearInput();
  });

function clearInput() {
  $('#description-input').val('');
  $('#title-input').val('');
  $('#title-input').focus();
}


function enabledButton() {
$('.save-btn').attr('disabled', false);
  }

$('#title-input').on('keyup', enabledButton); 
$('#description-input').on('keyup', enabledButton);

function StoreCard(title, body, id) {
  this.title = title;
  this.body = body;
  this.id = id;
}

function storeIdea() {
  var $title = $('#title-input').val();
  var $body = $('#description-input').val();
  var $id = Date.now();
  var storeCard = new StoreCard($title, $body, $id);
  var stringified = JSON.stringify(storeCard);
  localStorage.setItem($id, stringified);
  displayIdea($id);
}

function displayIdea(id) {
  var getArray = localStorage.getItem(id);
  var retreivedArray = JSON.parse(getArray);
  var title = retreivedArray.title;
  var body = retreivedArray.body;
  var id = retreivedArray.id;
  createIdea(title, body, id);
}

function createIdea(title, body, id) {
  //instead of passing parameters, load from local storage
  $('.card-container').prepend(
    `<article id ="${id}">
      <h2>${title}</h2>
      <div class="circle delete"></div>
      <p>${body}</p>
      <h3>quality: <span class="qualityValue">swill</span></h3>
      <div class="circle upvote"> </div>
      <div class="circle downvote"> </div>
      <hr>
    </article>`)
}

//event bubbler for vote and remove functions
$('.card-container').on( 'click', '.delete', function() {
  removeCard(this);
});

$('.card-container').on('click', '.upvote', function() {
  var qualityDisplay = $(this).siblings('h3').find('.qualityValue');
  if (qualityDisplay.text() === 'swill') {
    qualityDisplay.text('plausible');
  }
  else if (qualityDisplay.text() === 'plausible') {
    qualityDisplay.text('genius');
  }
});

$('.card-container').on('click', '.downvote', function() {
  var qualityDisplay = $(this).siblings('h3').find('.qualityValue');
  if (qualityDisplay.text() === 'genius') {
    qualityDisplay.text('plausible');
  }
  else if (qualityDisplay.text() === 'plausible') {
    qualityDisplay.text('swill');
  }
});

function removeCard(e) {
  var cardToDel = $(e).closest('article');
  var cardID = $(cardToDel).attr('id');
  localStorage.removeItem(cardID)
  cardToDel.remove();
}