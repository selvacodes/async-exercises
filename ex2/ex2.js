function fakeAjax(url, cb) {
	var fake_responses = {
		'file1': 'The first text',
		'file2': 'The middle text',
		'file3': 'The last text'
	}
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000

	console.log('Requesting: ' + url, randomDelay)

	setTimeout(function () {
		output("cb")
		cb(fake_responses[url])
	}, randomDelay)
}

function output(text) {
	console.log(text)
}

// **************************************

function getFile(file) {
	return function (cb) {
		return fakeAjax(file, cb)
	}
}

const txt = function (text) {
	console.log("txt", text)
}

function getFileThunkfied(file) {

	var state = {
		value: null,
		callb: null
	}
	var updateState = function (value) {
		if (state.callb == null) {
			state.value = value
			return
		}
		state.callb(value)
	}


	var th = function (cb) {
		if (state.value == null) {
			state.callb = cb
			return;
		}
		cb(state.value)
	}

	fakeAjax(file, updateState)

	return function (cb) {
		// console.log("in", cb)
		th(cb)
	}
}


var file1 = getFileThunkfied("file1")
var file2 = getFileThunkfied("file2")
var file3 = getFileThunkfied("file3")


file1(function (text) {
	output(text)
	file2(function (text) {
		output(text)
		file3(function (text) {
			output(text)
			output("completed")
		})

	})

})



// request all files at once in "parallel
// ???