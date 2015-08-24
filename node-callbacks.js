var nodeCallbacks = {
    MAX_CHILD_NODES: 10,
    MAX_NODES_L1: 1000,
    /*
     * Returns an array of labels for all children under the node at treePath.
     * treePath starts with ['root'] for the root node. Then ['root', 0] is the first child of the root.
     * ['root', 1] is the second child of the root. etc.
     */
    loadChildren: function(treePath, props, successCallback, failCallback) {
        var numNodes;
        var maxNodes;
        if (!treePath) return [];
        if (treePath.length === 1) {
            maxNodes = this.MAX_NODES_L1;
        } else {
            maxNodes = this.MAX_CHILD_NODES;
        }
        numNodes = Math.max(Math.floor(Math.random() * maxNodes), 1);
        var nodes = [];
        for (var i = 0; i < numNodes; i ++) {
            nodes.push(this.getTerm(treePath.concat(i), props));
        }
        // Set a short delay proportional to the number of child nodes:
        window.setTimeout(function(successCb, failCb) {
            this.treePathsLoaded[treePath] = nodes;
            successCb(treePath);
            // FIXME: what would the fail condition be?
        }.bind(this, successCallback, failCallback), Math.min(numNodes * 100, 1000));
    }
}
