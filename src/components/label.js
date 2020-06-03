require('../scripts/utils.js')

AFRAME.registerComponent('gui-label', {
  schema: {
    text: {type: 'string', default: 'label text'},
    align: {type: 'string', default: 'center'},
    fontWidth: {type: 'number'},
    fontSize: {type: 'string', default: '150px'},
    fontColor: {type: 'string', default: key_grey_dark},
    backgroundColor: {type: 'string', default: key_offwhite},
    opacity: { type: 'number', default: 1.0 },
  },
  init: function() {
    var data = this.data;
    var el = this.el;
    var guiItem = el.getAttribute("gui-item");
    var multiplier = 500;
    var canvasWidth = Utils.nearestPow2(guiItem.width*multiplier);
    var canvasHeight = Utils.nearestPow2(guiItem.height*multiplier);

    var canvasContainer = document.createElement('div');
    this.canvasContainer = canvasContainer;
    canvasContainer.setAttribute('class', 'visuallyhidden');
    canvasContainer.id = getUniqueId('canvasContainer');
    document.body.appendChild(canvasContainer);


    var canvas = document.createElement("canvas");
    this.canvas = canvas;
    canvas.className = "visuallyhidden";
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.id = getUniqueId('canvas');
    canvasContainer.appendChild(canvas);

    var ctx = this.ctx = canvas.getContext('2d');

    el.setAttribute('geometry', `primitive: plane; height: ${guiItem.height}; width: ${guiItem.width};`);
    el.setAttribute('material', `shader: flat; side:front; color:${data.backgroundColor}; transparent: true; opacity: ${data.opacity}; alphaTest: 0.5;`);

    this.oldText = data.text;

    if (this.textEntity) {
      el.removeChild(this.textEntity);
    }

    var textEntity = document.createElement("a-entity");
    this.textEntity = textEntity;
    textEntity.setAttribute('geometry', `primitive: plane; width: ${guiItem.width/1.05}; height: ${guiItem.height/1.05};`);
    textEntity.setAttribute('material', `shader: flat; src: #${canvas.id}; transparent: true; opacity: 1.0; alphaTest: 0.5; side:front;`);
    textEntity.setAttribute('text', `value: ${data.text}; color: ${data.fontColor}; align: ${data.align}; width: ${data.fontWidth}`);
    el.appendChild(textEntity);

  },
});

AFRAME.registerPrimitive( 'a-gui-label', {
  defaultComponents: {
    'gui-item': { type: 'label' },
    'gui-label': { }
  },
  mappings: {
    'width': 'gui-item.width',
    'height': 'gui-item.height',
    'margin': 'gui-item.margin',
    'on': 'gui-button.on',
    'align': 'gui-label.align',
    'value': 'gui-label.text',
    'font-width': 'gui-label.fontWidth',
    'font-color': 'gui-label.fontColor',
    'background-color': 'gui-label.backgroundColor',
    'opacity': 'gui-label.opacity',
  }
 });
