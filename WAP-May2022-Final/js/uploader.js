$(() => {
    function previewImage (evt) {
		evt.preventDefault();
		let reader = new FileReader();
		let fileLoad = evt.target.files[0];
		reader.onloadend = function() {
			$("#zoningImage").attr("src",reader.result);
		}
		reader.readAsDataURL(fileLoad);
	}
	function onSubmit(event) {
		event.preventDefault();
		const fileField = document.getElementById('file1');
		const formData = new FormData();
		formData.append('file', fileField.files[0]);

		let linkApi = 'http://localhost:3000/addPicture';
		fetch(linkApi,{
			method : 'post',
			body: formData
		}).then(res=> console.log(res));
		console.log("redirect unable");
	}
    $("#file1").on('change',previewImage);
	$("#submitButt").on('click',onSubmit);

	
})