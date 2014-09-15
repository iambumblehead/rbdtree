rbdtree
=======
**(c)[Bumblehead][0] 2014** [MIT-license](#license)

### OVERVIEW:

rbdtree is a [Red black tree][1] implementation. Red black trees are self-balancing binary search trees. A good container for a variety of data.

rbdtree is psuedo-functional. All methods operate on arguments to return values. Local states defined on 'this' are not mutated. rbdtree _does mutate_ parameters for improved speed. More functional solutions would copy/slice objects and arrays modified.

The 'd' in rbdtree is for 'deferred'. Descriptions of red-black nodes usually observe 'red' and 'black' type nodes which possess reference to parent and grandparent nodes. Because rbdtree is functional these references are not stored. This facilitates the use of a third 'deferred' type in order to perform rotations that would require those references.

The tree is unit tested and does have a delete method (many red black tree implementations are incomplete). This implementation would be easily translated to another language like Erlang, though there are better Erlang trees of this sort.


[0]: http://www.bumblehead.com                            "bumblehead"
[1]: http://en.wikipedia.org/wiki/Red-black_tree      "red black tree"


---------------------------------------------------------
#### <a id="install"></a>Install:

eventpublish may be downloaded directly or installed through `npm`.

 * **Direct Download**
 
 ```bash  
 $ git clone https://github.com/iambumblehead/eventpublish.git
 ```

---------------------------------------------------------
#### <a id="test"></a>Test:

 to run tests, use `npm test` from a shell.

 ```bash
 $ npm test
 ```

---------------------------------------------------------
#### <a id="license">License:

 ![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) 2013 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
