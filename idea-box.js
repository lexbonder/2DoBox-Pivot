$('.save-btn').on('click', function() {
  var title = $('#title-input').val();
   var body = $('#description-input').val();
  var id = $.now();
  $('article').append(
    `<article id ="${id}">
      <h2>${title}</h2>
      <div class="circle delete"> </div>
      <p>${body}</p>
      <h3>quality: <span class="qualityValue">swill</span></h3>
      <div class="circle upvote"> </div>
      <div class="circle downvote"> </div>
      <hr>
    </article>)`
  });
