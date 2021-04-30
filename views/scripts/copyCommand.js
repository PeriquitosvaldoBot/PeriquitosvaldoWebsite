async function copyCMD (cmdID) {
	const copyText = document.getElementById(cmdID).textContent;
  	const textArea = document.createElement('textarea');
  	textArea.textContent = copyText;
  	document.body.append(textArea);
  	textArea.select();
  	document.execCommand("copy");

  	textArea.remove();
};