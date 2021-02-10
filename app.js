console.log("app.js script has loaded");

// create a variable for the viz
let viz;
let isVizHidden = false;

// create variables for the URL, container, options of the dashboard

const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";

const vizContainer = document.getElementById("vizContainer");
const options = {
  device: "desktop",
  //Category: ["Furniture", "Office Supplies"],
};

// create buttons to intercat with export options

const pdfButton = document.getElementById("exportPDF");
const excelButton = document.getElementById("exportExcel");

// click on the button to export to PDF
pdfButton.addEventListener("click", function () {
  console.log("You clicked the PDF button");
  viz.showExportPDFDialog();
});

// click on the button to export to Excel
excelButton.addEventListener("click", function () {
  console.log("You clicked the Excel button");
  viz.exportCrossTabToExcel();
});

// select the Hide Viz button

const showHideButton = document.getElementById("showHideViz");

// when clicked, hide the viz

// when you click the button, change text to "Show viz"

showHideButton.addEventListener("click", showHideHandler);

function showHideHandler() {
  if (isVizHidden === false) {
    console.log("You clicked the Hide Viz button");
    viz.hide();
    showHideButton.innerHTML = "Show Viz";
    isVizHidden = true;
  } else {
    console.log("You clicked the Show Viz button");
    viz.show();
    showHideButton.innerHTML = "Hide Viz";
    isVizHidden = false;
  }
}

// function to get the values in the Sales filter

function getRangeValues() {
  const minValue = document.getElementById("min").value;
  const maxValue = document.getElementById("max").value;
  console.log(minValue, maxValue);
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  //console.log(activeSheet);
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("Sales", {
      min: minValue,
      max: maxValue,
    })
    .then(console.log("Sales filter has been applied!"));
}

// apply sales filter

const applyFilterButton = document.getElementById("applyFilter");
applyFilterButton.addEventListener("click", getRangeValues);

// create a function that initialises the dashboard

function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

// execute this function when the page loads

initViz();
