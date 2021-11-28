function ContructorRowObject(DataArray) {
        return {
            idWork: DataArray[0],
            idModule: DataArray[1],
            Time: DataArray[2],
            Duration: DataArray[3],
            Task: DataArray[4],
            Source: DataArray[5],
        }
}
export class Tasks{
    row ={};
    constructor(DataArray,num_row) {
        this.row=ContructorRowObject(DataArray);
        this.row.num_row = num_row;
    };
    ToArray  ()  {
        return [this.row.idWork, this.row.idModule, this.row.Time, this.row.Duration, this.row.Task, this.row.Source];
    };
    ToString (jointer)  {
        return this.ToArray().join(jointer);
    };
    UpdateRowData (idMd, Tm, Dr, Tsk, Src)  {
        this.row.idModule = idMd;
        this.row.Time = Tm;
        this.row.Duration = Dr;
        this.row.Task = Tsk;
        this.row.Source = Src;
    };
    GetAnUpdate(tbody) {
        let tr = tbody.children().get(this.row.num_row);
        let arr = [];
        $.each(tr.children, (index, td) => {
            index < tr.childElementCount - 2 ?arr.push(td.innerText): 0; 
        });
        return arr;
    }
}

export class SaveBtnChng { //Construct a Save Button

    NewEle = document.createElement('button');
    NEStyle (...classes){
        $.each(classes, (i, str) => {
            this.NewEle.classList.add(str);
        });
    };
    NEInnerHtml (...htmlStrings)  {
        $.each(htmlStrings, (i, str) => {
            this.NewEle.innerHTML = str;
        });
    };
};
