// Filename: rbdtree.spec.js  
// Timestamp: 2014.09.14-20:39:06 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)  
// Requires: 

var rbtree = require('../rbdtree'),
    compareobj = require('compareobj');


function printfailtree (tree) {
  console.log(JSON.stringify(tree, null, 4));
}

describe("rbtree.rotateRight", function () {
  it("should rotate a tree right", function () {

    var rotated = rbtree.rotateRight({
      val : 'a',
      left : {
        val : 'b',
        left : {
          val : 'c'
        },
        right : {
          val : 'd'
        }
      },
      right : {
        val : 'e'
      }
    });

    var result = {
      val : 'b',
      left : {
        val : 'c'
      },
      right : {
        val : 'a',
        left : {
          val : 'd'
        },
        right : {
          val : 'e'
        }
      }
    };

    expect(compareobj.isSameMembersDefinedSame(rotated, result)).toBe(true);

  });  
});


describe("rbtree.rotateLeft", function () {
  it("should rotate a tree left", function () {

    var rotated = rbtree.rotateLeft({
      val : 'a',
      left : {
        val : 'c'
      },
      right : {
        val : 'b',
        left : {
          val : 'd'
        },
        right : {
          val : 'e'
        }
      }
    });

    var result = {
      val : 'b',
      right : {
        val : 'e'
      },
      left : {
        val : 'a',
        left : {
          val : 'c'
        },
        right : {
          val : 'd'
        }
      }
    };

    expect(compareobj.isSameMembersDefinedSame(rotated, result)).toBe(true);

  });  
});


describe("rbtree.getPNodeAsChildAppended", function () {
  it("should append a child node", function () {

    var appended = rbtree.getPNodeAsChildAppended({
      val : 50,
      left : {},
      right : {}
    }, {
      val : 80,
      right : {},
      left : {}
    });

    var result = {
      val : 50,
      right : {},
      left : {
        val : 80,
        right : {},
        left : {}        
      }
    };
  
    expect(compareobj.isSameMembersDefinedSame(appended, result)).toBe(true);
    
  });
});


describe("rbtree.getPNodeDirection", function () {
  it("should assign position left to greater values", function () {
    
    expect(rbtree.getPNodeDirection({
      val : 50
    },{
      val : 80
    })).toBe( 'right' );
  });
});

describe("rbtree.getPNodeAsChildBlack", function () {
  it("should return a same pnode with black node child", function () {

    var pnode = rbtree.getPNodeAsChildBlack({
      val : 50,
      right : { 
        val : 90,
        rb : 1
      }
    },{
      val : 90
    });

    var result = {
      val : 50,
      right : { 
        val : 90,
        rb : 0
      }
    };

    expect(compareobj.isSameMembersDefinedSame(result, pnode)).toBe(true);

  });
});


describe("rbtree.getTreeMaxNode", function () {
  it("[19,10,39,8,15] should return 39 from node 19", function () {
    var tree = rbtree.addNodeNumArr(
      null, [19,10,39,8,15]
    );

    var result = rbtree.getTreeMaxNode(tree);

    expect( result.val ).toBe( 39 );
  });

});


describe("rbtree.getNodeAsInOrderPredecessor", function () {
  it("[19,10,39,8,15] should return 15 from node 19", function () {
    var tree = rbtree.addNodeNumArr(
      null, [19,10,39,8,15]
    );

    var result = rbtree.getNodeAsInOrderPredecessor(tree);

    expect( result.val ).toBe( 15 );
  });

  it("[50,34,60,12] should return 34 from node 50", function () {
    var tree = rbtree.addNodeNumArr(
      null, [50,34,60,12]
    );

    var result = rbtree.getNodeAsInOrderPredecessor(tree);

    expect( result.val ).toBe( 34 );
  });

});



describe("rbtree.addNode", function () {

  it("[1,2,3,4]", function () {

    var tree4_start = {
      type : 1,
      val : 2,
      rb : 0,
      right : {
        right : { type : 0 },
        left : { type : 0 },
        type : 1,
        val : 3,
        rb : 1
      },
      left : {
        right : { type : 0 },
        left : { type : 0 },
        type : 1,
        val : 1,
        rb : 1
      }
    };

    var tree4_end = {
      type : 1,
      val : 2,
      rb : 0,
      right : {
        type : 1,
        val : 3,
        rb : 0,
        right : {
          type : 1,
          val : 4,
          rb : 1
        }
      },
      left : {
        type : 1,
        val : 1,
        rb : 0
      }
    };

    var tree4 = rbtree.addNodeNum(tree4_start, 4);

    expect(compareobj.isSameMembersDefinedSame(tree4_end, tree4)).toBe(true);
  });    



  it("[1,2,3,4,5,6,7,8]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [1,2,3,4,5,6,7,8]
    );

    var tree_end = {
      val : 4,
      rb : 0,
      right : {
        val : 6,
        rb : 1,
        right : {
          val : 7,
          rb : 0,
          right : {
            val : 8,
            rb : 1
          }
        },
        left : {
          val : 5,
          rb : 0
        }
      },
      left : {
        val : 2,
        rb : 1,
        right : {
          val : 3,
          rb : 0
        },
        left : {
          val : 1,
          rb : 0
        }
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });    


  it("[1,2,3,4,5,6,7,8,9]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [1,2,3,4,5,6,7,8,9]
    );

    var tree_end = {
      val : 4,
      rb : 0,
      right : {
        val : 6,
        rb : 1,
        right : {
          val : 8,
          rb : 0,
          right : {
            val : 9,
            rb : 1
          },
          left : {
            val : 7,
            rb : 1
          }
        },
        left : {
          val : 5,
          rb : 0
        }
      },
      left : {
        val : 2,
        rb : 1,
        right : {
          val : 3,
          rb : 0
        },
        left : {
          val : 1,
          rb : 0
        }
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });    



  it("[1,2,3,4,5,6,7,8,9,10]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [1,2,3,4,5,6,7,8,9,10]
    );

    var tree_end = {
      val : 4,
      rb : 0,
      right : {
        val : 6,
        rb : 0, // rb is 2
        right : {
          val : 8,
          rb : 1,
          right : {
            val : 9,
            rb : 0,
            right : {
              val : 10,
              rb : 1
            }
          },
          left : {
            val : 7,
            rb : 0
          }
        },
        left : {
          val : 5,
          rb : 0
        }
      },
      left : {
        val : 2,
        rb : 0,
        right : {
          val : 3,
          rb : 0
        },
        left : {
          val : 1,
          rb : 0
        }
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });    



  it("[1,2,3,4,5,6,7,8,9,10,11]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [1,2,3,4,5,6,7,8,9,10,11]
    );

    var tree_end = {
      val : 4,
      rb : 0,
      right : {
        val : 6,
        rb : 0,
        left : {
          val : 5,
          rb : 0
        },
        right : {
          val : 8,
          rb : 1,
          left : {
            val : 7,
            rb : 0
          },
          right : {
            val : 10,
            rb : 0,
            left : {
              val : 9,
              rb : 1
            },
            right : {
              val : 11,
              rb : 1
            }
          }
        }
      },
      left : {
        val : 2,
        rb : 0,
        right : {
          val : 3,
          rb : 0
        },
        left : {
          val : 1,
          rb : 0
        }
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });    



  it("[51,52,53,54,55,56,57,58,59,60,61,49,1,46]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [51,52,53,54,55,56,57,58,59,60,61,49,1,46]
    );

    var tree_end = {  
      type : 1,
      val : 54,
      rb : 0,
      right : {  
        type : 1,
        val : 56,
        rb : 0,
        right : {  
          type : 1,
          val : 58,
          rb : 1,
          right : {  
            type : 1,
            val : 60,
            rb : 0,
            right : {  
              type : 1,
              val : 61,
              rb : 1
            },
            left : {  
              type : 1,
              val : 59,
              rb : 1,
              right : {  
                rb : 0,
                type : 0
              }
            }
          },
          left : {  
            type : 1,
            val : 57,
            rb : 0,
            right : {  
              rb : 0,
              type : 0
            }
          }
        },
        left : {  
          type : 1,
          val : 55,
          rb : 0,
          right : {  
            rb : 0,
            type : 0
          }
        }
      },
      left : {  
        type : 1,
        val : 52,
        rb : 0,
        right : {  
          type : 1,
          val : 53,
          rb : 0,
          right : {  
            rb : 0,
            type : 0
          }
        },
        left : {  
          type : 1,
          val : 49,
          rb : 1,
          left : {  
            type : 1,
            val : 1,
            rb : 0,
            right : {  
              type : 1,
              val : 46,
              rb : 1
            }
          },
          right : {  
            type : 1,
            val : 51,
            rb : 0,
            right : {  
              rb : 0,
              type : 0
            },
            left : {  
              rb : 0,
              type : 0
            }
          }
        }
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });    


  it("[51,52,53,54,55,56,57,58,59,60,61,49,1,46,33,48]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [51,52,53,54,55,56,57,58,59,60,61,49,1,46,33,48]
    );

    var tree_end = {  
      type : 1,
      val : 54,
      rb : 0,
      right : {  
        type : 1,
        val : 56,
        rb : 0,
        right : {  
          type : 1,
          val : 58,
          rb : 1,
          right : {  
            type : 1,
            val : 60,
            rb : 0,
            right : {  
              type : 1,
              val : 61,
              rb : 1
            },
            left : {  
              type : 1,
              val : 59,
              rb : 1,
              right : {  
                rb : 0,
                type : 0
              }
            }
          },
          left : {  
            type : 1,
            val : 57,
            rb : 0,
            right : {  
              rb : 0,
              type : 0
            }
          }
        },
        left : {  
          type : 1,
          val : 55,
          rb : 0,
          right : {  
            rb : 0,
            type : 0
          }
        }
      },
      left : {  
        type : 1,
        val : 49,
        rb : 0,
        left : {  
          type : 1,
          val : 33,
          rb : 1,
          right : {  
            type : 1,
            val : 46,
            rb : 0,
            left : {  
              rb : 0,
              type : 0
            },
            right : {  
              type : 1,
              val : 48,
              rb : 1
            }
          },
          left : {  
            type : 1,
            val : 1,
            rb : 0,
            right : {  
              rb : 0,
              type : 0
            }
          }
        },
        right : {  
          type : 1,
          val : 52,
          rb : 1,
          right : {  
            type : 1,
            val : 53,
            rb : 0,
            right : {  
              rb : 0,
              type : 0
            }
          },
          left : {  
            type : 1,
            val : 51,
            rb : 0,
            right : {  
              rb : 0,
              type : 0
            },
            left : {  
              rb : 0,
              type : 0
            }
          }
        }
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });    



  it("[70,100,60,120,20,99,64,200,19,82,59,63,65,10,27]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [70,100,60,120,20,99,64,200,19,82,59,63,65,10,27]
    );

    var tree_end = { 
      type : 1,
      val : 70,
      rb : 0,
      right : {  
        type : 1,
        val : 100,
        rb : 0,
        right : {  
          type : 1,
          val : 120,
          rb : 0,
          right : {  
            type : 1,
            val : 200,
            rb : 1
          }
        },
        left : {  
          type : 1,
          val : 99,
          rb : 0,
          left : {  
            type : 1,
            val : 82,
            rb : 1
          }
        }
      },
      left : {  
        type : 1,
        val : 60,
        rb : 0,
        left : {  
          type : 1,
          val : 20,
          rb : 1,
          left : {  
            type : 1,
            val : 19,
            rb : 0,
            left : {  
              type : 1,
              val : 10,
              rb : 1
            }
          },
          right : {  
            type : 1,
            val : 59,
            rb : 0,
            left : {  
              type : 1,
              val : 27,
              rb : 1
            }
          }
        },
        right : {  
          type : 1,
          val : 64,
          rb : 0,
          left : {  
            type : 1,
            val : 63,
            rb : 1
          },
          right : {  
            type : 1,
            val : 65,
            rb : 1
          }
        }
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });    


  it("[1000,92,1020,93,1982,94,12,95,2,96,5,97,19,433,44,98,25,99,24,600,62,601,33,602,28,603,30,49,61,604,100,605]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [1000,92,1020,93,1982,94,12,95,2,96,5,97,19,433,44,98,25,99,24,600,62,601,33,602,28,603,30,49,61,604,100,605]
    );

    var tree_end = { 
      type : 1,
      val : 93,
      rb : 0,
      right : {  
        type : 1,
        val : 97,
        rb : 0,
        right : {  
          type : 1,
          val : 600,
          rb : 1,
          right : {  
            type : 1,
            val : 1000,
            rb : 0,
            left : {  
              type : 1,
              val : 602,
              rb : 1,
              right : {  
                type : 1,
                val : 604,
                rb : 0,
                right : {  
                  type : 1,
                  val : 605,
                  rb : 1
                },
                left : {  
                  type : 1,
                  val : 603,
                  rb : 1,
                  right : {  
                    rb : 0,
                    type : 0
                  }
                }
              },
              left : {  
                type : 1,
                val : 601,
                rb : 0,
                right : {  
                  rb : 0,
                  type : 0
                }
              }
            },
            right : {  
              type : 1,
              val : 1020,
              rb : 0,
              right : {  
                type : 1,
                val : 1982,
                rb : 1
              }
            }
          },
          left : {  
            type : 1,
            val : 99,
            rb : 0,
            left : {  
              type : 1,
              val : 98,
              rb : 0,
              right : {  
                rb : 0,
                type : 0
              }
            },
            right : {  
              type : 1,
              val : 433,
              rb : 0,
              left : {  
                type : 1,
                val : 100,
                rb : 1
              },
              right : {  
                rb : 0,
                type : 0
              }
            }
          }
        },
        left : {  
          type : 1,
          val : 95,
          rb : 0,
          right : {  
            type : 1,
            val : 96,
            rb : 0,
            right : {  
              rb : 0,
              type : 0
            }
          },
          left : {  
            type : 1,
            val : 94,
            rb : 0,
            right : {  
              rb : 0,
              type : 0
            }
          }
        }
      },
      left : {  
        type : 1,
        val : 24,
        rb : 0,
        right : {  
          type : 1,
          val : 44,
          rb : 0,
          left : {  
            type : 1,
            val : 28,
            rb : 1,
            right : {  
              type : 1,
              val : 33,
              rb : 0,
              left : {  
                type : 1,
                val : 30,
                rb : 1
              }
            },
            left : {  
              type : 1,
              val : 25,
              rb : 0,
              left : {  
                rb : 0,
                type : 0
              },
              right : {  
                rb : 0,
                type : 0
              }
            }
          },
          right : {  
            type : 1,
            val : 62,
            rb : 1,
            left : {  
              type : 1,
              val : 49,
              rb : 0,
              right : {  
                type : 1,
                val : 61,
                rb : 1
              }
            },
            right : {  
              type : 1,
              val : 92,
              rb : 0,
              right : {  
                rb : 0,
                type : 0
              },
              left : {  
                rb : 0,
                type : 0
              }
            }
          }
        },
        left : {  
          type : 1,
          val : 12,
          rb : 0,
          left : {  
            type : 1,
            val : 2,
            rb : 0,
            right : {  
              type : 1,
              val : 5,
              rb : 1
            }
          },
          right : {  
            type : 1,
            val : 19,
            rb : 0,
            right : {  
              rb : 0,
              type : 0
            }
          }
        }
      }

    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });    


  it("[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33]
    );

    var tree_end = { 
      type : 1,
      val : 8,
      rb : 0,
      right : {  
        type : 1,
        val : 16,
        rb : 1,
        right : {  
          type : 1,
          val : 20,
          rb : 0,
          right : {  
            type : 1,
            val : 24,
            rb : 1,
            right : {  
              type : 1,
              val : 28,
              rb : 0,
              right : {  
                type : 1,
                val : 30,
                rb : 1,
                right : {  
                  type : 1,
                  val : 32,
                  rb : 0,
                  right : {  
                    type : 1,
                    val : 33,
                    rb : 1
                  },
                  left : {  
                    type : 1,
                    val : 31,
                    rb : 1,
                    right : {  
                      rb : 0,
                      type : 0
                    }
                  }
                },
                left : {  
                  type : 1,
                  val : 29,
                  rb : 0,
                  right : {  
                    rb : 0,
                    type : 0
                  }
                }
              },
              left : {  
                type : 1,
                val : 26,
                rb : 1,
                right : {  
                  type : 1,
                  val : 27,
                  rb : 0,
                  right : {  
                    rb : 0,
                    type : 0
                  }
                },
                left : {  
                  type : 1,
                  val : 25,
                  rb : 0,
                  right : {  
                    rb : 0,
                    type : 0
                  }
                }
              }
            },
            left : {  
              type : 1,
              val : 22,
              rb : 0,
              right : {  
                type : 1,
                val : 23,
                rb : 0,
                right : {  
                  rb : 0,
                  type : 0
                }
              },
              left : {  
                type : 1,
                val : 21,
                rb : 0,
                right : {  
                  rb : 0,
                  type : 0
                }
              }
            }
          },
          left : {  
            type : 1,
            val : 18,
            rb : 0,
            right : {  
              type : 1,
              val : 19,
              rb : 0,
              right : {  
                rb : 0,
                type : 0
              }
            },
            left : {  
              type : 1,
              val : 17,
              rb : 0,
              right : {  
                rb : 0,
                type : 0
              }
            }
          }
        },
        left : {  
          type : 1,
          val : 12,
          rb : 0,
          right : {  
            type : 1,
            val : 14,
            rb : 0,
            right : {  
              type : 1,
              val : 15,
              rb : 0,
              right : {  
                rb : 0,
                type : 0
              }
            },
            left : {  
              type : 1,
              val : 13,
              rb : 0,
              right : {  
                rb : 0,
                type : 0
              }
            }
          },
          left : {  
            type : 1,
            val : 10,
            rb : 0,
            right : {  
              type : 1,
              val : 11,
              rb : 0,
              right : {  
                rb : 0,
                type : 0
              }
            },
            left : {  
              type : 1,
              val : 9,
              rb : 0,
              right : {  
                rb : 0,
                type : 0
              }
            }
          }
        }
      },
      left : {  
        type : 1,
        val : 4,
        rb : 0,
        right : {  
          type : 1,
          val : 6,
          rb : 0,
          right : {  
            type : 1,
            val : 7,
            rb : 0,
            right : {  
              rb : 0,
              type : 0
            }
          },
          left : {  
            type : 1,
            val : 5,
            rb : 0,
            right : {  
              rb : 0,
              type : 0
            }
          }
        },
        left : {  
          type : 1,
          val : 2,
          rb : 0,
          right : {  
            type : 1,
            val : 3,
            rb : 0,
            right : {  
              rb : 0,
              type : 0
            }
          },
          left : {  
            type : 1,
            val : 1,
            rb : 0,
            right : {  
              rb : 0,
              type : 0
            }
          }
        }
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });
});



describe("rbtree.getTreeDepthMax", function () {

  it("should return `1` for a tree of depth `1`", function () {
    var treedepth = rbtree.getTreeDepthMax({
      val : 4,
      rb : 0,
      type : rbtree.leaf,
      left : rbtree.nil,
      right : rbtree.nil
    });

    expect(treedepth).toBe(1);
  });


  it("should return `3` for a tree of depth `3`", function () {
    var treedepth = rbtree.getTreeDepthMax({
      val : 4,
      rb : 0,
      type : rbtree.leaf,
      right : {
        val : 6,
        rb : 0, // rb is 2
        type : rbtree.leaf,
        left : rbtree.nil,
        right : rbtree.nil
      },
      left : {
        val : 2,
        rb : 0,
        type : rbtree.leaf,
        right : {
          val : 3,
          rb : 0,
          type : rbtree.leaf,
          left : rbtree.nil,
          right : rbtree.nil
        },
        left : {
          val : 1,
          rb : 0,
          type : rbtree.leaf,
          left : rbtree.nil,
          right : rbtree.nil
        }
      }
    });

    expect(treedepth).toBe(3);
  });

  it("should return `5` for a tree of depth `5`", function () {
    var treedepth = rbtree.getTreeDepthMax({
      val : 4,
      rb : 0,
      type : rbtree.leaf,
      right : {
        val : 6,
        rb : 0, // rb is 2
        type : rbtree.leaf,
        right : {
          val : 8,
          rb : 1,
          type : rbtree.leaf,
          right : {
            val : 9,
            rb : 0,
            type : rbtree.leaf,
            right : {
              val : 10,
              rb : 1,
              type : rbtree.leaf,
              left : rbtree.nil,
              right : rbtree.nil
            },
            left : rbtree.nil
          },
          left : {
            val : 7,
            rb : 0,
            type : rbtree.leaf,
            left : rbtree.nil,
            right : rbtree.nil
          }
        },
        left : {
          val : 5,
          rb : 0,
          type : rbtree.leaf,
          left : rbtree.nil,
          right : rbtree.nil
        }
      },
      left : {
        val : 2,
        rb : 0,
        type : rbtree.leaf,
        right : {
          val : 3,
          rb : 0,
          type : rbtree.leaf,
          left : rbtree.nil,
          right : rbtree.nil
        },
        left : {
          val : 1,
          rb : 0,
          type : rbtree.leaf,
          left : rbtree.nil,
          right : rbtree.nil
        }
      }
    });

    expect(treedepth).toBe(5);
  });

});


describe("rbtree.deleteNode", function () {

  it("should delete `3` from tree [1,2,3]", function () {
    var tree = rbtree.addNodeNumArr(
      null, [1,2,3]
    );

    tree = rbtree.deleteNode(tree, {
      val : 3
    });

    var tree_end = {
      val : 2,
      rb : rbtree.black,
      type : rbtree.leaf,
      right : {
        rb : rbtree.black,
        type : rbtree.sentinel
      },
      left : {
        val : 1,
        rb : rbtree.red,
        type : rbtree.leaf
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });

  // if M is red node, replace with its child C
  // this scenario can only occur when M has two children
  it("should delete `3` from tree [1,2,3]", function () {
    var tree = rbtree.addNodeNumArr(
      null, [1,2,3]
    );

    tree = rbtree.deleteNode(tree, {
      val : 3
    });

    var tree_end = {
      val : 2,
      rb : rbtree.black,
      type : rbtree.leaf,
      right : {
        rb : rbtree.black,
        type : rbtree.sentinel
      },
      left : {
        val : 1,
        rb : rbtree.red,
        type : rbtree.leaf
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });

  // delete case '1', deleted node has no parent node
  it("should delete `2` from tree [1,2,3]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [1,2,3]
    );

    tree = rbtree.deleteNode(tree, {
      val : 2
    });

    var tree_end = {
      val : 1,
      rb : rbtree.black,
      type : rbtree.leaf,
      right : {
        val : 3,
        rb : rbtree.red,
        type : rbtree.leaf
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });


  // if M is black and C is red
  // remove the black node. repaint C black.
  it("should delete `3` from tree [1,2,3,4]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [1,2,3,4]
    );

    tree = rbtree.deleteNode(tree, {
      val : 3
    });

    var tree_end = {
      val : 2,
      rb : rbtree.black,
      type : rbtree.leaf,
      right : {
        val : 4,
        rb : rbtree.black,
        type : rbtree.leaf
      },
      left : {
        val : 1,
        rb : rbtree.black,
        type : rbtree.leaf
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });
  
  // a.iii, case6

  it("should delete `1` from tree [1,2,3,4]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [1,2,3,4]
    );

    tree = rbtree.deleteNode(tree, {
      val : 1
    });

    var tree_end = {
      val : 3,
      rb : rbtree.black,
      type : rbtree.leaf,
      right : {
        val : 4,
        rb : rbtree.black,
        type : rbtree.leaf
      },
      left : {
        val : 2,
        rb : rbtree.black,
        type : rbtree.leaf
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });


  // a.i, case6
  it("should delete `4` from tree [4,3,2,1]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [4,3,2,1]
    );

    tree = rbtree.deleteNode(tree, {
      val : 4
    });

    var tree_end = {
      val : 2,
      rb : rbtree.black,
      type : rbtree.leaf,
      right : {
        val : 3,
        rb : rbtree.black,
        type : rbtree.leaf
      },
      left : {
        val : 1,
        rb : rbtree.black,
        type : rbtree.leaf
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });

  // a.iii
  it("should delete `20` from tree [30,20,40,35,50]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [30,20,40,35,50]
    );

    tree = rbtree.deleteNode(tree, {
      val : 20
    });

    var tree_end = {
      val : 40,
      rb : rbtree.black,
      type : rbtree.leaf,
      left : {
        val : 30,
        rb : rbtree.black,
        type : rbtree.leaf,
        right : {
          val : 35,
          rb : rbtree.red,
          type : rbtree.leaf
        }
      },
      right : {
        val : 50,
        rb : rbtree.black,
        type : rbtree.leaf
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });


  // a.iv
  it("should delete `20` from tree [30,20,40,35]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [30,20,40,35]
    );

    tree = rbtree.deleteNode(tree, {
      val : 20
    });

    var tree_end = {
      val : 35,
      rb : rbtree.black,
      type : rbtree.leaf,
      right : {
        val : 40,
        rb : rbtree.black,
        type : rbtree.leaf
      },
      left : {
        val : 30,
        rb : rbtree.black,
        type : rbtree.leaf
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });

  // Case 3: P, S, and S's
  it("should delete `2` from tree [2,3,4,5,6,7,1]", function () {
    var tree = rbtree.addNodeNumArr(
      null, [2,3,4,5,6,7,1]
    );

    tree = rbtree.deleteNode(tree, {
      val : 1
    });

    var tree_end = {
      val : 3,
      rb : rbtree.black,
      type : rbtree.leaf,
      right : {
        val : 5,
        rb : rbtree.red,
        type : rbtree.leaf,
        right : {
          val : 6,
          rb : rbtree.black,
          type : rbtree.leaf,
          right : {
            val : 7,
            rb : rbtree.red,
            type : rbtree.leaf
          }
        },
        left : {
          val : 4,
          rb : rbtree.black,
          type : rbtree.leaf
        }
      },
      left : {
        val : 2,
        rb : rbtree.black,
        type : rbtree.leaf
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });


  it("should delete `9` from tree [9,8,7,6,5,4]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [9,8,7,6,5,4]
    );

    tree = rbtree.deleteNode(tree, {
      val : 9
    });

    var tree_end = {
      val : 6,
      rb : rbtree.black,
      type : rbtree.leaf,
      right : {
        val : 8,
        rb : rbtree.black,
        type : rbtree.leaf,
        left : {
          val : 7,
          rb : rbtree.red,
          type : rbtree.leaf
        }
      },
      left : {
        val : 5,
        rb : rbtree.black,
        type : rbtree.leaf,
        left : {
          val : 4,
          rb : rbtree.red,
          type : rbtree.leaf
        }
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });


  it("should delete `19,8,60` from tree [45,19,68,10,39,60,80,8,15,44,50,67,69,96,46,61,93,100]", function () {

    var tree = rbtree.addNodeNumArr(
      null, [45,19,68,10,39,60,80,8,15,44,50,67,69,96,46,61,93,100]
    );

    tree = rbtree.deleteNode(tree, {
      val : 19
    });

    tree = rbtree.deleteNode(tree, {
      val : 8
    });

    tree = rbtree.deleteNode(tree, {
      val : 60
    });

    var tree_end = {  
      val:45,
      type:1,
      rb:0,
      left:{  
        val:15,
        rb:0,
        type:1,
        left:{  
          val:10,
          type:1,
          rb:0
        },
        right:{  
          val:39,
          type:1,
          rb:0,
          right:{  
            val:44,
            type:1,
            rb:1
          }
        }
      },
      right:{  
        val:68,
        type:1,
        rb:0,
        left:{  
          val:50,
          rb:1,
          type:1,
          left:{  
            val:46,
            type:1,
            rb:0
          },
          right:{  
            val:67,
            type:1,
            rb:0,
            left:{  
              val:61,
              type:1,
              rb:1
            }
          }
        },
        right:{  
          val:80,
          type:1,
          rb:1,
          left:{  
            val:69,
            type:1,
            rb:0
          },
          right:{  
            val:96,
            type:1,
            rb:0,
            left:{  
              val:93,
              type:1,
              rb:1
            },
            right:{  
              val:100,
              type:1,
              rb:1
            }
          }
        }
      }
    };

    expect(compareobj.isSameMembersDefinedSame(tree_end, tree)).toBe(true);
  });

});
  

