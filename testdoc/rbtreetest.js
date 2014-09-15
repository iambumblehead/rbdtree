

var rbtreetest = {

  testtree : null,
  numArr : [],

  gEBI : function (id) {
    return document.getElementById(id);
  },

  getnumlistElem : function () {
    return this.gEBI('RbNumList');
  },

  getformElem : function () {
    return this.gEBI('RbTreeForm');
  },

  getFormNodeNumInput : function () {
    return this.gEBI('RbTreeFormNodeNumInput');
  },

  getFormRmNodeNumInput : function () {
    return this.gEBI('RbTreeFormNodeRmNumInput');
  },

  getTreeContainerElem : function () {
    return this.gEBI('RbTreeContainer');
  },

  getRandomLink : function () {
    return this.gEBI('RbRandomLink');
  },

  getTestLink : function (num) {
    return this.gEBI('RbTest' + num + 'Link');
  },

  addNode : function (nodeval) {
    var that = this;

    if (nodeval) {
      that.testtree = rbtree.addNodeNum(that.testtree, +nodeval);
    }
  },

  rmNode : function (nodeval) {
    var that = this;

    if (nodeval) {
      that.testtree = rbtree.deleteNodeNum(that.testtree, +nodeval);
    }
  },

  addNodes : function (nodevalArr) {
    var that = this;
    
    if (nodevalArr.length) {
      nodevalArr.map(function (nodeval) {
        that.addNode(nodeval);
      });
    }
  },

  render : function () {
    var that = this,
        treeData = that.testtree,
        treeElem = that.getTreeContainerElem();

    rbtreeview.render(treeData, treeElem);
  },

  addRandomNodes : function () {
    var nodeNum = Math.round(Math.random()*20),
        nodeArr = [];

    while (nodeNum--) {
      nodeArr.push(Math.round(Math.random()*100));
    }

    this.addNodes(nodeArr);
    this.render();
    
  },
  
  // 98 76
  onSubmit : function () {
    var that = this,
        rbnodenumElem = that.getFormNodeNumInput(),
        rbrmnodenumElem = that.getFormRmNodeNumInput(),
        rbnodenum = parseInt(rbnodenumElem.value),
        rbrmnodenum = parseInt(rbrmnodenumElem.value);

    if (!isNaN(rbnodenum)) {
      that.addNode(rbnodenum);
      that.numArr.push(rbnodenum);
      that.getnumlistElem().innerHTML = that.numArr.join(', ');
      rbnodenumElem.value = '';
      that.render();
    } else if (!isNaN(rbrmnodenum)) {
      that.rmNode(rbrmnodenum);
      rbrmnodenumElem.value = '';
      that.render();
    } else if (rbnodenumElem.value) {
      alert('must be a numeric value');
    }
  },

  connect : function () {
    var that = this,
        form = that.getformElem(),
        randomlink = that.getRandomLink();

    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        that.onSubmit();
      };

      form.onkeyup = (function (wait) {
        return function (e) {
          if (!wait) {
            wait = true;
            if (e.keyCode === 13) {
              e.preventDefault();
              that.onSubmit();
            }
            setTimeout(function () { wait = false; }, 2000);
          }
        };
      }());
    }

    if (randomlink) {
      randomlink.onclick = function (e) {
        e.preventDefault();
        that.addRandomNodes();
      };
    }

      that.getTestLink(1).onclick = function (e) {
        e.preventDefault();
        that.addNodes([77,44,33]);
        that.render();
      };

      that.getTestLink(2).onclick = function (e) {
        e.preventDefault();
        that.addNodes([34,12]);
        that.render();
      };

      that.getTestLink(3).onclick = function (e) {
        e.preventDefault();
        that.addNodes([12,34]);
        that.render();
      };

      that.getTestLink(4).onclick = function (e) {
        e.preventDefault();
        that.addNodes([50,34,12]);
        that.render();
      };

      that.getTestLink(5).onclick = function (e) {
        e.preventDefault();
        that.addNodes([50,12,34]);
        that.render();
      };

      that.getTestLink(6).onclick = function (e) {
        e.preventDefault();
        that.addNodes([12,34,50]);
        that.render();
      };

      that.getTestLink(7).onclick = function (e) {
        e.preventDefault();
        that.addNodes([50, 44, 77, 33, 66, 33]);
        that.render();
      };

      that.getTestLink(8).onclick = function (e) {
        e.preventDefault();
        that.addNodes([1,2,3]);
        that.render();
      };

      that.getTestLink(9).onclick = function (e) {
        e.preventDefault();
        that.addNodes([1,2,3,4,5,6,7,8]);
        that.render();
      };

    that.getTestLink(10).onclick = function (e) {
        e.preventDefault();
        that.addNodes([1,2,3,4,5,6,7,8,9,10,11]);
        that.render();
    };

    that.getTestLink(11).onclick = function (e) {
        e.preventDefault();
        that.addNodes([51,52,53,54,55,56,57,58,59,60,61,49,1,46]);
        that.render();
    };

    that.getTestLink(12).onclick = function (e) {
        e.preventDefault();
        that.addNodes([51,52,53,54,55,56,57,58,59,60,61,49,1,46,33]);
        that.render();
    };

    that.getTestLink(13).onclick = function (e) {
        e.preventDefault();
        that.addNodes([70,100,60,120,20,99,64,200,19,82,59,63,65,10]);
        that.render();       
    };

    that.getTestLink(14).onclick = function (e) {
        e.preventDefault();
        that.addNodes([30,20,40,35,50]);
        that.render();       
    };

    that.getTestLink(15).onclick = function (e) {
        e.preventDefault();
        that.addNodes([30,20,40,35]);
        that.render();       
    };

    that.getTestLink(16).onclick = function (e) {
        e.preventDefault();
        that.addNodes([10,9,8,7,6,5,4,3,2,1]);
        that.render();       
    };

    that.getTestLink(17).onclick = function (e) {
        e.preventDefault();
        that.addNodes([9,8,7,6,5,4]);
        that.render();       
    };

    that.getTestLink(18).onclick = function (e) {
        e.preventDefault();
        that.addNodes([45,19,68,10,39,60,80,8,15,44,50,67,69,96,46,61,93,100]);
        that.render();       
    };

  },

  tree : null,

  init : function () {
    
    this.testtree = null;
    /*
    this.testtree = rbtree({
      name : 'testtree',
      range : 50
    });
     */
    this.connect();
    this.render();
  }
};

