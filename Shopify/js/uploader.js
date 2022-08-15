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
		const name = document.getElementById('name').value;
		const price = document.getElementById('price').value;
		const quantity = document.getElementById('quantity').value;
		const description = document.getElementById('description').value;

		const formData = new FormData();
		formData.append('file', fileField.files[0]);
		formData.append('name', name);
		formData.append('price', price);
		formData.append('quantity', quantity);
		formData.append('description', description);

		let linkApi = 'http://localhost:3000/addPicture';

		fetch(linkApi,{
			method : 'post',
			body: formData
		}).then(res=> console.log(res));

		document.getElementById("myHomeForm").reset();
		document.getElementById("zoningImage").src = "";
	}
    $("#file1").on('change',previewImage);
	$("#submitButt").on('click',onSubmit);

	
})