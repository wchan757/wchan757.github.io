import MaterialTable,{MTableBodyRow} from "@material-table/core";
//import MaterialTable,{MTableBodyRow} from "material-table";
import CircularProgress from "@material-ui/core/CircularProgress";
//import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import tableIcons from "./MaterialTableIcons.js";
import keyword_highlight from "./keyword_highlight.js";
import React ,{ useState,useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBackOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import CallSplitRoundedIcon from '@mui/icons-material/CallSplitRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import TextField from "@material-ui/core/TextField";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import * as XLSX from 'xlsx/xlsx.mjs';
import {zip} from 'pythonic';
import Highlighter from "react-highlight-words";
import { makeStyles } from '@material-ui/core/styles';
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
//import { sql } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { SparkSQL } from 'dt-sql-parser';

// const parser = new SparkSQL();

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
  const parser = require('js-sql-parser');
  const ast = parser.parse('select fucker');

console.log(JSON.stringify(ast, null, 2));

  const findChunksAtBeginningOfWords = ({
    autoEscape,
    caseSensitive,
    sanitize,
    searchWords,
    textToHighlight
  }) => {
    const chunks = [];
    const textLow = textToHighlight.toLowerCase();
    // Match at the beginning of each new word
    // New word start after whitespace or - (hyphen)
    const sep = /[-\s]+/;
  
    // Match at the beginning of each new word
    // New word start after whitespace or - (hyphen)
    const singleTextWords = textLow.split(sep);
  
    // It could be possible that there are multiple spaces between words
    // Hence we store the index (position) of each single word with textToHighlight
    let fromIndex = 0;
    const singleTextWordsWithPos = singleTextWords.map(s => {
      const indexInWord = textLow.indexOf(s, fromIndex);
      fromIndex = indexInWord;
      return {
        word: s,
        index: indexInWord
      };
    });
  
    // Add chunks for every searchWord
    searchWords.forEach(sw => {
      const swLow = sw.toLowerCase();
      // Do it for every single text word
      singleTextWordsWithPos.forEach(s => {
        if (s.word == swLow || s.word.startsWith('@') || s.word.startsWith(swLow + '(') ) {
          const start = s.index;
          const end = s.index + swLow.length;
          chunks.push({
            start,
            end
          });
        }
      });
  
      // The complete word including whitespace should also be handled, e.g.
      // searchWord='Angela Mer' should be highlighted in 'Angela Merkel'
      if (textLow == swLow) {
        const start = 0;
        const end = swLow.length;
        chunks.push({
          start,
          end
        });
      }
    });
  
    return chunks;
  };
const [isLoading, setIsLoading] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);

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
  { id : 2 ,Query: "dsfsdfdsfdsf",BU:'Others',parentid : 1},
  { id : 3 ,Query: "dsfsdfdsfdsf",BU:'WTCMY',parentid : 1},
  { id : 4 ,Query: "dsfsdfdsfdsf",BU:'WTCTH',parentid : 1},
  { id : 5 ,Query: "WHERE condition",BU : '',parentid:'no'},
  { id : 6 ,Query: "@bu",BU : '',parentid:'no'},
  { id : 7 ,Query: "dsfsdfdsfdsf",BU:'WTCTW',parentid : 6},
  { id : 8 ,Query: "dsfsdfdsfdsf",BU:'Others',parentid : 6},
  { id : 9 ,Query: "dsfsdfdsfdsf",BU:'WTCTH',parentid : 6},
]);

const [data, setData] = useState([
  { id : 0,Query: "SELECT * FROM",BU : '',parentid:'no'},
  { id : 1,Query: "@bu_table",BU : '',parentid:'no'},
  { id : 2 ,Query: "dsfsdfdsfdsf",BU:'Others',parentid : 1},
  { id : 3 ,Query: "dsfsdfdsfdsf",BU:'WTCMY',parentid : 1},
  { id : 4 ,Query: "dsfsdfdsfdsf",BU:'WTCTH',parentid : 1},
  { id : 5 ,Query: "WHERE condition",BU : '',parentid:'no'},
  { id : 6 ,Query: "@bu",BU : '',parentid:'no'},
  { id : 7 ,Query: "dsfsdfdsfdsf",BU:'WTCTW',parentid : 6},
  { id : 8 ,Query: "dsfsdfdsfdsf",BU:'Others',parentid : 6},
  { id : 9 ,Query: "dsfsdfdsfdsf",BU:'WTCTH',parentid : 6},

]);

const [columns, setColumns] = useState([
  { title: "Query", field: "Query",editable:'always', cellStyle: {
    color: "black"},
    editComponent: props => {
      let display = ''
      if (props.value.includes('@')){display = props.value.replace('@','')}
      else {display = props.value}
      return(
    <TextField
      //type="numeric"
      //fullWidth={true}
      multiline={true}
      value={display}
      onChange={e => props.onChange(e.target.value)}
    />
      )},
      render : rowData => {
      return (
    //     <SyntaxHighlighter language="sql" style={docco} showLineNumbers ={true}>
    //   {rowData.Query}
    // </SyntaxHighlighter>
        <Highlighter
        autoEscape = {true}
          searchWords={keyword_highlight}
          textToHighlight = {rowData.Query}
          findChunks={findChunksAtBeginningOfWords}
          highlightStyle={
            {"color": rowData.Query.startsWith('@') ? '#f2d273' : '#32CD32',
            "background-color": 'transparent' ,
            "font-weight": "900",
            "text-transform": "uppercase"

              }}

        />
      );
    }


  },
  { title: "BU", field: "BU"   
  ,textAlign: "centre",
  lookup: {
          None:'',
          Others:"Others",
          FTRTH:'FTRHK',
          PNSHK:'PNSHK',
          WTCHK:'WTCHK',
          WTCID:"WTCID",
          WTCPH:"WTCPH",
          WWHK:"WWHK",
          WTCTW:"WTCTW",
          WTCMY:"WTCMY",
          WTCTH:"WTCTH",
          WTCSG:"WTCSG"

        }
},

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

//   for (let low_bu in bu_list_use)
//   {bu_list.push(bu_list_use[low_bu].toUpperCase())}

//   // seperated export_data into two type
//   for (let data_use in export_data)
//   if (export_data[data_use].parentid == 'no')
//   {parent_data.push(export_data[data_use])}
//   else 
//   {  
//     child_data.push(export_data[data_use])}


//   let temp_child_data = child_data
//   let complete_bu = bu_list


//   // get all bu child data
//   for (let child in child_data)
//   {unqiue_child.push(child_data[child].parentid)}

//   // only extract unique child data
//   unqiue_child = [... new Set(unqiue_child)]  
//   // console.log(unqiue_child)

//   // add all remaining bu in child data
//   for (var new_id in unqiue_child)
//       {
//       temp_query = temp_child_data.filter(n => n.parentid == unqiue_child[new_id] && n.BU == 'Others')
//       // console.log(temp_child_data)
//       temp_query = temp_query[0]
//       let temp_list = child_data.filter(n => n.parentid == unqiue_child[new_id])
//       temp_list.forEach(element => {
//         complete_bu =  complete_bu.filter(n => n !== element.BU)
//         // console.log(complete_bu)
//         // console.log(temp_query)
        
//        })
//       for (var bu_child in complete_bu)
//       {
//        let new_query = {}
//        new_query['id'] = temp_query['id']
//        new_query['Query'] = temp_query['Query']
//        new_query['BU'] =complete_bu[bu_child]
//        new_query['parentid'] = temp_query['parentid']

//        child_data.push(new_query)

//       }
//     }
//     child_data = child_data.filter(n => n.BU != 'Others')
//     console.log(child_data)
  

//   for (var bu in bu_list )
//   {export_json[bu_list[bu]] = []
//     for (var p_query in parent_data)
//     {
//       if (parent_data[p_query].Query.includes('@') == true)
//       {//create id only 
//         // console.log(parent_data[p_query].Query.includes('%'))
//         for (var c_query in child_data )
//         {if(child_data[c_query].parentid == parent_data[p_query].id && child_data[c_query].BU == bu_list[bu])
//         {
//         export_json[bu_list[bu]].push(child_data[c_query].Query)
//         }}
//       }
//       else
//       {export_json[bu_list[bu]].push(parent_data[p_query].Query)}

    

    
//   }
// }
// console.log(export_json)

  }

  const ExportMaster = () => {
    let master_export = [...data]
    let template_query = []
    let template_json = {}
    let bu_list_use = ['ftrhk','pnshk','wtchk','wtcid','wtcph','wwhk','wtctw','wtcmy','wtcth','wtcsg']
    let bu_lister = []
    let temp_no_head = ''
    let loop_check = 'nothing'
    let other_check = 'nothing'

    for (let low_bu in bu_list_use)
  {bu_lister.push(bu_list_use[low_bu].toUpperCase())}


    
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

  template_json['@bu_query'] = {}
  for (let bu_name in bu_lister)
    {template_json['@bu_query'][bu_lister[bu_name]] = [];
    
    for (let sub_query in template_query)
      {loop_check = 'nothing'
       other_check = 'nothing'
        if (template_query[sub_query].includes('@') == true)
        {temp_no_head = template_query[sub_query].substring(1)
          for (let check_check in template_json[temp_no_head])
            {if (template_json[temp_no_head][check_check].BU == bu_lister[bu_name])
                {loop_check = template_json[temp_no_head][check_check].Query}

             {if (template_json[temp_no_head][check_check].BU == 'Others')
                {other_check = template_json[temp_no_head][check_check].Query}}
            }
              
            if (loop_check == 'nothing')
            {template_json['@bu_query'][bu_lister[bu_name]].push(other_check)}
            else
            {{template_json['@bu_query'][bu_lister[bu_name]].push(loop_check)}}

              }
          else
          {{template_json['@bu_query'][bu_lister[bu_name]].push(template_query[sub_query])}
        
        }
    }
  }

  

  //console.log(template_json)

  // export the data to json
  template_json['template_query'] = template_query
  //console.log(template_json)
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
  console.log(file.name)
  //var mydata = JSON.parse(file);

  //alert(mydata[0].name);
  //alert(mydata[0].age);
  //alert(mydata[1].name);
  //alert(mydata[1].age); 

  //return 

  const reader = new FileReader()
  if (file.name.includes('.json'))
  {
  reader.onload=(e)=>{
    console.log(reader.name)
    var jsonObj = JSON.parse(e.target.result);
    //return 
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
    }
  }
  else if (file.name.includes('.txt'))
  {  
    reader.onload=(e)=>{
      let clean_list = []
      let result_list = e.target.result.split(/\r?\n/)

      for (let iter in result_list)
      {
      var random_id = Math.floor(Math.random() * 1000000)
      if (result_list[iter].replace(/\s+/g,'') != '' && result_list[iter].startsWith('--')!= true)
      {clean_list.push(
        { id : random_id,
          Query: result_list[iter],
          BU : '',
          parentid:'no'}
      )}

      }
      setData(clean_list)
    }

    }
  else 
  {alert ('incorrect file type')}
  
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
  style={{ width: "100%", margin: "0%"}}
  icons={{Edit: () => <EditOutlinedIcon  style={{ color: "black" }}/>,
          Delete: () => <RemoveCircleOutlineRoundedIcon  style={{ color: "black" }} />,
          Check: () => <CheckCircleOutlineRoundedIcon  style = {{color :'black',"margin-left": "30px"}}/>,
          Clear: () => <CancelOutlinedIcon style = {{color :'black'}} />


}
        }

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
          let newValue_check = newValue
          
          for (const[first , second] of zip(row_table , range))
            if (first.id == target_id)
            {pass_index = second ;
              break
            }
          
          console.log(oldValue)

          if (oldValue.Query.startsWith('@')==true)
          {newValue_check.Query = newValue.Query.replace('@','');
          newValue_check.Query = '@' + newValue_check.Query}
          else 
          {newValue_check.Query = newValue.Query.replace('@','')}

            
          //console.log('test')
          //console.log(pass_index)



          // const index = oldValue.tableData.id;
          // console.log(oldValue.tableData)
          // console.log(newValue)
          //console.log(columnDef)
            dataUpdate = dataUpdate.filter(t => t.id !== newValue.id);
            dataUpdate.splice(pass_index,0,newValue_check)
          
          // dataUpdate
          // dataUpdate[pass_index] = newValue
          //console.log(dataUpdate_use)
          previous_action([...data]);
          setData(dataUpdate);
          first_set(false)
          resolve();
        }, 1000)
      }),


    onRowDelete:(newValue,rowData) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
           // console.log(newValue)
           // console.log(oldValue)
          let rowData = [newValue];
          let _data = [...data];
          //console.log(newValue)
      rowData.forEach(rd => {
        _data = _data.filter(t => t.id !== rd.id);
      });
      let mum_check = [..._data]


      rowData.forEach(rd => {
        mum_check = mum_check.filter(t => t.parentid == rd.parentid);
      });
      console.log(mum_check)
      let new_data = _data
      //console.log(columnDef)
      if (rowData[0].parentid != 'no')
      {if (mum_check.length == 0)
        {for (let data_sub in _data)
          {if (rowData[0].parentid == _data[data_sub].id && _data[data_sub].Query.startsWith('@'))
            {_data[data_sub].Query = _data[data_sub].Query.substring(1)}
          
          
          }
        }
        else{
          console.log('pass')}
      }
      //setData(_data);}
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

    
  // icons={}
  onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
  options={{
    actionsCellStyle: {
      color: 'black',
      },
      loadingType:'linear',
    tableLayout: 'auto',
    //searchAutoFocus : true,
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
              backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF',
              backgroundColor: 'rgba(77, 93, 241, 0.08)',

              //...styles,
              //padding : 'dense',
              'text-indent': '20px',
              'font-size': '12px',
              'white-space':'pre',

              //fontWeight: 600,
            }
          }
          else {return {
            'font-size': '12px', 'white-space':'pre'
        }}

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
      // {icon: tableIcons.Add,
        {icon: ArrowBackIcon,
          iconProps: {color:  "secondary" },
          tooltip: "last step",
          onClick: lastpage,
          //,isFreeAction:true
          position : 'toolbar'  ,
          disabled : first_disable == true,
         
        },
      {icon: tableIcons.Export,
      tooltip: "export",
      iconProps: { style: { fontSize: "6px", color: "green" } },
        onClick: ExportOption,
        //,isFreeAction:true
        position : 'toolbar'

      },
      // icons={{Edit: () => <EditOutlinedIcon style={{ color: "grey" }}/>,

      {icon:() => <AddCircleOutlineRoundedIcon style = {{color:"black"}}/>,
        // icon: tableIcons.Add,
        tooltip: "Add Rows",
        //iconProps: { style: { fontSize: "6px", color: "green" } },
        position : 'row',
        //hidden : true,
        //isFreeAction : true,
        //onKeypress: console.log('haha'),
          onClick: handleAddRows,
          isLoading: true,
      
      
        },

        rowData =>(
          {
        icon:() => {
        let color_type = 'black';
        if (rowData.tableData.childRows != null)
        {color_type = 'grey'}
        return(
        <CallSplitRoundedIcon
         style = {{color:color_type}}/>
        )},
        
                    
          // icon: tableIcons.DetailPanel,
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



  