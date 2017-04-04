function fakeAjax(url, cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function () {
		cb(fake_responses[url]);
	}, randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

function getFile(file) {
	return new Promise(function (resolve) {
		fakeAjax(file, resolve);
	});
}

const fileList = ["file1", "file2", "file3"]

fileList.map(getFile).reduce((acc, curr) => {
	return acc.then(_ => curr).then(output)

}, Promise.resolve(true)).then(_ => output("completed"))

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

// ???
