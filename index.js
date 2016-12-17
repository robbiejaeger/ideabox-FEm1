var $titleInput = $('#title-input');
var $bodyInput = $('#body-input');
var $saveBtn = $('#save-btn');
var $ideasContainer = $('.ideas-container')

$saveBtn.on('click', function(e){
  e.preventDefault()
  var inputText = getUserInput()
  $ideasContainer.append(ideaTemplate(inputText))
  clearInputs()
})

function getUserInput(){
  return {title: $titleInput.val(), body: $bodyInput.val()};
}

function ideaTemplate(inputText){
  return `<article class="idea">
    <h2>${inputText.title}</h2>
    <input class="delete-btn" type="button">
    <p class="idea-body">${inputText.body}</p>
    <input class="vote-btn upvote-btn" type="button">
    <input class="vote-btn downvote-btn" type="button">
    <p class="idea-quality">
      quality: swill
    </p>
    <hr class="idea-divider">
  </article>`
}

function clearInputs(){
  $titleInput.val("");
  $bodyInput.val("");
}
