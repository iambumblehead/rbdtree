// Filename: rbtreeview.js  
// Timestamp: 2014.08.16-22:36:56 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  
// Requires:


var rbtreeview = ((typeof module === 'object') ? module : {}).exports = {

  nodeleftId : 0,
  noderightId : 1,

  nodeHTMLStr : '' +
    '<div class="rbtree-node">' +
    '  <div class="rbtree-node-shape :color">' +
    '    <p class="rbtree-node-shape-title :color">:title</p>' +
    '    <p class="rbtree-node-shape-data :color">:data</p>' +
    '  </div>' +
    '  :leaves' +
    '</div>',

  leavesHTMLStr : '' +
    '<div class="rbtree-leaf :level">' +
    '  <div class="rbtree-leaf-default rbtree-leaf-left">:leftData</div>' +
    '  <div class="rbtree-leaf-default rbtree-leaf-right">:rightData</div>' +
    '</div>',

  fromParentGetChild : function (parent, childType) {
    return /^left$/.test(childType) ?
      (parent['left'] && rbtree.isNodeLeaf(parent['left'])) ? parent['left'] : null : 
      (parent['right'] && rbtree.isNodeLeaf(parent['right'])) ? parent['right'] : null;
  },

  renderNode : function (node) {
    var that = this,
        childHTMLStr = '',
        colorStr;

    if (node) {
      colorStr = rbtree.isNodeRed(node) ? 'red' : 'black';
      
      childHTMLStr = that.nodeHTMLStr
          .replace(/:color/gi, colorStr)
          .replace(/:data/, 'data')
          .replace(/:title/, node.val)
          .replace(/:leaves/, that.renderLeaves(node));          
      
    }

    return childHTMLStr;
  },
  
  // child must be of type 'left' or 'right'
  renderChild : function (parent, childType) {
    var that = this,
        child = that.fromParentGetChild(parent, childType);
    
    return that.renderNode(child);
  },

  renderLeaves : function (data) {
    var that = this,
        containerStr = '',
        rightHTMLStr,
        leftHTMLStr;

    if (data && rbtree.isNodeLeaf(data)) {
      rightHTMLStr = that.renderChild(data, 'right'),        
      leftHTMLStr = that.renderChild(data, 'left');
      if (rightHTMLStr || leftHTMLStr) {
        containerStr = that.leavesHTMLStr
          .replace(/:leftData/, leftHTMLStr)
          .replace(/:rightData/, rightHTMLStr);
      }
    }

    return containerStr;
  },

  render : function (rbtree, elem) {

    if (elem && rbtree) {
      var result = this.renderNode(rbtree);      
      if (result) {
        elem.innerHTML = result;
      }
    }
  },

  rndmhex : function () {
    var x = Math.round(0xffffff * Math.random()).toString(16);
    var y = (6-x.length);
    var z = "000000";
    var z1 = z.substring(0,y);
    var color = "#" + z1 + x;
    
    return color;
  },


  renderUpdate : function (rbtree, elem, i) {
    if (elem) {
      var result = this.renderNode(rbtree);      
      var color = this.rndmhex();
      
      if (result) {

        var f, newresult = '' +
          '<div style="background-color:' + color + ';">' +
             '<b>'+i+'</b>' +
          result + 
          '</div>';
        
        newresult = domchilds.getFromHTMLStr(newresult);

        f = domchilds.getFirstElem(elem);

        if (f) {
          elem.insertBefore(newresult, f);
        } else {
          elem.appendChild(newresult);
        }
      }
    }
  }

};
