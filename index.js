var $titleInput = $('#title-input')
var $bodyInput = $('#body-input')
var $saveBtn = $('#save-btn')
var $ideasContainer = $('.ideas-container')
var ideaQualities = ['swill', 'plausible', 'genius']

$saveBtn.on('click', function(e){
  e.preventDefault()
  var inputText = getUserInput()
  $ideasContainer.append(ideaTemplate(inputText))
  clearInputs()
})

function getUserInput(){
  return {title: $titleInput.val(), body: $bodyInput.val()}
}

function ideaTemplate(inputText){
  return `<article class="idea">
    <h2>${inputText.title}</h2>
    <input class="delete-btn" type="button">
    <p class="idea-body">${inputText.body}</p>
    <input class="vote-btn upvote-btn" type="button">
    <input class="vote-btn downvote-btn" type="button">
    <p class="idea-quality" data-quality="0">
      quality: <span class="quality-val-text">${ideaQualities[0]}</span>
    </p>
    <hr class="idea-divider">
  </article>`
}

function clearInputs(){
  $titleInput.val('')
  $bodyInput.val('')
}

$ideasContainer.on('click', '.delete-btn', function(){
  $(this).parents('.idea').remove()
})

$ideasContainer.on('click', '.upvote-btn', upvote)

$ideasContainer.on('click', '.downvote-btn', downvote)

function upvote(){
  var $qualityEl = $(this).siblings('.idea-quality')
  var currentQuality = $qualityEl.data('quality')

  switch (currentQuality) {
    case 0:
      changeQuality($qualityEl, 1)
      break
    case 1:
      changeQuality($qualityEl, 2)
      break
  }
}

function downvote(){
  var $qualityEl = $(this).siblings('.idea-quality')
  var currentQuality = $qualityEl.data('quality')

  switch (currentQuality) {
    case 1:
      changeQuality($qualityEl, 0)
      break
    case 2:
      changeQuality($qualityEl, 1)
      break
  }
}

function changeQuality(qualityElement, val){
  qualityElement.data('quality', val)
  qualityElement.children('.quality-val-text').text(ideaQualities[val])
}
