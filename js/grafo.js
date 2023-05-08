const myDiagram = new go.Diagram("myDiagramDiv", {
    "undoManager.isEnabled": true,
});

const graph = go.GraphObject.make;

myDiagram.linkTemplate = graph(
    go.Link, // the whole link panel
    {
        curve: go.Link.Bezier,
        adjusting: go.Link.Stretch,
        reshapable: false,
        relinkableFrom: false,
        relinkableTo: false,
        toShortLength: 3
    },
    new go.Binding("points").makeTwoWay(),
    new go.Binding("curviness"),
    graph(
        go.Shape,
        // the Shape.stroke color depends on whether Link.isHighlighted is true
        new go.Binding("stroke", "isHighlighted", function (h) {
            return h ? "#391d4d" : "black";
        }).ofObject(),
        // the Shape.strokeWidth depends on whether Link.isHighlighted is true
        new go.Binding("strokeWidth", "isHighlighted", function (h) {
            return h ? 3 : 1;
        }).ofObject()
    ),
    graph(
        go.Shape,
        { toArrow: "Standard", strokeWidth: 0 },
        // the Shape.fill color depends on whether Link.isHighlighted is true
        new go.Binding("fill", "isHighlighted", function (h) {
            return h ? "#391d4d" : "black";
        }).ofObject()
    ),
    graph(
        go.Panel,
        "Auto",
        graph(
            go.Shape, // the label background, which becomes transparent around the edges
            {
                fill: graph(go.Brush, "Radial", {
                    1: "transparent",
                }),
                stroke: null,
                name: "SHAPE",
            }
        ),
        graph(
            go.TextBlock,
            // editing the text automatically updates the model data
            new go.Binding("text").makeTwoWay()
        )
    )
);

myDiagram.nodeTemplateMap.add("Start",
    graph(go.Node, "Spot", { desiredSize: new go.Size(45, 45) },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          graph(go.Shape, "Circle",
            {
              fill: "#89a8a3",
              stroke: "black",
              portId: "",
              fromLinkable: false, fromLinkableSelfNode: false, fromLinkableDuplicates: false,
              toLinkable: false, toLinkableSelfNode: false, toLinkableDuplicates: false,
              cursor: "pointer",
              name: "SHAPE"
            }),
            graph(go.TextBlock,
            {
              font: "bold 16pt helvetica, bold arial, sans-serif",
              stroke: "black"
            },
            new go.Binding("text").makeTwoWay())
        )
      );

myDiagram.model = new go.GraphLinksModel(
    [
        { key: 1, text: "q1", loc: "-300 0", category: "Start"},
        { key: 2, text: "q2", loc: "0 0", category: "Start" },
        { key: 3, text: "q3", loc: "300 0", category: "Start" },
    ],
    [
        { from: 1, to: 1, text: "\n\n\na → a, R\nb → a, R\n␣ → b, R", curviness: 20 },
        { from: 1, to: 2, text: "\n\nB → B, L", curviness: 0},
        { from: 2, to: 2, text: "\n\na → a, L\nb → b, L", curviness: 20},
        { from: 2, to: 3, text: "\n\nB → B, R", curviness: 0}

    ]
);

function colorearEnlace(nodoInicial, nodoFinal) {
    ini = myDiagram.findNodeForKey(nodoInicial);
    ini.findLinksOutOf().each(function (i) {
        fin = myDiagram.findNodeForKey(nodoFinal);
        fin.findLinksInto().each(function (f) {
            if (i == f) {
                i.isHighlighted = true;
            }
        });
    });
}

function enlaceOriginal(nodoInicial, nodoFinal) {
    ini = myDiagram.findNodeForKey(nodoInicial);
    ini.findLinksOutOf().each(function (i) {
        fin = myDiagram.findNodeForKey(nodoFinal);
        fin.findLinksInto().each(function (f) {
            if (i == f) {
                i.isHighlighted = false;
            }
        });
    });
}

function colorEnlace(inicio, final, inc) {
    setTimeout(function () {
        colorearEnlace(inicio, final);
    }, 0);
    setTimeout(function () {
        enlaceOriginal(inicio, final);
    }, inc);
}

function colorearNodo(num) {
    node = myDiagram.findNodeForKey(num);
    shape = node.findObject("SHAPE");
    shape.fill = "#726eff";
}

function colorNodo(ant, nue, inc) {
    setTimeout(function () {
        nodoOriginal(ant);
    }, 0);
    setTimeout(function () {
        colorearNodo(nue);
    }, inc);
}
  
  function nodoOriginal(num) {
    node = myDiagram.findNodeForKey(num);
    shape = node.findObject("SHAPE");
    shape.fill = "#89a8a3";
}