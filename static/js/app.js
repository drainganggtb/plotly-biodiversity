//set up function which reads data from json and plots figures for each otu
function plotter(id) {
    //json call using d3
    d3.json("static/samples.json").then(function (importedData) {
        console.log(importedData);

        //get wfreq data using map function, creating array
        var wfreq = importedData.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)

        //filter sample values by id
        var samples = importedData.samples.filter(s => s.id.toString() === id)[0];
        console.log(samples);

        // get top 10 sample values and otu ids using slice for bar chart
        var sampleslice = samples.sample_values.slice(0,10).reverse();
        var idslice = (samples.otu_ids.slice(0,10)).reverse();
        //format the otu id for plotting
        var idOTU = idslice.map(d => "OTU" + d)
        console.log(`OTU IDs: ${idOTU}`)

        //get otu labels
        var labels = samples.otu_labels.slice(0,10);
        console.log(`Sample: ${sampleslice}`)
        console.log(`IDs: ${idslice}`)

        //set up trace
        var trace = {
            x: sampleslice,
            y: idOTU,
            type: "bar",
            orientation: "h",
            marker: {color: 'rgb(208,219,206)'}
        };
        //create data var
        var data = [trace];
        //layout var for bar chart
        var layout = {
            title: "OTU Top Ten",
            yaxis: {
                tickmode: "linear",
                title: "Organism ID"
            },
            xaxis: {
                title: "Number of Samples"
            },
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 30
            },
            font: { family: "Arial, Helvetica, sans-serif" }
        };
        //create plot
        Plotly.newPlot("bar", data, layout);

        //set up trace for bubble chart
        // otu_ids for x, sample_values for y, sample_values for marker size, otu_ids for marker color, otu_labels for text values
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            mode: 'markers',
            text: samples.otu_labels
        };
        //bubble layout
        var layout = {
            title: "Bacterial Presence in Belly Button",
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Count"},
            height: 600,
            width: 1200,
            font: { family: "Arial, Helvetica, sans-serif" }
        };
        //create bubble plot
        var data1 = [trace1];
        Plotly.newPlot("bubble", data1, layout);

        // gauge plot here  

    });
  
}
//function to get data
function infograbber(id) {
    //read json to get data
    d3.json("static/samples.json").then((importedData) => {
        //data for demographics panel
        var metadata = importedData.metadata;
        console.log(metadata)

        //filter by id
        var filteredresult = metadata.filter(meta => meta.id.toString() === id)[0];

        //find the right spot to place data
        var demos = d3.select("#sample-metadata");

        // empty demo area on html before getting new id info
        demos.html("");

        //grab demographic data and append info to panel
        Object.entries(filteredresult).forEach((key) => {
            demos.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

//create function for initial data render
function init() {
    //dropdown menu
    var dropdown = d3.select("#selDataset");

    //read data usind d3
    d3.json("static/samples.json").then((importedData) => {
        console.log(importedData)

        //get id to dropdown
        importedData.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value", name);
        });

        //call functions to display plots
        plotter(importedData.names[0]);
        infograbber(importedData.names[0]);
    });
};
function optionChanged(newid) {
    plotter(newid);
    infograbber(newid);
}
//run init function
init();