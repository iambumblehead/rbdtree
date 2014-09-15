

var rbtree_testutil = ((typeof module === 'object') ? module : {}).exports = {

  // console.log data and render w/ rbtreeview if present
  logNode : function (node, i, msg) {
    var staticJSON = JSON.stringify(node),
        staticObj = JSON.parse(staticJSON),
        elem;

    console.log('[...] logNode:', i + ' : ' + msg, staticJSON, staticObj);

    if (typeof window === 'object' && 
        typeof rbtreeview === 'object') {
      elem = document.getElementById('TestView');
      rbtreeview.renderUpdate(staticObj, elem, i + ' : ' + msg);
    }
  },

  isNodeLeaf : function (node) {
    return node.type === 1;
  },

  breakNode : function (n) {
    if (typeof n !== 'object' || n === null) {
      throw new Error('node is not an object');
    }

    if (this.isNodeSentinel(n)) {
      if (typeof n.left === 'object' ||
          typeof n.right === 'object') {    
        throw new Error('invalid sentinel');
      }
    }

    if (this.isNodeLeaf(n)) {
      if (typeof n.left !== 'object' ||
          typeof n.right !== 'object') {
        throw new Error('invalid leaf');
      }
      this.breakNode(n.left);
      this.breakNode(n.right);
    }      
  }
};
