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
        }, { 
          key: "3",
          parent: "2",
          name: "lib",
          type: "folder", 
          description: "OpenCms's own library dependencies"
        }, { 
          key: "4",
          parent: "2",
          name: "src",
          type: "folder", 
          description: "web service (Java)"
        }, { 
          key: "4",
          parent: "2",
          name: "webapp",
          type: "folder", 
          description: ""
        }, { 
          key: "5",
          parent: "4",
          name: "META-INF",
          type: "folder", 
          description: "Contains all the manifest file which contains the meta data"
        }, { 
          key: "6",
          parent: "4",
          name: "setup",
          type: "folder", 
          description: "Contains the JSP pages, images and SQL scripts used during the setup of OpenCms."
        }, { 
          key: "7",
          parent: "4",
          name: "WEB-INF",
          type: "folder", 
          description: "Contains all the files related to web application"
        }, { 
          key: "8",
          parent: "7",
          name: "CmsPropertyFiles",
          type: "folder", 
          description: "Contains all the language specific data"
        }, { 
          key: "9",
          parent: "7",
          name: "classes",
          type: "folder", 
          description: "Filled with classes and classpath resources when you import and publish modules."
        }, { 
          key: "10",
          parent: "7",
          name: "config",
          type: "folder", 
          description: "OpenCms stores its configuration files here"
        }, { 
          key: "11",
          parent: "7",
          name: "content",
          type: "folder", 
          description: ""
        }, { 
          key: "12",
          parent: "11",
          name: "assets",
          type: "folder", 
          description: ""
        }, { 
          key: "13",
          parent: "12",
          name: "images",
          type: "folder", 
          description: ""
        }, { 
          key: "14",
          parent: "12",
          name: "stylesheets",
          type: "folder", 
          description: ""
        }, { 
          key: "15",
          parent: "14",
          name: "index.min.css",
          type: "file", 
          description: "Genrated using gulp task from another repo"
        }, { 
          key: "16",
          parent: "12",
          name: "javascripts",
          type: "folder", 
          description: ""
        }, { 
          key: "17",
          parent: "16",
          name: "bootstrap",
          type: "folder", 
          description: "Contains all the bootstrap js files(eg: bootstrap-datetimepicker.js)"
        }, { 
          key: "18",
          parent: "16",
          name: "header.js",
          type: "file", 
          description: "contains functions for header navigations, search and validations"
        }, { 
          key: "19",
          parent: "16",
          name: "custom.js",
          type: "file", 
          description: "Common functions for all pages"
        }, { 
          key: "20",
          parent: "16",
          name: "searchFlight.js",
          type: "file", 
          description: "contains the functions for searching for a flight"
        }, { 
          key: "21",
          parent: "7",
          name: "templates",
          type: "folder", 
          description: "Contains the jsp templates for all the pages"
        },
    ];
    myDiagram.model = model;
