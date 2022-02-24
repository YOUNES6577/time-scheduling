/**  Event***/
$(document).ready(function(){
   var tab=$('#tab_block').DataTable({
      "paging":   false,
      "ordering": false,
      "info":     false,
      "order": [[ 3, "desc" ]]
   });
});

var Today = new Date();
var Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


document.querySelector('#show-all').addEventListener('click', function () {
   var hstTabBody = document.querySelector('#tab_block>tbody');
   var hstTabFooter = document.querySelector('#tab_block>tfoot');
   var histReq = new XMLHttpRequest();
   histReq.open("POST", "request/FullhistoryReq.php", true);
   histReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   histReq.send();
   histReq.onloadend = function () {
      try {
         if (this.status === 200) {
            var Allhistorows = JSON.parse(histReq.response);
            console.log(Allhistorows);
         } else
            alert('State Change =' + this.status);
      } catch (e) {
         console.log("Error Msg " + e.message);
      }
   };
   histReq.onerror = function () {
      console.log('Error :  * Status:' + this.status + "  Msg:" + this.statusText);
   };
   setTimeout(function () {
      console.log("History Loaded.");
   }, 750);
});
