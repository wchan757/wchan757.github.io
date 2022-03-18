# Octavia - Multi-BU Query Generator


>>Octavia is a project that focusing on optimziing our CI/CD process through following three methods:
1. Spark SQL Syntax Checking --- Finished
2. Dag Syntax Checking --- Finished
3. CI/CD Deployment Processing Automation --- Finished
4. Multi-BU Query Generator --- Working🚧 


>>What is Multi-BU Query Generator?

Currently, We have been handling over 10+ BUs datasource and , although their sql query is highly similar , when there is a new change in the query, we need to apply the change to all BUs query one by one. This process is time-consuming and easy to make error. To solve this, we create a online generator that accept parameters and be able to insert the parameter into query template and generate the needed query by BUs. 

>>Usage -- General

1. The master file for generator should be in .json
2. The master file should have two variables: -template_query, -para_variable
3. In template_query, "@" represent this line is BU-specifc and "@" must occupy all single line
4. In para_variable , "Others" in key represent it apply to all undeclared BU.

Example:
```sh
{"where_cause" : [
    {"BU":"WTCTW","Query":"hahaha"},
    {"BU":"Others","Query":"yoyoyo"} // para_variable
],    
    "template_query" : [
        "select * from",
        "Where",
        "@where_cause"] // where_caue will be inserted into this line
    
    
    }
```

>>> Usage -- Editor

1. You can import the master file / directly use the editor to create the query
2. Still "@" must occpy one single line only , Others represent remaining BUs 
3. Asia BU : [ftrhk','pnshk','wtchk','wtcid','wtcph','wwhk','wtctw','wtcmy','wtcth','wtcsg]
4. When you export the data , it will export the master file.




