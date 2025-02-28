document.getElementById('imageUpload').addEventListener('change', function() {
    var preview = document.getElementById('imagePreview');
    preview.innerHTML = '';
    var files = this.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            preview.appendChild(img);
        }
        reader.readAsDataURL(file);
    }
});
