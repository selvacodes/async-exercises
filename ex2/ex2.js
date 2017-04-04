function fakeAjax (url, cb) {
  var fake_responses = {
    'file1': 'The first text',
    'file2': 'The middle text',
    'file3': 'The last text'
  }
  var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000

  console.log('Requesting: ' + url)

  setTimeout(function () {
    cb(fake_responses[url])
  }, randomDelay)
}

function output (text) {
  console.log(text)
}

// **************************************

function getFile (file) {
  return function (cb) {
    return fakeAjax(file , console.log)
  }
}

const file1 = getFile("file1")
const file2 = getFile("file2")
const file3 = getFile("file3")

// request all files at once in "parallel"
// ???
