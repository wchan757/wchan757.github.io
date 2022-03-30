import MaterialTable,{MTableBodyRow} from "@material-table/core";
//import MaterialTable,{MTableBodyRow} from "material-table";
import CircularProgress from "@material-ui/core/CircularProgress";
//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import tableIcons from "./MaterialTableIcons.js";
import React ,{ useState,useEffect } from 'react';
import { Icon } from "@material-ui/core";
import YourLogo from './new_icon/cross.svg'
//import axios from "axios";
import * as XLSX from 'xlsx/xlsx.mjs';
//import {XLSX} from 'xlsx/xlsx.mjs';
import {zip} from 'pythonic';
import { makeStyles } from '@material-ui/core/styles';
//import logo from './cross.png';


// const useStyles = makeStyles({
//   colHeader: {
//     color: "red",
//     "&:hover": {
//       color: "blue"
//     }
//   }
// });

//import reportWebVitals from './reportWebVitals';

//import { CsvBuilder } from 'filefy';

//TODO:
//Add CircularPogress for row editining


const BasicTable = () => {
//   console.time('Timer name');
//   console.log('start')
// //do critical time stuff
// console.timeEnd('Timer name');
//props.isLoading = false

//const { useState } = React;
const [isLoading, setIsLoading] = useState(false);
 
const Logo = () => (
  <Icon>
      <img src={YourLogo} height={15} width={15}/>
  </Icon>
)


const [forward_data,forward_action] = useState([
  { id : 0,Query: "SELECT * FROM",BU : '',parentid:'no'},
  { id : 1,Query: "@bu_table",BU : '',parentid:'no'},
  { id : 1 ,Query: "dsfsdfdsfdsf",BU:'Others',parentid : 1},
  { id : 2 ,Query: "dsfsdfdsfdsf",BU:'WTCMY',parentid : 1},
  { id : 3 ,Query: "dsfsdfdsfdsf",BU:'WTCTH',parentid : 1},
  { id : 4 ,Query: "WHERE condition",BU : '',parentid:'no'},
  { id : 5 ,Query: "@bu",BU : '',parentid:'no'},
  { id : 6 ,Query: "dsfsdfdsfdsf",BU:'WTCTW',parentid : 5},
  { id : 7 ,Query: "dsfsdfdsfdsf",BU:'Others',parentid : 5},
  { id : 8 ,Query: "dsfsdfdsfdsf",BU:'WTCTH',parentid : 5},
]);



const [previsu_data,previous_action] = useState([
  { id : 0,Query: "SELECT * FROM",BU : '',parentid:'no'},
  { id : 1,Query: "@bu_table",BU : '',parentid:'no'},
  { id : 1 ,Query: "dsfsdfdsfdsf",BU:'Others',parentid : 1},
  { id : 2 ,Query: "dsfsdfdsfdsf",BU:'WTCMY',parentid : 1},
  { id : 3 ,Query: "dsfsdfdsfdsf",BU:'WTCTH',parentid : 1},
  { id : 4 ,Query: "WHERE condition",BU : '',parentid:'no'},
  { id : 5 ,Query: "@bu",BU : '',parentid:'no'},
  { id : 6 ,Query: "dsfsdfdsfdsf",BU:'WTCTW',parentid : 5},
  { id : 7 ,Query: "dsfsdfdsfdsf",BU:'Others',parentid : 5},
  { id : 8 ,Query: "dsfsdfdsfdsf",BU:'WTCTH',parentid : 5},
]);

const [data, setData] = useState([
  { id : 0,Query: "SELECT * FROM",BU : '',parentid:'no'},
  { id : 1,Query: "@bu_table",BU : '',parentid:'no'},
  { id : 1 ,Query: "dsfsdfdsfdsf",BU:'Others',parentid : 1},
  { id : 2 ,Query: "dsfsdfdsfdsf",BU:'WTCMY',parentid : 1},
  { id : 3 ,Query: "dsfsdfdsfdsf",BU:'WTCTH',parentid : 1},
  { id : 4 ,Query: "WHERE condition",BU : '',parentid:'no'},
  { id : 5 ,Query: "@bu",BU : '',parentid:'no'},
  { id : 6 ,Query: "dsfsdfdsfdsf",BU:'WTCTW',parentid : 5},
  { id : 7 ,Query: "dsfsdfdsfdsf",BU:'Others',parentid : 5},
  { id : 8 ,Query: "dsfsdfdsfdsf",BU:'WTCTH',parentid : 5},

]);

const [columns, setColumns] = useState([
  { title: "Query", field: "Query",editable:'always', cellStyle: {
    textAlign: "centre"},
    // validate: rowData => 
    // {let report_data = [...data]
    // let list_check = []
    // for (let iter_num in report_data)
    // {list_check.push(report_data[iter_num].parentid)}
    // // console.log(list_check)
    // // console.log(rowData)
    // console.log([...data])
    // //console.log(rowData)
    // if (list_check.includes(rowData.id) & rowData.Query.startsWith('@') == false)
    //   return false
    // if (list_check.includes(rowData.id) == false & rowData.Query.includes('@') == true)
    // {return false}
    // else{return true}

  },

  { title: "BU", field: "BU" ,editable:'always',textAlign: "centre"},

]);


// const handleDeleteRows = (event, rowData) => {

  
//   //isLoading = true
//   // let dataUpdate = [...data];
//   // let row_table = [...data];
//   // let range = [...Array(row_table.length).keys()];
//   // let target_id = newValue.id
//   // let pass_index = ''
  
//   // for (const[first , second] of zip(row_table , range))
//   //   if (first.id == target_id)
//   //   {pass_index = second ;
//   //     break
//   //   }
    
//   // console.log('test')
//   // console.log(pass_index)

//   rowData = [rowData]
//   let _data = [...data];
//   console.log(rowData)
//   rowData.forEach(rd => {
//     _data = _data.filter(t => t.id !== rd.id);
//   });
//   let new_data = _data
//   if (rowData[0].parentid != 'no'){console.log('pass'); setData(_data);}
//   else {new_data.forEach(rd => {
//     _data = _data.filter(t => t.parentid !== rowData[0].id)
//   }); setData(_data);
// } 
// };

//TODO: wtcmy missing
//TODO: % as child data recongiztion
const ExportOption = () => {
  let bu_list_use = ['ftrhk','pnshk','wtchk','wtcid','wtcph','wwhk','wtctw','wtcmy','wtcth','wtcsg']
  let bu_list = []
  var export_data = [...data]
  let parent_data = []
  var child_data = []
  let export_json = {}
  let counter = 0
  let unqiue_child = []
  let unqiue_child_list = []
  var temp_query = '.'

  //export the master file
  var test = ExportMaster()

  return 
// console.log(export_data)

  for (let low_bu in bu_list_use)
  {bu_list.push(bu_list_use[low_bu].toUpperCase())}

  // seperated export_data into two type
  for (let data_use in export_data)
  if (export_data[data_use].parentid == 'no')
  {parent_data.push(export_data[data_use])}
  else 
  {  
    child_data.push(export_data[data_use])}


  let temp_child_data = child_data
  let complete_bu = bu_list


  // get all bu child data
  for (let child in child_data)
  {unqiue_child.push(child_data[child].parentid)}

  // only extract unique child data
  unqiue_child = [... new Set(unqiue_child)]  
  // console.log(unqiue_child)

  // add all remaining bu in child data
  for (var new_id in unqiue_child)
      {
      temp_query = temp_child_data.filter(n => n.parentid == unqiue_child[new_id] && n.BU == 'Others')
      // console.log(temp_child_data)
      temp_query = temp_query[0]
      let temp_list = child_data.filter(n => n.parentid == unqiue_child[new_id])
      temp_list.forEach(element => {
        complete_bu =  complete_bu.filter(n => n !== element.BU)
        // console.log(complete_bu)
        // console.log(temp_query)
        
       })
      for (var bu_child in complete_bu)
      {
       let new_query = {}
       new_query['id'] = temp_query['id']
       new_query['Query'] = temp_query['Query']
       new_query['BU'] =complete_bu[bu_child]
       new_query['parentid'] = temp_query['parentid']

       child_data.push(new_query)

      }
    }
    child_data = child_data.filter(n => n.BU != 'Others')
    console.log(child_data)
  

  for (var bu in bu_list )
  {export_json[bu_list[bu]] = []
    for (var p_query in parent_data)
    {
      if (parent_data[p_query].Query.includes('@') == true)
      {//create id only 
        // console.log(parent_data[p_query].Query.includes('%'))
        for (var c_query in child_data )
        {if(child_data[c_query].parentid == parent_data[p_query].id && child_data[c_query].BU == bu_list[bu])
        {
        export_json[bu_list[bu]].push(child_data[c_query].Query)
        }}
      }
      else
      {export_json[bu_list[bu]].push(parent_data[p_query].Query)}

    

    
  }
}
console.log(export_json)

  }

  const ExportMaster = () => {
    let master_export = [...data]
    let template_query = []
    let template_json = {}
    
    //create the teamplate_query
    for (var temp in master_export)
    {if (master_export[temp].parentid == 'no')
    {template_query.push(master_export[temp].Query)}
  }
    //create the bu-specifci variable
    for (var temp in master_export)
    {if (master_export[temp].Query.includes('@') == true)
    {var skip_firster = master_export[temp].Query.substring(1)
     template_json[skip_firster] = []
    for (var temp_sub in master_export)
    {
      if (master_export[temp_sub].parentid == master_export[temp].id)
      {
        template_json[skip_firster].push({'BU':master_export[temp_sub].BU,
                                          'Query':master_export[temp_sub].Query})

      }
      
    

    }
  
  }
  
  }
  // export the data to json
  template_json['template_query'] = template_query
  const fileData = JSON.stringify(template_json);
  const blob = new Blob([fileData], {type: "text/plain"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'master.json';
  link.href = url;
  link.click();

}

    
    
    
    
  //   }
  // }
  // console.log(export_json)
  // //console.log(counter)

 
const bu_specific = (e , rowData) => {
    previous_action([...data])
    let _data = [...data]
    let mum_id = rowData.id
    let random_id = Math.floor(Math.random() * 1000000)
    let id_list = []
    let obj = undefined
    let temp_str = ''
    while (obj != undefined){
      random_id = Math.floor(Math.random() * 1000000);
      obj = id_list.find(element => element == random_id);
      if (obj == undefined){
        obj = id_list.find(element => element == random_id + 1) ;
        
      }
    }
    _data.push({ id : random_id ,Query: "-",BU:'-',parentid : mum_id})
    for (let data_number in _data)
    {temp_str = _data[data_number].Query
      if (_data[data_number].id == mum_id &  _data[data_number].Query.includes('@') != true)
      {_data[data_number].Query = '@' + temp_str}

    }
    //rowData = [rowData]
    //console.log(rowData)

    //{ id : 8 ,Query: "dsfsdfdsfdsf",BU:'WTCTH',parentid : 5},

    setTimeout(() => {
      setData(_data);
      first_set(false);
      // setIsLoading(false)
      
    }, 500)
}
  

const handleAddRows = (event , rowData) => {
  previous_action([...data])
  rowData = [rowData]
  // TODO:
  // DONE , rmb to change the text trasnform of parentid to 'no'
  // setIsLoading(true)
  if (rowData.length != 1){return(alert('you can"t select more than one row when u add new row'));}
  let _data = [...data];
  let range = [...Array(_data.length).keys()];
  let random_id = Math.floor(Math.random() * 1000000);
  let index_variable = rowData[0].id
  let index_partent = rowData[0].parentid
  let id_list = []
  let obj = undefined
  
  for (const item_key in _data )
  {id_list.push(_data[item_key].id)}

//   console.time('Timer name');
//   console.log('a')
// //do critical time stuff
// console.timeEnd('Timer name');
console.log('b')
  while (obj != undefined){
    random_id = Math.floor(Math.random() * 1000000);
    obj = id_list.find(element => element == random_id);
    if (obj == undefined){
      obj = id_list.find(element => element == random_id + 1) ;
      
    }
  }
//   console.time('Timer name');
//   console.log('c')
// //do critical time stuff
// console.timeEnd('Timer name');

for (const[first , second] of zip(_data , range))
    
      if (first.id == index_variable)
      { 
        //console.log(rowData[0].parentid)
        //console.log(rowData)
        

        if (rowData[0].parentid != 'no')
      { 
        _data.splice( second + 1 ,0,
          
          { 
        id : random_id,
        Query: '-',
        BU:'-',
        parentid : index_partent});
      }
       else
       {  
        // console.log(rowData[0].parentid)

         _data.splice( second + 1 ,0,
        { 
        id :random_id,
        Query: '-',
        BU:'',
        parentid : "no"
        }
        // ,
        // {
        //   id : random_id + 1,
        //   Query: 'NULL',
        //   BU:'NULL',
        //   parentid : random_id
        //   }
        
        );
      }
    break}
 
  setTimeout(() => {
    setData(_data);
    first_set(false);
    // setIsLoading(false)
    
  }, 500)
};

const DrageState = {
  row: -1,
  dropIndex: -1 // drag target
};

const offsetIndex = (from, to, arr = []) => {
  if (from < to) {
    console.log('to higher')
    let start = arr.slice(0, from),
      between = arr.slice(from + 1, to + 1),
      end = arr.slice(to + 1);
      //console.log(between)
      //console.log(arr[from])
    // console.log(start)
    // console.log(arr[from].parentid)
    let return_list =  [...start, ...between, arr[from], ...end]
    if (arr[from].parentid != 'no'){return return_list}
    else {
      let reload_data = []
      let temp_list = []
      let range = [...Array(between.length).keys()];

      for (const[first, second] of zip(between , range))
      if (first.parentid == arr[from].id)
      {
        reload_data.push(second);
        temp_list.push(first)
      };
      
    if (reload_data.length == 0)
    { return return_list} 
    else{
      console.log(reload_data)
      let min_math = Math.min(reload_data)
      let new_between = between.splice(min_math,between.length-1)
      console.log(new_between)
      console.log(between)
      console.log(start)
      console.log(arr[0,from])
      //console.log(new_between)
      let new_return = [...start, ...between, arr[from],...temp_list ,...end]
      //console.log(new_between)
      //console.log(between)
      console.log(new_return)
      return new_return
    }
      }
    }
  if (from > to) {
    let start = arr.slice(0, to),
      between = arr.slice(to, from),
      end = arr.slice(from + 1);
      //console.log()
    return [...start, arr[from], ...between, ...end];
  }
  return arr;
};
const reOrderRow = (from, to) => {
  //console.log(from)
  //console.log(to)

  //TODO:
  previous_action([...data])
  let _data = data;
  //console.log(from)
  //console.log(_data[from].parentid)
  if (_data[from].parentid == 'no' & _data[to].parentid=='no'){}
  else {if(_data[from].parentid != 'no' & _data[to].parentid != 'no')
  {if(_data[from].parentid == _data[to].parentid){} else{return}}
  else{return}}
  
  let newtableData = offsetIndex(from, to, _data);
  //console.log(newtableData)
  //Update react state

  setData(newtableData);
  first_set(false);

  //console.log(newtableData)
  //console.log(data)

};

//upload file function 
//const[colDefs,setColDefs] = useState()
//const[dataDefs,setDataDefs] = useState()

const importExcel =(e) =>{
  //previous_action([...data])
  //console.log(e.target.files)
  const file = e.target.files[0]
  //var mydata = JSON.parse(file);

  //alert(mydata[0].name);
  //alert(mydata[0].age);
  //alert(mydata[1].name);
  //alert(mydata[1].age); 

  //return 

  const reader = new FileReader()
  reader.onload=(e)=>{
    var jsonObj = JSON.parse(e.target.result);
    var query_list = [] 
    for (var temp_que in jsonObj.template_query)
    {
      var random_id = Math.floor(Math.random() * 1000000); 
      if (jsonObj.template_query[temp_que].includes('@') != true)
      {query_list.push(
        { id : random_id,
          Query: jsonObj.template_query[temp_que],
          BU : '',
          parentid:'no'}
      )
      }
      else 
      {var skip_first = jsonObj.template_query[temp_que].substring(1)
        query_list.push(
          { id : random_id,
            Query: jsonObj.template_query[temp_que],
            BU : '',
            parentid:'no'}
        )
        for (var sub_data in jsonObj[skip_first])
        {query_list.push(
          {
          id : random_id + Math.floor(Math.random() * 100),
          Query:jsonObj[skip_first][sub_data].Query,
          BU : jsonObj[skip_first][sub_data].BU,
          parentid : random_id

          }
        )
        }
      }

      }
      setData(query_list)
    

  
  
  //console.log(query_list)
    //{console.log(jsonObj.template_query[temp_que])}



    //{ id : 0,Query: "SELECT * FROM",BU : '',parentid:'no'},

    //console.log(e.target.result)
  

  return 

  const bstr=e.target.result
  const workBook =XLSX.read(bstr,{type:"binary"})
  const workSheetName = workBook.SheetNames

  const workSheet=workBook.Sheets[workSheetName]
  //convert to array  
  const fileData=XLSX.utils.sheet_to_csv(workSheet,{header:1})
  //console.log(fileData)

  //console.log(fileData[0])
  //console.log(convertToJson(fileData))
  var json_data = convertToJson(fileData)
  //console.log(json_data)
  json_data.splice(-1)

  setData(json_data)
  first_set(false);

//const headers = fileData[0]
//  reader.readAsBinaryString(file)

  }
reader.readAsBinaryString(file)
}

// convert csv to json
const convertToJson = (csv) => {
  var lines = csv.split("\n");

  var result = [];

  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");
    //console.log(currentline)

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  //return result; //JavaScript object
  return (result) //JSON
};

// const onDragEnd = (result) => {
//   const { destination, source } = result;
//   if (!destination) return;
//   if (source.index !== destination.index) {
//     let copyArray = [...data];
//     let temp = data[source.index];
//     copyArray.splice(source.index, 1);
//     copyArray.splice(destination.index, 0, temp);
//     setData(copyArray);
//   }
// };
const [first_disable,first_set] = useState(true)

const lastpage = () => {
  
  setData(previsu_data)
  first_set(true)
  }
//   this.setState({ visible: true })
//   console.log(previsu_data)
//   console.log('last_page')










  return (
    <div className = "OCTAVIA">
    <input type ='file' onChange ={importExcel}/>

  <MaterialTable 
  title="Query Editior" 
  style={{ width: "100%", margin: "0%" }}
  // icons={{
  //   Edit: () => <EditIcon style={{ color: "orange" }} />,
  //   Delete: () => <DeleteIcon style={{ color: "red" }} />
  // }}
  // onTreeExpandChange = {(path,data) =>{
  //   this.dataManager.changeTreeExpand(path);
  //   this.setState(this.dataManager.getRenderState(), () => {
  //     this.props.onTreeExpandChange &&
  //       this.props.onTreeExpandChange(data, data.tableData.isTreeExpanded)
  //   })}}

    editable = {{onRowUpdate:(newValue, oldValue) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(data)
          let dataUpdate = [...data];
          let row_table = [...data];
          let range = [...Array(row_table.length).keys()];
          let target_id = newValue.id
          let pass_index = ''
          
          for (const[first , second] of zip(row_table , range))
            if (first.id == target_id)
            {pass_index = second ;
              break
            }
            
          //console.log('test')
          //console.log(pass_index)



          // const index = oldValue.tableData.id;
          // console.log(oldValue.tableData)
          // console.log(newValue)
          //console.log(columnDef)
            dataUpdate = dataUpdate.filter(t => t.id !== newValue.id);
            dataUpdate.splice(pass_index,0,newValue)
          
          // dataUpdate
          // dataUpdate[pass_index] = newValue
          //console.log(dataUpdate_use)
          previous_action([...data]);
          setData(dataUpdate);
          first_set(false)
          resolve();
        }, 1000)
      }),


    onRowDelete:(newValue, oldValue, rowData, columnDef) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
           // console.log(newValue)
           // console.log(oldValue)
          let rowData = [newValue];
          let _data = [...data];
          console.log(rowData)
      rowData.forEach(rd => {
        _data = _data.filter(t => t.id !== rd.id);
      });
      //console.log(_data)
      let new_data = _data
      if (rowData[0].parentid != 'no'){console.log('pass'); setData(_data);}
      else {new_data.forEach(rd => {
        _data = _data.filter(t => t.parentid !== rowData[0].id)
      })}; 
      previous_action([...data])
      setData(_data);
      first_set(false);
      resolve();
    }, 1000)
        })

    
    }}
    
    

        
  // editable = {{onRowAdd:setIsLoading(false)}}
  columns={
    columns
  }
  data={data} 
  parentChildData={(row, rows) => rows.find(a => a.id == row.parentid)}
  // onTreeExpandChange={() => console.log('test tree expand change')}
  //onTreeExpandChange={(data,isTreeExpanded) => console.log(data)}

    
  icons={tableIcons}
  options={{
    tableLayout: 'auto',
    headerSelectionProps: {
      disabled : true    },
    //addRowPosition: "Last",
    //search: false,
    //actionsColumnIndex: 0,
    headerStyle: { position: 'sticky',top:1, backgroundColor: "#f7f7f7" },
    isLoading: true,
    sorting : false,
    //grouping : true,
    //minBodyHeight:500,
    //maxBodyHeight:1000,
    paging:false,
    padding:'dense',
    //editable :true,
    // exportButton: {
    //   csv: true,
    //   pdf: false,
    //   //animals :true
    // },
    //exportAllData : true,
  //   exportCsv: (data, columns) => {const columnTitles = columns
  //     .map(columnDef => columnDef.title);
  
  // const csvData = data.map(rowData =>
  //       columns.map(columnDef => rowData[columnDef.field]),
  //     );

  // const builder = new CsvBuilder(`data.csv`)
  //       .setColumns(columnTitles)
  //       .addRows(csvData)
  //       .exportFile();

  // return builder;

  // exportButton: {
  //   csv: true,
  //   pdf: true
  // } ,    
  //actionsColumnIndex: -1,
  //toolbarButtonAlignment:"left",
  selection : false,
    draggable: true,
    selectionProps: row => ({
                            disabled : true,
                            //checked:true,
                            //hidden:true


                            
                          }),
          rowStyle: rowData => {
            //console.log(rowData)
            var data = rowData.tableData.isTreeExpanded == true
            //console.log(rowData)
            let styles = { transition: 'transform 300ms' };
            const levels = rowData.tableData.path.length === 1 ? 0 : rowData.tableData.path.length;
            styles = { ...styles, '--left-before': `${levels * 6}px` };
            //console.log([...rowData])
            //for (let temp_data in rowData)
            //{console.log(rowData[temp_data])}
            //{if rowData[temp_data]}
            if (rowData.parentid != 'no')
            {return{
              //...styles,
              //padding : 'dense',
              'text-indent': '20px',
              'font-size': '12px',
              //fontWeight: 600,
              backgroundColor: 'rgba(77, 93, 241, 0.08)',
            }
          }
          else {return {'font-size': '12px'}}

            // return rowData.tableData.isTreeExpanded
            //   ? {
            //       //...styles,
            //       padding : 'dense',
            //       fontWeight: 600,
            //       backgroundColor: 'rgba(77, 93, 241, 0.08)'
            //     }
            //   : {};
          }

          
        
                      





    // rowStyle: {
    //   fontSize: 8,
    //   //height: 8,
    //   //borderBottom: "none",
    //   borderBottom: '2px solid white'

    // },
    //cellStyle : {width:200,
     //           maxWidth:200},


    //selectionProps: row => ({disabled: row.tableData.disabled})
    
    }}


    localization={{
      header : {
         actions: 'Actions'
      }
    }}

    // localization={{
    //   toolbar: {
    //     exportCSVName: "Export CSV",
    //    // exportPDFName: "Export as pdf!!"
    //   },
      
    // }}
    
    // cellEditable={{
    //   onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
    //     return new Promise((resolve, reject) => {
    //       const clonedData = [...data]
    //      //console.log('haha')
    //       console.log(clonedData)
    //       console.log(newValue)
    //       console.log(rowData.id)
    //       console.log(columnDef.field)
    //       //console.log(clonedData[rowData.id][columnDef.field])
    //       clonedData[rowData.id][columnDef.field] = newValue //TODO click yes has no repsonse
    //       console.log('dfdf')

    //       console.log(clonedData)
    //       setData(clonedData)
    //       setTimeout(resolve, 4000);

    //       // setTimeout(() => {
    //       //   setData(clonedData);            
    //       // }, 5
    //       // )
          
    //     });
    //   }
    // }}
    //LastPage
    
    actions={[
      {icon: Logo,
        tooltip: "last step",
          onClick: lastpage,
          //,isFreeAction:true
          position : 'toolbar'  ,
          disabled : first_disable == true
        },
      {icon: tableIcons.Export,
      tooltip: "export",
        onClick: ExportOption,
        //,isFreeAction:true
        position : 'toolbar'

      },
      {icon : Logo,
        // icon: tableIcons.Add,
        tooltip: "Add Rows",
        position : 'row',
        //hidden : true,
        //isFreeAction : true,
        //onKeypress: console.log('haha'),
          onClick: handleAddRows,
          //isLoading: true,
      
      
        },
        rowData =>(
        {icon: tableIcons.DetailPanel,
          tooltip: "Variation",
          position : 'row',
          hidden : rowData.parentid != 'no',
          //isFreeAction : true,
          //onKeypress: console.log('haha'),
          onClick: bu_specific,
            //isLoading: true,
            disabled : rowData.tableData.childRows != null 
          })
        
        // {icon: tableIcons.Edit,
        //   tooltip: "Edit",
        //   //isFreeAction : true,
        //   //onKeypress: console.log('haha')
        //     onClick: handleAddRows
            
        //    // , isFreeAction:true
  
          // }
        
        
    ]}
    // TODO working on rewriting the editfield component to add enter or delete function
    components={{
      Row: (props) => (
        <MTableBodyRow
          {...props}
          draggable= "true"
          onDoubleClick={e => {
            //console.log(props.data);
            props.actions[4]().onClick(e, props.data);
            //alert("Make row editable");
          }}
          // onKeyUp={event => {
          //   if (event.key === "Enter"){handleAddRows(1,props.data.tableData)}}}
            
          //onKeyPress={handleAddRows(1,props.data.tableData)}
          onDragStart={(e) => {
            //console.log("onDragStart");
            let row_table = [...data]
            let range = [...Array(row_table.length).keys()];
            let target_id = props.data.id
            //let pass_index = ''
            for (const[first , second] of zip(row_table , range))
              if (first.id == target_id)
              {DrageState.row = second ;
              break}

              //console.log(range)


            //console.log(pass_index)
            //DrageState.row = props.data.tableData.id;
            //DrageState.row = pass_index;

            //console.log(DrageState.row);

          }}
          onDragEnter={(e) => {
            let row_table = [...data]
            let range = [...Array(row_table.length).keys()];
            let target_id = props.data.id
            let pass_index = ''

            for (const[first , second] of zip(row_table , range))
              if (first.id == target_id)
              {pass_index = second ;
              break}
              //console.log(pass_index)


            //e.preventDefault();
            //console.log("onDragEnter");
            if (pass_index !== DrageState.row) {
              DrageState.dropIndex = pass_index;
            }
          }}

          onDragEnd={(e) => {
            //console.log(`onDragEnd`);
            if (DrageState.dropIndex !== -1) {
              reOrderRow(DrageState.row, DrageState.dropIndex);
            }
            //DrageState.row = -1;
            //DrageState.dropIndex = -1;
          }}

        />
        

        
      ),
      
    }
  }
  />
  
</div>

  
  

  );
};
// reference: for icons
//https://stackoverflow.com/questions/62339570/how-to-change-the-default-material-table-icons

export default BasicTable 



  