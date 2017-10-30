// Attempted new search functionality

$('#search').on('keyup', function() {
  $('article').remove();
  arrayOfLocalStorage();
});

function arrayOfLocalStorage() {
  var newArray = [];
  for (var i = 0; i < localStorage.length; i++) {
    var retrievedObject = localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrievedObject);
    newArray.push(parsedObject);
  };
  console.log(newArray);
  filterToDoBox(newArray);
};


function filterToDoBox(newArray) {
  var $searchInput = $('#search').val().toUpperCase();
  var $searchedArray = newArray.filter(function(card) {
    return card['title'].toUpperCase().includes($searchInput) || card['body'].toUpperCase().includes($searchInput);
  })
  console.log($searchedArray);
  printFilterResults($searchedArray);
};

function printFilterResults(searchedArray) {
  searchedArray.forEach(function(results) {
    displayIdea(results);
  })
};