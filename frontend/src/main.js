// cdn lib imports
async function helloWorld() {
	const res = await fetch('/backend/apitest');
	const backendVars = await res.json();
	const printVars = document.createElement('div');
	printVars.innerHTML = `${Object.entries(backendVars).map(([key, value]) => {
		return `<p>| <b>${key}</b>: ${value}</p>`;
	}).join('\n')}`;
	const title = document.createElement('h1');
	title.innerText = 'Backen Environment Variables';
	document.getElementById("app").appendChild(printVars);
}

helloWorld();