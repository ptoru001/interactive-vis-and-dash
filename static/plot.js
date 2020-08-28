var dataset;
d3.json("samples.json")
        .then(function (text) {
            //console.log('GET response text:');
            //console.log(text["samples"]);
            dataset = text;
            var selectList = document.getElementById("selDataset");
            for (var i = 0; i < text["samples"].length; i++) {
                var id = text["samples"][i]["id"];
                var option = document.createElement("option");
                option.value = id;
                option.text = id;
                selectList.appendChild(option);
            }
});

function optionChanged(value) {

    var div = document.getElementById('sample-metadata');
    var list_of_labels = ["id","ethnicity","gender","age","location","bbtype","wfreq"];
    for (var i = 0; i < dataset["metadata"].length; i++) {
        if(dataset["metadata"][i]["id"] == value){
            var inner_html = "";
            for (var j = 0; j < list_of_labels.length; j++){
                var val = dataset["metadata"][i][list_of_labels[j]];
                inner_html += list_of_labels[j] + ":" + val + "<br>";
            }
            div.innerHTML = inner_html;

            var wfreq = dataset["metadata"][i]["wfreq"];
            var data = [
            	{
            		domain: { x: [0, 1], y: [0, 1] },
            		value: wfreq,
            		title: { text: "Belly Button Washing Frequency" },
            		type: "indicator",
            		mode: "gauge+number",
                    gauge: {
                        axis: { range: [null, 9] }
                    }
            	}
            ];
            Plotly.newPlot('gauge', data);
            break;
        }
    }

    for (var i = 0; i < dataset["samples"].length; i++) {
        if(dataset["samples"][i]["id"] == value){
            otu_ids = dataset["samples"][i]["otu_ids"].slice(0, 11);
            out_counts = dataset["samples"][i]["sample_values"].slice(0, 11);
            out_labels = dataset["samples"][i]["otu_labels"].slice(0, 11);
            var out_ids_string = [];
            for(var i = 0; i < otu_ids.length; i++){
                out_ids_string.push("OUT" + otu_ids[i].toString());
            }
            var data1 = [{
                type: 'bar',
                x: out_counts,
                y: out_ids_string,
                text: out_labels,
                orientation: 'h'
            }];

            var data2 = [{
                x: otu_ids,
                y: out_counts,
                text: out_labels,
                mode: 'markers',
                marker: {
                    color:otu_ids,
                    size: out_counts
                }
            }];

            var layout = {
                xaxis: {
                    title: {
                        text: 'OTU ID',
                    },
                }
            }
            Plotly.newPlot('bar', data1);
            Plotly.newPlot('bubble', data2, layout);
            break;
        }
    }
}
