const svgHeight = 400
const svgWidth = 1000

const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
    }

const chartHeight = svgHeight - margin.top - margin.bottom
const chartWidth = svgWidth - margin.left - margin.right

const minRadius = 16
const maxRadius = 40

// const parseDate = d3.timeParse("%d-%b")

const svg = d3.select("body").append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)

const chartG = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

d3.csv("hairData.csv").then(data => {

    console.log(data)

    const y = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => parseInt(d.hair_length)))])
        .range([chartHeight, 0])

    const x = d3.scaleLinear()
        .domain([0, d3.max(data.map(d => parseInt(d.num_albums)))])
        .range([0, chartWidth])

    const size = d3.scaleLinear()
        .domain(d3.extent(data.map(d => parseInt(d.num_hits))))
        .range([minRadius, maxRadius])

    const yAxis = d3.axisLeft(y)
    const xAxis = d3.axisBottom(x)

    chartG.append("g")
        .call(yAxis)

    chartG.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis)


        const labelArea = svg
            .append("g")
            .attr("transform", `translate(${svgWidth / 2}, ${svgHeight - margin.bottom + 40})`)

        labelArea.append("text")
            .attr("stroke", "#000000")
            .text("Num Albums")

        // labelArea.append("text")
        //     .attr("stroke", "#000000")
        //     .attr("dy", 20)
        //     .text("Evening")

    chartG.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(parseInt(d.num_albums)))
        .attr("cy", d => y(parseInt(d.hair_length)))
        .attr("r", d =>size(parseInt(d.num_hits)))

})




//     chartG.append("g")
//         .attr("transform", `translate(0, ${chartHeight})`)
//         .call(xAxis)
//     const lineMorning = d3.line()
//         .x(d => x(parseDate(d.date)))
//         .y(d => y(d.morning))

//     const lineEvening = d3.line()
//         .x(d => x(parseDate(d.date)))
//         .y(d => y(d.evening))

//     chartG.append("path")
//         .attr("d", lineMorning(data))
//         .attr("fill", "none")
//         .attr("stroke", "#000000")

//     chartG.append("path")
//         .attr("d", lineEvening(data))
//         .attr("fill", "none")
//         .attr("stroke", "#0000FF")



// })