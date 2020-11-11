var getGrade=function(pengu)
{return pengu.grade}

var getFinal = function(student)
{return student.final[0].grade}

var getMeanHW = function(student)
{
    return d3.mean(student.homework.map(getGrade));}

var meanQuizes = function(student)
{return d3.mean(student.quizes.map(getGrade))}

var getPicture = function(student){
    return "imgs/"+student.picture;}

var drawPlot = function(kids,screen,xScale,yScale)
{
    d3.selectAll("circle").remove()
    d3.select("#graph")
    .selectAll("circle")
    .data(kids)
    .enter()
    .append("circle")
    .attr("cx",function(aKid)
         {return xScale(getFinal(aKid))
        })
    .attr("cy",function(aKid)
    {
          return yScale(getMeanHW(aKid))
    })
    .attr("r",2)
    .on("mouseenter",function(aKid)
        {
        d3.select("img")
        .remove()
        
        var xPos = d3.event.pageX;
         var yPos = d3.event.pageY;
         
       d3.select("#tooltip")
         .classed("hidden",false)
         .style("top",yPos+"px")
         .style("left",xPos+"px")
         
        d3.select("#img")
         .append("img")
         .attr("src","imgs/"+aKid.picture);   
         
//         aKid.final[0].grade
         
//         d3.mean(aKid.homework.map(getGrade))
    })
}

var initGraph = function(kids)
{
    console.log('hi')
    var screen = {width:600,height:450}
    d3.select("#graph")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
     var xScale = d3.scaleLinear()
     .domain([0,100])
     .range([0,screen.width])

     var yScale = d3.scaleLinear()
     .domain([0,50])
     .range([screen.height,0])
     
     drawPlot(kids,screen,xScale,yScale)
}


var classData = d3.json("classData.json")

//var successFCN = function(classData)
//{
//    console.log("Data collected",classData);
//}
//
//
//var failFCN = function(errorMsg)
//{console.log("Whoops, something went wrong",errorMSG);}

//classData.then(successFCN,failFCN);

d3.json("classData.json").then(function(kids){

    initGraph(kids);
//    drawPlots();
})
