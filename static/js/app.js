function plotbuilder (otu){
    var selector = d3.select("#selDataset");
    //use d3 to read JSON file
    d3.json("samples.json").then((importedData) => {
        console.log(importedData)
    });
}

