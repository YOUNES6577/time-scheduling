function GetTdCellsFromEmp() {
    let arr=[],row=[];
    $('div#sec-1_container-2 table#emp-tab tbody tr').each(function(index,tr){
        row=[];
        $(tr).find('td').each(function(index,td){
            ($(td).find('abbr').lenght===0) ?(td.innerText.length!==0) ?row.push(td):0: ($(td)[0].innerText.length!==0)?row.push(td):0;
        })
        arr.push(row);
    })
    return arr;
}
function GetAllTasksFromEmp(tab) {
    let tr_data = [];
    tab.forEach(tr => {
        let td_data = [];
        tr.forEach(cell => (cell.innerText === '...' || cell.innerText === '')?0: td_data.push(cell.innerText));
        tr_data.push(td_data);
    });
    return tr_data;
}
function colspan(x, y, colspan_value) {
    GetTdCellsFromEmp()[x - 1][y - 1].setAttribute('colspan', colspan_value);
}
/***********************************/
// SUNDAY
colspan(1, 1, 2);
//MONDAY
colspan(2, 1, 2);
//TUESDAY
colspan(3, 1, 2);
//WEDENSDAY
//colspan(4, 6, 2)
//THURSDAY
colspan(5, 1, 2)
colspan(5, 4, 2);
//FRAIDAY
colspan(6, 1, 2);
colspan(6, 5, 2);
//SATURDAY
colspan(7, 1, 2);
colspan(7, 2, 2);

let date = new Date();
document.querySelectorAll('#emp-tab tbody tr th')[date.getDay()].classList.add('text-warning', 'font-italic');
document.querySelectorAll('#emp-tab tbody tr th')[date.getDay()].style.fontSize = "24px";

/*******
 *
 Section 02
 *
 * *****/
