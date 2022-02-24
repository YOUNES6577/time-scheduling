import * as Md from "./Source.js";
import {SaveBtnChng as SvBtn_cf} from './Source.js';

var fields = ['idModule', 'Time', 'Duration', 'Task', 'Source'],
Tbody = $('#tab-block > table > tbody'),
AddrowsTag = $('#add-rows'),
dailywrk_arr = DwDReq(),
RowsObjArr = [];
/*****************
 *   Section-01
 *   *************/
$(function () {
    if (dailywrk_arr !== undefined || dailywrk_arr !== []) {
        $.each(dailywrk_arr, (index, row) => {
            var rowObj = new Md.Tasks(row,index);
            RowsObjArr.push(rowObj);
            AddToCurrentWork(row);
        });
        console.log("data is loaded to Document.");
    }
    else 
        console.log('Error Getting Data From DB (Dw May Empty) .');

    if (Tbody.children().length === 0) {
        Tbody.append("<tr><td>Empty</td></tr>");
        Tbody.children()[0].classList.add('tab-row'); //Tbody.firstChild.classList.add('tab-row');
        Tbody.children()[0].setAttribute('id', 'saved-work-empty'); //Tbody.firstChild.setAttribute('id', 'saved-work-empty');
        Tbody.children()[0].firstChild.classList.add('tab-cell'); //Tbod    y.firstChild.firstChild.classList.add('tab-cell');
        Tbody.children()[0].firstChild.setAttribute('colspan', '7'); //Tbody.firstChild.firstChild.setAttribute('colspan', '7');
    }
});

function AddToCurrentWork(new_row) { // add row to saved work afer adding it to DB
    let tr = document.createElement('tr');
    tr.setAttribute('class', 'tab-row');
    tr.id = new_row[0];
    console.log(tr.id);

    try{
        new_row = new_row.splice(1);
        let str = '';
        $.each(new_row,(index,element) => {
            str += '<td class="tab-cell" name="'+fields[index]+'">' + element + '</td>';
        });
        str += '<td class="tab-cell" colspan="2"><button class="btn btn-outline-success badge-pill"><i class="fas fa-check"> </i></button></td>';
        tr.innerHTML = str;
        tr.lastElementChild.firstElementChild.addEventListener('click', function () {            //delete row from table & also from database daily work table ;
            let tr = this.parentElement.parentElement;
            let dlt_req = new XMLHttpRequest();
            dlt_req.open('POST', 'request/CompletedWrk.php', true);
            dlt_req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            setTimeout(function () {
                dlt_req.send('id_work=' + tr.id);
            }, 1000);
            dlt_req.onloadend = function () {
                console.log('response is here and ' + dlt_req.responseText);
                (dlt_req.responseText === "the  Row  Deleted") ? tr.remove(): 0;
                setTimeout(function () {
                    (Tbody.children().length===0)?Tbody.append("<tr><td class=\"tab-cell\" colspan=\"7\">Empty</td></tr>"):0
                }, 1500);
            };
        });
        Tbody.find('td[colspan=7]').remove().end().add(Tbody).append(tr);
    }catch(Msg){
        console.error('Error :'+Msg);
    }
}
function RefrencesRequest(str, datalistTg) {
    if (datalistTg === null) 
        return [];
    let ref_req = new XMLHttpRequest();
    ref_req.open('POST', 'request/refrences_req.php', true);
    ref_req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    ref_req.send("str=" + str);
    ref_req.responseType = 'json';
    ref_req.onloadend = function () {
        try {
            console.log('a response from refrences_req.php  ' + 'Status :' + this.status);
            if (this.status === 200) {
                console.log(ref_req.response);
                str = '';
                ref_req.response.forEach(ele => {
                    str += "<option value='" + ele + "'>";
                });
                datalistTg.innerHTML = str;
            }
        } catch (error) {
            console.log('Error :' + error.message);
        }
    };
    ref_req.onerror = function () {
        console.log('Error :  * Status:' + this.status + "  Msg:" + this.statusText);
    };
    return [];
}

function MakeInputChangable(rowindex, ele) {
    let Tr = ele.target.parentElement;
    let Row_id = dailywrk_arr[rowindex][0];
    Tr.lastElementChild.removeAttribute('colspan');

    ele.target.innerHTML = "<input type='text' value =" + ele.target.innerText + ">";
    let input = ele.target.firstElementChild;
    input.classList.add('text-capitalize', 'text-sm-center');
    input.addEventListener('focusout', function () {
        this.parentElement.classList.add('Edited'); //input
        (input.value !== "") ? this.parentElement.innerHTML = input.value : 0; //old  input value
    });
    if (ele.target.getAttribute('name') === "Source") {
        let datalistTag = document.createElement('datalist');
        datalistTag.id = 'datalistoptions' + Row_id;
        ele.target.appendChild(datalistTag);
        input.setAttribute('list', datalistTag.id);
        input.placeholder = 'Type To Search ...';

        input.addEventListener('input', function () {
            console.clear();
            console.log(this.value);
            (this.value.length>=3)?RefrencesRequest(this.value.toLowerCase(), datalistTag):0;
        });
    }
        
    if (MakeInputChangable.RWid !== Row_id) {
        if (!MakeInputChangable.SvBtn_set.has('SVB' + Row_id)){ //  if the SVB ! Exist then build it
            let NewSvBtn = new SvBtn_cf();
            NewSvBtn.id = "SVB" + Row_id;
            NewSvBtn.NEStyle('btn', 'btn-outline-success', 'badge-pill');
            NewSvBtn.NEInnerHtml("<i class='fa fa-arrow-left'></i>");
            let Td = document.createElement('td');
            Td.classList.add('tab-cell');
            Td.appendChild(NewSvBtn.NewEle);
            Tr.appendChild(Td);
            MakeInputChangable.SvBtn_set.add(NewSvBtn.id);
        
            NewSvBtn.NewEle.addEventListener('click', function () {
                let Data_Arr = (rid) => {
                    let Rt = [];
                    $.each(RowsObjArr, (idw, tsk) => {  
                        if (rid === tsk.row.idWork) {
                            Rt = tsk.GetAnUpdate(Tbody);
                        }
                    });
                    return Rt;
                };
                this.verify_modif = (arr1, arr2) => {
                    //for (let item1 of arr1; !this.verify_modif.modified;1)  
                    
                };
                this.verify_modif(Data_Arr(Row_id),dailywrk_arr[rowindex]);
                    
                console.log(Data_Arr(Row_id));
                let save_edit = new XMLHttpRequest();
                save_edit.open("POST", "request/saveEditRequest.php", true);
                save_edit.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                save_edit.send("data_arr=" + JSON.stringify(Data_Arr(Row_id)));
                save_edit.onloadend = function () {
                    try {
                        if (this.status === 200) {
                            console.log(save_edit.response);
                            Tr.lastElementChild.remove();
                            Tr.lastElementChild.setAttribute('colspan', 2);
                        }
                    } catch (Error) {
                        console.log('Error Msg :' + Error.message);
                    }
                };
                save_edit.onerror = function () {
                    console.log('Error with Getting Request ,Status request :', save_edit.stauts);
                };
            });
        }
    }
}

function DwDReq() { // Get Daily work table Data from server 
    let respData = [];
    $.ajax({
            method: "post",
            url: "request/reloadinfo.php"
        })
        .done(function (msg) {
            console.log("A RSP Detected");
            JSON.parse(msg).forEach(row => {
                respData.push(row);
            });
        }).fail(function (errMsg) {
            console.log('Error Sending Request :' + errMsg);
        });
    return respData;
}
///Event
$('#reload-table').on('click', function () { // reload saved work to show if any changes was done in DB
    if (dailywrk_arr !== undefined || dailywrk_arr !== []) {
        Tbody.find('tr').each(function () {
            this.remove();
        });
        const DataAfterRefreshe=DwDReq();console.log(DataAfterRefreshe);
        setTimeout(function () {
            if(DataAfterRefreshe===undefined || DataAfterRefreshe=== null || DataAfterRefreshe===[])
                Tbody.append("<tr><td class=\"tab-cell\" colspan=\"7\">Empty</td></tr>");
            else
            DataAfterRefreshe.forEach(row =>  AddToCurrentWork(row) );
        }, 1750);
        console.log("table is update.");
    }
});

$('#edit-btn').click(function () {
    try {
        MakeInputChangable.SvBtn_set = new Set();
        for (let i = 0; i < Tbody.children().length; i++) {
            for (let j = 1; j < Tbody.children().get(i).children.length - 1; j++) {
                Tbody.children().get(i).children[j].classList.add('edit-data-cell');
                Tbody.children().get(i).children[j].addEventListener('dblclick', (ele) => {
                    MakeInputChangable(i, ele);
                    MakeInputChangable.RWid = dailywrk_arr[i][0];
                });
            }
        }
    } catch (e) {
        console.log("Error with Making input Changebale / error code : " + e.message);
    } finally {
        console.log("All input Field are ready to Make Change." );
    }
});
$('#submit-btn-row').on('click',function () {  // submit Button// //WORKING
    let input_array = (target)=>{
        let ReturnArr=[];
        $(target).find('input').each( function(){
            ReturnArr.push(this.value);
        });
        return ReturnArr;
    };
    let verify_input = array=> {
        $.each(array,(index,value)=>{
            if (value === '' || value === undefined || value.length === 0) {
                if (!verify_input.state) 
                    verify_input.state = false;            
                RequiredInput(index + 1);
            }
        });
        if (!verify_input.hasOwnProperty('state')) 
            verify_input.state = true;
    };
    const NewTaskArr =input_array('#tab-block>table>tfoot');
    verify_input(NewTaskArr);
    if (verify_input.hasOwnProperty('state') && verify_input.state) {
        const json_arr = JSON.stringify(NewTaskArr);
            console.log(json_arr);
            $.ajax({
                method: 'POST',
                url:"request/addwork_request.php",
                data:{data_arr:  json_arr},
                dataType:'json',
                contentType: "application/x-www-form-urlencoded",
                statusCode:{
                    404:()=>console.error("Page Not Found. Status Code :"+404),
                    200:()=>console.info("Response Is her .Status Code :"+200)
                }
            }).done(RecentlyAdded=>{
                try {
                    console.log(RecentlyAdded);
                    $('#submit-btn-row').find('input').each(()=>{this.value=""});
                    AddToCurrentWork(RecentlyAdded);
                } catch (Error) {
                     console.error('Error Loading Request :' + Error.message);
                }
            }).fail((msg)=>{
              console.error("Status Code :"+msg.status);
              console.error("Error Msg :"+msg.responseText);
            });
}});

/***************************************************
 * 
 * Section-02 
 * 
 * ***************************************************/

$('#New-row').click(GenRow);/* Generate Row Button*/

function GenRow() { // WORKING
    if (EmptyRowObj.exsit)
        EmptyRowObj.Remove($('#empty-row-Sec02'), $('#submit-all'));

    let pdiv = document.createElement('div');
    pdiv.classList.add('work-row');

    let intput_grp_Map = new Map();
    intput_grp_Map.set('id_module', ['fa-book', "WD-01", 15, 'required', 'm']);
    intput_grp_Map.set('time', ['fa-clock', "00:00:00", 9, 'required', 't']);
    intput_grp_Map.set('Duration', ['fa-clock', "00:00:00", 9, 'required', 'd']);
    intput_grp_Map.set('task', ['fa-tasks', "...", 40, 'required', 't']);
    intput_grp_Map.set('source', ['fa-database', "...", 40, 'required', 's']);

    intput_grp_Map.forEach((value, key) => {
        let new_div_row = document.createElement('div');
        new_div_row.classList.add('con-input');
        new_div_row.innerHTML="<input type='text' class='text-capitalize text-sm-center' name='" + key + "' placeholder= '" + key + "'" +
            " value='" + value[1] + "' maxlength='" + value[2] + "' required='" + value[3] + "' autocomplete  accesskey='" + value[4] + "'>" +
            "<i class='fa " + value[0] + " icon'></i>" +
            "<div class='bg'></div>";
                pdiv.appendChild(new_div_row);
    });

    let btn = document.createElement('button');
    btn.classList.add('btn', 'btn-outline-warning', 'badge-pill'); // let click = document.createAttribute('onclick');    // click.value = "RemoveRow(this)";  //btn.setAttributeNode(click);
    btn.innerHTML = "<i class='fa fa-minus'></i>";
    btn.addEventListener('click', function () {
        RemoveRow(this);
        (--GenRow.Cpt===0)?EmptyRowObj.Add($("#add-rows"), $('#submit-all')):0;
    });
    pdiv.appendChild(btn);
    AddrowsTag.append(pdiv);
    //Add datalist Tag after input
    let datalistTag = document.createElement('datalist');
    ++GenRow.Cpt;
    datalistTag.id = 'datalistoptions' + GenRow.Cpt;
    pdiv.children[pdiv.childElementCount - 2].firstElementChild.setAttribute('list', datalistTag.id);
    pdiv.children[pdiv.childElementCount - 2].firstElementChild.placeholder = 'Search ...';
    pdiv.children[pdiv.childElementCount - 2].append(datalistTag);
    pdiv.children[pdiv.childElementCount - 2].firstElementChild.addEventListener('input', function () {    //Events in every singel row
        console.clear();
        console.log(this.value);
        (this.value.length>=3)?RefrencesRequest(this.value, datalistTag):0;
    });
    //document.getElementById(datalistTag.id).remove();   //delete the DatalistTag From input   
}

function GetAllRowsData(divsbody) { //retun All Data in every Row

    let GetAllDivRows = (divsbody) => {
        let row = [], rowEle = [];
        for (let i = 0; i < $(divsbody).length; i++) {
            rowEle = [];
            for (let j = 0; j < $(divsbody)[0].children.length - 1; j++) {
                rowEle.push($(divsbody)[i].children[j]);
            }
            row.push(rowEle);
        }
        return row;
    };
    let WorkRowDivs = GetAllDivRows(divsbody),     row = [],     DataArr = [];
    for (let i = 0; i < WorkRowDivs.length; i++) {
        DataArr = [];
        for (let j = 0; j < WorkRowDivs[i].length; j++) {
            DataArr.push(WorkRowDivs[i][j].children[0].value);
        }
        row.push(DataArr);
    }
    return row;
}

function RemoveRow(element) { //WORKING
    element.parentElement.remove();
}

function RequiredInput(i) { //styling input if it submit empty  //WORKING

    $("#tab-block>table>tfoot>tr>td:nth-child(" + i + ")").find('svg').addClass('alert-danger').prev()
    .css("boxShadow", "0 2px 5px rgb(223, 78, 73)").keyup(function () {
        if ($(this).val() !== "") {
            $(this).css('boxShadow', "");
            $("#tab-block>table>tfoot>tr>td:nth-child(" + i + ")").find('svg').removeClass('alert-danger');
        }
    });
}

