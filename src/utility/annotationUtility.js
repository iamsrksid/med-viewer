import { fabric } from "openseadragon-fabricjs-overlay";
import md5 from "md5";
import { objectKeys } from "@chakra-ui/utils";

// create annotaion message for the feed
export const createAnnotationMessage = ({
  shape,
  viewer,
  user,
  annotation,
}) => {
  if (!viewer || !shape) return null;

  const message = {
    username: user ? `${user.firstName} ${user.lastName}` : "",
    object: shape,
    image: null,
  };

  // if annotation data is available
  // else create a new one
  if (annotation) {
    const {
      hash,
      text,
      zoomLevel,
      points,
      timeStamp,
      area,
      perimeter,
      cnetroid,
      endPoints,
      isAnalysed,
    } = annotation;

    message.object.set({
      hash,
      text,
      zoomLevel,
      points,
      timeStamp,
      area,
      perimeter,
      cnetroid,
      endPoints,
      isAnalysed,
    });
  } else {
    const timeStamp = Date.now();
    const hash = md5(shape + timeStamp);

    // message.image = await getCanvasImage(viewerId);
    message.object.set({
      timeStamp,
      hash,
      zoomLevel: viewer.viewport.getZoom(),
      text: "",
    });
  }

  return message;
};

// create annotation from the annotation data
export const createAnnotation = (annotation) => {
  let shape;
  switch (annotation.type) {
    case "ellipse":
      shape = new fabric.Ellipse({
        left: annotation.left,
        top: annotation.top,
        width: annotation.width,
        height: annotation.height,
        color: annotation.color,
        fill: annotation.fill,
        stroke: annotation.stroke,
        strokeWidth: annotation.strokeWidth,
        strokeUniform: annotation.strokeUniform,
        rx: annotation.rx,
        ry: annotation.ry,
        angle: annotation.angle,
      });
      break;

    case "rect":
      shape = new fabric.Rect({
        left: annotation.left,
        top: annotation.top,
        width: annotation.width,
        height: annotation.height,
        color: annotation.color,
        fill: annotation.fill,
        stroke: annotation.stroke,
        strokeWidth: annotation.strokeWidth,
        strokeUniform: annotation.strokeUniform,
      });
      break;

    case "polygon":
      shape = new fabric.Polygon(annotation.points, {
        stroke: annotation.stroke,
        strokeWidth: annotation.strokeWidth,
        fill: annotation.fill,
        strokeUniform: annotation.strokeUniform,
      });
      break;

    case "path":
      shape = new fabric.Path(annotation.path, {
        color: annotation.color,
        stroke: annotation.stroke,
        strokeWidth: annotation.strokeWidth,
        strokeUniform: annotation.strokeUniform,
        fill: annotation.fill,
      });
      break;

    case "line":
      shape = new fabric.Line(annotation.points, {
        color: annotation.color,
        stroke: annotation.stroke,
        strokeWidth: annotation.strokeWidth,
        strokeUniform: annotation.strokeUniform,
        fill: annotation.fill,
      });
      break;

    default:
      shape = null;
  }
  return shape;
};

// add annotation to the canva s
export const addAnnotationsToCanvas = ({
  canvas,
  viewer,
  user,
  annotations = [],
}) => {
  if (!canvas || !viewer || annotations.length > 0) return null;
  // remove render on each add annotation
  const originalRender = canvas.renderOnAddRemove;
  canvas.renderOnAddRemove = false;

  const feed = [];

  annotations.forEach((annotation) => {
    const shape = createAnnotation(annotation);

    // add shape to canvas and to activity feed
    canvas.add(shape);

    const message = createAnnotationMessage({
      shape,
      viewer,
      annotation,
      user,
    });
    feed.push(message);
  });

  // restore render on each add annotation
  canvas.renderOnAddRemove = originalRender;
  canvas.requestRenderAll();
  viewer.viewport.zoomBy(1.01);

  return feed;
};

// create contour(annotation) from the analysed data
export const createContour = ({ contour, color, left, top }) => {
  const points = contour.map((point) => ({
    x: point[0][0] + left,
    y: point[0][1] + top,
  }));
  return new fabric.Polygon(points, {
    stroke: "black",
    strokeWidth: 1.2,
    fill: color ? `${color.hex}80` : "",
    strokeUniform: true,
  });
};

/** create contours(annotation) around cell from analysis data */
export const createContours = ({ canvas, contours, color, left, top }) => {
  if (!canvas || !contours || contours.length === 0) return null;

  const cells = [];

  contours[0].forEach((roi) => {
    cells.push(createContour({ contour: roi, color, left, top }));
  });

  return cells;
};

/**  
  Group enclosing annotation and cells (contours) and return feed message object 
*/
export const groupAnnotationAndCells = ({
  cells,
  enclosingAnnotation,
  optionalData,
}) => {
  if (!cells || !enclosingAnnotation) return null;
  const { hash, text, zoomLevel, points, timeStamp, path } =
    enclosingAnnotation;
  enclosingAnnotation.set({ fill: "" });
  const group = new fabric.Group([enclosingAnnotation, ...cells]).set({
    hash,
    text,
    zoomLevel,
    points,
    path,
    timeStamp,
    isAnalysed: true,
    fill: "",
  });

  // check if optionalData is available and also is not empty
  if (optionalData && Object.keys(optionalData).length > 0) {
    group.set({ analysedROI: optionalData });
  }

  const message = {
    username: "",
    object: group,
    image: null,
  };

  return message;
};

// remove annotation from the canvas
// and from the database
export const removeAnnotation = async ({
  canvas,
  annotation,
  deleteAnnotationFromDB,
}) => {
  if (!canvas || !annotation) return;
  canvas.remove(annotation);
  canvas.requestRenderAll();
};
