const dayjs = require("dayjs");

module.exports = (serviceReportResult, date) => {
    // console.log(serviceReportResult)
    return ` <!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>PDF Result Template</title>
      <style>
         .report-box {
         max-width: 800px;
         margin: auto;
         padding: 30px;
         border: 1px solid #eee;
         box-shadow: 0 0 10px rgba(0, 0, 0, .15);
         font-size: 16px;
         line-height: 24px;
         font-family: 'Helvetica Neue', 'Helvetica';
         color: #555;
         }
         .margin-top {
         margin-top: 50px;
         }
         .justify-center {
         text-align: right;
         }
         .report-box table {
         width: 100%;
         line-height: inherit;
         text-align: left;
         }
         .report-box table td {
         padding: 5px;
         vertical-align: top;
         }
         .report-box table tr td:nth-child(2), .report-box table tr td:nth-child(3) {
         text-align: right;
         }
         /* .report-box table tr td:nth-child(3) {
         text-align: right;
         } */
         .report-box table tr.top table td {
         padding-bottom: 20px;
         }
         .report-box table tr.top table td.title {
         font-size: 45px;
         line-height: 45px;
         color: #333;
         }
         .report-box table tr.information table td {
         padding-bottom: 40px;
         }
         .report-box table tr.heading td {
         background: #eee;
         border-bottom: 1px solid #ddd;
         font-weight: bold;
         }
         .report-box table tr.details td {
         padding-bottom: 20px;
         }
         .report-box table tr.item td {
         border-bottom: 1px solid #eee;
         }
         .report-box table tr.item.last td {
         border-bottom: none;
         }
         .report-box table tr.total td:nth-child(2) {
         border-top: 2px solid #eee;
         font-weight: bold;
         }
         @media only screen and (max-width: 600px) {
         .report-box table tr.top table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         .report-box table tr.information table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         }
      </style>
   </head>
   <body>
      <div class="report-box">
         <table cellpadding="0" cellspacing="0">
            <tr class="top">
               <td colspan="2">
                  <table>
                     <tr>
                        <td class="title"></td>
                        <td>
                           <h3>Tasks done on ${dayjs(date).format('dddd MMM DD[,] YYYY')}</h3> 
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            
            <tr class="heading">
               <td>Tasks</td>
               <td>Done by</td>
               <td>Task Status</td>
            </tr>
            ${serviceReportResult.map(oneTask =>{ return (`<tr class="item">
            <td>${oneTask.task_detail}</td>
            <td>${oneTask.done_by}</td>
            <td>${oneTask.task_completed === 1 ? 'Completed': 'Not Completed'}</td>
         </tr>
         `)})}
           
         </table>
         <br />
         <h3 class="justify-center">Total tasks done: ${serviceReportResult.length}</h3>
      </div>
   </body>
</html>`}