var graphdata = JSON.parse(document.getElementById('Graphdata').value);
var currentQuestion = 0 ;
var canAnimate;
let dataset;
let colors;
let color;

if(graphdata != 0){
document.getElementById('meningvraag').innerHTML = graphdata[currentQuestion].opinionquestionbody;
dataset = [graphdata[currentQuestion].down_vote, graphdata[currentQuestion].up_vote]
colors = ['#CF0039', '#009882', '#f46d43', '#fdae61', '#fee08b', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2']
color = ['Niet Akkoord ('+ dataset[0] + ')', 'Akkoord ('+ dataset[1] + ')']
}else {
  $("#NoOpninion" ).removeClass( "hide" );
}


let width = document.querySelector('.chart-wrapper').offsetWidth,
  height = document.querySelector('.chart-wrapper').offsetHeight,
  minOfWH = Math.min(width, height) / 2,
  initialAnimDelay = 300,
  arcAnimDelay = 150,
  arcAnimDur = 3000,
  secDur = 1000,
  secIndividualdelay = 150,
  radius

  var targetWidth = window.innerWidth;

// calculate minimum of width and height to set chart radius
if (targetWidth < 1000) {
  radius = 100
} else {
  radius = targetWidth/10
}

// append svg
let svg = d3.select('.chart-wrapper').append('svg')
  .attr({
    'width': width,
    'height': height,
    'class': 'pieChart'
  })
  .append('g')

svg.attr({
  'transform': `translate(${width / 2}, ${height / 2})`
});

// for drawing slices
let arc = d3.svg.arc()
  .outerRadius(radius * 0.6)
  .innerRadius(radius * 0.45)

// for labels and polylines
let outerArc = d3.svg.arc()
  .innerRadius(radius * 0.85)
  .outerRadius(radius * 0.85)

// d3 color generator
// let c10 = d3.scale.category10();

let pie = d3.layout.pie()
  .value(d => d)

let draw = function() {
  if(graphdata != 0){
  if (dataset[1]!=0 && dataset[0]!=0) {

    $("#noAnswers" ).addClass( "hide" );

  svg.append("g").attr("class", "lines")
  svg.append("g").attr("class", "slices")
  svg.append("g").attr("class", "labels")

  // define slice
  let slice = svg.select('.slices')
    .datum(dataset)
    .selectAll('path')
    .data(pie)
  slice
    .enter().append('path')
    .attr({
      'fill': (d, i) => colors[i],
      'd': arc,
      'stroke-width': '25px'
    })
    .attr('transform', (d, i) => 'rotate(-180, 0, 0)')
    .style('opacity', 0)
    .transition()
    .delay((d, i) => (i * arcAnimDelay) + initialAnimDelay)
    .duration(arcAnimDur)
    .ease('elastic')
    .style('opacity', 1)
    .attr('transform', 'rotate(0,0,0)')

  slice.transition()
    .delay((d, i) => arcAnimDur + (i * secIndividualdelay))
    .duration(secDur)
    .attr('stroke-width', '5px')


  let midAngle = d => d.startAngle + (d.endAngle - d.startAngle) / 2

  let text = svg.select(".labels").selectAll("text")
    .data(pie(dataset))

  text.enter()
    .append('text')
    .attr('dy', '0.35em')
    .style("opacity", 0)
    .style('fill', (d, i) => colors[i])
    .text((d, i) => color[i])
    .attr('transform', d => {
      // calculate outerArc centroid for 'this' slice
      let pos = outerArc.centroid(d)
      // define left and right alignment of text labels
      pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1)
      return `translate(${pos})`
    })
    .style('text-anchor', d => midAngle(d) < Math.PI ? "start" : "end")
    .transition()
    .delay((d, i) => arcAnimDur + (i * secIndividualdelay))
    .duration(secDur)
    .style('opacity', 1)

  let polyline = svg.select(".lines").selectAll("polyline")
    .data(pie(dataset))

  polyline.enter()
    .append("polyline")
    .style("opacity", 0.5)
    .attr('points', d => {
      let pos = outerArc.centroid(d)
      pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1)
      return [arc.centroid(d), arc.centroid(d), arc.centroid(d)]
    })
    .transition()
    .duration(secDur)
    .delay((d, i) => arcAnimDur + (i * secIndividualdelay))
    .attr('points', d => {
      let pos = outerArc.centroid(d)
      pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1)
      return [arc.centroid(d), outerArc.centroid(d), pos]
    })
    .attr('stroke',(d, i) => colors[i])
  }else {
    (function($) {
      $("#noAnswers" ).removeClass( "hide" );
    })(jQuery);
  }
}
}

if(currentQuestion==0){
  (function($) {
    $(".prevbutton" ).addClass( "hide" );
  })(jQuery);
}

if(graphdata.length-1 == 0 || graphdata.length == 0){
  (function($) {
    $(".prevbutton" ).addClass( "hide" );
    $(".nextbutton" ).addClass( "hide" );
  })(jQuery);
}

function next(){
  $("#noAnswers" ).addClass( "hide" );
  if(currentQuestion<graphdata.length-1){
    currentQuestion++;
    canAnimate = true;
    dataset = [graphdata[currentQuestion].down_vote, graphdata[currentQuestion].up_vote];
    document.getElementById('meningvraag').innerHTML = graphdata[currentQuestion].opinionquestionbody;
  }else{
    canAnimate = false;
  }
  if(currentQuestion==graphdata.length-1){
      $(".nextbutton" ).addClass( "hide" );
  }
  if(currentQuestion>0){
    (function($) {
      $(".prevbutton" ).removeClass( "hide" );
    })(jQuery);
  }
}

function prev() {
    $("#noAnswers" ).addClass( "hide" );
    if(currentQuestion>0)
    {
      currentQuestion--;
      canAnimate = true;
      dataset = [graphdata[currentQuestion].down_vote, graphdata[currentQuestion].up_vote];
      document.getElementById('meningvraag').innerHTML = graphdata[currentQuestion].opinionquestionbody;
    }
    else
    {
      canAnimate = false;
    }
    if(currentQuestion==0){
        $(".prevbutton" ).addClass( "hide" );
    }
    if(currentQuestion<graphdata.length-1){
      (function($) {
        $(".nextbutton" ).removeClass( "hide" );
      })(jQuery);
    }

  }


draw()

    let button = document.querySelector('button');

    let replay = () => {
      if(graphdata != 0){
      color = ['Niet Akkoord ('+ dataset[0] + ')', 'Akkoord ('+ dataset[1] + ')'];
      if(canAnimate){

        d3.selectAll('.slices').transition().ease('back').duration(500).delay(0).style('opacity', 0).attr('transform', 'translate(0, 250)').remove()
        d3.selectAll('.lines').transition().ease('back').duration(500).delay(10).style('opacity', 0).attr('transform', 'translate(0, 250)').remove()
        d3.selectAll('.labels').transition().ease('back').duration(500).delay(200).style('opacity', 0).attr('transform', 'translate(0, 250)').remove()

        setTimeout(draw, 800)
      }
    }

}




setTimeout(scaleGraph, 100);
setTimeout(Scaling, 4400);




  var aspect = width / height,
      chart = d3.select('.pieChart');
  d3.select(window)
    .on("resize",function () {
      Scaling();
      scaleGraph();
    });





  function scaleGraph() {
    var targetWidth = chart.node().getBoundingClientRect().width;
    var slice1 = svg.select('.slices path');
    var slice2 = svg.select('.slices path:last-child');
    var radius = 0;

    if (targetWidth < 1000)
    {
        radius = 100;
    }
    else
    {
        radius = targetWidth / 10;
    }

    if (targetWidth < 900 && targetWidth > 700)
    {
       margintop = 800;
    }
    else if (targetWidth < 700)
    {
       margintop = 500;
    }
    else
    {
       margintop = 1000;
    }

     svg.attr("transform", `translate(${targetWidth / 2}, ${margintop / 3})`);

    arc = d3.svg.arc()
      .outerRadius(radius * 0.6)
      .innerRadius(radius * 0.45)

    slice1.attr('d', arc );
    slice2.attr('d', arc );
  }

  function Scaling() {
    var targetWidth = window.innerWidth;
      var text = svg.select(".labels").selectAll("text")
      var polyline = svg.select(".lines").selectAll("polyline")
      var midAngle = d => d.startAngle + (d.endAngle - d.startAngle) / 2
      var radius= 0;
      if (targetWidth < 1000) {
        radius = 85
      }else {
        radius = targetWidth/10;
      }
        //targetWidth / aspect == height


          arc = d3.svg.arc()
          .outerRadius(radius * 0.6)
          .innerRadius(radius * 0.45)
          let outerArc = d3.svg.arc()
          .innerRadius(radius * 0.85)
          .outerRadius(radius * 0.85)


              text.attr('transform', d => {
                  // calculate outerArc centroid for 'this' slice
                  let pos = outerArc.centroid(d)
                  // define left and right alignment of text labels
                  pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1)
                  return `translate(${pos})`
                })
              polyline.attr('points', d => {


                  let pos = outerArc.centroid(d)
                  pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1)
                  return [arc.centroid(d), outerArc.centroid(d), pos]
                })



    }
