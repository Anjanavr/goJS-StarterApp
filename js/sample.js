    var $ = go.GraphObject.make;
    var myDiagram =
      $(go.Diagram, "sampleDiagram", {
        "toolManager.hoverDelay": 100,
        initialContentAlignment: go.Spot.Center, // center Diagram contents
        "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
        layout: $(go.TreeLayout, { angle: 0, layerSpacing: 35 })
      });
    var folderColor = "#e30613";
    var fileColor = "#46344e";
    myDiagram.add(
      $(go.Part, "Table", { position: new go.Point(200, -100), selectable: false },
        $(go.TextBlock, "Key", { row: 0, font: "700 14px Droid Serif, sans-serif" }), // end row 0
        $(go.Panel, "Horizontal", { row: 1, alignment: go.Spot.Left },
          $(go.Shape, "RoundedRectangle", { desiredSize: new go.Size(30, 30), fill: folderColor, margin: 5 }),
          $(go.TextBlock, "Folder", { font: "700 13px Droid Serif, sans-serif" })
        ), // end row 1
        $(go.Panel, "Horizontal", { row: 2, alignment: go.Spot.Left },
          $(go.Shape, "RoundedRectangle", { desiredSize: new go.Size(30, 30), fill: fileColor, margin: 5 }),
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
        $(go.Shape, "RoundedRectangle", { fill: "linen", stroke: "#46344e" }),
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
        $(go.Shape, "RoundedRectangle", { strokeWidth: 1, stroke: null, name: "SHAPE" },
          new go.Binding("fill", "type", color)),
        $(go.TextBlock, "Default Text", { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
          new go.Binding("text", "name")),
        $("TreeExpanderButton",
        { alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top },
        { visible: true })
      );
      

    // define a Link template that routes orthogonally, with no arrowhead
    myDiagram.linkTemplate =
      $(go.Link, { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape

    var model = $(go.TreeModel);
    model.nodeDataArray = [{
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
      description: "Contains the jsp templates for all the already existing pages"
    }, {
      key: "22",
      parent: "21",
      name: "Reskinning",
      type: "folder",
      description: "Contains the jsp templates for all the new pages and reskinning of existing pages"
    }, {
      key: "23",
      parent: "22",
      name: "SubmitFlightSearch",
      type: "folder",
      description: "Contains the jsp templates for searching a flight"
    }, {
      key: "24",
      parent: "23",
      name: "booking.jsp",
      type: "file",
      description: "Template for booking a flight"
    }, {
      key: "25",
      parent: "23",
      name: "searchForFlight.jsp",
      type: "file",
      description: "Template for searching a flight( also includes return, empty legs, multiple destinations"
    }, {
      key: "26",
      parent: "23",
      name: "compareQuotes.jsp",
      type: "file",
      description: "Template for comparing the prices of jets"
    }, {
      key: "27",
      parent: "22",
      name: "faqs",
      type: "folder",
      description: ""
    }, {
      key: "28",
      parent: "27",
      name: "PrivateFlyFaqTemplate.jsp",
      type: "file",
      description: "Template created for frequenty asked questions in PrivateFly"
    }, {
      key: "29",
      parent: "22",
      name: "location",
      type: "folder",
      description: "Contains the jsp template for location based tracking of jets"
    }, {
      key: "30",
      parent: "29",
      name: "location.jsp",
      type: "file",
      description: ""
    }, {
      key: "31",
      parent: "22",
      name: "aircraftGroupTemplate.jsp",
      type: "file",
      description: ""
    }, {
      key: "32",
      parent: "22",
      name: "aircraftTypeTemplate.jsp",
      type: "file",
      description: ""
    }, {
      key: "33",
      parent: "22",
      name: "breadCrumbTemplate.jsp",
      type: "file",
      description: ""
    }, {
      key: "34",
      parent: "22",
      name: "commonHeaderTemplate.jsp",
      type: "file",
      description: ""
    }, {
      key: "35",
      parent: "22",
      name: "PrivateFlyFooterTemplate.jsp",
      type: "file",
      description: ""
    }, {
      key: "36",
      parent: "22",
      name: "article.jsp",
      type: "file",
      description: ""
    }, {
      key: "37",
      parent: "22",
      name: "commonHeaderBanner.jsp",
      type: "file",
      description: ""
    }, {
      key: "38",
      parent: "22",
      name: "destinationAirfieldTemplate.jsp",
      type: "file",
      description: ""
    }, {
      key: "39",
      parent: "22",
      name: "PrivateFlyHomePageTemplate.jsp",
      type: "file",
      description: ""
    }, {
      key: "40",
      parent: "22",
      name: "PrivateFlyContactUsTemplate.jsp",
      type: "file",
      description: ""
    }, {
      key: "41",
      parent: "1",
      name: "antiblanks",
      type: "folder",
      description: "Contains the scss components used in PrivateFly"
    }, {
      key: "42",
      parent: "41",
      name: "dist",
      type: "folder",
      description: "Contains the compiled and minified files"
    }, {
      key: "43",
      parent: "41",
      name: "node_modules",
      type: "folder",
      description: "Installed packages in the project"
    }, {
      key: "44",
      parent: "41",
      name: "src",
      type: "folder",
      description: ""
    }, {
      key: "45",
      parent: "44",
      name: "assets",
      type: "folder",
      description: ""
    }, {
      key: "46",
      parent: "45",
      name: "images",
      type: "folder",
      description: "Contains all the images to be uploaded into OpenCms"
    }, {
      key: "47",
      parent: "45",
      name: "stylesheets",
      type: "folder",
      description: "Contains the stylesheets for components"
    }, {
      key: "48",
      parent: "47",
      name: "base",
      type: "folder",
      description: "Contains all the scss files for commonly used base elements(eg: radio button, labels, headings, icons, links etc..)"
    }, {
      key: "49",
      parent: "47",
      name: "settings",
      type: "folder",
      description: "Contains the scss files for assigning breakpoints, colors, typography and reset"
    }, {
      key: "50",
      parent: "47",
      name: "mixins.scss",
      type: "file",
      description: "Contains all mixins included in the scss files"
    }, {
      key: "51",
      parent: "47",
      name: "index.scss",
      type: "file",
      description: "All the partials are imported here"
    }, {
      key: "52",
      parent: "47",
      name: "components",
      type: "folder",
      description: "Contains scss files of different components used"
    }, {
      key: "53",
      parent: "52",
      name: "aircraft",
      type: "folder",
      description: ""
    }, {
      key: "54",
      parent: "53",
      name: "_aircraft-details.scss",
      type: "file",
      description: ""
    }, {
      key: "55",
      parent: "53",
      name: "_aircraft-specification.scss",
      type: "file",
      description: ""
    }, {
      key: "56",
      parent: "53",
      name: "_aircraft-gallary.scss",
      type: "file",
      description: ""
    }, {
      key: "57",
      parent: "52",
      name: "add-passengers",
      type: "folder",
      description: ""
    }, {
      key: "58",
      parent: "57",
      name: "_add-passengers.scss",
      type: "file",
      description: ""
    }, {
      key: "59",
      parent: "52",
      name: "home",
      type: "folder",
      description: ""
    }, {
      key: "60",
      parent: "59",
      name: "_intro.scss",
      type: "file",
      description: ""
    }, {
      key: "61",
      parent: "59",
      name: "_header.scss",
      type: "file",
      description: ""
    }, {
      key: "62",
      parent: "52",
      name: "article",
      type: "folder",
      description: ""
    }, {
      key: "63",
      parent: "62",
      name: "_article-body.scss",
      type: "file",
      description: ""
    }, {
      key: "64",
      parent: "62",
      name: "_flight-detail.scss",
      type: "file",
      description: ""
    }, {
      key: "65",
      parent: "62",
      name: "_aside.scss",
      type: "file",
      description: ""
    }];
    myDiagram.model = model;
 