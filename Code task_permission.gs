
function addRow_task_permission(data) {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('task permission');
  sheet.appendRow([
          data.accessrole_id, 
          data.taskid, 
          data.emplid, 
          data.name, 
          data.rc_code, 
          data.rc_name,
          data.branch,
          new Date()
    ]);

    setColumnsAsPlainText_task_permission();
}

function setColumnsAsPlainText_task_permission() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('task permission');
    var lastCol = sheet.getLastColumn();
    var range = sheet.getRange(1, 1, sheet.getLastRow(), lastCol);
    range.setNumberFormat("@");
}





function deleteRow_task_permission(id) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('task permission');
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






function getSheetData_task_permission(taskId) {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('task permission'); 
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



function getSheetData_task_permission_getbyid(empID='582145') {
  // Logger.log(empID)

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('task permission'); 
  var allData = sheet.getDataRange().getValues();
  var filteredData = [];

  for (var i = 0; i < allData.length; i++) {
    // Logger.log('allData[i][2] ')
    // Logger.log(allData[i][2] )
    if (allData[i][2] == empID) { // ตรวจสอบว่าค่าใน columnB (index 1 ของ array) เท่ากับ taskId หรือไม่
      filteredData.push(allData[i]);
    }
  }
  var transformedData = transformFilteredData(filteredData);
  Logger.log(transformedData);
  // Logger.log(filteredData)
  return transformedData;
}

function transformFilteredData(data) {
    return data.map(function(item) {
        return item[1];
    });
}











//ไม่ได้ใช้
function getTaskDataFromSheetById_task_permission(id) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("task permission");  // แทน "task" ด้วยชื่อของ Sheet ที่คุณใช้งาน
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










