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

function getFile(file) {
	return new Promise((resolve, reject) => {
		fakeAjax(file, function (text) {
			resolve(text);
		});
	});
}

const file1 = getFile("file1")
const file2 = getFile("file2")
const file3 = getFile("file3")

file1.then(function (text) {
	output(text)
	return file2
}).then(function (text) {
	output(text)
	return file3
}).then(function (text) {
	output(text)
	output("completed")
})

// Best because of Single responsiblity principle
file1
	.then(output)
	.then(function (test) {
		console.log("undef", test)
		return file2;
	})
	.then(output)
	.then(function () {
		return file3;
	})
	.then(output)
	.then(function () {
		output("Complete!");
	});

// request all files at once in "parallel"
// ???
