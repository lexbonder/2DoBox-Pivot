$('#title-input').focus();


$('.save-btn').on('click', function(e) {
  e.preventDefault();
  createIdea();
  });


function enabledButton() {
$('.save-btn').attr('disabled', false);
  }

$('#title-input').on('keyup', enabledButton); 
$('#description-input').on('keyup', enabledButton);

function createIdea() {
  var title = $('#title-input').val();
  var body = $('#description-input').val();
  var id = $.now();
  $('.card-container').append(
    `<article id ="${id}">
      <h2>${title}</h2>
      <div class="circle delete"></div>
      <p>${body}</p>
      <h3>quality: <span class="qualityValue">swill</span></h3>
      <div class="circle upvote"> </div>
      <div class="circle downvote"> </div>
      <hr>
    </article>`)
};


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
  $(e).closest('article').remove();
}