function plotter(otu) {
    d3.json("static/samples.json").then(function (importedData) {
        console.log(importedData);
    })
  
}
plotter();