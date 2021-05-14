import { ReactInstance, Module, Surface } from 'react-360-web';

function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    nativeModules: [
      new surfaceModule()
    ],
    ...options,
  });

  introPanel = new Surface(
    1000,
    600,
    Surface.SurfaceShape.Cylinder
  );



  introRoot = r360.renderToSurface(
    r360.createRoot('hello_vr', {}),
    introPanel
  );

  PhotoInfoFirst = new Surface(
    300,
    300,
    Surface.SurfaceShape.Flat
  );

  PhotoInfoFirst.setAngle(
    0.2,
    0
  )

  PhotoInfoSecond = new Surface(
    300,
    300,
    Surface.SurfaceShape.Flat
  );

  PhotoInfoSecond.setAngle(
    -Math.PI / 2,
    0
  )

  PhotoInfoTree = new Surface(
    300,
    300,
    Surface.SurfaceShape.Flat
  );

  PhotoInfoTree.setAngle(
    2,
    0
  )

  PhotoInfoFo = new Surface(
    300,
    300,
    Surface.SurfaceShape.Flat
  );

  PhotoInfoFo.setAngle(
    3.6,
    0
  )

  r360.compositor.setBackground(r360.getAssetURL('21.jpg'));
}

class surfaceModule extends Module {
  constructor() {
    super('surfaceModule');
  }

  resizeSurface(width, hight, id) {
    switch (id) {
      case id == 1:
        PhotoInfoFirst.resize(width, hight);
        break;
      case id == 2:
        PhotoInfoSecond.resize(width, hight);
        break;
      case id == 3:
        PhotoInfoTree.resize(width, hight);
        break;
      case id == 4:
        PhotoInfoFo.resize(width, hight);
        break;

    }
  }

  start() {
    r360.renderToSurface(
      r360.createRoot('InfoPanel', { id: 1, text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' }),
      PhotoInfoFirst
    );
    r360.renderToSurface(
      r360.createRoot('InfoPanel', { id: 2, text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' }),
      PhotoInfoSecond
    );
    r360.renderToSurface(
      r360.createRoot('InfoPanel', { id: 3, text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' }),
      PhotoInfoTree
    );
    r360.renderToSurface(
      r360.createRoot('InfoPanel', { id: 4, text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor' }),
      PhotoInfoFo
    );

    r360.detachRoot(introRoot)
  }
}

window.React360 = { init };
