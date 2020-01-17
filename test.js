let jsonString = '{"a":1, "b":2, "foo":"bar"}'; // string version of a JS Object
let json = JSON.parse(jsonString);
console.log(jsonString); // a string, of course :)
console.log(json);
delete json.foo;
console.log(json);
jsonString = JSON.stringify(json);
console.log(jsonString);
