var $titleInput = $('#title-input')
var $bodyInput = $('#body-input')
var $allInputs = $('#title-input, #body-input')
var $saveBtn = $('#save-btn')
var $ideasContainer = $('.ideas-container')
var ideaQualities = ['swill', 'plausible', 'genius']

$(document).on('keyup', function(e){
  if (e.keycode === 13) $saveBtn.click()
})

$saveBtn.on('click', function(e){
  e.preventDefault()
  var idea = constructIdeaFromUserInput()
  $ideasContainer.append(ideaTemplate(idea))
  clearInputs()
})

function constructIdeaFromUserInput(){
  return {title: $titleInput.val(),
          body: $bodyInput.val(),
          quality: 0,
          id: Date.now()}
}

function ideaTemplate(idea){
  return `<article class="idea" data-id="${idea.id}">
    <h2>${idea.title}</h2>
    <input class="delete-btn" type="button">
    <p class="idea-body">${idea.body}</p>
    <input class="vote-btn upvote-btn" type="button">
    <input class="vote-btn downvote-btn" type="button">
    <p class="idea-quality" data-quality="${idea.quality}">
      quality: <span class="quality-val-text">${ideaQualities[idea.quality]}</span>
    </p>
    <hr class="idea-divider">
  </article>`
}

function clearInputs(){
  $titleInput.val('')
  $bodyInput.val('')
}

$allInputs.on('keyup', function(){
  if ($titleInput.val() !== "" && $bodyInput.val() !== "") {
    $saveBtn.prop('disabled', false)
  } else {
    $saveBtn.prop('disabled', true)
  }
})

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
