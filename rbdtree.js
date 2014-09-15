// Filename: rbdtree.js  
// Timestamp: 2014.09.14-20:42:41 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  
// Requires:
//
// red black tree references:
//   http://en.wikipedia.org/wiki/Red%E2%80%93black_tree
//   http://cs.lmu.edu/~ray/notes/redblacktrees/
//   http://www.opensource.apple.com/source/sudo/sudo-46/src/redblack.c
//   https://github.com/plainview/rbtree-js/blob/master/rbtree.js
//   https://www.cs.usfca.edu/~galles/visualization/RedBlack.html
//   http://www.geeksforgeeks.org/red-black-tree-set-3-delete-2/
//

var rbdtree = ((typeof module === 'object') ? module : {}).exports = (function (o) {

  var red = 1,
      black = 0,
      defer = 2,

      leaf = 1,      
      sentinel = 0,

      left = 'left',
      right = 'right',

      icPending = 1,
      icPromoteCNode = 2,
      icParentUncleRed = 3,
      icRotatePNodeLeft = 4,
      icRotatePNodeRight = 5,
      icRotateGNode = 6,
      icRotateGNodeDefer = 7,

      dcPNodeBlackLMNodeSRNodeRed = 10,
      dcPNodeBlackLMNodeSLNodeRed = 11,
      dcPNodeBlackRMNodeSLNodeRed = 12,
      dcPNodeBlackRMNodeSRNodeRed = 13,
      dcPNodeSNodeSLNodeSRNodeBlack = 14,

      dcSwitchPNodeSNodeColor = 15,
      dcSwitchPNodeSNodeColorRotatePRight = 16,
      dcSwitchPNodeSNodeColorRotatePLeft = 17,

      nil = function () { 
        return {
          rb : black,
          type : sentinel
        };
      },
  
      node = {
        val : 0,
        left : nil(),
        right : nil(),
        data : 0,
        type : leaf,
        rb : red
      };

  return o = {
    left : left,
    right : right,
    
    red : red,
    black : black,

    leaf : 1,      
    sentinel : 0,

    node : node,
    nil : nil(),

    // should be get node new
    // or should be merged w/ get node copy...
    getNew : function (numval, rb, type) {
      var n = Object.create(node);
      n.val = numval;
      n.type = 1;
      n.rb = red;
      n.left = nil();
      n.right = nil();
      return n;
    },

    getMerged : function (nodea, nodeb) {
      var n = Object.create(node);

      n.val = nodeb.val;

      n.rb = +nodea.rb;
      n.type = +nodea.type;
      n.left = nodea.left;
      n.right = nodea.right;
      return n;
    },

    getDirectionOther : function (direction) {
      return direction === left ? right : left;
    },

    isNodeLeaf : function (node) {
      return node.type === leaf;
    },

    isNodeLeafEdge : function (node) {
      return node.type === leaf &&
             node.left.type === sentinel &&
             node.right.type === sentinel;
    },

    isNodeSentinel : function (node) {
      return node.type === sentinel;
    },

    isNodeRed : function (node) {
      return node && node.rb === red;
    },

    isNodeBlack : function (node) {
      return node && node.rb === black;
    },

    isNodeDefer : function (node) {
      return node && node.rb === defer;
    },

    isNodeSame : function (nodea, nodeb) {
      return (nodea && nodeb && nodea.val === nodeb.val) ? true : false;
    },

    isNodeChild : function (pnode, node) {
      return this.isNodeSame(pnode.left, node) 
          || this.isNodeSame(pnode.right, node);
    },

    getNodeAsBlack : function (node) {
      node.rb = black;
      return node;
    },

    getNodeAsRed : function (node) {
      node.rb = red;
      return node;
    },

    getNodeAsDefer : function (node) {
      node.rb = defer;
      return node;
    },

    getNodeAsRoot : function (node) {
      return this.getNodeAsBlack(node);
    },

    getPNodeDirection : function (pnode, node) {
      var pval = pnode.val,
          val = node.val;

      return pval < val ? right :
             pval > val ? left : null;
    },

    // child of pnode, direction to node
    getPNodeChild : function (pnode, node) {
      return pnode[this.getPNodeDirection(pnode, node)];
    },

    // child of pnode, direction from node
    getPNodeSibling : function (pnode, node) {
      return pnode[this.getPNodeDirection(pnode, node) === right ? left : right];
    },

    // child of pnode, direction from node, black
    getPNodeAsChildBlack : function (pnode, node) {
      pnode[this.getPNodeDirection(pnode, node)].rb = black;
      return pnode;
    },

    // child of pnode, direction from node, red
    getPNodeAsChildRed : function (pnode, node) {
      pnode[this.getPNodeDirection(pnode, node)].rb = red;
      return pnode;
    },

    getPNodeAsChildAppendedAt : function (pnode, node, direction) {
      return (pnode[direction] = node) && pnode;
    },

    getPNodeAsChildDetachedAt : function (pnode, node, direction) {
      var tmprb = pnode[direction].rb;
      pnode[direction] = node[direction] || nil();
      pnode[direction].rb = tmprb;
      return pnode;
    },

    // define node directly on pnode, dynamic direction
    //
    // method tries to define node at a correct position based on val. 
    // for case of 'nil' nodes with no value, optional 'dnode' argument may be used instead.
    getPNodeAsChildAppended : function (pnode, node, dnode) {
      return this.getPNodeAsChildAppendedAt(
        pnode, node, this.getPNodeDirection(pnode, dnode || node));
    },

    getPNodeAsChildDetached : function (pnode, node, dnode) {
      return this.getPNodeAsChildDetachedAt(
        pnode, node, this.getPNodeDirection(pnode, dnode || node));
    },

    // define node directly on pnode, left
    getPNodeAsChildAppendedLeft : function (pnode, node) {
      return this.getPNodeAsChildAppendedAt(pnode, node, left);
    },

    // define node directly on pnode, right
    getPNodeAsChildAppendedRight : function (pnode, node) {
      return this.getPNodeAsChildAppendedAt(pnode, node, right);
    },

    // O(log N) on average for balanced tree
    getKthSmallestNode : function (tree, k) {
      var num_elems = tree.left.num_elements;
      if (num_elems === k) {
        return tree.value;
      } else if (num_elems < k) {
        // k > num_elements(left subtree of T) then obviously 
        // we can ignore the left subtree, because those elements 
        // will also be smaller than the kth smallest. So, we 
        // reduce the problem to finding the k - num_elements(left subtree of T) 
        // smallest element of the right subtree.
        return this.getKthSmallestNode(tree.right, k - num_elems);        
      } else if (num_elems > k) {
        // k < num_elements(left subtree of T), 
        // then the kth smallest is somewhere in the left subtree, 
        // so we reduce the problem to finding the kth smallest element 
        // in the left subtree.
        return this.getKthSmallestNode(tree.left, k);
      }
    },

    getTreeMaxNode : function (tree) {
      return this.isNodeLeaf(tree.right) ? 
        this.getTreeMaxNode(tree.right) : tree;
    },

    getTreeMinNode : function (tree) {
      return this.isNodeLeaf(tree.left) ? 
        this.getTreeMinNode(tree.left) : tree;
    },

    // must be a valid tree w/ sentinel nodes at edges
    getTreeDepthMax : function (tree) {
      var that = this,
          height = 0;

      if (that.isNodeLeaf(tree)) {
        height = 1 + Math.max(
          that.getTreeDepthMax(tree.left), 
          that.getTreeDepthMax(tree.right)
        );
      }
      
      return height;
    },

    // must be a valid tree w/ sentinel nodes at edges
    getTreeDepthMin : function (tree) {
      var that = this,
          height = 0;

      if (that.isNodeLeaf(tree)) {
        height = 1 + Math.min(
          that.getTreeDepthMin(tree.left), 
          that.getTreeDepthMin(tree.right)
        );
      }
      
      return height;
    },

    isBalanced : function (tree) {
      return this.getTreeDepthMax(tree) - this.getTreeDepthMin(tree) <= 1;
    },

    // child of pnode, direction to node, is red?
    isPNodeChildRed : function (pnode, node) {
      return this.getPNodeChild(pnode, node).rb === red;
    },

    // child of pnode, direction to node, is black?
    isPNodeChildBlack : function (pnode, node) {
      return this.getPNodeChild(pnode, node).rb === black;
    },

    // rotate right
    //       a          b
    //      / \        / \
    //     /   e      c   \
    //    b       ->       a
    //   / \             /  \
    //  c    d          d    e
    //
    //   bnode.left = anode;
    //   anode.right = dnode;
    //   return bnode;
    rotateRight : function (anode) {
      var that = this,
          bnode = anode.left,
          dnode = bnode.right;        

      return that.getPNodeAsChildAppendedRight(bnode,
        that.getPNodeAsChildAppendedLeft(anode, dnode)
      );
    },

    // rotate left
    //   a                b
    //  / \              / \
    // c   \     ->     /   e
    //      b          a
    //     / \        / \
    //    d   e      c   d
    // 
    //   bnode.left = anode;
    //   anode.right = dnode;
    //   return bnode;
    rotateLeft : function (anode) {
      var that = this,
          bnode = anode.right,
          dnode = bnode.left;        

      return that.getPNodeAsChildAppendedLeft(bnode,
        that.getPNodeAsChildAppendedRight(anode, dnode)
      );
    },

    getInsertCase : function(gnode, pnode, node) {
      var cnode,
          that = this,
          ic = icPending;

      if (pnode) {
        cnode = that.getPNodeChild(pnode, node);
        if (pnode.rb === red && gnode.rb === black) {
          if (that.getPNodeSibling(gnode, pnode).rb === red) {
            if (cnode.rb === red) {
              ic = icParentUncleRed;
            }
          } else if (gnode.left.val === pnode.val &&
                     pnode.right.val === cnode.val &&
                     cnode.rb === red) {
            ic = icRotatePNodeLeft;
          } else if (gnode.right.val === pnode.val &&
                     pnode.left.val === cnode.val &&
                     cnode.rb === red) {
            ic = icRotatePNodeRight;
          } else {
            ic = icRotateGNode;
          }
        } else {
          if (pnode && pnode.rb === defer) {
            if (pnode.right.val === cnode.val) {
              ic = icRotateGNodeDefer;
            } else {
              ic = icRotateGNodeDefer;
            }
            return ic;
          }
        }
      } else {
        ic = icPromoteCNode;
      }

      return ic;
    },

    getGNodeAsInsertCase : function(gnode, pnode, node, isRootAbove, ic) {
      var that = this;

      ic = typeof ic === 'number' ? 
        ic : that.getInsertCase(gnode, pnode, node);

      if (ic === icPromoteCNode)  {
        gnode = pnode.rb = black;
      } else if (ic === icParentUncleRed) {
        gnode.rb = red;
        gnode.left.rb = black;
        gnode.right.rb = black;
      } else if (ic === icRotatePNodeLeft) {
        gnode.left = that.rotateLeft(pnode);
        gnode = that.getGNodeAsInsertCase(
          gnode, gnode.left, gnode.left.left, isRootAbove, icRotateGNode
        );
      } else if (ic === icRotatePNodeRight) {
        gnode.right = that.rotateRight(pnode);
        gnode = that.getGNodeAsInsertCase(
          gnode, gnode.right, gnode.right.right, isRootAbove, icRotateGNode
        );
      } else if (ic === icRotateGNodeDefer) {
        pnode = that.getPNodeAsChildRed(pnode, node);
        gnode = that.getPNodeAsChildAppended(gnode, pnode);

        // after insert, rotation was deferred (see below 'red on red' comment)
        if (that.getPNodeSibling(gnode, pnode).rb === black) {
          gnode.rb = black;
          gnode = that.rotateLeft(gnode);  
          gnode.left.rb = red;
        } else {
          gnode = that.getGNodeAsInsertCase(
            gnode, pnode, node, isRootAbove, icParentUncleRed
          );
        }
      } else if (ic === icRotateGNode) {
        if (that.getPNodeChild(pnode, node).rb === red) {
          if (gnode.rb === red && 
              pnode.rb === red && isRootAbove) {

            // red on red may be resolved by 
            //   rotating parent of gnode,
            //   define red on sibling and black on cnode
            // parent of gnode inaccessible, unless root defer
            gnode.rb = defer;
          } else {
            gnode = that.getNodeAsRed(gnode);
            gnode = that.getPNodeAsChildBlack(gnode, node);

            if (that.getPNodeDirection(pnode, node) === left) {
              gnode = that.rotateRight(gnode);        
            } else {
              gnode = that.rotateLeft(gnode);
            }
          }
        }
      }

      return gnode;
    },

    getDeleteCase : function (pnode, dnode, snode) {
      var slnode,
          srnode,
          that = this,
          dc = icPending;

      if (pnode && dnode && dnode.rb === defer) {
        slnode = snode.left;
        srnode = snode.right;

        if (snode.rb === black) {
          
          if (that.isNodeRed(slnode) ||
              that.isNodeRed(srnode)) {
            if (pnode.left.val === dnode.val) {
              if (srnode.rb === red) {
                // case 6, a.iii, rotate at pnode left
                dc = dcPNodeBlackLMNodeSRNodeRed;
              } else {
                // case 5, a.iv
                dc = dcPNodeBlackLMNodeSLNodeRed;
              }
            } else {
              if (slnode.rb === red) {
                // case ?, a.i, reverse iii
                dc = dcPNodeBlackRMNodeSLNodeRed;
              } else {
                // case ?, a.ii, reverse iv
                dc = dcPNodeBlackRMNodeSRNodeRed;
              }
            }
          } else if (that.isNodeBlack(slnode) &&
                     that.isNodeBlack(srnode)) {
            if (that.isNodeRed(pnode)) {
              // S and S's children are black, but P is red. 
              dc = dcSwitchPNodeSNodeColor;
            } else {
              dc = dcPNodeSNodeSLNodeSRNodeBlack;
            }
          }
        } else { // sibling is red, children black
          if (that.isNodeBlack(slnode) &&
              that.isNodeBlack(srnode)) {
            if (pnode.right.val === dnode.val) {
              dc = dcSwitchPNodeSNodeColorRotatePRight;
            } else {
              dc = dcSwitchPNodeSNodeColorRotatePLeft;
            }
          }
        }
      }
      
      return dc;
    },

    getGNodeAsDeleteCase : function(pnode, dnode, snode, isRootAbove, dc) {    
      var that = this,
          tmpcolor;

      dc = typeof dc === 'number' ? 
        dc : that.getDeleteCase(pnode, dnode, snode);

      function mutateSwitchColor (nodea, nodeb, tmp) {
        tmp = nodea.rb; nodea.rb = nodeb.rb; nodeb.rb = tmp;        
      }

      if (dnode.rb === defer) dnode.rb = black;

      if (dc === dcSwitchPNodeSNodeColor) {
        mutateSwitchColor(pnode, snode);
      } else if (dc === dcSwitchPNodeSNodeColorRotatePRight || 
                 dc === dcSwitchPNodeSNodeColorRotatePLeft) {
        mutateSwitchColor(pnode, snode);

        if (dc === dcSwitchPNodeSNodeColorRotatePLeft) {
          dnode.rb = defer;
          pnode = that.rotateLeft(pnode);
          snode = pnode.left;          
        } else { 
          dnode.rb = defer;
          pnode = that.rotateRight(pnode);
          snode = pnode.right;
        }

        snode = that.getGNodeAsDeleteCase(snode, snode.right, snode.left, isRootAbove);
        pnode = that.getPNodeAsChildAppended(pnode, snode);                        

      } else if (dc === dcPNodeBlackLMNodeSRNodeRed ||
                 dc === dcPNodeBlackRMNodeSLNodeRed) {
        mutateSwitchColor(pnode, snode);

        if (dc === dcPNodeBlackLMNodeSRNodeRed) {
          snode.right.rb = black;
          pnode = that.getPNodeAsChildAppended(pnode, snode);                        
          pnode = that.rotateLeft(pnode);
        } else {
          snode.left.rb = black;
          pnode = that.getPNodeAsChildAppended(pnode, snode);                        
          pnode = that.rotateRight(pnode);                          
        }
      } else if (dc === dcPNodeBlackLMNodeSLNodeRed ||
                 dc === dcPNodeBlackRMNodeSRNodeRed) {
        if (dc === dcPNodeBlackLMNodeSLNodeRed) {
          snode = that.rotateRight(snode);
          pnode = that.getPNodeAsChildAppended(pnode, snode);
          dc = dcPNodeBlackLMNodeSRNodeRed;
        } else {
          snode = that.rotateLeft(snode);
          pnode = that.getPNodeAsChildAppended(pnode, snode);
          dc = dcPNodeBlackRMNodeSLNodeRed;
        }

        mutateSwitchColor(pnode, snode);

        pnode = that.getGNodeAsDeleteCase(pnode, dnode, snode, isRootAbove, dc);
      }

      return pnode;
    },

    // does no rebalance/recolor
    // pnode also loses children of 'node'
    rmNode : function (pnode, node) {
      var that = this,
          cnode = that.getPNodeChild(pnode, node);

      if (cnode) {
        if (that.isNodeSame(cnode, node)) {
          pnode = that.getPNodeAsChildDetached(pnode, cnode);
        } else {
          cnode = that.rmNode(cnode, node);
          pnode = that.getPNodeAsChildAppended(pnode, cnode);           
        }
      } else if (that.isNodeSame(pnode, node)) {
        pnode = nil();
      }

      return pnode;
    },

    getNodeAsInOrderSuccessor : function (node) {
      var that = this,
          mnode = that.getTreeMinNode(node.right);

      return that.getMerged(that.rmNode(node, mnode), mnode);
    },

    getNodeAsInOrderPredecessor : function (node) {
      var that = this,
          mnode = that.getTreeMaxNode(node.left);
      
      return that.getMerged(that.rmNode(node, mnode), mnode);
    },


    // when both the node and replacement node
    // are black, color of node becomes 'double-black' (defer)
    // this signals rotation further up the tree
    //
    // http://www.geeksforgeeks.org/red-black-tree-set-3-delete-2/
    getNodeAsInOrderReplacement : function (node) {
      var that = this,
          mnode,
          rnode;

      if (that.isNodeLeaf(node.left)) {
        mnode = that.getTreeMaxNode(node.left);        
        rnode = that.getMerged(that.rmNode(node, mnode), mnode);
      } else if (that.isNodeLeaf(node.right)) {
        mnode = that.getTreeMinNode(node.right);
        rnode = that.getMerged(that.rmNode(node, mnode), mnode);
      }  else {
        mnode = nil();
        rnode = nil();
      }

      if (that.isNodeBlack(mnode) &&
          that.isNodeBlack(rnode) &&
          that.isNodeBlack(node)) {
        rnode = that.getNodeAsDefer(rnode);
      }

      return rnode;
    },

    // min element in right subtree
    getAsInOrderSuccessorNode : function (pnode, cnode, node) {
      var that = this;

      cnode = that.getNodeAsInOrderSuccessor(cnode);
      pnode = that.getPNodeAsChildAppended(pnode, cnode);
      return pnode;
    },

    deleteNode : function (pnode, node, isRootAbove) {
      var that = this,
          cnode,
          mnode,
          snode;

      if (pnode) {
        mnode = that.getPNodeChild(pnode, node);
        if (that.isNodeSame(pnode, node)) {
          pnode = that.getNodeAsInOrderReplacement(pnode);
        } else if (mnode) {
          if (that.isNodeSame(mnode, node)) {            
            // new cnode may be `nil` -sibling is retrieved with non-nil mnode              
            cnode = that.getNodeAsInOrderReplacement(mnode);
            snode = that.getPNodeSibling(pnode, mnode);
          } else {
            cnode = that.deleteNode(mnode, node, true);
          }

          pnode = that.getPNodeAsChildAppended(pnode, cnode, mnode);
          pnode = that.getGNodeAsDeleteCase(pnode, cnode, snode, isRootAbove);
        }

        if (!isRootAbove) {
          pnode = that.getNodeAsRoot(pnode);
        }
      }

      return pnode;
    },

    // inserts 'node' at pnode 'pnode'
    addNode : function (pnode, node, isRootAbove) {
      var that = this,
          cnode;

      if (pnode) {
        cnode = that.getPNodeChild(pnode, node);

        if (that.isNodeSentinel(cnode)) {

          pnode = that.getPNodeAsChildAppended(pnode, node);
          pnode = that.getGNodeAsInsertCase(pnode, cnode, node, true);
        } else if (that.isNodeSame(cnode, node)) {

        } else {
          cnode = that.addNode(cnode, node, true);
          pnode = that.getPNodeAsChildAppended(pnode, cnode);

          if (isRootAbove ||
              (cnode.rb === red && that.isPNodeChildRed(cnode, node)) ||
              (cnode.rb === defer)) {
            pnode = that.getGNodeAsInsertCase(pnode, cnode, node, isRootAbove);
          }

          if (!isRootAbove) {
            pnode = that.getNodeAsBlack(pnode);
          }
        }
      } else {
        pnode = that.getNodeAsRoot(node);
      }

      return pnode;
    },

    deleteNodeNum : function (tree, num) {
      return this.deleteNode(tree, this.getNew(num));
    },

    addNodeNum : function (tree, num) {
      return this.addNode(tree, this.getNew(num));
    },

    addNodeNumArr : function (tree, numArr) {
      return numArr.length ?
        o.addNodeNumArr(o.addNodeNum(tree, numArr[0]), numArr.slice(1)) : tree;
    }
  };

}());
