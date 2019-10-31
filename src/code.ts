// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {width: 300, height: 550});

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  // if (msg.type === 'create-rectangles') {
  //   const nodes: SceneNode[] = [];
  //   for (let i = 0; i < msg.count; i++) {
  //     const rect = figma.createRectangle();
  //     rect.x = i * 150;
  //     rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
  //     figma.currentPage.appendChild(rect);
  //     nodes.push(rect);
  //   }
  //   figma.currentPage.selection = nodes;
  //   figma.viewport.scrollAndZoomIntoView(nodes);
  // }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  const select = figma.currentPage.selection
  const nodes: Array<any> = []

  let obj: { componentName?: string; instanceCount?: number; instances?: Array<any>; } = { 
    componentName: '',
    instanceCount: 0,
    instances: []
  };

  function findInstances(id: String) {
    figma.currentPage.findAll(node => node.type === 'INSTANCE').forEach(sceneNode => {
      if (sceneNode.type == 'INSTANCE') {
        if (sceneNode.masterComponent.id === id) {
          nodes.push(sceneNode)
        }
      }
    })
  }
  
  function findMaster(id: String) {
    figma.currentPage.findAll(node => node.type === 'COMPONENT').forEach(sceneNode => {
      if (sceneNode.type == 'COMPONENT') {
        if (sceneNode.id === id) {
          nodes.push(sceneNode)
        } 
      }
    })
  }


  if (msg.type === 'find') {
    if (select.length === 1 ) {
      if (select[0].type === "COMPONENT") {
        const masterID = select[0].id
        obj.componentName = select[0].name
        
        findInstances(masterID)
        obj.instanceCount = nodes.length
        obj.instances = nodes
        
        figma.ui.postMessage(obj)

        if (nodes.length == 0) {
          figma.notify('No instance found')
        } else {
          figma.currentPage.selection = nodes
          // figma.notify(`Found ${nodes.length} instances`)
        }

      } else if (select[0].type === "INSTANCE") {
        select.forEach(sceneNode => {
          if (sceneNode.type == 'INSTANCE') {
            let instanceID = sceneNode.masterComponent.id
            obj.componentName = sceneNode.masterComponent.name
            
            findMaster(instanceID)
            obj.instanceCount = nodes.length
            obj.instances = nodes

            figma.ui.postMessage(obj)


            if (nodes.length == 0) {
              figma.notify('Please restore master component')
            } else {
              figma.currentPage.selection = nodes
            }

          }
        })
      } else {
        figma.notify('Not a component or an instance')
      }
    } else {
      figma.notify('Please select a component or an instance')
    }
  }

};