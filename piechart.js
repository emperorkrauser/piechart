const loadJSON = () => {
  // run live server and change this
  const url = 'http://127.0.0.1:5500/data2.json'

  return fetch(url)
    .then(res => res.json())
    .then(json => json);
}

const svg = async () => {
  const width = 850;
  const height = 500;
  const colors = d3.scaleOrdinal(d3.schemeDark2);
  const radius = Math.min(width, height) / 2;
  const svg = d3.select("body").append("svg").attr("width", width).attr("height", height).style("background", "#ffffff");

  // getting the json data
  const jsonData = await loadJSON();
  const data = d3.pie().sort(null).value((d) => {
    return d.value;
  })(jsonData);

  // arc generator
  const arc = d3.arc().innerRadius(0).outerRadius(radius).padAngle(.05).padRadius(50);

  // creating the sections of the pie graph
  const sections = svg.append("g").attr("transform", "translate(250,250)").selectAll("path").data(data);
  sections.enter().append("path").attr("d", arc).attr("fill", (d) => colors(d.data.id));

  // specify the labels
  const content = d3.select("g").selectAll("text").data(data);
  content.enter().append("text").attr("transform", function(d) {
    return "translate(" + arc.centroid(d) + ")";
  }).attr("dy", "5px").attr("dx", "0px").style("text-anchor", "middle").text(function(d){
    //can put a label here
    return d.data.id + 1;
  });

  // adding a legend
  const legend = svg.append("g").attr("transform", "translate(600, 0)").selectAll(".legends").data(data);
  const legendContainer = legend.enter().append("g").classed("legends", true).attr("transform", function(d,i){
    return "translate(0, " + (i+1) * 30 + ")";
  });
  legendContainer.append("rect").attr("width", 20).attr("height", 20).attr("fill", (d) => colors(d.data.id));
  legendContainer.append("text").classed("label", true).text((d) => {
    return d.data.name;
  }).attr("fill", (d) => colors(d.data.id)).attr("x", 30).attr("y", 14); //adjust the x and y accordingly

}

const init = () => {
  svg();
}

init();