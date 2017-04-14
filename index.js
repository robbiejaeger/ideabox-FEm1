var $titleInput = $('#title-input')
var $bodyInput = $('#body-input')
var $allInputs = $('#title-input, #body-input')
var $saveBtn = $('#save-btn')
var $searchInput = $('#search-input')
var $ideasContainer = $('.ideas-container')
var ideaQualities = ['swill', 'plausible', 'genius']

initializeIdeas()

function initializeIdeas(){
  var ideas = JSON.parse(localStorage.getItem('ideas'))
  if (ideas === null) {
    localStorage.setItem('ideas', "[]")
  } else {
    loadIdeasFromStorage(ideas)
  }
}

function loadIdeasFromStorage(ideas) {
  ideas.forEach(function(idea){
    $ideasContainer.append(ideaTemplate(idea))
  })
}

$('.idea-form').on('keyup', function(e){
  if (e.keycode === 13) $saveBtn.click()
})

$saveBtn.on('click', function(e){
  e.preventDefault()
  var idea = constructIdeaFromUserInput()
  addIdeaToStorage(idea)
  $ideasContainer.append(ideaTemplate(idea))
  clearInputs()
})

function addIdeaToStorage(idea){
  var allIdeas = getIdeasArrayFromStorage()
  allIdeas.push(idea)
  localStorage.setItem('ideas', JSON.stringify(allIdeas))
}

function deleteIdeaFromStorage(ideaID){
  var allIdeas = getIdeasArrayFromStorage()
  var updatedIdeas = allIdeas.filter(function(idea){
    return idea.id !== ideaID
  })
  localStorage.setItem('ideas', JSON.stringify(updatedIdeas))
}

function updateIdea(ideaId, propToUpdate, newPropVal){
  var allIdeas = getIdeasArrayFromStorage()
  allIdeas.forEach(function(idea){
    if (idea.id === ideaId) {
      idea[propToUpdate] = newPropVal
    }
  })
  localStorage.setItem('ideas', JSON.stringify(allIdeas))
}

function getIdeasArrayFromStorage(){
  return JSON.parse(localStorage.getItem('ideas'))
}

function constructIdeaFromUserInput(){
  return {title: $titleInput.val(),
          body: $bodyInput.val(),
          quality: 0,
          id: parseInt(Date.now())}
}

function ideaTemplate(idea){
  return `<article class="idea" data-id="${idea.id}">
    <h3 contentEditable="true">${idea.title}</h3>
    <input class="item-btn delete-btn" type="button">
    <p class="idea-body" contentEditable="true">${idea.body}</p>
    <input class="item-btn upvote-btn" type="button">
    <input class="item-btn downvote-btn" type="button">
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
  var ideaId = $(this).parents('.idea').data('id')
  deleteIdeaFromStorage(ideaId)
})

$searchInput.on('keyup', function(){
  var query = $(this).val()

  $.each($('.idea'), function(i, idea){
    var textToQuery = $(idea).children('h2').text() + ' ' + $(idea).children('.idea-body').text()

    if (textToQuery.indexOf(query) === -1) {
      $(idea).hide()
    } else {
      $(idea).show()
    }
  })
})

$ideasContainer.on('focusout', 'h2', updateTitleText)
$ideasContainer.on('focusout', '.idea-body', updateBodyText)

function updateTitleText(){
  var ideaId = $(this).parents('.idea').data('id')
  var newTitle = $(this).text()
  updateIdea(ideaId, "title", newTitle)
}

function updateBodyText(){
  var ideaId = $(this).parents('.idea').data('id')
  var newBody = $(this).text()
  updateIdea(ideaId, "body", newBody)
}

$ideasContainer.on('click', '.upvote-btn', upvote)

$ideasContainer.on('click', '.downvote-btn', downvote)

function upvote(){
  var ideaId = $(this).parents('.idea').data('id')
  var $qualityEl = $(this).siblings('.idea-quality')
  var currentQuality = $qualityEl.data('quality')

  switch (currentQuality) {
    case 0:
      changeQuality($qualityEl, 1)
      updateIdea(ideaId, 'quality', 1)
      break
    case 1:
      changeQuality($qualityEl, 2)
      updateIdea(ideaId, 'quality', 2)
      break
  }
}

function downvote(){
  var ideaId = $(this).parents('.idea').data('id')
  var $qualityEl = $(this).siblings('.idea-quality')
  var currentQuality = $qualityEl.data('quality')

  switch (currentQuality) {
    case 1:
      changeQuality($qualityEl, 0)
      updateIdea(ideaId, 'quality', 0)
      break
    case 2:
      changeQuality($qualityEl, 1)
      updateIdea(ideaId, 'quality', 1)
      break
  }
}

function changeQuality(qualityElement, val){
  qualityElement.data('quality', val)
  qualityElement.children('.quality-val-text').text(ideaQualities[val])
}
