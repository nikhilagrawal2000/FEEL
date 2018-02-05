PDFJS.disableWorker = true;
    
    var pdf = document.getElementById('pdf');

    pdf.onchange = function(ev) {
      if (file = document.getElementById('pdf').files[0]) {
        
        fileReader = new FileReader();
        fileReader.onload = function(ev) {
          console.log(ev);
          PDFJS.getDocument(fileReader.result).then(function getPdfHelloWorld(pdf) {
            
            console.log(pdf.numPages)
            console.log(pdf)
            var n = pdf.numPages;
            var i;
            for (i=1; i<(n+1); ++i){
              pdf.getPage(i).then(function getPageHelloWorld(page) {
                var scale = 1.5;
                var viewport = page.getViewport(scale);
              
                var canvas = document.getElementById('the-canvas');
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
              
                var task = page.render({canvasContext: context, viewport: viewport})
                task.promise.then(function(){
                console.log(canvas.toDataURL('image/jpeg'));
                firebase.database().ref().child(i).set(canvas.toDataURL('image/jpeg'));
              });
            });
          }, function(error){
            console.log(error);
          });
        
        };
        fileReader.readAsArrayBuffer(file);
      }
    }


function logout(){
  firebase.auth().signOut();
}