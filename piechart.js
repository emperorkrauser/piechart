const loadJSON = () => {
  // run live server and change this
  const url = 'http://127.0.0.1:5500/data2.json'

  return fetch(url)
    .then(res => res.json())
    .then(json => json);
}

const svg = async () => {
  const width = 600;
  const height = 500;
  const colors = d3.scaleOrdinal(d3.schemeDark2);
  const radius = Math.min(width, height) / 2;
  const svg = d3.select("body").append("svg").attr("width", width).attr("height", height).style("background", "white");

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
  content.enter().append("text").each(function(d) {
    const center = arc.centroid(d);
    d3.select(this ).attr("x", center[0]).attr("y", center[1]).text(d.data.id + 1);
  });

}

const init = () => {
  svg();
}

init();