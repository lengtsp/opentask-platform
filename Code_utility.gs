function getEmailMappedValue_sheetstaff() {
  const sheet = SpreadsheetApp.openById('11fzyV3OJf4chznaW1fxh9f3-nNcGExhNdgDe-YI2FMg').getSheetByName("staff");
  const email = Session.getActiveUser().getEmail();
  
  const columnG = sheet.getRange("G:G").getValues();
  const columnA = sheet.getRange("A:A").getValues();
  
  for(let i = 0; i < columnG.length; i++) {
    if(columnG[i][0] === email) {
      Logger.log(String(columnA[i][0])); // แปลงเป็น string ด้วย String() function
      // หรือ
      // Logger.log(`${columnA[i][0]}`); // ใช้ template string

      return String(columnA[i][0]);
    }
  }
  
  return `Email ${email} not found`;
}
















function getEmailMappedValue_sheetstaff_array(value1) {
    const sheet = SpreadsheetApp.openById('11fzyV3OJf4chznaW1fxh9f3-nNcGExhNdgDe-YI2FMg').getSheetByName("staff");
    const email = Session.getActiveUser().getEmail();
    const rows = sheet.getDataRange().getValues(); // Get all data at once

    for(let i = 0; i < rows.length; i++) {
        if(rows[i][6] === email) { // Column G (index 6) is the email column
            // const resultArray = [rows[i][1], rows[i][3], rows[i][4], rows[i][5], rows[i][7]];
            Logger.log(rows[i][value1]); // Log the result array
            return rows[i][value1];
        }
    }
    return [`Email ${email} not found`];
}






// function getEmailMappedValue_sheetstaff_array() {
//   const sheet = SpreadsheetApp.openById('11fzyV3OJf4chznaW1fxh9f3-nNcGExhNdgDe-YI2FMg').getSheetByName("staff");
//   const email = Session.getActiveUser().getEmail();
//   const columnG = sheet.getRange("G:G").getValues();
//   const rows = sheet.getRange("A:H").getValues(); // Adjust to capture entire range
  
//   for(let i = 0; i < columnG.length; i++) {
//     if(columnG[i][0] === email) {
//       // Return values from columns B, E, and F
//       const resultArray = [rows[i][1], rows[i][3], rows[i][4], rows[i][5], rows[i][7]];
//       Logger.log(resultArray); // Log the result array
//       Logger.log(resultArray[4])
//       return resultArray[4];
//     }
//   }
  
//   // Logger.log(`Email ${email} not found`); // Log if email is not found
//   return [`Email ${email} not found`];
// }




function isNumericAndLessThan6Digits(value) {
    return /^\d{1,6}$/.test(value);
}

function getEmailMappedValue_sheetstaff_array_getdata_byemplid(emplid) {
  if (!isNumericAndLessThan6Digits(emplid)) {
    Logger.log(`Invalid emplid format: ${emplid}`);
    return [`Inavalid`];
  }

  const sheet = SpreadsheetApp.openById('11fzyV3OJf4chznaW1fxh9f3-nNcGExhNdgDe-YI2FMg').getSheetByName("staff");
  const columnA = sheet.getRange("A:A").getValues();
  const rows = sheet.getRange("A:H").getValues(); // Adjust to capture entire range
  
  for(let i = 0; i < columnA.length; i++) {
    if(columnA[i][0] === emplid) {
      const resultArray = [rows[i][1], rows[i][3], rows[i][4], rows[i][5], rows[i][7]];
      Logger.log(resultArray); // Log the result array
      return resultArray;
    }
  }
  
  Logger.log(`emplid ${emplid} not found1`); // Log if emplid is not found
  return [`emplid ${emplid} not found1`];
}

//รับค่ารหัสพนักงานและ return value ออกมา
// function getEmailMappedValue_sheetstaff_array_getdata_byemplid(emplid) {
//   const sheet = SpreadsheetApp.openById('11fzyV3OJf4chznaW1fxh9f3-nNcGExhNdgDe-YI2FMg').getSheetByName("staff");
//   // const email = Session.getActiveUser().getEmail();
//   const columnA = sheet.getRange("A:A").getValues();
//   const rows = sheet.getRange("A:H").getValues(); // Adjust to capture entire range
  
//   for(let i = 0; i < columnA.length; i++) {
//     if(columnA[i][0] === emplid) {
//       // Return values from columns B, E, and F
//       const resultArray = [rows[i][1], rows[i][3], rows[i][4], rows[i][5], rows[i][7]];
//       Logger.log(resultArray); // Log the result array
//       Logger.log(resultArray[4])
//       return resultArray;
//     }
//   }
  
//   Logger.log(`emplid ${emplid} not found`); // Log if email is not found
//   return [`emplid ${emplid} not found`];
// }











