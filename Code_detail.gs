





function getSheetData_sub(taskId) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sub'); 
  var allData = sheet.getDataRange().getValues();
  var filteredData = [];

  for (var i = 0; i < allData.length; i++) {
    if (allData[i][1] == taskId) { // ตรวจสอบว่าค่าใน columnB (index 1 ของ array) เท่ากับ taskId หรือไม่
      filteredData.push(allData[i]);
    }
  }
  
  Logger.log(filteredData)
  return filteredData;
}












function deleteRow_sub(id) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sub');
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

const last_update = Utilities.formatDate(now, SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss');


function addRow_sub(data) {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sub');
  sheet.appendRow([
          data.comment_taskid, 
          data.taskid, 
          data.title, 
          data.detail, 
          data.date1, 
          data.date2,
          data.date3,
          data.date4,
          data.date5,
          // data.who_create,
          last_update
    ]);

    setColumnsAsPlainText_sub();
}







function setColumnsAsPlainText_sub() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sub');

    // var rangeK = sheet.getRange("K:K");
    // rangeK.setNumberFormat("@");


    // sheet.getRange("E:E").setNumberFormat("@");
    // sheet.getRange("F:F").setNumberFormat("@");
    // sheet.getRange("G:G").setNumberFormat("@");
    // sheet.getRange("H:H").setNumberFormat("@");
    sheet.getRange("D:K").setNumberFormat("@");
}






function editRow_sub(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sub');
  var allData = sheet.getDataRange().getValues();
  var rowIndex = -1;
  
  for (var i = 0; i < allData.length; i++) {
    if (allData[i][0] == data.comment_taskid) {
      rowIndex = i + 1; // +1 because array indices are 0-based, while sheet rows are 1-based
      break;
    }
  }
  


  // Create a new date object for the current date and time
var now = new Date();
    
// Format the date to the desired format (here: yyyy-mm-dd HH:mm:ss)
var last_update = Utilities.formatDate(now, SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss');

    if (rowIndex !== -1) {
        sheet.getRange(rowIndex, 1, 1, 9).setValues([[
          data.comment_taskid, 
          data.taskid, 
          data.title, 
          data.detail, 
          data.date1, 
          data.date2,
          data.date3,
          data.date4,
          data.date5,
          // data.date6,
          // data.who_create,
          // last_update
        ]]);
      }

    setColumnsAsPlainText_sub();
}



function navigateToIndex() {
  return HtmlService.createHtmlOutputFromFile('index.html');
}


function getTaskDataFromSheetById(id) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("task");  // แทน "task" ด้วยชื่อของ Sheet ที่คุณใช้งาน
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();

    for (let i = 0; i < values.length; i++) {
        if (values[i][0] == id) {
            return {
                id: values[i][0],
                task: values[i][1],
                detail: values[i][2],
                url1: values[i][3],
                url2: values[i][4],
                owner: values[i][5],
                user: values[i][6],
                targetDate: values[i][7],
                createdUpdate: values[i][8],
                lastUpdate: values[i][9],
                whoLogin: values[i][10],
                status: values[i][11]
            };
        }
    }
    return null;  // ไม่พบข้อมูล
}







