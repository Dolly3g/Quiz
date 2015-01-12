$("#file")[0].addEventListener('change',function(evt){
  var filename = evt.target.files[0];
  if(filename){
   var reader = new FileReader();
   // $("#filename").val(filename.name);
   reader.readAsText(filename,"utf-8");
   
   console.log(reader);
   reader.onload = function(evt){
   	console.log(evt.target.result)
    $("#data").val(evt.target.result)
   }
 }
})