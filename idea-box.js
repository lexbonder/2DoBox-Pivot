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
  $('article').append(
    `<article id ="${id}">
      <h2>${title}</h2>
      <div class="circle delete" onClick='removeCard(${id})'> </div>
      <p>${body}</p>
      <h3>quality: <span class="qualityValue">swill</span></h3>
      <div class="circle upvote"> </div>
      <div class="circle downvote"> </div>
      <hr>
    </article>`)
  countVotes();
};


$('.delete').on('click', removeCard);

function removeCard(id) {
  $('#' + id).remove();
}



//at the creation of each card, call counting function
//Each time an upvote or downvote is clicked, add to counter accordingly
//Start at swill, 2-3upvotes is plausible, 4 upvotes is genius
//limit count at 1-4

function countVotes() {
  var i = 1;
  var qualityDisplay = $('.qualityValue');
  qualityDisplay.text('swill');
  $('.upvote').on('click', function() {
    i++;
    if (i > 1 && i <= 3) {
      qualityDisplay.text('plausible');
    }
    else if (i >= 4) {
      i = 4;
      qualityDisplay.text('genius');
    }
  });
  $('.downvote').on('click', function() {
    i--;
    if (i >= 3 && i > 1) {
      qualityDisplay.text('plausible');
    }
    else if (i <= 1) {
      i = 1;
      qualityDisplay.text('swill');
    }
  });  
}