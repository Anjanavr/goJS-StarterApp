    var $ = go.GraphObject.make;
    var myDiagram =
        $(go.Diagram, "sampleDiagram", {
            "toolManager.hoverDelay": 100,
            initialContentAlignment: go.Spot.Center, // center Diagram contents
            "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
            layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 })
        });
    var folderColor = "grey";
    var fileColor = "blue";
    myDiagram.add(
        $(go.Part, "Table", { position: new go.Point(200, -100), selectable: false },
            $(go.TextBlock, "Key", { row: 0, font: "700 14px Droid Serif, sans-serif" }), // end row 0
            $(go.Panel, "Horizontal", { row: 1, alignment: go.Spot.Left },
                $(go.Shape, "Rectangle", { desiredSize: new go.Size(30, 30), fill: folderColor, margin: 5 }),
                $(go.TextBlock, "Folder", { font: "700 13px Droid Serif, sans-serif" })
            ), // end row 1
            $(go.Panel, "Horizontal", { row: 2, alignment: go.Spot.Left },
                $(go.Shape, "Rectangle", { desiredSize: new go.Size(30, 30), fill: fileColor, margin: 5 }),
                $(go.TextBlock, "File", { font: "700 13px Droid Serif, sans-serif" })
            ) // end row 2
        ));

    function tooltipTextConverter(person) {
        var str = "";
        str = person.description;
        return str;
    }

    var tooltiptemplate =
        $(go.Adornment, "Auto",
            $(go.Shape, "Rectangle", { fill: "whitesmoke", stroke: "black" }),
            $(go.TextBlock, {
                    font: "bold 14px Helvetica, bold Arial, sans-serif",
                    wrap: go.TextBlock.WrapFit,
                    margin: 5
                },
                new go.Binding("text", "", tooltipTextConverter))
        );

    function color(type) {
        if (type === "folder") return folderColor;
        if (type === "file") return fileColor;
    }
    // the template we defined earlier
    myDiagram.nodeTemplate =
        $(go.Node, "Auto", { deletable: false, toolTip: tooltiptemplate },
            new go.Binding("text", "name"),
            $(go.Shape, "Rectangle", { strokeWidth: 1, stroke: null, name: "SHAPE" },
                new go.Binding("fill", "type", color)),
            $(go.TextBlock, "Default Text", { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                new go.Binding("text", "name"))
        );

    // define a Link template that routes orthogonally, with no arrowhead
    myDiagram.linkTemplate =
        $(go.Link, { routing: go.Link.Orthogonal, corner: 5 },
            $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape

    var model = $(go.TreeModel);
    model.nodeDataArray = [
        { 
          key: "1",
          name: "PrivateFly",
          type: "folder", 
          description: "Root folder for PrivateFly" 
        }, { 
          key: "2",
          parent: "1",
          name: "openCms",
          type: "folder", 
          description: "Root Directory which contain jsp templates, js"
        }
    ];
    myDiagram.model = model;
