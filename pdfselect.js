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
            pdf.getPage(1).then(function getPageHelloWorld(page) {
              var scale = 1.5;
              var viewport = page.getViewport(scale);
              
              var canvas = document.getElementById('the-canvas');
              var context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              
              var task = page.render({canvasContext: context, viewport: viewport})
              task.promise.then(function(){
                console.log(canvas.toDataURL('image/jpeg'));
              });
            });
          }, function(error){
            console.log(error);
          });
        };
        fileReader.readAsArrayBuffer(file);
      }
    }