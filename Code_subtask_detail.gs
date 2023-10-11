function getSubTaskDataFromSheetById(id) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("sub");  // Replace "task" with the name of your Sheet
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();

    for (let i = 0; i < values.length; i++) {
        if (values[i][0] == id) {
            return {
                sub_taskid: values[i][0],
                taskid: values[i][1],
                title: values[i][2],
                detail: values[i][3],
                date1: values[i][4],
                data2: values[i][5],
                data3: values[i][6],
                data4: values[i][7],
                data5: values[i][8],
                create_date: values[i][9]
                // The original function had more fields; make sure you have accounted for all columns in the spreadsheet.
            };
        }
    }
    return null;  // Data not found
}