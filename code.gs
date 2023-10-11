var userEmail = Session.getActiveUser().getEmail();


function getUserDetails() {

  var staffSpreadsheetId = "11fzyV3OJf4chznaW1fxh9f3-nNcGExhNdgDe-YI2FMg";
  var staffSheet = SpreadsheetApp.openById(staffSpreadsheetId).getSheetByName('staff');
  var staffData = staffSheet.getDataRange().getValues();

  // Find the user by email
  for (var i = 0; i < staffData.length; i++) {
    if (staffData[i][6] === userEmail) {
      return {
        email: userEmail,
        name: staffData[i][1],
        position: staffData[i][2],
        department: staffData[i][3],
        departmentCode: staffData[i][4],
        workLine: staffData[i][7]
      };
    }
  }

  // If user not found, return only email
  return { email: userEmail };
}
// function getUserEmail() {
//   var userEmail = Session.getActiveUser().getEmail();
//   return userEmail;
// }


function getStaffData() {
  var staffSpreadsheetId = "11fzyV3OJf4chznaW1fxh9f3-nNcGExhNdgDe-YI2FMg"; 
  var staffSheet = SpreadsheetApp.openById(staffSpreadsheetId).getSheetByName('staff');
  return staffSheet.getRange("A2:H" + staffSheet.getLastRow()).getValues();
}



function setColumnsAsPlainText() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('task');

    sheet.getRange("A:L").setNumberFormat("@");


}

// function doGet() {
//   return HtmlService.createHtmlOutputFromFile('index')
//     .addMetaTag('viewport', 'width=device-width, initial-scale=1')
//     .setTitle('Google Sheet Web App');
// }




function getScriptURL() {
    return ScriptApp.getService().getUrl();
}




function loadDetailPage(id, page,table) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(table);
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var detail = {};

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      for (var j = 0; j < headers.length; j++) {
        detail[headers[j]] = data[i][j];
      }
      break;
    }
  }

  var htmlOutput = HtmlService.createTemplateFromFile(page);
  htmlOutput.data = detail;
  htmlOutput.id = id;

  return htmlOutput.evaluate();
}







//àÅÔ¡ãªéáÅéÇà¾ÃÒÐä» merge column ÁÒ¨Ò¡ÍÕ¡µÒÃÒ§à¾ÔèÁ
function getSheetData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('task'); 
  var data = sheet.getDataRange().getValues();
  return data;
}









// function fetchMappedData() {
//     var userEmail = Session.getActiveUser().getEmail();

//     var mainSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
//     var taskSheet = mainSpreadsheet.getSheetByName('task');
//     var taskData = taskSheet.getRange("A2:L" + taskSheet.getLastRow()).getValues();
    
//     var staffSpreadsheetId = "11fzyV3OJf4chznaW1fxh9f3-nNcGExhNdgDe-YI2FMg";
//     var staffSheet = SpreadsheetApp.openById(staffSpreadsheetId).getSheetByName('staff');
//     var staffData = staffSheet.getRange("A2:H" + staffSheet.getLastRow()).getValues();

//     var subSheet = mainSpreadsheet.getSheetByName('sub');
//     var subData = subSheet.getRange("A2:L" + subSheet.getLastRow()).getValues();


function fetchMappedData() {
    var userEmail = Session.getActiveUser().getEmail();

    var mainSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var taskSheet = mainSpreadsheet.getSheetByName('task');
    var taskData = taskSheet.getDataRange().offset(1, 0).getValues();  // àÃÔèÁ¨Ò¡á¶Ç·Õè 2 áÅÐ¤ÍÅÑÁ¹ì A
    
    var staffSpreadsheetId = "11fzyV3OJf4chznaW1fxh9f3-nNcGExhNdgDe-YI2FMg";
    var staffSheet = SpreadsheetApp.openById(staffSpreadsheetId).getSheetByName('staff');
    var staffData = staffSheet.getDataRange().offset(1, 0).getValues(); // àÃÔèÁ¨Ò¡á¶Ç·Õè 2 áÅÐ¤ÍÅÑÁ¹ì A

    var subSheet = mainSpreadsheet.getSheetByName('sub');
    var subData = subSheet.getDataRange().offset(1, 0).getValues(); // àÃÔèÁ¨Ò¡á¶Ç·Õè 2 áÅÐ¤ÍÅÑÁ¹ì A

    var mappedValue = getEmailMappedValue_sheetstaff();
    var allowedValuesSet = new Set(getSheetData_task_permission_getbyid(mappedValue));

    Logger.log('mappedValue : ' + mappedValue)
    Logger.log('allowedValuesSet : ' + allowedValuesSet)

    // Define the filteredTaskData outside the conditions
    var filteredTaskData = [];






    Logger.log('xx1 : ' + getEmailMappedValue_sheetstaff_array(7))

//-----------------------------------------------------------------------------
    if (getEmailMappedValue_sheetstaff_array(7) === 'àËç¹ tasks à©¾ÒÐ¢Í§µÑÇàÍ§ áÅÐ¡Ã³Õà»ç¹¼Ùé¢ÍãªéºÃÔ¡ÒÃ') {
            Logger.log('à¢éÒà§×èÍ¹ä¢ 1')
             filteredTaskData = taskData.filter(function(taskRow) {
                
            // Logger.log('à¢éÒà§×èÍ¹ä¢ 1-1 allowedValuesSet : ' + allowedValuesSet)
                return taskRow[10] === mappedValue || 
                      taskRow[5] === mappedValue || 
                      taskRow[6] === mappedValue 
                       ||
                       allowedValuesSet.has(taskRow[0]);

                // return taskRow[10] === mappedValue || 
                //       taskRow[5] === mappedValue || 
                //       taskRow[6] === mappedValue ||
                //       allowedValuesSet.has(taskRow[0]);
            });


    } else if (getEmailMappedValue_sheetstaff_array(7) === 'àËç¹ tasks ÀÒÂãµé rc code µ¹àÍ§·Ñé§ËÁ´') {
            Logger.log('àËç¹ tasks ÀÒÂãµé rc code µ¹àÍ§·Ñé§ËÁ´')
            //filter ÍÐäÃºéÒ§
             filteredTaskData = taskData.filter(function(taskRow) {
                const mappedValue = getEmailMappedValue_sheetstaff_array(4); //function ·ÕèàÃÕÂ¡ÁÒ¨Ò¡ session email ÅÓ´Ñº 2 ¤×Í rc ÅÓ´ÑºÊÒÁ¤×Í ÊÒÂ§Ò¹
                Logger.log('getEmailMappedValue_sheetstaff_array(4) : ' + getEmailMappedValue_sheetstaff_array(4))
                var test_rc10 = getEmailMappedValue_sheetstaff_array_getdata_byemplid(taskRow[10])
                var test_rc5 = getEmailMappedValue_sheetstaff_array_getdata_byemplid(taskRow[5])
                var test_rc6 = getEmailMappedValue_sheetstaff_array_getdata_byemplid(taskRow[6])


                //[2] ÁÒ¨Ò¡ array ¢Í§ function
                return test_rc10[2] === mappedValue || 
                       test_rc5[2] === mappedValue ||  
                       test_rc6[2] === mappedValue;    
            });

    } else if (getEmailMappedValue_sheetstaff_array(7) === 'àËç¹ tasks ÀÒÂãµéÊÒÂ§Ò¹à´ÕÂÇ¡Ñ¹') {
            Logger.log('àËç¹ tasks ÀÒÂãµéÊÒÂ§Ò¹à´ÕÂÇ¡Ñ¹')

             filteredTaskData = taskData.filter(function(taskRow) {
                const mappedValue = getEmailMappedValue_sheetstaff_array(5); //function ·ÕèàÃÕÂ¡ÁÒ¨Ò¡ session email ÅÓ´Ñº 2 ¤×Í rc ÅÓ´ÑºÊÒÁ¤×Í ÊÒÂ§Ò¹
                // console.log('mappedValue')
                // console.log(mappedValue)

                var test_rc10 = getEmailMappedValue_sheetstaff_array_getdata_byemplid(taskRow[10])
                var test_rc5 = getEmailMappedValue_sheetstaff_array_getdata_byemplid(taskRow[5])
                var test_rc6 = getEmailMappedValue_sheetstaff_array_getdata_byemplid(taskRow[6])


                //[2] ÁÒ¨Ò¡ array ¢Í§ function
                return test_rc10[3] === mappedValue || 
                       test_rc5[3] === mappedValue ||  
                       test_rc6[3] === mappedValue;    
            });





    } else if (getEmailMappedValue_sheetstaff_array(7) === 'àËç¹ tasks ·Ñé§ËÁ´ (admin)') {

            Logger.log('àËç¹ tasks ·Ñé§ËÁ´ (admin)')
            //filter ÍÐäÃºéÒ§
             filteredTaskData = taskData // ¡Ã³Õ äÁèµéÍ§ filter ÍÐäÃàÅÂ
    } else {
        return []; // äÁèÁÕ tasks ·ÕèµÃ§¡Ñºà§×èÍ¹ä¢ã´ æ
    }

//-----------------------------------------------------------------------------

    Logger.log('filteredTaskData-------------------------------');    
    Logger.log(filteredTaskData);    


    var mappedData = filteredTaskData.map(function(taskRow) {
        return taskRow.concat(mapDataByTaskRow(taskRow[5], staffData, "")) //add prefix
                      .concat(mapDataByTaskRow(taskRow[6], staffData, "")); //add prefix
    });

    var taskIds = taskData.map(function(row) {
        return row[0]; // Extract the id from task sheet
    });

    var map_sub_data = subData.filter(function(subRow) {
        return taskIds.includes(subRow[1]); // filter by taskid in sub that matches id in task
    });


Logger.log('mappedData-------------------------------');    
Logger.log(mappedData);    

Logger.log('map_sub_data-----------------------------');
Logger.log(map_sub_data);



return {
    mappedData: mappedData,
    map_sub_data: map_sub_data
};

} //end function












// //àÅÔ¡ãªéáÅéÇà¾ÃÒÐä» merge column ÁÒ¨Ò¡ÍÕ¡µÒÃÒ§à¾ÔèÁ
// function getSheetData_sub_datatable() {
//   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sub'); 
//   var data = sheet.getDataRange().getValues();
//   Logger.log('data')
//   Logger.log(data)

//   return data;
// }





// function fetchMappedData() {
//     var mainSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
//     var taskSheet = mainSpreadsheet.getSheetByName('task');
    
//     var taskData = taskSheet.getRange("A2:K" + taskSheet.getLastRow()).getValues();
    
//     var staffSpreadsheetId = "11fzyV3OJf4chznaW1fxh9f3-nNcGExhNdgDe-YI2FMg";
//     var staffSheet = SpreadsheetApp.openById(staffSpreadsheetId).getSheetByName('staff');
//     var staffData = staffSheet.getRange("A2:H" + staffSheet.getLastRow()).getValues();

//     var mappedData = taskData.map(function(taskRow) {
//         return taskRow.concat(mapDataByTaskRow(taskRow[5], staffData, "")) //add prefix
//                       .concat(mapDataByTaskRow(taskRow[6], staffData, "")); //add prefix
//     });

//     Logger.log(mappedData);
//     return mappedData;
// }

function mapDataByTaskRow(taskRowValue, staffData, prefix) {
    var staffInfo = staffData.find(function(staffRow) {
        return staffRow[0] === taskRowValue;
    });

    if (staffInfo) {
        return staffInfo.slice(1, 6).map(data => prefix + data);
    } else {
        return ["", "", "", "", ""];
    }
}









// Create a new date object for the current date and time
var now = new Date();
    
// Format the date to the desired format (here: yyyy-mm-dd HH:mm:ss)
var create_update = Utilities.formatDate(now, SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss');


function addRow(data) {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('task');
  sheet.appendRow([
    data.id, 
    data.task, 
    data.detail, 
    data.url1, 
    data.url2, 
    data.who_create,  
    data.who_use, 
    data.target_date, 
    create_update,
    '',

    getEmailMappedValue_sheetstaff() , // userEmail,
    data.status
    
    ]);

    setColumnsAsPlainText();
}

function deleteRow(id) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('task');
  var data = sheet.getDataRange().getValues();
  var rowIndex = -1;
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] == id) {
      rowIndex = i + 1;
      break;
    }
  }
  if (rowIndex !== -1) {
    sheet.deleteRow(rowIndex);
  }
}

function editRow(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('task');
  var allData = sheet.getDataRange().getValues();
  var rowIndex = -1;
  
  for (var i = 0; i < allData.length; i++) {
    if (allData[i][0] == data.id) {
    // if (allData[i][0] == "2023-10-02 1696240842626") {

      rowIndex = i + 1; // +1 because array indices are 0-based, while sheet rows are 1-based
      // Logger.log('condition1')
      // Logger.log(rowIndex)
      break;
    }
  }
  


  // Create a new date object for the current date and time
var now = new Date();
    
// Format the date to the desired format (here: yyyy-mm-dd HH:mm:ss)
var last_update = Utilities.formatDate(now, SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss');

  if (rowIndex !== -1) {
      // Logger.log('condition2')
      // Logger.log(last_update)
      // console.log(rowIndex)

    var currentColumn10Value = sheet.getRange(rowIndex, 11).getValue();
    sheet.getRange(rowIndex, 1, 1, 12).setValues([[

              data.id, 
              data.task, 
              data.detail, 
              data.url1, 
              data.url2,  
              data.who_create,  
              data.who_use, 
              data.target_date, 
              data.create_update,
              last_update,
              currentColumn10Value,
              data.status
              
              ]]);
  }

    setColumnsAsPlainText();
}
