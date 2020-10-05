function createCharts(id) {

    
    d3.json("samples.json").then((data ) => {
        // console.log(id);
    var results = data.samples.filter(obj => obj.id == id);
    results = results[0];
    var trace1 = {
        x: results.otu_ids,
        y: results.sample_values,
        text: results.otu_labels,
        mode: "markers",
        marker: { 
            size: results.sample_values,
            color: results.otu_ids}
    
    };
    
    let data1 = [trace1];
    
    var layout = {
        title: "Bacterial Bubble Chart",
        hovermode: "closest",
        xaxis: { title: "otu_ids"}
    
    
    };
    Plotly.newPlot("bubble", data1, layout);
    var trace2 = {
        x: results.sample_values.slice(0, 10),
        y: results.otu_ids.slice(0, 10),
        text: results.otu_labels.slice(0, 10),
        type: "bar",
        orientation: "h"
    };
    let data2 = [trace2];
    
    layout = {
        title: "Top Ten"
    
    };
    Plotly.newPlot("bar", data2, layout);
    // console.log("bar");
    
    var metaData = data.metadata.filter(obj => obj.id == id)
        metaData = metaData[0]
    var panel = d3.select("#sample-metaData")
    panel.html("")
    // console.log(metaData)
    // console.log("test")
    Object.entries(metaData).forEach (([key, value]) => {
        // console.log(key)
        
        panel.append ("h5").text(`${key}: ${value}`)
    
    });
    });
    
    
    
    
    };
    function init(){
    d3.json("samples.json").then(function(data) {
        console.log(data);
    var selDataset = d3.select("#selDataset")
    
    data.names.forEach((sample) =>{
        selDataset.append("option").text(sample).property("value", sample);
    createCharts(data.names[0])
    
    
    
    });
    
    
    });
    
    
    
    };
    function optionChanged(id){
    
    
    createCharts(id);
    };
    
    
    init();